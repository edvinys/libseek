using Library.Data;
using Library.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
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
        public IActionResult GetBooks()
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
        [HttpGet("api/books/{title}")]
        public async Task<IActionResult> GetBookByTitle(string title)
        {
            title = title.ToLower();
            Book? book = await DB.Books.FirstOrDefaultAsync(book => book.Title.ToLower().Contains(title));

            if (book == null)
                return NotFound();

            Author? author = await DB.Authors.FirstOrDefaultAsync(author => author.Id == book.AuthorId);

            if (author == null) 
                return NotFound(new
                {
                    message = $"Could not find a matching author for {book.Id} - {book.Title} - {book.Genre}"
                });

            return Ok(new
            {
                id = book.Id,
                title = book.Title,
                genre = book.Genre,
                authorName = author.Name,
                authorSurname = author.Surname
            });

        }

    }
}
