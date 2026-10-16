using Library.Database;
using Library.Records;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt;
using System.Data.Common;
using Library.Data;
using Microsoft.AspNetCore.Authorization;

namespace Library.Controllers
{
    [ApiController]
    [Authorize]
    public class BookController : Controller
    {
        private readonly LibraryContext DB;
        public BookController(LibraryContext db)
        {
            DB = db;
        }

        [HttpPost("api/books/add")]
        public async Task<IActionResult> PutBookInDB(BookRecord bookRecord)
        {
            string authorNameSurname = bookRecord.AuthorName + " " + bookRecord.AuthorSurname;
            bool bookExists = await DB.Books
                .Where(book => book.Title.ToLower() == bookRecord.Title.ToLower() &&
                        DB.Authors.Where(author => author.Id == book.AuthorId).First().Name
                        == bookRecord.AuthorName.ToLower())
                .AnyAsync();


            if (bookExists) return Conflict($"{bookRecord.Title}" +
                $" by {authorNameSurname} already exists");

            //

            try
            {
                Book book = new Book(bookRecord);

                Author? author = await DB.Authors
                    .FirstOrDefaultAsync
                        (author => author.Name.ToLower() == bookRecord.AuthorName.ToLower() &&
                        author.Surname.ToLower() == bookRecord.AuthorSurname.ToLower());

                bool authorExists = author != null;

                if (!authorExists)
                {
                    if (bookRecord.AuthorBirthdate == null) return Conflict( new
                    {
                        message = $"{bookRecord.Title} exists"
                        + $" but {authorNameSurname} birth date is not specified"
                    });

                    author = new Author(bookRecord);

                    await DB.Authors.AddAsync(author);
                    await DB.SaveChangesAsync();
                }

                book.AuthorId = author.Id;
                await DB.Books.AddAsync(book);

                await DB.SaveChangesAsync();
            }
            catch (DbException)
            {
                return BadRequest(new
                {
                    message = "Book could not be added." +
                    " It is likely that a required field was bypassed."
                });
            }

            return Ok();
        }
    }
}
