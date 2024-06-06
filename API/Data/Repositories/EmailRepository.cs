using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data.Repositories
{
  public class EmailRepository(StoreContext context) : Repository<Email>(context), IEmailRepository
  {
    public void SendWelcomeEmail(string to)
    {
      var email = new Email
      {
        Id = Guid.NewGuid().ToString(),
        From = "no-reply@inntrac.com",
        To = to,
        Template = "Welcome",
        Subject = "Welcome to Inntrac",
        Status = 0,
        CreatedAt = DateTime.UtcNow,
      };

      _context.Emails.Add(email);
    }
  }
}
