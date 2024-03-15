using WebAPI.Models;

namespace WebAPI.DTOs
{
    public class DeductionDTO
    {
        public Unit type { get; set; }

        public int Hours { get; set; }

        public decimal Amount { get; set; }
    }
}
