using Library.Database;
using Library.Records;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt;
using System.Data.Common;
using Microsoft.AspNetCore.Authorization;
using Library.Data;

namespace Library.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
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

    }
}
