using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
	public class OfficalDaysOffRepo : IOfficialDaysOff
	{
		private HRDBContext context;

		public OfficalDaysOffRepo(HRDBContext context)
        {
            this.context = context;
        }
        public void Add(OfficialDaysOff dayOff)
		{
			context.OfficialDaysOffs.Add(dayOff);
			


		}

		public void Delete(DateOnly day)
		{
			context.Remove(GetByDay(day));
		}

		public List<OfficialDaysOff> GetAll()
		{
		return context.OfficialDaysOffs.ToList();
		}

		public OfficialDaysOff GetByDay(DateOnly day)
		{
			return context.OfficialDaysOffs.SingleOrDefault(i => i.Date == day);
		}

		public void Save()
		{
			context.SaveChanges();
		}

		public void Update(DateOnly day, OfficialDaysOff dayOff)
		{
			if(GetByDay(day) != null)
			{
              context.OfficialDaysOffs.Update(dayOff);
			}
			
		}
	}
}
