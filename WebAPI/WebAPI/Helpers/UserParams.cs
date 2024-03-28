namespace WebAPI.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int _pageSize { get; set; } = 5;
        public int PageNumber { get; set; } = 1;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = value > MaxPageSize ? MaxPageSize : value;
            }
        }

        // filters for startDate and endDate (default)
        public DateOnly startDate { get; set; } = new DateOnly(2008, 1, 1); // default start date
        public DateOnly endDate { get; set; } = DateOnly.FromDateTime(DateTime.Now); // default end date
        public string stringQuery { get; set; } = ""; // 

    }
}