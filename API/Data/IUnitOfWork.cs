using API.Data.Repositories;

namespace API.Data
{
  public interface IUnitOfWork : IDisposable
  {
    IUserRepository Users { get; }
    ISiteRepository Sites { get; }
    IGroupRepository Groups { get; }
    IScheduleRepository Schedules { get; }
    IEmailRepository Emails { get; }
    Task<int> CompleteAsync();
  }
}
