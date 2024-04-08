using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Constants;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeRepo employeeRepo;
        private IDepartmentRepo departmentRepo;
        private IAuthorizationService authorizationService;
        private IMapper mapper;
        public EmployeeController(IEmployeeRepo employeeRepo, IDepartmentRepo departmentRepo, IAuthorizationService authorizationService, IMapper mapper)
        {
            this.employeeRepo = employeeRepo;
            this.departmentRepo = departmentRepo;
            this.authorizationService = authorizationService;
            this.mapper = mapper;
        }
        #region getall
        [Authorize(Permissions.Employees.view)]
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            List<Employee> employees = employeeRepo.GetAll();
            if (employees.Count == 0)
            {
                return NotFound();
            }
            List<EmployeeDTO> employeeDTOs = new List<EmployeeDTO>();
            foreach (Employee employee in employees)
            {
                EmployeeDTO employeesDTO = mapper.Map<EmployeeDTO>(employee);
                employeeDTOs.Add(employeesDTO);
            }
            return Ok(employeeDTOs);
        }
        #endregion
        #region get
        [Authorize(Permissions.Employees.view)]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Employee employee = employeeRepo.GetById(id);
            if (employee == null)
            {
                return NotFound();
            }
            EmployeeDTO employeeDTO = mapper.Map<EmployeeDTO>(employee);
            return Ok(employeeDTO);
        }
        #endregion
        [Authorize(Permissions.Employees.create)]
        [HttpPost]
        public IActionResult Add(EmployeeDTO employeeDTO)
        {
            if (employeeDTO == null)
            {
                return BadRequest("Invalid Employee Data");
            }
            Department department = departmentRepo.GetByName(employeeDTO.departmentName);
            if (department == null)
            {
                return NotFound("Department not found");
            }
            Employee employee = mapper.Map<Employee>(employeeDTO);
            employee.DeptId = department.Id;
            employeeRepo.Add(employee);
            employeeRepo.Save();
            return CreatedAtAction("GetById", new { id = employee.SSN }, employeeDTO);
        }
        [Authorize(Permissions.Employees.edit)]
        [HttpPut("{id}")]
        public IActionResult Update(int id, EmployeeDTO employeeDTO)
        {
            Employee existingEmployee = employeeRepo.GetById(id);
            if (existingEmployee == null)
            {
                return NotFound();
            }
            Department department = departmentRepo.GetByName(employeeDTO.departmentName);
            if (department == null)
            {
                return NotFound("Department not found");
            }
            existingEmployee.FullName = employeeDTO.FullName;
            existingEmployee.Address = employeeDTO.Address;
            existingEmployee.Arrival = employeeDTO.Arrival;
            existingEmployee.Departure = employeeDTO.Departure;
            existingEmployee.Gender = (Gender)employeeDTO.Gender;
            existingEmployee.PhoneNumber = employeeDTO.PhoneNumber;
            existingEmployee.BaseSalary = employeeDTO.BaseSalary;
            existingEmployee.BirthDate = employeeDTO.BirthDate;
            existingEmployee.ContractDate = employeeDTO.ContractDate;
            existingEmployee.Nationality = employeeDTO.Nationality;
            existingEmployee.DeptId = department.Id;
            existingEmployee.SSN = employeeDTO.SSN;

            employeeRepo.Update(id, existingEmployee);
            employeeRepo.Save();
            return Ok();
        }
        #region delete
        [Authorize(Permissions.Employees.delete)]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Employee employee = employeeRepo.GetById(id);
            if (employee == null)
            {
                return NotFound();
            }
            employeeRepo.Delete(id);
            employeeRepo.Save();

            return NoContent();
        }
        #endregion
    }
}
