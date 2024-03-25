namespace WebAPI.DTOs
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public IEnumerable<string> Roles { get; set; }

    }
}
