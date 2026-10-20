using Library.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MailKit;
using MimeKit;
using MailKit.Net.Smtp;
using StackExchange.Redis;
using BCrypt;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.WebUtilities;
using StackExchange.Redis.Extensions.Core.Abstractions;

namespace Library.Controllers
{
    [ApiController]
    public class PasswordResetController : ControllerBase
    {
        private readonly LibraryContext DB;
        private readonly IConfiguration Configuration;
        private readonly IRedisDatabase RedisDB;

        public PasswordResetController(LibraryContext db, IConfiguration configuration, IRedisDatabase redisDB)
        {
            DB = db;
            Configuration = configuration;
            RedisDB = redisDB;
        }


        [HttpPost("api/forgot/password")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            if (!IsValidEmail(email))
            {
                return BadRequest();
            }

            string random = WebEncoders.Base64UrlEncode(RandomNumberGenerator.GetBytes(32));
            var hash = SHA256.HashData(Encoding.UTF8.GetBytes(random));
            var token = Convert.ToBase64String(hash);
            TimeSpan expiresIn = new TimeSpan(0, 5, 0); // 5 min
            await RedisDB.AddAsync("email" + " passwordReset", token, expiresIn);

            string? thisEmail = Configuration["Gmail:Email"];
            var thisPassword = Configuration["Gmail:Password"];

            //- message

            var message = new MimeMessage();
            string frontendURL = Configuration["URL:frontend"];

            message.From.Add(new MailboxAddress("Libseek", thisEmail));
            message.To.Add(new MailboxAddress(null, email));

            message.Subject = "Password reset";

            var resetLink = $"{frontendURL}/reset/password?token={token}";
            var html = $@"
                        <div style=""background-color:#f4f6f8; padding:32px 16px; font-family:Arial, Helvetica, sans-serif;"">
                          <table role=""presentation"" align=""center"" width=""100%"" style=""max-width:480px; background-color:#ffffff; border-radius:8px; padding:32px;"">
                            <tr>
                              <td style=""text-align:center;"">
                                <h2 style=""margin:0 0 16px; color:#1f2937;"">Reset your password</h2>
                                <p style=""margin:0 0 24px; color:#4b5563; font-size:15px; line-height:1.5;"">
                                  <b>A password reset was requested at this email.</b>
                                  <br>
                                  Click the button below to choose a new password.
                                </p>
                                <a href=""{resetLink}"" style=""display:inline-block; background-color:#2563eb; color:#ffffff; text-decoration:none; font-weight:bold; padding:12px 28px; border-radius:6px;"">Reset password</a>
                                <p style=""margin:24px 0 0; color:#9ca3af; font-size:12px; line-height:1.5;"">
                                  If the button doesn't work, copy this link into your browser:<br>
                                  <a href=""{resetLink}"" style=""color:#2563eb; word-break:break-all;"">{resetLink}</a>
                                </p>
                                <p style=""margin:16px 0 0; color:#9ca3af; font-size:12px;"">
                                  If you didn't request this, you can safely ignore this email.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </div>";

            message.Body = new TextPart("html") 
            { 
                Text = html 
            };

            // send

            using (var smtp = new SmtpClient())
            {
                //await smtp.ConnectAsync("smtp.gmail.com", 587, false);

                //// Note: only needed if the SMTP server requires authentication
                //await smtp.AuthenticateAsync(thisEmail, thisPassword);

                //await smtp.SendAsync(message);
                //await smtp.DisconnectAsync(true);
            }

            return Ok();
        }

        private bool IsValidEmail(string email)
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
    }
}
