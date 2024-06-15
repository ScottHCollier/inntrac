namespace API.DTO
{
    public class AddScheduleDto
    {
        public string SiteId { get; set; }
        public string UserId { get; set; }
        public string GroupId { get; set; }
        public int Status { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Type { get; set; }
    }
    public class AddScheduleTimeOffDto
    {
        public string SiteId { get; set; }
        public string UserId { get; set; }
        public string GroupId { get; set; }
        public int Status { get; set; }
        public List<DateTime> Dates { get; set; }
        public int Type { get; set; }
    }
}