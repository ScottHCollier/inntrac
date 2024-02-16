namespace API.DTO
{
    public class EditShiftDto
    {
        public string Id { get; set; }
        public string SiteId { get; set; }
        public string UserId { get; set; }
        public string GroupId { get; set; }
        public bool Pending { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}