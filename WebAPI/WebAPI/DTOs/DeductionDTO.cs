using WebAPI.Models;

namespace WebAPI.DTOs
{
    public class DeductionDTO
    {
        public int type { get; set; }

        public int Hours { get; set; }

        public decimal Amount { get; set; }
    }
}