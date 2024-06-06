using API.Models;

namespace API.DTO
{
    public class UserShiftDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public GroupDto Group { get; set; }
        public List<ShiftDto> Shifts { get; set; }
        public SiteDto Site { get; set; }
    }
    public class UserDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
    }
}