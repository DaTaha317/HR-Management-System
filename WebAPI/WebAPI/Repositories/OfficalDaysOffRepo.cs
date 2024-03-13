using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
	public class OfficalDaysOffRepo : IOfficialDaysOff
	{
		private HRDBContext OfficalDaysOffContext;

		public OfficalDaysOffRepo(HRDBContext OfficalDaysOffContext)
        {
            this.OfficalDaysOffContext = OfficalDaysOffContext;
        }
        public void Add(OfficialDaysOff dayOff)
		{
			OfficalDaysOffContext.OfficialDaysOffs.Add(dayOff);
			


		}

		public void Delete(DateOnly day)
		{
			OfficalDaysOffContext.Remove(GetByDay(day));
		}

		public List<OfficialDaysOff> GetAll()
		{
		return OfficalDaysOffContext.OfficialDaysOffs.ToList();
		}

		public OfficialDaysOff GetByDay(DateOnly day)
		{
			return OfficalDaysOffContext.OfficialDaysOffs.SingleOrDefault(i => i.Date == day);
		}

		public void Save()
		{
			OfficalDaysOffContext.SaveChanges();
		}

		public void Update(DateOnly day, OfficialDaysOff dayOff)
		{
			if(GetByDay(day) != null)
			{
              OfficalDaysOffContext.OfficialDaysOffs.Update(dayOff);
			}
			
		}
	}
}
