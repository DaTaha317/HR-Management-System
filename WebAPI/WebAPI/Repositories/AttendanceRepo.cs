using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class AttendanceRepo : IAttendence
    {
        private readonly HRDBContext dBContext;

        public AttendanceRepo(HRDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public void Add(Attendence attendence)
        {
            dBContext.Attendences.Add(attendence);
        }

        public void Delete(int empId, DateOnly date)
        {
            Attendence attendence = dBContext.Attendences.First(a => a.EmpId == empId && a.Day == date);

            dBContext.Attendences.Remove(attendence);
        }

        public List<Attendence> GetAll()
        {
            return dBContext.Attendences.ToList();
        }

        public List<Attendence>? GetByPeriod(DateOnly startDate, DateOnly endDate)
        {
            List<Attendence>? attendences = dBContext.Attendences.Where(a => a.Day >= startDate && a.Day <= endDate).ToList();
            return attendences;
        }

        public Attendence? GetDayByEmpId(int empId, DateOnly day)
        {
            return dBContext.Attendences.FirstOrDefault(a => a.EmpId == empId && a.Day == day);
        }

        public void Save()
        {
            dBContext.SaveChanges();
        }

        public void Update(int empId, DateOnly date, Attendence attendence)
        {
            if (GetDayByEmpId(empId,date) != null)
            {
                dBContext.Attendences.Update(attendence);
            }
        }
    }
}
