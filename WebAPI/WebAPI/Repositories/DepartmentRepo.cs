using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class DepartmentRepo : IDepartment
    {
        private HRDBContext dBContext;

        public DepartmentRepo(HRDBContext dBContext)
        {
            this.dBContext = dBContext;
        }
        public List<Department> GetAll()
        {
            return dBContext.Departments.ToList();
        }
    }
}
