using Library.Records;

namespace Library.Data;

public partial class Book
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Genre { get; set; } = null!;

    public int AuthorId { get; set; }

    public virtual ICollection<BookCopy> BookCopies { get; set; } = new List<BookCopy>();
    public Book()
    {
    }
    public Book(BookRecord bookRecord)
    {
        Title = bookRecord.Title;
        Genre = bookRecord.Genre;
    }
}
