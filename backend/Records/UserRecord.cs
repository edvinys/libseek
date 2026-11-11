using System.ComponentModel.DataAnnotations;

namespace Library.Records
{
    public record UserRecord
    (
        string? Name,
        string? Surname,
        [StringLength(50), Required] string Email,
        [StringLength(50), Required] string Password
    );
}
