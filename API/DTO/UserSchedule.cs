namespace API.DTO
{
    public class UserScheduleDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public GroupDto Group { get; set; }
        public List<ScheduleDto> Schedules { get; set; }
        public SiteDto Site { get; set; }
    }
}