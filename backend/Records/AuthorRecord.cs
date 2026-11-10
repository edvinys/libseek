using System.ComponentModel.DataAnnotations;

namespace Library.Records
{
    public record AuthorRecord
    (
        int? Id,
        [Required] string Name,
        string Surname,
        DateOnly? Birthdate
 
    );
}
