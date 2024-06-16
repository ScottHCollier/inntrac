using System.Text.Json;
using API.Helpers;
using API.Helpers.Request;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, MetaData metaData)
        {
            response.Headers.Append("Pagination", JsonSerializer.Serialize(metaData, JsonSerializerOptionsCache.Options));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
    }
}