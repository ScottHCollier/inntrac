using API.Models;
using API.Helpers.Request;
using Microsoft.AspNetCore.Identity;

namespace API.Data.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<List<User>> GetAllAsync(string siteId);
        Task<IdentityResult> CreateAccountAsync(User user, string password);
        Task<IdentityResult> CreateAccountAsync(User user);
        Task<IdentityResult> SetAdminAsync(User user);
        Task<IdentityResult> SetPasswordAsync(User user, string password);
        Task<User> GetCurrentUserAsync(string userName);
        Task<User> GetUserForQueryAsync(string userName);
        Task<bool> IsAdminAsync(User user);
        Task<bool> CheckUserPasswordAsync(User user, string password);
        Task<User> GetUserByEmailAsync(string email);
        IQueryable<User> GetSchedulesQueryable(User currentUser, ScheduleParams ScheduleParams);
    }
}
