using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Attendence
    {
        [ForeignKey("Employee")]
        public int EmpId { get; set; }
        public DateOnly Day { get; set; }
        public TimeOnly Arrival { get; set; }
        public TimeOnly Departure { get; set; }

        // Navigation Properties
        public virtual Employee Employee { get; set; }

    }
}
