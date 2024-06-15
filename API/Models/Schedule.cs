namespace API.Models
{
    public class Schedule
    {
        public string Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string SiteId { get; set; }
        public Site Site { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string GroupId { get; set; }
        public Group Group { get; set; }
        public int Type { get; set; }
        public int Status { get; set; }
    }
}