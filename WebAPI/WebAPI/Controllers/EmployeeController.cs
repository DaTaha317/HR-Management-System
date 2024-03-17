using Microsoft.AspNetCore.Mvc;
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
        public EmployeeController(IEmployeeRepo employeeRepo, IDepartmentRepo departmentRepo)
        {
            this.employeeRepo = employeeRepo;
            this.departmentRepo = departmentRepo;
        }
        #region getall
        [HttpGet]
        public IActionResult GetAll()
        {
            List<Employee> employees = employeeRepo.GetAll();
            if (employees.Count == 0)
            {
                return NotFound();
            }
            List<EmployeeDTO> employeeDTOs = new List<EmployeeDTO>();
            foreach (Employee employee in employees)
            {
                EmployeeDTO employeesDTO = new EmployeeDTO()
                {
                    Id = employee.SSN,
                    FullName = employee.FullName,
                    Address = employee.Address,
                    Arrival = employee.Arrival,
                    Departure = employee.Departure,
                    Gender = (int) employee.Gender,
                    PhoneNumber = employee.PhoneNumber,
                    BaseSalary = employee.BaseSalary,
                    BirthDate=employee.BirthDate,
                    ContractDate=employee.ContractDate,
                    Nationality=employee.Nationality,
                    departmentName = employee.Department != null ? employee.Department.Name : null
                };
                employeeDTOs.Add(employeesDTO);
            }
            return Ok(employeeDTOs);
        }
        #endregion
        #region get
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Employee employee = employeeRepo.GetById(id);
            if (employee == null)
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
                Gender = (int)employee.Gender,
                PhoneNumber = employee.PhoneNumber,
                BaseSalary = employee.BaseSalary,
                departmentName = employee.Department != null ? employee.Department.Name : null
            };
            return Ok(employeeDTO);
        }
        #endregion
        [HttpPost]
        public IActionResult Add(EmployeeDTO employeeDTO)
        {
            if (employeeDTO == null)
            {
                return BadRequest();
            }
            Department department = departmentRepo.GetByName(employeeDTO.departmentName);
            if (department == null)
            {
                return NotFound("Department not found");
            }
            Employee employee = new Employee
            {
                FullName = employeeDTO.FullName,
                Address = employeeDTO.Address,
                Arrival = employeeDTO.Arrival,
                Departure = employeeDTO.Departure,
                Gender = (Gender)employeeDTO.Gender,
                PhoneNumber = employeeDTO.PhoneNumber,
                BaseSalary = employeeDTO.BaseSalary,
                BirthDate = employeeDTO.BirthDate,
                ContractDate = employeeDTO.ContractDate,
                Nationality = employeeDTO.Nationality,
                DeptId = department.Id,
                SSN = employeeDTO.SSN,
            };
            employeeRepo.Add(employee);
            employeeRepo.Save();
            return CreatedAtAction("GetById", new { id = employee.SSN }, employeeDTO);
        }
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
