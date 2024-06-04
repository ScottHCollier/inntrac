namespace API.Entities
{
    public class Group
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string SiteId { get; set; }
        public Site Site { get; set; }
        public List<User> Users { get; set; } = [];
    }
}