using AutoMapper;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Attendence, AttendanceDTO>().ForMember(
                dist => dist.EmpName,
                opt => opt.MapFrom(
                    src => src.Employee.FullName
                )
            ).ForMember(
                dist => dist.DeptName,
                opt => opt.MapFrom(
                    src => src.Employee.Department.Name
                )
            );
        }
    }
}