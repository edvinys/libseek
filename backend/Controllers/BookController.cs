using Library.Database;
using Library.Records;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt;
using System.Data.Common;

namespace Library.Controllers
{
    public class BookController : Controller
    {
        private readonly LibraryContext _db;
        public BookController(LibraryContext db)
        {
            _db = db;
        }

        [HttpPost("/book/register")]
        public async Task<IActionResult> PutBookInDB(BookRecord bookRecord)
        {
            string authorNameSurname = bookRecord.AuthorName + " " + bookRecord.AuthorSurname;
            bool bookExists = await _db.Books
                .Where(book => book.Title.ToLower() == bookRecord.Title.ToLower() &&
                        _db.Authors.Where(author => author.Id == book.AuthorId).First().Name
                        == bookRecord.AuthorName.ToLower())
                .AnyAsync();


            if (bookExists) return Conflict($"{bookRecord.Title}" +
                $" by {bookRecord.AuthorName} {bookRecord.AuthorSurname} already exists");

            //

            try
            {
                Book book = new Book(bookRecord);

                Author author = await _db.Authors
                    .FirstOrDefaultAsync
                        (author => author.Name.ToLower() == bookRecord.AuthorName.ToLower() &&
                        author.Surname.ToLower() == bookRecord.AuthorSurname.ToLower());

                bool authorExists = author != null;

                if (!authorExists)
                {
                    if (bookRecord.AuthorBirthdate == null) return Conflict($"{bookRecord.Title} exists"
                        + $" but {authorNameSurname} birth date is not specified");

                    author = new Author(bookRecord);

                    await _db.Authors.AddAsync(author);
                    await _db.SaveChangesAsync();
                }

                book.AuthorId = author.Id;
                await _db.Books.AddAsync(book);

                await _db.SaveChangesAsync();
            }
            catch (DbException)
            {
                return BadRequest(new
                {
                    message = "Something went wrong"
                });
            }

            return Ok();
        }
    }
}
