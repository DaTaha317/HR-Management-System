using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IEmployeeRepo
    {
        public List<Employee> GetAll();
        public Employee GetById(int id);
        public void Add(Employee employee);
        public void Update(int id, Employee employee);
        public void Delete(int id);
        public void Save();
    }
}
