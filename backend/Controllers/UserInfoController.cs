using Library.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

using System.Text.Json;

namespace Library.Controllers
{
    [Authorize]
    [ApiController]
    public class UserInfoController : ControllerBase
    {
        private readonly LibraryContext DB;

        public UserInfoController(LibraryContext db)
        {
            DB = db;
        }

        [HttpGet("api/user/getinfo")]
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
