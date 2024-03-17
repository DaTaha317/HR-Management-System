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

        private ICommission commissionRepo;
        private IDeduction deductionRepo;
        private IWeeklyDaysOff weeklyDaysOffRepo;

        public OrganizationController(ICommission commissionRepo, IDeduction deductionRepo, IWeeklyDaysOff weeklyDaysOffRepo)
        {
            this.deductionRepo = deductionRepo;
            this.commissionRepo = commissionRepo;
            this.weeklyDaysOffRepo = weeklyDaysOffRepo;
        }


        [HttpPost]
        public ActionResult Update([FromBody] OrganizationSettings organization)
        {
            CommissionDTO commissionDTO = organization.CommissionDTO;
            DeductionDTO deductionDTO = organization.DeductionDTO;
            WeeklyDaysDTO weeklyDaysDTO = organization.WeeklyDaysDTO;

            // check if there exist one record
            //OrganizationSettings? organization = organizationRepo.Get();
            CommissionSettings oldCommision = commissionRepo.Get();
            DeductionSettings oldDeduction = deductionRepo.Get();
            WeeklyDaysOff oldDaysOff = weeklyDaysOffRepo.Get();

            if (oldCommision == null )
            {
                // Setting data
                CommissionSettings commission = new CommissionSettings()
                {
                    type = (Unit)commissionDTO.type,
                    Hours = commissionDTO.Hours,
                    Amount = commissionDTO.Amount
                };

                DeductionSettings deduction = new DeductionSettings()
                {
                    type = (Unit)deductionDTO.type,
                    Hours = deductionDTO.Hours,
                    Amount = deductionDTO.Amount
                };

                WeeklyDaysOff newDaysOff = new WeeklyDaysOff();
                foreach(var day in organization.WeeklyDaysDTO.days)
                {
                    newDaysOff.Days.Add((DaysName)day);
                }
                commissionRepo.Add(commission);
                commissionRepo.Save();

                deductionRepo.Add(deduction);
                deductionRepo.Save();
                weeklyDaysOffRepo.Add(newDaysOff);
                weeklyDaysOffRepo.Save();

            }

            // updating only when not null
            oldCommision.type = (Unit)commissionDTO.type;
            oldCommision.Hours = commissionDTO.Hours;
            oldCommision.Amount = commissionDTO.Amount;


            oldDeduction.type = (Unit)deductionDTO.type;
            oldDeduction.Hours = deductionDTO.Hours;
            oldDeduction.Amount = deductionDTO.Amount;

            oldDaysOff.Days.Clear();
            foreach(var day in organization.WeeklyDaysDTO.days)
            {
                oldDaysOff.Days.Add((DaysName)day);
            }
            commissionRepo.Update(oldCommision);
            commissionRepo.Save();
            deductionRepo.Update(oldDeduction);
            deductionRepo.Save();
            weeklyDaysOffRepo.Update(oldDaysOff);
            weeklyDaysOffRepo.Save();

            return CreatedAtAction("Get", organization);

        }


        [HttpGet]
        public ActionResult Get()
        {
            if (commissionRepo.Get() == null)
            {
                return NoContent();
            }

            CommissionSettings commission = commissionRepo.Get();
            DeductionSettings deduction = deductionRepo.Get();
            WeeklyDaysOff weeklyDays = weeklyDaysOffRepo.Get();

            WeeklyDaysDTO weeklyDaysDTO = new WeeklyDaysDTO();
            weeklyDaysDTO.days = new List<int>();
            foreach(var day in  weeklyDays.Days)
            {
                weeklyDaysDTO.days.Add((int)day);
            }
            OrganizationSettings organization = new OrganizationSettings()
            {
                CommissionDTO = new CommissionDTO()
                {
                    type = (int)commission.type,
                    Hours = commission.Hours,
                    Amount = commission.Amount
                },
                DeductionDTO = new DeductionDTO()
                {
                    type = (int)deduction.type,
                    Hours = deduction.Hours,
                    Amount = deduction.Amount
                },
                WeeklyDaysDTO = new WeeklyDaysDTO()
                {
                    days = weeklyDaysDTO.days
                } 
            };

            return Ok(organization);
        }


    }




 
}