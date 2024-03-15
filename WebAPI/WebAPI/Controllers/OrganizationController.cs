using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : ControllerBase
    {
        private IOrganization organizationRepo;
        private ICommission commissionRepo;
        private IDeduction deductionRepo;

        public OrganizationController(IOrganization organizationRepo, ICommission commissionRepo, IDeduction deductionRepo)
        {
            this.deductionRepo = deductionRepo;
            this.organizationRepo = organizationRepo;
            this.commissionRepo = commissionRepo;
        }


        [HttpPost]
        public ActionResult Update(SettingsRequest settingsRequest)
        {
            CommissionDTO commissionDTO = settingsRequest.CommissionDTO;
            DeductionDTO deductionDTO = settingsRequest.DeductionDTO;


            // check if there exist one record
            OrganizationSettings? organization = organizationRepo.Get();

            if (organization == null)
            {
                // Setting data
                CommissionSettings commission = new CommissionSettings()
                {
                    type = commissionDTO.type,
                    Hours = commissionDTO.Hours,
                    Amount = commissionDTO.Amount
                };
                commissionRepo.Add(commission);
                commissionRepo.Save();

                DeductionSettings deduction = new DeductionSettings()
                {
                    type = deductionDTO.type,
                    Hours = deductionDTO.Hours,
                    Amount = deductionDTO.Amount
                };
                deductionRepo.Add(deduction);
                deductionRepo.Save();

                // adding one record when null
                organization = new OrganizationSettings()
                {
                    CommissionId = commission.Id,
                    DeductionId = deduction.Id
                };

                organizationRepo.Add(organization);
                organizationRepo.Save();

                return Ok();
            }

            // updating only when not null
            CommissionSettings oldCommision = commissionRepo.Get();
            oldCommision.type = commissionDTO.type;
            oldCommision.Hours = commissionDTO.Hours;
            oldCommision.Amount = commissionDTO.Amount;
            commissionRepo.Update(oldCommision);
            commissionRepo.Save();


            DeductionSettings oldDeduction = deductionRepo.Get();
            oldDeduction.type = deductionDTO.type;
            oldDeduction.Hours = deductionDTO.Hours;
            oldDeduction.Amount = deductionDTO.Amount;
            deductionRepo.Update(oldDeduction);
            deductionRepo.Save();

            return Ok();

        }


    }

    // client should send request like this
    //  {
    //  "CommissionDTO": {
    //    "type": "commissionType",
    //    "Hours": 10,
    //    "Amount": 100
    //  },
    //  "DeductionDTO": {
    //    "type": "deductionType",
    //    "Hours": 5,
    //    "Amount": 50
    //  }
    //}

    public class SettingsRequest
    {
        public CommissionDTO CommissionDTO { get; set; }
        public DeductionDTO DeductionDTO { get; set; }
    }
}