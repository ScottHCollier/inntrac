namespace API.DTO
{
    public class AccountDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public int Status { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public GroupDto Group { get; set; }
        public SiteDto Site { get; set; }
        public List<ScheduleDto> Schedules { get; set; }
        public List<ScheduleNotificationDto> Notifications { get; set; }
    }
}