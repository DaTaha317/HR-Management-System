namespace WebAPI.DTOs
{
    public class PermessionFormDTO
    {
       public string RoleId { get; set; }
       public string RoleName { get; set; }
       public List<CheckBoxDTO> RoleClaims { get; set; }
    }
}
