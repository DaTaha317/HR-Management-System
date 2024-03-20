namespace WebAPI.Helpers
{
    public class PaginationHeader
    {

        public PaginationHeader(int currentPage, int totalPages, int itemsPerPage, int totalItems)
        {
            this.CurrentPage = currentPage;
            this.TotalPages = totalPages;
            this.ItemsPerPage = itemsPerPage;
            this.TotalItems = totalItems;

        }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
    }
}