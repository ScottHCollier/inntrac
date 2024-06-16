namespace API.Models
{
    public class Schedule : BaseEntity
    {
        public string Id { get; set; }
        private DateTime _startTime;
        public DateTime StartTime
        {
            get => _startTime;
            set => _startTime = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }
        private DateTime _endTime;
        public DateTime EndTime
        {
            get => _endTime;
            set => _endTime = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }
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