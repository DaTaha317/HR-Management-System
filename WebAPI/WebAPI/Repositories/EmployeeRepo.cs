using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class EmployeeRepo : IEmployeeRepo
    {
        private HRDBContext dBContext;
        public EmployeeRepo(HRDBContext dBContext)
        {
            this.dBContext = dBContext;
        }
        public List<Employee> GetAll()
        {
            return dBContext.Employees.ToList();
        }
        public Employee GetById(int id)
        {
            return dBContext.Employees.SingleOrDefault(e => e.Id == id);
        }
        public void Add(Employee employee)
        {
            dBContext.Employees.Add(employee);
        }
        public void Update(int id,Employee employee)
        {
            if (GetById(id) != null)
            {
                dBContext.Employees.Update(employee);
            }
        }
        public void Delete(int id)
        {
            dBContext.Employees.Remove(GetById(id));
        }
        public void Save()
        {
            dBContext.SaveChanges();
        }
    }
}
