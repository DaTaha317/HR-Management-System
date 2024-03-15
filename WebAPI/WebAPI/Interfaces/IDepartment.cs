using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IDepartment
    {
        public List<Department> GetAll();
    }
}
