using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class DeductionRepo : IDeduction
    {
        private HRDBContext context;
        public DeductionRepo(HRDBContext context)
        {
            this.context = context;
        }
        public void Add(DeductionSettings deduction)
        {
            context.DeductionSettings.Add(deduction);
        }

        public DeductionSettings? Get()
        {
            return context.DeductionSettings.FirstOrDefault();
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public void Update(DeductionSettings deduction)
        {
            context.DeductionSettings.Update(deduction);
        }
    }
}