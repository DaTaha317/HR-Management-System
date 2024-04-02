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

            CreateMap<AttendanceDTO, Attendence>();
            CreateMap<CommissionSettings, CommissionDTO>();
            CreateMap<DeductionSettings, DeductionDTO>();
            CreateMap<WeeklyDaysOff, WeeklyDaysDTO>();
            CreateMap<CommissionDTO, CommissionSettings>();
            CreateMap<DeductionDTO, DeductionSettings>();
            CreateMap<WeeklyDaysDTO, WeeklyDaysOff>();
            CreateMap<DaysOff, DaysOffDTO>();
            CreateMap<DaysOffDTO, DaysOff>();
            CreateMap<Department, DepartmentDTO>();
            CreateMap<DepartmentDTO, Department>();

            CreateMap<Employee, EmployeeDTO>().ForMember(
                dist => dist.departmentName,
                opt => opt.MapFrom(
                    src => src.Department.Name
                )
            );
            CreateMap<EmployeeDTO, Employee>();

        }
    }
}