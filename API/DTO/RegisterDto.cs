namespace API.DTO
{
    public class RegisterDto : LoginDto
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
    }
}