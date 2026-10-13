using Library.Records;
using System;
using System.Collections.Generic;

namespace Library.Data;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string Role { get; set; } = null!;

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    public User()
    {

    }
    public User(string name, string surname, string email, string password)
    {
        Name = name;
        Surname = surname;
        Email = email;
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
    }
    public User(UserRecord userRecord) : this(userRecord.Name, userRecord.Surname,
        userRecord.Email, userRecord.Password)
    {
    }
}
