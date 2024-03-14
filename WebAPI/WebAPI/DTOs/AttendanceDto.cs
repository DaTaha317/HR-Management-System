namespace WebAPI.DTOs
{
    public class AttendanceDto
    {
        public int EmpId { get; set; }
        public DateOnly Day { get; set; }
        public TimeOnly Arrival { get; set; }
        public TimeOnly Departure { get; set; }
    }
}
