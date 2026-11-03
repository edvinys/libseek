using Library.Data;
using Library.Database;
using Library.Records;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using MimeKit.IO;
using StackExchange.Redis;
using StackExchange.Redis.Extensions.Core.Abstractions;
using System.Data.Common;

namespace Library.Controllers
{
    [ApiController]
    [Authorize]
    public class BooksController : Controller
    {
        private readonly LibraryContext DB;
        private readonly IRedisDatabase RedisDB;
        public BooksController(LibraryContext db, IRedisDatabase redisDb)
        {
            DB = db;
            RedisDB = redisDb;
        }

        [HttpPost("api/books")]
        public async Task<IActionResult> AddBookToDB(BookRecord bookRecord)
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
        public async Task<IActionResult> GetBooks([FromQuery] GetBooksQuery filters)
        {
            IQueryable<Book> booksQuery = DB.Books;
            bool filtered = false; // if filtered, do not put in redis cache
            string redisKey = "AllBooks";

            // filter by title
            if (!string.IsNullOrWhiteSpace(filters.Title))
            {
                booksQuery = booksQuery.Where(book => book.Title.ToLower().Contains(filters.Title.ToLower()));

                if (!booksQuery.Any())
                {
                    return NotFound();
                }
                filtered = true;
            }
            if (!filtered)
            {
                IEnumerable<BookRecord> books = await RedisDB.SetMembersAsync<BookRecord>(redisKey);
                books.ToArray();
                if (books.Count() > 0)
                {
                    return Ok(books);
                }
            }

            // find the books
            var booksAndAuthor = await booksQuery
                .Join(
                DB.Authors,
                book => book.AuthorId,
                author => author.Id,
                (book, author) => new BookRecord
                (
                    book.Id,
                    book.Title,
                    book.Genre,
                    author.Name,
                    author.Surname,
                    author.Birthdate
                )).ToListAsync();

            if (!filtered)
            {
                await RedisDB.SetAddAllAsync<BookRecord>(redisKey, CommandFlags.None, booksAndAuthor.ToArray());
            }
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

            var book = new Book(bookRecord);

            DB.Books.Remove(book);
            await DB.SaveChangesAsync();

            return Ok();
        }
    }
}
