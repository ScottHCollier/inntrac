using Microsoft.EntityFrameworkCore;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using API.Helpers.Request;
using API.DTO;


namespace API.Data.Repositories
{
  public class UserRepository(StoreContext context, UserManager<User> userManager) : Repository<User>(context), IUserRepository
  {
    private readonly UserManager<User> _userManager = userManager;

    public async Task<List<User>> GetAllAsync(string siteId)
    {
      return await _context.Users.Where(user => user.Site.Id == siteId).ToListAsync();
    }

    public async Task<IdentityResult> SetPasswordAsync(User user, string password)
    {
      return await _userManager.AddPasswordAsync(user, password);
    }

    public async Task<IdentityResult> SetAdminAsync(User user)
    {
      return await _userManager.AddToRoleAsync(user, "Admin");
    }

    public async Task<IdentityResult> CreateAccountAsync(User user, string password)
    {
      return await _userManager.CreateAsync(user, password);
    }

    public async Task<IdentityResult> CreateAccountAsync(User user)
    {
      return await _userManager.CreateAsync(user);
    }

    public async Task<bool> CheckUserPasswordAsync(User user, string password)
    {
      return await _userManager.CheckPasswordAsync(user, password);
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
      return await _userManager.FindByEmailAsync(email);
    }
    public async Task<User> GetUserByIdAsync(string id)
    {
      var user = await _context.Users
          .Include(u => u.Site)
          .Include(u => u.Group)
          .FirstOrDefaultAsync(u => u.Id == id);

      if (user != null)
      {
        user.Schedules = await _context.Schedules
            .Where(schedule => schedule.UserId == user.Id && schedule.StartTime > DateTime.Today.ToUniversalTime())
            .OrderBy(schedule => schedule.StartTime)
            .Take(5)
            .ToListAsync();
      }

      return user;
    }

    public async Task<bool> IsAdminAsync(User user)
    {
      return await _userManager.IsInRoleAsync(user, "Admin");
    }
    public async Task<User> GetCurrentUserAsync(string userName)
    {
      var user = await _context.Users
                .Include(user => user.Site)
                .Include(user => user.Group)
                .FirstOrDefaultAsync(user => user.UserName == userName);

      if (user != null)
      {
        user.Schedules = await _context.Schedules
            .Where(schedule => schedule.UserId == user.Id && schedule.StartTime > DateTime.Today.ToUniversalTime())
            .OrderBy(schedule => schedule.StartTime)
            .Take(5)
            .ToListAsync();
      }

      return user;
    }
    public async Task<List<(Schedule schedule, User user)>> GetNotificationsAsync(User user)
    {
      var notifications = await _context.Schedules
          .Where(schedule => schedule.SiteId == user.SiteId
                             && schedule.StartTime > DateTime.Today.ToUniversalTime()
                             && schedule.Type == 3)
          .Join(_context.Users,
                schedule => schedule.UserId,
                u => u.Id,
                (schedule, u) => new { schedule, user = u })
          .OrderBy(n => n.schedule.StartTime)
          .ToListAsync();

      return notifications.Select(n => (n.schedule, n.user)).ToList();
    }

    public async Task<User> GetUserForQueryAsync(string userName)
    {
      var user = await _context.Users
                .Include(user => user.Site)
                .Include(user => user.Group)
                .FirstOrDefaultAsync(user => user.UserName == userName);

      return user;
    }

    public IQueryable<User> GetSchedulesQueryable(User currentUser, ScheduleParams scheduleParams)
    {
      var query = _context.Users
        .Where(user => user.Site == currentUser.Site)
        .Where(user => scheduleParams.UserId.IsNullOrEmpty() || user.Id == scheduleParams.UserId)
        .Include(user => user.Site)
        .Include(user => user.Schedules
            .Where(schedule =>
                schedule.StartTime >= scheduleParams.GetUtcWeekStart().Value &&
                schedule.EndTime <= scheduleParams.GetUtcWeekEnd().Value
            ))
        .Where(user => scheduleParams.GroupId.IsNullOrEmpty() || user.Group.Id == scheduleParams.GroupId)
        .Include(user => user.Group)
        .AsQueryable();
      return query;
    }
  }
}