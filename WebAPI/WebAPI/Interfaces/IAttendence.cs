using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IAttendence
    {
        public List<Attendence> GetAll();
        public List<Attendence> GetByPeriod(DateOnly startDate, DateOnly endDate);
        public Attendence GetDayByEmpId (int empId, DateOnly day);
        public void Add(Attendence attendence);
        public void Update(int id, Attendence attendence);
        public void Delete(int id);
        public void Save();
    }
}
