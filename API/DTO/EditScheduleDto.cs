namespace API.DTO
{
    public class EditScheduleDto
    {
        public string Id { get; set; }
        public string SiteId { get; set; }
        public string UserId { get; set; }
        public string GroupId { get; set; }
        public int Status { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Type { get; set; }
    }
}