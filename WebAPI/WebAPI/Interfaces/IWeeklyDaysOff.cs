using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IWeeklyDaysOff
    {
        public void Add(WeeklyDaysOff daysOff);
        public void Update(WeeklyDaysOff daysOff);

        public WeeklyDaysOff? Get();
        public void Save();
    }
}
