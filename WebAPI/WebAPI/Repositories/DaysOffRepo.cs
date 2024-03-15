using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
	public class DaysOffRepo : IDaysOffRepo
	{
		private HRDBContext context;

		public DaysOffRepo(HRDBContext context)
        {
            this.context = context;
        }
        public void Add(DaysOff dayOff)
		{
			context.DaysOffs.Add(dayOff);	
		}

		public void Delete(DateOnly day)
		{
			context.Remove(GetByDay(day));
		}

		public List<DaysOff> GetAll()
		{
		return context.DaysOffs.ToList();
		}

		public DaysOff GetByDay(DateOnly day)
		{
			return context.DaysOffs.SingleOrDefault(i => i.Date == day);
		}

		public void Save()
		{
			context.SaveChanges();
		}

		public void Update(DateOnly day, DaysOff dayOff)
		{
			if(GetByDay(day) != null)
			{
              context.DaysOffs.Update(dayOff);
			}
			
		}
	}
}
