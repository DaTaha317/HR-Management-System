using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
	public class OfficalDaysOffRepo : IDaysOff
	{
		private HRDBContext context;

		public OfficalDaysOffRepo(HRDBContext context)
        {
            this.context = context;
        }
        public void Add(DaysOff dayOff)
		{
			context.OfficialDaysOffs.Add(dayOff);
			


		}

		public void Delete(DateOnly day)
		{
			context.Remove(GetByDay(day));
		}

		public List<DaysOff> GetAll()
		{
		return context.OfficialDaysOffs.ToList();
		}

		public DaysOff GetByDay(DateOnly day)
		{
			return context.OfficialDaysOffs.SingleOrDefault(i => i.Date == day);
		}

		public void Save()
		{
			context.SaveChanges();
		}

		public void Update(DateOnly day, DaysOff dayOff)
		{
			if(GetByDay(day) != null)
			{
              context.OfficialDaysOffs.Update(dayOff);
			}
			
		}
	}
}
