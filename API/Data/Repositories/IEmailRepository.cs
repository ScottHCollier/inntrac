using API.Models;

namespace API.Data.Repositories
{
    public interface IEmailRepository : IRepository<Email>
    {
        void SendWelcomeEmail(string email);
    }
}
