using Library.Data;
using Library.Records;

namespace Library.Services
{
    public interface IAuthService
    {
        bool IsValidUser(UserRecord userLoginRecord, out User? user);
        bool IsValidEmail(string email);
        string GenerateToken(User user);
    }
}
