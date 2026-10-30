using Library.Records;

namespace Library.Data;

public partial class Author
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public DateOnly? Birthdate { get; set; }

    public virtual ICollection<Book> Books { get; set; } = new List<Book>();

    public Author()
    {

    }
    public Author(BookRecord bookRecord)
    {
        Name = bookRecord.AuthorName;
        Surname = bookRecord.AuthorSurname;
        if (bookRecord.AuthorBirthdate == null)
        {
            throw new ArgumentException($"Given author birthdate is null:" +
                $" {bookRecord.AuthorName} {bookRecord.AuthorSurname}");
        }
        Birthdate = bookRecord.AuthorBirthdate;
    }
}
