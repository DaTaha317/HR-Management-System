using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface ICommission
    {
        public void Add(CommissionSettings commission);

        public void Update(CommissionSettings commission);

        public CommissionSettings? Get();

        public void Save();
    }
}