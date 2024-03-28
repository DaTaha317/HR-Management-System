namespace WebAPI.DTOs
{
    public class UserRolesDTO
    {
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public List<CheckBoxDTO> Roles { get; set; }
    }
}
