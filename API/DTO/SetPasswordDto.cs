using API.Entities;

namespace API.DTO
{
    public class SetPasswordDto
    {
        public string Token { get; set; }
        public string Password { get; set; }
    }
}