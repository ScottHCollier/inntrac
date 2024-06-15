using API.DTO;
using API.Models;

namespace API.Data.Repositories
{
    public interface IScheduleRepository : IRepository<Schedule>
    {
        Task<List<Schedule>> GetAllAsync(string siteId);
        void AddRange(List<Schedule> schedules);
        Task<bool> UserHasExisting(AddScheduleDto scheduleToAdd);
    }
}
