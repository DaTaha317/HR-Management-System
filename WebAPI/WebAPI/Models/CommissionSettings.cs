using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Constants;

namespace WebAPI.Models
{
    public class CommissionSettings
    {
        public int Id { get; set; }
        public Unit type { get; set; }
        public int Hours { get; set; }
        [Column(TypeName = "money")]
        public decimal Amount { get; set; }
    }
}