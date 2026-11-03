using Library.Records;

namespace Library.Data;

public partial class Book : IEquatable<Book>
{
    public int? Id { get; set; }

    public string Title { get; set; } = null!;

    public string Genre { get; set; } = null!;

    public int AuthorId { get; set; }

    public virtual ICollection<BookCopy> BookCopies { get; set; } = new List<BookCopy>();
    public Book() { }
    public Book(BookRecord bookRecord)
    {
        Id = bookRecord.ID;
        Title = bookRecord.Title;
        Genre = bookRecord.Genre;
    }

    public bool Equals(Book? other)
    {
        if (other is null)
            return false;
        if (other.Id == -1)
            return false;

        return this.Id == other.Id;
    }
}
