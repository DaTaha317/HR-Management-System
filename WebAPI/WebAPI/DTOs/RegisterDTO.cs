using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Full Name is required!")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "Email is required!")]
        [EmailAddress(ErrorMessage = "Please Enter a valid Email Address")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [Compare("Password", ErrorMessage = "Both Passwords are not matched..")]
        public string ConfirmPassword { get; set; }

        public string RoleName { get; set; }
    }
}
