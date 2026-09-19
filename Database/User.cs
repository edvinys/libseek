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

    public User(int id, string name, string surname, string email, string passwordHash, string role)
    {
        Id = id;
        Name = name;
        Surname = surname;
        Email = email;
        PasswordHash = passwordHash;
        Role = role;
    }
}
