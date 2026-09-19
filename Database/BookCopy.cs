using System;
using System.Collections.Generic;

namespace Library.Database;

public partial class BookCopy
{
    public int Id { get; set; }

    public int BookId { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}
