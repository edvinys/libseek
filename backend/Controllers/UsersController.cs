using Library.Data;
using Library.Database;
using Library.Records;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Library.Controllers
{
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly LibraryContext DB;
        private readonly ILogger<UsersController> Logger;
        public UsersController(LibraryContext db, ILogger<UsersController> logger)
        {
            DB = db;
            Logger = logger;
        }

        [HttpPost("api/user/register")]
        public async Task<IActionResult> PutUsersInDB(UserRecord userRecord)
        {
            bool emailExists = await DB.Users.Where(user => user.Email.ToLower() == userRecord.Email.ToLower()).AnyAsync();

            if (emailExists) return Conflict("Email already exists");

            try
            {
                User user = new User(userRecord);

                DB.Users.Add(user);

                await DB.SaveChangesAsync();

                return Ok();
            }
            catch (DbUpdateException)
            {
                return BadRequest(new
                {
                    message = "The user could not be saved"
                });
            }
        }


        [HttpGet("api/user")]
        public async Task<IActionResult> GetEmailNameSurname()
        {
            int.TryParse(Request.Cookies["id"], out int userId);

            if (userId < 0)
            {
                return NotFound();
            }

            var user = await DB.Users.FirstOrDefaultAsync(user => user.Id == userId);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                Name = user.Name,
                Email = user.Email,
                Surname = user.Surname
            });
        }
    }
}
