namespace WebAPI.DTOs
{
    public class AttendanceDTO
    {
        public int EmpId { get; set; }
        public DateOnly Day { get; set; }
        public TimeOnly? Arrival { get; set; }
        public TimeOnly? Departure { get; set; }
        public int Status { get; set; }
        public string? DeptName { get; set; }
        public string? EmpName { get; set; }

    }
}
