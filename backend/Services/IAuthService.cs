using Library.Data;
using Library.Records;

namespace Library.Services
{
    public interface IAuthService
    {
        bool IsValidUser(UserLoginRecord userLoginRecord, out User? user);
        bool IsValidEmail(string email);
        string GenerateToken(User? user);
    }
}
