using Library.Data;
using Library.Database;
using Library.Records;
using Library.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using StackExchange.Redis.Extensions.Core.Abstractions;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;

namespace Library.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly LibraryContext DB;
        private readonly IConfiguration Configuration;
        private readonly IRedisDatabase RedisDB;
        private readonly IAuthService Auth;
        private readonly IEmailService Email;

        public AuthController(LibraryContext db, IConfiguration configuration,
            IRedisDatabase redis, IAuthService auth, IEmailService email)
        {
            DB = db;
            Configuration = configuration;
            RedisDB = redis;
            Auth = auth;
            Email = email;
        }

        [HttpPost("api/auth/forgot/password")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            if (!Auth.IsValidEmail(email))
            {
                return BadRequest();
            }

            string random = WebEncoders.Base64UrlEncode(RandomNumberGenerator.GetBytes(32));
            var hash = SHA256.HashData(Encoding.UTF8.GetBytes(random));
            var token = Convert.ToBase64String(hash);
            TimeSpan expiresIn = new TimeSpan(0, 5, 0); // 5 min
            await RedisDB.AddAsync("email" + " passwordReset", token, expiresIn);

            await Email.SendPasswordResetEmailAsync(email, token);

            return Ok();
        }

        [HttpPost("api/auth/login")]
        public IActionResult Login(UserRecord userRecord)
        {
            if (Auth.IsValidUser(userRecord, out User? user))
            {
                var token = Auth.GenerateToken(user);
                // cookie options 

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true, // prevent JS from reading
                    Secure = true, // only https
                    SameSite = SameSiteMode.None, // prevent attacks
                    Expires = DateTime.Now.AddMinutes(90),
                    IsEssential = true,
                };

                // cookie data
                Response.Cookies.Append("sid", token, cookieOptions);
                Response.Cookies.Append("id", user.Id.ToString(), cookieOptions);
                Response.Cookies.Append("name", user.Name, cookieOptions);
                Response.Cookies.Append("surname", user.Surname, cookieOptions);


                return Ok();
            }

            return Unauthorized();
        }

        [HttpPost("api/auth/logout")]
        public IActionResult Logout()
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, // prevent JS from reading
                Secure = true, // only https
                SameSite = SameSiteMode.None, // prevent attacks
                IsEssential = true,
            };
            Response.Cookies.Delete("sid", cookieOptions);
            Response.Cookies.Delete("id", cookieOptions);
            Response.Cookies.Delete("name", cookieOptions);
            Response.Cookies.Delete("surname", cookieOptions);

            return NoContent();
        }

        [HttpPost("api/auth/register")]
        public async Task<IActionResult> Register(UserRecord userRecord)
        {
            if (userRecord.Name == null || userRecord.Surname == null)
            {
                return BadRequest("Could not retrieve name or surname.");
            }

            bool emailAlreadyExists = await DB.Users.FirstOrDefaultAsync(user => user.Email == userRecord.Email) != null;
            if (emailAlreadyExists)
            {
                return BadRequest("Email already exists.");
            }

            User user = new User(userRecord);
            await DB.Users.AddAsync(user);
            await DB.SaveChangesAsync();

            return Ok();
        }
    }

    [Authorize]
    [ApiController]
    public class ValidateUser : ControllerBase
    {
        [HttpGet("api/auth")]
        public IActionResult AuthenticateToken()
        {
            return Accepted();
        }
    }
}
