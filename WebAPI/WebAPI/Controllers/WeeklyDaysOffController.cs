using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeeklyDaysOffController : ControllerBase
    {
        private IWeeklyDaysOff weeklyDaysOff;
        public WeeklyDaysOffController(IWeeklyDaysOff weeklyDaysOff)
        {
            this.weeklyDaysOff = weeklyDaysOff;
        }

        [HttpPost]
        public ActionResult Update(WeeklyDaysDTO daysOff)
        {
            if(weeklyDaysOff.Get() == null)
            {
                WeeklyDaysOff newDaysOff = new WeeklyDaysOff()
                {
                    Days = daysOff.days
                };

                weeklyDaysOff.Add(newDaysOff);

            }
            else
            {
                WeeklyDaysOff newDaysOff = weeklyDaysOff.Get();
                newDaysOff.Days.Clear();

                foreach(var day in daysOff.days) {
                    newDaysOff.Days.Add(day);
                }

                weeklyDaysOff.Update(newDaysOff);
            }
            weeklyDaysOff.Save();

            return Ok();
        }

        [HttpGet]
        public ActionResult Get()
        {
            if (weeklyDaysOff.Get() == null)
                return NoContent();
            return Ok(weeklyDaysOff.Get());
        }
    }
}
