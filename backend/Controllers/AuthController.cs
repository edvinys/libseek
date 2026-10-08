using BCrypt;
using Library.Database;
using Library.Records;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;

namespace Library.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly LibraryContext DB;
        private readonly IConfiguration Configuration;

        public AuthController(LibraryContext db, IConfiguration configuration)
        {
            DB = db;
            Configuration = configuration;
        }

        [HttpPost("api/login")]
        public IActionResult Login(UserLoginRecord userLoginRecord)
        {
            if (ValidUser(userLoginRecord, out User? user))
            {
                var token = GenerateToken(user);
                return Ok(new
                {
                    token = token
                });
            }

            return Unauthorized(new
            {
                message = "Email or password does not exist"
            });
        }

        private bool ValidUser(UserLoginRecord userLoginRecord, out User? user)
        {
            string email = userLoginRecord.Email;
            string password = userLoginRecord.Password;
            user = null;

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return false;

            user = DB.Users
                .FirstOrDefault(user => user.Email.ToLower() == email.ToLower());

            if (user == null)
                return false;

            return BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
        }
        private string GenerateToken(User? user)
        {
            if (user == null)
                throw new ArgumentNullException("When generating a JWT token user was null, critical error.");

            var claim = new List<Claim>
            {
                new Claim(ClaimTypes.Email, $"{user.Email}"),
                new Claim(ClaimTypes.Role, $"{user.Role}")
            };

            var jwtKey = Configuration["JWTConfig:Key"];
            var issuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var signingCredential = new SigningCredentials(issuerSigningKey, SecurityAlgorithms.HmacSha256);
            double.TryParse(Configuration["JWTConfig:TokenValidityMins"], out double expirationInMins);

            var token = new JwtSecurityToken(
                issuer: Configuration["JWTConfig:Issuer"],
                audience: Configuration["JWTConfig:Audience"],
                claims: claim,
                signingCredentials : signingCredential,
                expires: DateTime.Now.AddMinutes(expirationInMins)
                
                );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
