using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.DTOs
{
    public class DepartmentDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
