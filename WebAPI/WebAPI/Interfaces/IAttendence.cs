using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IAttendence
    {
        public List<Attendence> GetAll();
        public List<Attendence>? GetByPeriod(DateOnly startDate, DateOnly endDate);
        public Attendence? GetDayByEmpId (int empId, DateOnly day);
        public void Add(Attendence attendence);
        public void Update(int empId, DateOnly date, Attendence attendence);
        public void Delete(int empId, DateOnly date);

        public List<Attendence> GetAttendenceByEmpId(int empId);
        public void Save();
    }
}
