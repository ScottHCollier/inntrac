namespace API.Models
{
    public class Site
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<User> Users { get; set; } = [];
        public List<Group> Groups { get; set; } = [];
        public List<Schedule> Schedules { get; set; } = [];
    }
}