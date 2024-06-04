using API.Entities;

namespace API.DTO
{
    public class UserShiftDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public GroupDto Group { get; set; }
        public List<ShiftDto> Shifts { get; set; }
        public SiteDto Site { get; set; }
    }
    public class UserDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}