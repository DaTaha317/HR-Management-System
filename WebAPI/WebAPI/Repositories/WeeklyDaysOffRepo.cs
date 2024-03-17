using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class WeeklyDaysOffRepo : IWeeklyDaysOff
    {
        HRDBContext context;
        public WeeklyDaysOffRepo(HRDBContext context)
        {
            this.context = context;
        }
        public void Add(WeeklyDaysOff daysOff)
        {
            context.WeeklyDaysOffs.Add(daysOff);
        }

        public void Update(WeeklyDaysOff daysOff)
        {
            context.WeeklyDaysOffs.Update(daysOff);
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public WeeklyDaysOff? Get()
        {
            return context.WeeklyDaysOffs.FirstOrDefault();
        }
    }
}
