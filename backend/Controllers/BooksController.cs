using Library.Data;
using Library.Database;
using Library.Records;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace Library.Controllers
{
    [ApiController]
    [Authorize]
    public class BooksController : Controller
    {
        private readonly LibraryContext DB;
        public BooksController(LibraryContext db)
        {
            DB = db;
        }

        [HttpPost("api/books")]
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
                    if (bookRecord.AuthorBirthdate == null) return Conflict(new
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

        [HttpGet("api/books/count")]
        public async Task<IActionResult> GetCountOfBooks()
        {
            int count = await DB.Books.CountAsync();
            return Ok(new
            {
                Count = count
            });
        }

        [HttpGet("api/books")]
        public IActionResult GetBooks([FromQuery] GetBooksQuery filters)
        {
            IQueryable<Book> booksQuery = DB.Books;

            // filter by title
            if (!string.IsNullOrWhiteSpace(filters.Title))
            {
                booksQuery = booksQuery.Where(book => book.Title.ToLower().Contains(filters.Title.ToLower()));

                if (!booksQuery.Any())
                {
                    return NotFound();
                }
            }

            // find the books
            var booksAndAuthor = booksQuery
                .Join(
                DB.Authors,
                book => book.AuthorId,
                author => author.Id,
                (book, author) => new
                {
                    id = book.Id,
                    title = book.Title,
                    genre = book.Genre,
                    authorName = author.Name,
                    authorSurname = author.Surname
                }).ToList();
            return Ok(booksAndAuthor);
        }

        [HttpDelete("api/books")]
        public async Task<IActionResult> DeleteBook(BookRecord bookRecord)
        {
            bool hasReservations = await DB.Reservations
                .Where(reservation => reservation.Copy.BookId == bookRecord.ID)
                .AnyAsync();

            if (hasReservations)
            {
                return BadRequest(new
                {
                    message = "The requested book to delete still has its reservations."
                });
            }

            Book book = new Book(bookRecord);

            DB.Books.Remove(book);
            await DB.SaveChangesAsync();

            return Ok();
        }
    }
}
