using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers
{
    [Authorize]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("api/login/auth")]
        public IActionResult AuthenticateToken()
        {
            return Accepted();
        }
    }
}
