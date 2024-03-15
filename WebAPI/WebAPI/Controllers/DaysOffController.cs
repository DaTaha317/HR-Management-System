using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DaysOffController : ControllerBase
    {
        private IDaysOffRepo daysOffRepo;

        public DaysOffController(IDaysOffRepo daysOffRepo)
        {
            this.daysOffRepo = daysOffRepo;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            List<DaysOff> daysOff = daysOffRepo.GetAll();
            if (daysOff.Count == 0)
            {
                return NotFound();
            }

            List<DaysOffDTO> daysOffDTOs = new List<DaysOffDTO>();

            foreach (var day in daysOff)
            {
                DaysOffDTO dayDTO = new DaysOffDTO()
                {
                    Date = day.Date,
                    Name = day.Name,
                };
                daysOffDTOs.Add(dayDTO);
            }

            return Ok(daysOffDTOs);
        }

        [HttpGet("{day}")]
        public IActionResult GetByDay(DateOnly day)
        {
            DaysOff dayOff = daysOffRepo.GetByDay(day);
            if (dayOff == null)
            {
                return NotFound();
            }

            DaysOffDTO dayDTO = new DaysOffDTO
            {
                Date = dayOff.Date,
                Name = dayOff.Name,
            };

            return Ok(dayDTO);
        }

        [HttpPost]
        public IActionResult Create([FromBody] DaysOffDTO daysOffDTO)
        {
            DaysOff newDayOff = new DaysOff
            {
                Date = daysOffDTO.Date,
                Name = daysOffDTO.Name,
            };

            daysOffRepo.Add(newDayOff);
            daysOffRepo.Save();

            return CreatedAtAction(nameof(GetByDay), new { day = newDayOff.Date }, daysOffDTO);
        }

        [HttpPut("{day}")]
        public IActionResult Update(DateOnly day, [FromBody] DaysOffDTO daysOffDTO)
        {
            var existingDayOff = daysOffRepo.GetByDay(day);
            if (existingDayOff == null)
            {
                return NotFound();
            }

            existingDayOff.Name = daysOffDTO.Name;

            daysOffRepo.Update(day, existingDayOff);
            daysOffRepo.Save();

            return NoContent();
        }

        [HttpDelete("{day}")]
        public IActionResult Delete(DateOnly day)
        {
            var dayOff = daysOffRepo.GetByDay(day);
            if (dayOff == null)
            {
                return NotFound();
            }

            daysOffRepo.Delete(day);
            daysOffRepo.Save();

            return NoContent();
        }
    }
}
