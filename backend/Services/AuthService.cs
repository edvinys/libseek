using Library.Data;
using Library.Database;
using Library.Records;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Library.Services
{
    public class AuthService : IAuthService
    {
        private readonly LibraryContext DB;
        private readonly IConfiguration Configuration;

        public AuthService(LibraryContext db, IConfiguration configuration)
        {
            DB = db;
            Configuration = configuration;
        }

        public string GenerateToken(User? user)
        {
            ArgumentNullException.ThrowIfNull(user);

            var claim = new List<Claim>
            {
                new Claim(ClaimTypes.Email, $"{user.Email}"),
                new Claim(ClaimTypes.Name, $"{user.Name}"),
                new Claim(ClaimTypes.Surname, $"{user.Surname}"),
                new Claim(ClaimTypes.Role, $"{user.Role}")
            };

            var jwtKey = Configuration["JWTConfig:Key"]
                ?? throw new InvalidOperationException("JWTConfig:Key was not found in appsettings.json");
            var issuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var signingCredential = new SigningCredentials(issuerSigningKey, SecurityAlgorithms.HmacSha256);
            double.TryParse(Configuration["JWTConfig:TokenValidityMins"], out double expirationInMins);

            var token = new JwtSecurityToken(
                issuer: Configuration["JWTConfig:Issuer"],
                audience: Configuration["JWTConfig:Audience"],
                claims: claim,
                signingCredentials: signingCredential,
                expires: DateTime.Now.AddMinutes(expirationInMins)
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool IsValidEmail(string email)
        {
            char[] emailMustHave = { '@', '.' };

            foreach (char ch in emailMustHave)
            {
                if (!email.Contains(ch))
                {
                    return false;
                }
            }

            return true;
        }

        public bool IsValidUser(UserLoginRecord userLoginRecord, out User? user)
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
    }
}
