using Microsoft.EntityFrameworkCore;
using API.Models;
using Microsoft.AspNetCore.Identity;
using API.RequestHelpers;
using Microsoft.IdentityModel.Tokens;


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
        user.Shifts = await _context.Shifts
            .Where(shift => shift.UserId == user.Id && shift.StartTime > DateTime.Today)
            .OrderBy(shift => shift.StartTime)
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
        user.Shifts = await _context.Shifts
            .Where(shift => shift.UserId == user.Id && shift.StartTime > DateTime.Today)
            .OrderBy(shift => shift.StartTime)
            .Take(5)
            .ToListAsync();
      }

      return user;
    }

    public async Task<User> GetUserForQueryAsync(string userName)
    {
      var user = await _context.Users
                .Include(user => user.Site)
                .Include(user => user.Group)
                .FirstOrDefaultAsync(user => user.UserName == userName);

      return user;
    }

    public IQueryable<User> GetShiftsQueryable(User currentUser, ShiftParams shiftParams)
    {
      var query = _context.Users
        .Where(user => user.Site == currentUser.Site)
        .Where(user => shiftParams.UserId.IsNullOrEmpty() || user.Id == shiftParams.UserId)
        .Include(user => user.Site)
        .Include(user => user.Shifts
            .Where(shift =>
                shift.StartTime >= DateTime.Parse(shiftParams.WeekStart) &&
                shift.EndTime <= DateTime.Parse(shiftParams.WeekEnd)
            ))
        .Where(user => shiftParams.GroupId.IsNullOrEmpty() || user.Group.Id == shiftParams.GroupId)
        .Include(user => user.Group)
        .AsQueryable();
      return query;
    }
  }
}