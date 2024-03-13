namespace WebAPI.Models
{
    public class Department
    {
        public int Id { get; set; }

        public string Name { get; set; }

        // Navigation Properties
        public virtual List<Employee> Employees { get; set; }
    }
}
