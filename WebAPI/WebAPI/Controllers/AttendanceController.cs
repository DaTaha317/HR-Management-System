using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendence _attendence;

        public AttendanceController(IAttendence attendence)
        {
            _attendence = attendence;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Attendence> attendences = _attendence.GetAll();

            if (attendences.Count == 0)
            {
                return NotFound();
            }

            List<AttendanceDto> attendanceDtos = new List<AttendanceDto>();

            foreach (Attendence attendence in attendences)
            {
                AttendanceDto attendanceDto = new AttendanceDto()
                {
                    EmpId = attendence.EmpId,
                    Day = attendence.Day,
                    Arrival = attendence.Arrival,
                    Departure = attendence.Departure
                };

                attendanceDtos.Append(attendanceDto);
            }

            return Ok(attendanceDtos);
        }

        [HttpPost]
        public IActionResult AddAttendance(AttendanceDto attendanceDto)
        {
            if (attendanceDto == null)
            {
                return BadRequest();
            }

            Attendence attendence = new Attendence()
            {
                EmpId = attendanceDto.EmpId,
                Day = attendanceDto.Day,
                Arrival = attendanceDto.Arrival,
                Departure = attendanceDto.Departure,
            };

            _attendence.Add(attendence);
            _attendence.Save();
            return Ok(attendanceDto);
        }

        [HttpGet("GetDay")]
        public IActionResult GetDayByEmpId(int empId, DateOnly day)
        {
            Attendence? attendence = _attendence.GetDayByEmpId(empId, day);
            if (attendence == null)
            {
                return NotFound();
            }
            return Ok(attendence);
        }

        [HttpGet("GetByPeriod")]
        public IActionResult GetByPeriod(DateOnly startDate, DateOnly endDate)
        {
            List<Attendence>? attendences = _attendence.GetByPeriod(startDate, endDate);

            if (attendences == null)
            {
                return NotFound();
            }

            return Ok(attendences);
        }

        [HttpDelete]
        public IActionResult DeleteAttendance(int empId, DateOnly date)
        {

            if (_attendence.GetDayByEmpId(empId, date) == null)
            {
                return BadRequest();
            }

            _attendence.Delete(empId, date);
            _attendence.Save();

            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdateAttendance(int empId, DateOnly date, AttendanceDto attendanceDto)
        {
            if(attendanceDto == null)
            {
                return BadRequest();
            }

            if (_attendence.GetDayByEmpId(empId, date) == null)
            {
                return BadRequest();
            }

            Attendence attendence = new Attendence()
            {
                EmpId = attendanceDto.EmpId,
                Day = attendanceDto.Day,
                Arrival = attendanceDto.Arrival,
                Departure = attendanceDto.Departure,
            };

            _attendence.Update(empId, date, attendence);
            _attendence.Save();

            return NoContent();
        }


    }
}
