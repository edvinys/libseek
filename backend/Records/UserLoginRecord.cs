using System.ComponentModel.DataAnnotations;

namespace Library.Records
{
    public record UserLoginRecord
    (
        [StringLength(50), Required] string Email,
        [StringLength(50), Required] string Password
    );
}
