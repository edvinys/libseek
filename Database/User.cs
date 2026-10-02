using Library.Records;
using System;
using System.Collections.Generic;

namespace Library.Database;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string Role { get; set; } = null!;

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    public User(string name, string surname, string email, string passwordHash)
    {
        Name = name;
        Surname = surname;
        Email = email;
        PasswordHash = passwordHash;
    }
    public User(UserRegisterRecord userRecord)
    {
        Name = userRecord.Name;
        Surname = userRecord.Surname;
        Email = userRecord.Email;
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(userRecord.Password);
    }
}
