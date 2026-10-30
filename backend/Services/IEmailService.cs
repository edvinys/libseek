using System.Runtime.CompilerServices;

namespace Library.Services
{
    public interface IEmailService
    {
        Task SendPasswordResetEmailAsync(string receiver, string resetLink);
    }
}
