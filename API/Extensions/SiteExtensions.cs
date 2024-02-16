using API.DTO;
using API.Entities;

namespace API.Extensions
{
    public static class SiteExtensions
    {
        public static SiteDto MapSiteToDto(this Site site)
        {
            return new SiteDto
            {
                Id = site.Id,
                Name = site.Name,
            };
        }
    }
}
