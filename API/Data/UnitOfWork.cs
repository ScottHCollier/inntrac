using API.Data.Repositories;
using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly StoreContext _context;
    private readonly UserManager<User> _userManager;

    public UnitOfWork(StoreContext context, UserManager<User> userManager)
    {
      _context = context;
      _userManager = userManager;
      Users = new UserRepository(_context, _userManager);
      Sites = new SiteRepository(_context);
      Groups = new GroupRepository(_context);
      Schedules = new ScheduleRepository(_context);
      Emails = new EmailRepository(_context);
    }

    public IUserRepository Users { get; }
    public ISiteRepository Sites { get; }
    public IGroupRepository Groups { get; }
    public IScheduleRepository Schedules { get; }
    public IEmailRepository Emails { get; }

    public async Task<int> CompleteAsync()
    {
      return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
      _context.Dispose();
    }
  }
}
