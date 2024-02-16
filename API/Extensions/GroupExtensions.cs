using API.DTO;
using API.Entities;

namespace API.Extensions
{
    public static class GroupExtensions
    {
        public static GroupDto MapGroupToDto(this Group group)
        {
            return new GroupDto
            {
                Id = group.Id,
                Name = group.Name,
                Color = group.Color,
                SiteId = group.SiteId
            };
        }
    }
}