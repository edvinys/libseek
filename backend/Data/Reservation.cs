namespace Library.Data;

public partial class Reservation
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int CopyId { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public DateOnly? ReturnedAt { get; set; }

    public string Status { get; set; } = null!;

    public virtual BookCopy Copy { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
