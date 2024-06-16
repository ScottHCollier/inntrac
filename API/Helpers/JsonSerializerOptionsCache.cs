using System.Text.Json;
using System.Text.Json.Serialization;

namespace API.Helpers
{
  public static class JsonSerializerOptionsCache
  {
    public static readonly JsonSerializerOptions Options = new()
    {
      PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };
  }
}