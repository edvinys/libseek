using Library.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace Library.Controllers
{
    [Authorize]
    [ApiController]
    public class BookInfoController : ControllerBase
    {
        private readonly LibraryContext DB;
        public BookInfoController(LibraryContext db)
        {
            DB = db;
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
        public async Task<IActionResult> GetBooks()
        {
            var booksAndAuthor = DB.Books
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
    }
}
