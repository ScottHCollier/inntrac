using API.Models;

namespace API.DTO
{
    public class SetPasswordDto
    {
        public string Token { get; set; }
        public string Password { get; set; }
    }
}