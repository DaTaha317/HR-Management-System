using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class AttendanceRepo : IAttendence
    {
        private readonly HRDBContext context;

        public AttendanceRepo(HRDBContext context)
        {
            this.context = context;
        }

        public void Add(Attendence attendence)
        {
            context.Attendences.Add(attendence);
        }

        public void Delete(int empId, DateOnly date)
        {
            Attendence attendence = context.Attendences.First(a => a.EmpId == empId && a.Day == date);

            context.Attendences.Remove(attendence);
        }

        public List<Attendence> GetAll()
        {
            return context.Attendences.ToList();
        }

        public List<Attendence> GetAttendenceByEmpId(int empId)
        {
            return context.Attendences.Where(a=> a.EmpId == empId).ToList();
        }

        public List<Attendence>? GetByPeriod(DateOnly startDate, DateOnly endDate)
        {
            List<Attendence>? attendences = context.Attendences.Where(a => a.Day >= startDate && a.Day <= endDate).ToList();
            return attendences;
        }

        public Attendence? GetDayByEmpId(int empId, DateOnly day)
        {
            return context.Attendences.FirstOrDefault(a => a.EmpId == empId && a.Day == day);
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public void Update(int empId, DateOnly date, Attendence attendence)
        {
            if (GetDayByEmpId(empId,date) != null)
            {
                context.Attendences.Update(attendence);
            }
        }
    }
}
