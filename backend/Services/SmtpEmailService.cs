using MailKit.Net.Smtp;
using MimeKit;

namespace Library.Services
{
    public class SmtpEmailService : IEmailService
    {
        private readonly IConfiguration Configuration; 

        public SmtpEmailService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public async Task SendPasswordResetEmailAsync(string receiverEmail, string token)
        {
            string thisEmail = Configuration["Gmail:Email"]
               ?? throw new InvalidOperationException("Gmail:Email was not found in appsettings.json");
            string thisPassword = Configuration["Gmail:Password"]
                ?? throw new InvalidOperationException("Gmail:Password was not found in appsettings.json");

            //- message

            var message = new MimeMessage();
            string frontendURL = Configuration["URL:frontend"]
                ?? throw new InvalidOperationException("Gmail:Email was not found in appsettings.json");

            message.From.Add(new MailboxAddress("Libseek", thisEmail));
            message.To.Add(new MailboxAddress(null, receiverEmail));

            message.Subject = "Password reset";

            string resetLink = $"{frontendURL}/reset/password?token={receiverEmail}";
            string html = $@"
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
                await smtp.ConnectAsync("smtp.gmail.com", 587, false);

                // Note: only needed if the SMTP server requires authentication
                await smtp.AuthenticateAsync(thisEmail, thisPassword);

                await smtp.SendAsync(message);
                await smtp.DisconnectAsync(true);
            }

            return;
        }
    }
}
