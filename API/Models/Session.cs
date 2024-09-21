using API.DTO;

namespace API.Models
{
    public class Session
    {
        public string Id { get; set; }
        public string Jwt { get; set; }
        public AccountDto User { get; set; }
    }
}