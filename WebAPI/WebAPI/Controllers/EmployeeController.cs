using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployee employeeRepo;
        public EmployeeController(IEmployee employeeRepo)
        {
            this.employeeRepo = employeeRepo;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Employee> employees = employeeRepo.GetAll();
            if (employees.Count == 0)
            {
                return NotFound();
            }
            List<EmployeeDTO>employeeDTOs=new List<EmployeeDTO>();
            foreach (Employee employee in employees)
            {
                EmployeeDTO employeesDTO = new EmployeeDTO()
                {
                    Id = employee.SSN,
                    FullName = employee.FullName,
                    Address = employee.Address,
                    Arrival = employee.Arrival,
                    Departure = employee.Departure,
                    Gender = employee.Gender,
                    PhoneNumber = employee.PhoneNumber,
                    BaseSalary = employee.BaseSalary,
                    DepartmentName = employee.Department.Name
                };
                employeeDTOs.Add(employeesDTO);
            }
            return Ok(employeeDTOs);
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Employee employee = employeeRepo.GetById(id);
            if(employee == null)
            {
                return NotFound();
            }
            EmployeeDTO employeeDTO = new EmployeeDTO()
            {
                Id = employee.SSN,
                FullName = employee.FullName,
                Address = employee.Address,
                Arrival = employee.Arrival,
                Departure = employee.Departure,
                Gender = employee.Gender,
                PhoneNumber = employee.PhoneNumber,
                BaseSalary = employee.BaseSalary,
                DepartmentName = employee.Department.Name
            };
            return Ok(employeeDTO);
        }
        [HttpPost]
        public IActionResult Add(EmployeeDTO employeeDTO)
        {
            if (employeeDTO == null)
            {
                return BadRequest();
            }
          
            Employee employee = new Employee
            {
                FullName = employeeDTO.FullName,
                Address = employeeDTO.Address,
                Arrival = employeeDTO.Arrival,
                Departure = employeeDTO.Departure,
                Gender = employeeDTO.Gender,
                PhoneNumber = employeeDTO.PhoneNumber,
                BaseSalary = employeeDTO.BaseSalary,
                BirthDate=employeeDTO.BirthDate,
                ContractDate=employeeDTO.ContractDate,
                Nationality=employeeDTO.Nationality,
                DeptId=employeeDTO.deptid,
            };
            employeeRepo.Add(employee);
            employeeRepo.Save();
            return CreatedAtAction(nameof(GetById), new { id = employee.SSN }, employee);
        }
    }
}
