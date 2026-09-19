using Library.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpPost("/user/register/{id}/{name}/{surname}/{email}/{password}/{role}")]
        public async Task<IActionResult> PutUsersInDB(int id, string name, string surname,
            string email, string password, string? role)
        {
            try
            {
                if (name == null
               || surname == null
               || email == null
               || password == null)
                {
                    return BadRequest();
                }

                User user = new User(id, name, surname, email, password, role);

                _db.Users.Add(user);

                _db.SaveChanges();

                return Ok();
            }
            catch (DbUpdateException)
            {
                return BadRequest();
            }
        }


        [HttpPost("/user/register/{id}/{name}/{surname}/{email}/{password}")]
        public async Task<IActionResult> PutUsersInDB(int id, string name, string surname,
            string email, string password)
        {
            return await PutUsersInDB(id, name, surname, email, password, null);
        }

    }
}
