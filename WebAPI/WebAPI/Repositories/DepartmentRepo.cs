using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class DepartmentRepo : IDepartmentRepo
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
        public Department GetByName(string name)
        {
            return dBContext.Departments.SingleOrDefault(d => d.Name == name);
        }
    }
}
