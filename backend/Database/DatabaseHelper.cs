using Microsoft.EntityFrameworkCore;

namespace Library.Database
{
    public static class DatabaseHelper
    {
        public static void UpdateUsers(int id, string email, string password, LibraryContext db)
        {
            var user = db.Users.Where(x => x.Id == id);

            foreach (var item in user)
            {
                item.Name = email;
                item.PasswordHash = password;
            }

            db.SaveChanges();
        }
    }
}
