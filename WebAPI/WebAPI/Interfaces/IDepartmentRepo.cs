using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IDepartmentRepo
    {
        public List<Department> GetAll();
    }
}
