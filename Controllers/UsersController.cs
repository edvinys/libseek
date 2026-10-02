using Library.Database;
using Library.Records;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt;

namespace Library.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly LibraryContext _db;
        public UsersController(LibraryContext db)
        {
            _db = db;
        }

        [HttpPost("/user/register")]
        public async Task<IActionResult> PutUsersInDB(UserRegisterRecord userRegister)
        {
            bool emailExists = await _db.Users.Where(user => user.Email == userRegister.Email).AnyAsync();

            if (emailExists) return Conflict("Email already exists");

            try
            {
                User user = new User(userRegister);

                _db.Users.Add(user);

                _db.SaveChanges();

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
