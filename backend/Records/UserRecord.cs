using System.ComponentModel.DataAnnotations;

namespace Library.Records
{
    public record UserRecord
    (
        [Required] string Name,
        [Required] string Surname,
        [StringLength(50), Required] string Email,
        [StringLength(50), Required] string Password
    );
}
