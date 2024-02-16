namespace API.DTO
{
    public class AddUserDto
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string SiteId { get; set; }
        public string GroupId { get; set; }
        public bool IsAdmin { get; set; }
    }
}