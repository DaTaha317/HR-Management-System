using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Constants;

namespace WebAPI.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        public double SSN { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public Gender Gender { get; set; }
        public string Nationality { get; set; }
        public DateOnly BirthDate { get; set; }
        public DateOnly ContractDate { get; set; }

        [Column(TypeName = "money")]
        public decimal BaseSalary { get; set; }
        public TimeOnly Arrival { get; set; }
        public TimeOnly Departure { get; set; }

        [ForeignKey("Department")]
        public int? DeptId { get; set; }

        // Navigation Properties
        public  virtual Department Department { get; set; }

    }
}
