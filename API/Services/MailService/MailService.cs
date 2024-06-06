using System.Net;
using System.Net.Mail;
using System.Text;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class MailService(IServiceScopeFactory serviceProviderFactory, IConfiguration config, ILogger<MailService> logger) : BackgroundService
    {
        private readonly IConfiguration _config = config;
        private readonly ILogger<BackgroundService> _logger = logger;
        private readonly IServiceScopeFactory _serviceProviderFactory = serviceProviderFactory;
        public IServiceProvider Services { get; }
        public async Task SendMail(Email email)
        {
            var client = new SmtpClient("sandbox.smtp.mailtrap.io", 2525)
            {
                Credentials = new NetworkCredential(_config["MailTrap:Username"], _config["MailTrap:Password"]),
                EnableSsl = true
            };

            MailMessage message = new(email.From, email.To);

            string html = File.ReadAllText($"./Services/MailService/Templates/{email.Template}.html");

            await using var scope = _serviceProviderFactory.CreateAsyncScope();
            var tokenService = scope.ServiceProvider.GetRequiredService<TokenService>();

            string token = tokenService.GenerateNewUserToken(email.To);

            string body = html.Replace("{{LINK}}", $"http://localhost:3000/set-password?token={token}");
            message.Subject = email.Subject;
            message.Body = body;
            message.BodyEncoding = Encoding.UTF8;
            message.IsBodyHtml = true;

            client.Send(message);
            Console.WriteLine("=============================================");
            Console.WriteLine($"Sent {email.Template} email to {email.To}");
            Console.WriteLine("=============================================");
        }

        protected async override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(30000, stoppingToken);
                _logger.LogInformation("Mail Service Running");

                await using var scope = _serviceProviderFactory.CreateAsyncScope();
                var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
                var emails = await context.Emails.Where(email => email.Status == 0).ToListAsync();

                emails.ForEach(async email =>
                {
                    await SendMail(email);
                    email.Status = 1;
                    email.DateSent = DateTime.UtcNow;
                    email.UpdatedAt = DateTime.UtcNow;
                });

                context.SaveChanges();
            }
        }
    }
}