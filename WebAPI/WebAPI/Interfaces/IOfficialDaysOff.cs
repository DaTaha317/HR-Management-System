using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IOfficialDaysOff
    {
        public List<OfficialDaysOff> GetAll();
        public OfficialDaysOff GetByDay(DateOnly day);
        public void Add(OfficialDaysOff dayOff);
        public void Update(DateOnly day, OfficialDaysOff dayOff);
        public void Delete(DateOnly day);
        public void Save();
    }
}
