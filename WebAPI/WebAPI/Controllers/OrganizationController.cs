using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Constants;
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
        private IMapper mapper;

        public OrganizationController(ICommission commissionRepo, IDeduction deductionRepo, IWeeklyDaysOff weeklyDaysOffRepo, IMapper mapper)
        {
            this.deductionRepo = deductionRepo;
            this.commissionRepo = commissionRepo;
            this.weeklyDaysOffRepo = weeklyDaysOffRepo;
            this.mapper = mapper;
        }
        [Authorize(Permissions.Settings.create)]
        [HttpPost]
        public ActionResult Update([FromBody] OrganizationSettings organization)
        {
            CommissionDTO commissionDTO = organization.CommissionDTO;
            DeductionDTO deductionDTO = organization.DeductionDTO;
            WeeklyDaysDTO weeklyDaysDTO = organization.WeeklyDaysDTO;

            if (commissionDTO.Amount < 0 || commissionDTO.Hours < 0)
                return BadRequest("Commission data has nagetive numbers");

            if (deductionDTO.Amount < 0 || deductionDTO.Hours < 0)
                return BadRequest("Deduction data has negative numbers");

            foreach (int day in weeklyDaysDTO.days)
                if (day < 0 || day > 6)
                    return BadRequest("Bad day number");


            CommissionSettings oldCommission = commissionRepo.Get();
            DeductionSettings oldDeduction = deductionRepo.Get();
            WeeklyDaysOff oldDaysOff = weeklyDaysOffRepo.Get();

            // Map DTOs to domain entities
            CommissionSettings commission = mapper.Map<CommissionSettings>(commissionDTO);
            DeductionSettings deduction = mapper.Map<DeductionSettings>(deductionDTO);
            WeeklyDaysOff newDaysOff = mapper.Map<WeeklyDaysOff>(weeklyDaysDTO);

            if (oldCommission == null && oldDeduction == null && oldDaysOff == null)
            {
                // Add new records
                commissionRepo.Add(commission);
                deductionRepo.Add(deduction);
                weeklyDaysOffRepo.Add(newDaysOff);
            }
            else
            {
                if (oldCommission != null)
                {
                    // Update commission settings
                    oldCommission.type = (Unit)commissionDTO.type;
                    oldCommission.Hours = commissionDTO.Hours;
                    oldCommission.Amount = commissionDTO.Amount;
                    commissionRepo.Update(oldCommission);
                }
                else
                {
                    commissionRepo.Add(commission);
                }

                if (oldDeduction != null)
                {
                    // Update deduction settings
                    oldDeduction.type = (Unit)deductionDTO.type;
                    oldDeduction.Hours = deductionDTO.Hours;
                    oldDeduction.Amount = deductionDTO.Amount;
                    deductionRepo.Update(oldDeduction);
                }
                else
                {
                    deductionRepo.Add(deduction);
                }

                if (oldDaysOff != null)
                {
                    // Update weekly days off
                    oldDaysOff.Days.Clear();
                    foreach (var day in weeklyDaysDTO.days)
                    {
                        oldDaysOff.Days.Add((DaysName)day);
                    }
                    weeklyDaysOffRepo.Update(oldDaysOff);
                }
                else
                {
                    weeklyDaysOffRepo.Add(newDaysOff);
                }
            }

            // Save changes
            commissionRepo.Save();
            deductionRepo.Save();
            weeklyDaysOffRepo.Save();

            return CreatedAtAction("Get", organization);
        }


        [Authorize(Permissions.Settings.view)]
        [HttpGet]
        public ActionResult Get()
        {

            CommissionSettings commission = commissionRepo.Get();
            DeductionSettings deduction = deductionRepo.Get();
            WeeklyDaysOff weeklyDays = weeklyDaysOffRepo.Get();

            OrganizationSettings organization = new OrganizationSettings()
            {
                CommissionDTO = mapper.Map<CommissionDTO>(commission),
                DeductionDTO = mapper.Map<DeductionDTO>(deduction),
                WeeklyDaysDTO = mapper.Map<WeeklyDaysDTO>(weeklyDays)
            };

            return Ok(organization);
        }


    }




 
}