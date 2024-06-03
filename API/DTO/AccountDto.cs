namespace API.DTO
{
    public class AccountDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public bool IsAdmin { get; set; }
        public int AccountStatus { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string DefaultGroup { get; set; }
        public List<GroupDto> Groups { get; set; }
        public string DefaultSite { get; set; }
        public List<SiteDto> Sites { get; set; }
        public List<ShiftDto> Shifts { get; set; }
    }
}