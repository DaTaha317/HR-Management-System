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

        //#region oldhttpost
        //[HttpPost]
        //public ActionResult Update([FromBody] OrganizationSettings organization)
        //{
        //    CommissionDTO commissionDTO = organization.CommissionDTO;
        //    DeductionDTO deductionDTO = organization.DeductionDTO;
        //    WeeklyDaysDTO weeklyDaysDTO = organization.WeeklyDaysDTO;

        //    // check if there exist one record
        //    //OrganizationSettings? organization = organizationRepo.Get();
        //    CommissionSettings oldCommision = commissionRepo.Get();
        //    DeductionSettings oldDeduction = deductionRepo.Get();
        //    WeeklyDaysOff oldDaysOff = weeklyDaysOffRepo.Get();

        //    if (oldCommision == null )
        //    {
        //        // Setting data
        //        CommissionSettings commission = new CommissionSettings()
        //        {
        //            type = (Unit)commissionDTO.type,
        //            Hours = commissionDTO.Hours,
        //            Amount = commissionDTO.Amount
        //        };

        //        DeductionSettings deduction = new DeductionSettings()
        //        {
        //            type = (Unit)deductionDTO.type,
        //            Hours = deductionDTO.Hours,
        //            Amount = deductionDTO.Amount
        //        };

        //        WeeklyDaysOff newDaysOff = new WeeklyDaysOff();
        //        foreach(var day in weeklyDaysDTO.days)
        //        {
        //            newDaysOff.Days.Add((DaysName)day);
        //        }
        //        commissionRepo.Add(commission);
        //        commissionRepo.Save();

        //        deductionRepo.Add(deduction);
        //        deductionRepo.Save();
        //        weeklyDaysOffRepo.Add(newDaysOff);
        //        weeklyDaysOffRepo.Save();

        //    }

        //    // updating only when not null
        //    oldCommision.type = (Unit)commissionDTO.type;
        //    oldCommision.Hours = commissionDTO.Hours;
        //    oldCommision.Amount = commissionDTO.Amount;


        //    oldDeduction.type = (Unit)deductionDTO.type;
        //    oldDeduction.Hours = deductionDTO.Hours;
        //    oldDeduction.Amount = deductionDTO.Amount;

        //    oldDaysOff.Days.Clear();
        //    foreach(var day in organization.WeeklyDaysDTO.days)
        //    {
        //        oldDaysOff.Days.Add((DaysName)day);
        //    }
        //    commissionRepo.Update(oldCommision);
        //    commissionRepo.Save();
        //    deductionRepo.Update(oldDeduction);
        //    deductionRepo.Save();
        //    weeklyDaysOffRepo.Update(oldDaysOff);
        //    weeklyDaysOffRepo.Save();

        //    return CreatedAtAction("Get", organization);
        //}
        //#endregion

        [HttpPost]
        public ActionResult Update([FromBody] OrganizationSettings organization)
        {
            CommissionDTO commissionDTO = organization.CommissionDTO;
            DeductionDTO deductionDTO = organization.DeductionDTO;
            WeeklyDaysDTO weeklyDaysDTO = organization.WeeklyDaysDTO;

            CommissionSettings oldCommision = commissionRepo.Get();
            DeductionSettings oldDeduction = deductionRepo.Get();
            WeeklyDaysOff oldDaysOff = weeklyDaysOffRepo.Get();

            // Check if all commission, deduction, and weeklyDaysDTO are null
            if (oldCommision == null && oldDeduction == null && oldDaysOff == null)
            {
                // Create new values for all three
                CommissionSettings commission = new CommissionSettings()
                {
                    type = (Unit)commissionDTO.type,
                    Hours = commissionDTO.Hours,
                    Amount = commissionDTO.Amount
                };
                commissionRepo.Add(commission);
                commissionRepo.Save();

                DeductionSettings deduction = new DeductionSettings()
                {
                    type = (Unit)deductionDTO.type,
                    Hours = deductionDTO.Hours,
                    Amount = deductionDTO.Amount
                };
                deductionRepo.Add(deduction);
                deductionRepo.Save();

                WeeklyDaysOff newDaysOff = new WeeklyDaysOff();
                foreach (var day in weeklyDaysDTO.days)
                {
                    newDaysOff.Days.Add((DaysName)day);
                }
                weeklyDaysOffRepo.Add(newDaysOff);
                weeklyDaysOffRepo.Save();
            }
            else
            {
                // Handle cases where one or more values are already present
                if (oldCommision == null)
                {
                    // Create new commission
                    CommissionSettings commission = new CommissionSettings()
                    {
                        type = (Unit)commissionDTO.type,
                        Hours = commissionDTO.Hours,
                        Amount = commissionDTO.Amount
                    };
                    commissionRepo.Add(commission);
                    commissionRepo.Save();
                }
                else
                {
                    // Update existing commission
                    oldCommision.type = (Unit)commissionDTO.type;
                    oldCommision.Hours = commissionDTO.Hours;
                    oldCommision.Amount = commissionDTO.Amount;
                    commissionRepo.Update(oldCommision);
                    commissionRepo.Save();
                }

                if (oldDeduction == null)
                {
                    // Create new deduction
                    DeductionSettings deduction = new DeductionSettings()
                    {
                        type = (Unit)deductionDTO.type,
                        Hours = deductionDTO.Hours,
                        Amount = deductionDTO.Amount
                    };
                    deductionRepo.Add(deduction);
                    deductionRepo.Save();
                }
                else
                {
                    // Update existing deduction
                    oldDeduction.type = (Unit)deductionDTO.type;
                    oldDeduction.Hours = deductionDTO.Hours;
                    oldDeduction.Amount = deductionDTO.Amount;
                    deductionRepo.Update(oldDeduction);
                    deductionRepo.Save();
                }

                if (oldDaysOff == null && weeklyDaysDTO != null)
                {
                    // Create new weekly days off
                    WeeklyDaysOff newDaysOff = new WeeklyDaysOff();
                    foreach (var day in weeklyDaysDTO.days)
                    {
                        newDaysOff.Days.Add((DaysName)day);
                    }
                    weeklyDaysOffRepo.Add(newDaysOff);
                    weeklyDaysOffRepo.Save();
                }
                else if (oldDaysOff != null && weeklyDaysDTO != null)
                {
                    // Update existing weekly days off
                    oldDaysOff.Days.Clear();
                    foreach (var day in weeklyDaysDTO.days)
                    {
                        oldDaysOff.Days.Add((DaysName)day);
                    }
                    weeklyDaysOffRepo.Update(oldDaysOff);
                    weeklyDaysOffRepo.Save();
                }
            }

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