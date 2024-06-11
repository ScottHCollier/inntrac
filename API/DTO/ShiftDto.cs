namespace API.DTO
{
    public class ShiftDto
    {
        public string Id { get; set; }
        public string SiteId { get; set; }
        public string UserId { get; set; }
        public string GroupId { get; set; }
        public bool Pending { get; set; }
        public double Hours { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Type { get; set; }
    }
}