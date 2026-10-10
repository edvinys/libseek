using Library.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers
{
    [ApiController]
    public class LogoutController : ControllerBase
    {
        [HttpPost("api/logout")]
        public IActionResult Logout()
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, // prevent JS from reading
                Secure = true, // only https
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None, // prevent attacks
                IsEssential = true,
            };

            Response.Cookies.Delete("sid", cookieOptions);
            Response.Cookies.Delete("id", cookieOptions);
            Response.Cookies.Delete("name", cookieOptions); 
            Response.Cookies.Delete("surname", cookieOptions);

            return NoContent();
        }
    }
}
