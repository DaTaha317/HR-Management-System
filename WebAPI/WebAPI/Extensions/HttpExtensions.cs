using System.Text.Json;
using WebAPI.Helpers;

namespace WebAPI.Extensions
{
    public static class HttpExtensions
    {
        // this method is for adding pagination header to the request
        public static void AddPaginationHeader(this HttpResponse response, PaginationHeader header)
        {
            var jsonOptions =
                            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            // this is to converting header to json object
            response.Headers.Append("Pagination", JsonSerializer.Serialize(header, jsonOptions));

            // this is to convert the header to be accessible for client side
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
    }
}