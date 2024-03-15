using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IDeduction
    {
        public void Add(DeductionSettings deduction);

        public void Update(DeductionSettings deduction);

        public void Save();
    }
}
