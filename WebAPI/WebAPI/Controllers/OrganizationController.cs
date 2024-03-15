using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : ControllerBase
    {
        private IOrganization organization;
        private ICommission commission;
        private IDeduction deduction;

        public OrganizationController(IOrganization organization, ICommission commission, IDeduction deduction)
        {
            this.deduction = deduction;
            this.organization = organization;
            this.commission = commission;
        }


        public ActionResult Update()
        {

        }


    }
}
