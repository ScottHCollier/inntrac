namespace API.DTO
{
    public class ShiftsDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public string DefaultGroup { get; set; }
        public List<GroupDto> Groups { get; set; }
        public List<ShiftDto> Shifts { get; set; }
        public string DefaultSite { get; set; }
        public List<SiteDto> Sites { get; set; }
    }
}