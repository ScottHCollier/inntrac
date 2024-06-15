using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public int Status { get; set; }
        public string SiteId { get; set; }
        public Site Site { get; set; }
        public string GroupId { get; set; }
        public Group Group { get; set; } = new();
        public List<Schedule> Schedules { get; set; } = [];
    }
}