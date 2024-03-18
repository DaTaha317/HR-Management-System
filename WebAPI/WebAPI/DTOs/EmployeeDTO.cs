using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using WebAPI.Models;

namespace WebAPI.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public double SSN { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public int Gender { get; set; }
        public string Nationality { get; set; }
        public DateOnly BirthDate { get; set; }
        public DateOnly ContractDate { get; set; }
        public decimal BaseSalary { get; set; }
        public TimeOnly Arrival { get; set; }
        public TimeOnly Departure { get; set; }
        public string departmentName { get; set; }
    }
}
