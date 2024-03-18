using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendenceController : ControllerBase
    {
        private IAttendence attendenceRepo;
        private IEmployeeRepo employeeRepo;

        public AttendenceController(IAttendence attendenceRepo, IEmployeeRepo employeeRepo)
        {
            this.attendenceRepo = attendenceRepo;
            this.employeeRepo = employeeRepo;
        }


        [HttpGet]
        public ActionResult GetAll()
        {
            List<Attendence> attendences = attendenceRepo.GetAll();
            List<AttendanceDTO> attendanceDTOs = new List<AttendanceDTO>();
            if(attendences.Count == 0)
            {
                return NotFound("Attendence list is empty");
            }
            foreach(var attendence in attendences)
            {
                AttendanceDTO attendanceDTO = new AttendanceDTO()
                {
                    EmpId = attendence.EmpId,
                    Day = attendence.Day,
                    Arrival = attendence.Arrival,
                    Departure = attendence.Departure,
                    EmpName = attendence.Employee.FullName,
                    DeptName = attendence.Employee.Department.Name,
                    Status = (int)attendence.Status
                };

                attendanceDTOs.Add(attendanceDTO);
            }

            return Ok(attendanceDTOs);
        }

        [HttpPost]
        public ActionResult Add(AttendanceDTO attendanceDTO)
        {
            int employeeDepartureHour = employeeRepo.GetById(attendanceDTO.EmpId).Departure.Hour;
            int employeeArrivalHour = employeeRepo.GetById(attendanceDTO.EmpId).Arrival.Hour;

            if(attendanceDTO.Status == 0)
            {
                Attendence attendence = new Attendence()
                {
                    EmpId = attendanceDTO.EmpId,
                    Day = attendanceDTO.Day,
                    Status = (AttendenceStatus)attendanceDTO.Status,
                    Arrival = attendanceDTO.Arrival,
                    Departure = attendanceDTO.Departure,
                    OvertimeInHours = attendanceDTO.Departure?.Hour - employeeDepartureHour,
                    LatetimeInHours = employeeArrivalHour - attendanceDTO.Arrival?.Hour
                };
                attendenceRepo.Add(attendence);
            }
            else
            {
                Attendence attendence = new Attendence()
                {
                    EmpId = attendanceDTO.EmpId,
                    Day = attendanceDTO.Day,
                    Status = (AttendenceStatus)attendanceDTO.Status
                };
                attendenceRepo.Add(attendence);
            }
            attendenceRepo.Save();

            return Ok();
        }

    }
}
