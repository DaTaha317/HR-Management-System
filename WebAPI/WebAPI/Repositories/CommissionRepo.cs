using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class CommissionRepo : ICommission
    {
        private HRDBContext context;

        public CommissionRepo(HRDBContext context)
        {
            this.context = context;
        }
        public void Add(CommissionSettings commission)
        {
            context.CommissionSettings.Add(commission);
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public void Update(CommissionSettings commission)
        {
            context.CommissionSettings.Update(commission);
        }
    }
}
