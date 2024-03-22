using WebAPI.DTOs;

namespace WebAPI.Models
{
    public class OrganizationSettings
    {
        public CommissionDTO? CommissionDTO { get; set; }
        public DeductionDTO? DeductionDTO { get; set; }
        public WeeklyDaysDTO? WeeklyDaysDTO { get; set; }
    }
}