using Library.Database;
using System.ComponentModel.DataAnnotations;

namespace Library.Records
{
    public record BookRecord
    (
        // Book

        [Required] string Title,

        [Required] string Genre,

        // Authors info

        [Required] string AuthorName,

        [Required] string AuthorSurname,

        DateOnly? AuthorBirthdate
    );
}
