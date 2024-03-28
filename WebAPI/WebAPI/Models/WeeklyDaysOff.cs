
using WebAPI.Constants;

namespace WebAPI.Models
{
    public class WeeklyDaysOff
    {
        public int Id { get; set; }

        public List<DaysName> Days { get; set; } = new List<DaysName>();

    }
}
