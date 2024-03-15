using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class OrganizationSettings
    {
        public int Id { get; set; }

        [ForeignKey("Commission")]
        public int CommissionId { get; set; }

        public virtual CommissionSettings Commission { get; set; }

        [ForeignKey("Deduction")]
        public int DeductionId { get; set; }

        public virtual DeductionSettings Deduction { get; set; }


    }
}
