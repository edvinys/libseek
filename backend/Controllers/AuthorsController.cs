using Library.Data;
using Library.Database;
using Library.Records;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis.Extensions.Core.Abstractions;
using System.Reflection.Metadata.Ecma335;

namespace Library.Controllers
{
    [ApiController]
    [Authorize]
    public class AuthorsController : Controller
    {
        private readonly LibraryContext DB;
        public AuthorsController(LibraryContext db)
        {
            DB = db;
        }

        [HttpPost("api/authors")]
        public async Task<IActionResult> AddAuthor(AuthorRecord authorRecord)
        {
            Author? author = await DB.Authors.FirstOrDefaultAsync(author => author.Id == authorRecord.Id);
            if (!(author is null))
                return BadRequest("Author already exists.");

            var newAuthor = new Author(authorRecord);

            await DB.Authors.AddAsync(newAuthor);
            await DB.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("api/authors")]
        public async Task<IActionResult> DeleteAuthor(AuthorRecord authorRecord)
        {
            Author? author = await DB.Authors.FirstOrDefaultAsync(author =>
                author.Name.ToLower() == authorRecord.Name.ToLower() &&
                author.Surname.ToLower() == authorRecord.Surname.ToLower());

            if (author is null)
                return BadRequest("Could not find such author.");
            if (await DB.Books.AnyAsync(book => book.AuthorId == author.Id))
                return BadRequest("Author still has books.");

            DB.Authors.Remove(author);
            await DB.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("api/authors")]
        public IActionResult GetAuthors([FromQuery] GetAuthorsQuery authorsQuery)
        {
            if (string.IsNullOrWhiteSpace(authorsQuery.NameOrSurname))
                return BadRequest("The text was empty.");

            List<Author> authors = 
                DB.Authors.Where(author => author.Name.Contains(authorsQuery.NameOrSurname) ||
                                           author.Surname.Contains(authorsQuery.NameOrSurname)).ToList();

            return Ok(authors);
        }
    }
}
