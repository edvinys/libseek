using System.ComponentModel.DataAnnotations;

namespace Library.Records
{
    public record UserRegisterRecord
    (
        [StringLength(50), Required] string Name,
        [StringLength(50), Required] string Surname,
        [StringLength(50), Required] string Email,
        [StringLength(50), Required] string Password);
}
