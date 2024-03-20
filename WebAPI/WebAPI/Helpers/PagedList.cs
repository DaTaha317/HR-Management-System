using Microsoft.EntityFrameworkCore;

namespace WebAPI.Helpers
{
    // <T> to make it work with any object (generic)
    // inherit from List to make it return a list
    public class PagedList<T> : List<T>
    {

        // item = all list of database
        // count = number of all items in database
        // pageNumber = 1
        // pageSize = 3
        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            this.CurrentPage = pageNumber;
            this.PageSize = pageSize;
            this.TotalCount = count; // totalCount is for number of all items in database
            this.TotalPages = (int)Math.Ceiling(count / (double)pageSize); // all pages of pagination
            AddRange(items);
        }

        public int CurrentPage { get; set; } // pageNumber = 1
        public int TotalPages { get; set; } // total pages of pagination
        public int PageSize { get; set; } // page size = item per page
        public int TotalCount { get; set; } // is for number of all items in database


        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {

            var count = await source.CountAsync(); // count all items of items in db

            // items to show for user
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PagedList<T>(items, count, pageNumber, pageSize);

        }

    }
}