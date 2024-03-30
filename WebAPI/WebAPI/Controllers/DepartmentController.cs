using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DepartmentController : ControllerBase
    {
        private IDepartmentRepo departmentRepo;
        private IMapper mapper;

        public DepartmentController(IDepartmentRepo departmentRepo, IMapper mapper)
        {
            this.departmentRepo = departmentRepo;
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Department> departments = departmentRepo.GetAll();
            if (departments.Count == 0)
            {
                return Unauthorized();
            }

            List<DepartmentDTO> departmentDTOs = new List<DepartmentDTO>();

            foreach (var dept in departments)
            {
                DepartmentDTO deptDTO = mapper.Map<DepartmentDTO>(dept);

                departmentDTOs.Add(deptDTO);
            }

            return Ok(departmentDTOs);
        }
        [HttpGet("{name}")]
        public IActionResult GetByName(string name)
        {
            Department department = departmentRepo.GetByName(name);
            if (department == null)
            {
                return NotFound();
            }

            DepartmentDTO departmentDTO = mapper.Map<DepartmentDTO>(department);

            return Ok(departmentDTO);
        }
    }
}
