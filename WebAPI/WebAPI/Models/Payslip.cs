namespace WebAPI.Models
{
    public class Payslip
    {
        public string FullName { get; set; }
        public string DepartmentName { get; set; }
        public decimal BaseSalary { get; set; }
        public int AttendanceDays { get; set; }
        public int AbsenceDays { get; set; }
        public int OvertimeHours { get; set; }
        public int LatenessHours { get; set; }
        public decimal TotalAdditional { get; set; }
        public decimal TotalDeduction { get; set; }
        public decimal NetSalary { get; set; }
    }
}
