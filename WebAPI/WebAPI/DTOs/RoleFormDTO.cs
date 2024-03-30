using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class RoleFormDTO
    {
        [Required,StringLength(256)]
       public string Name { get; set; }

    }
}
