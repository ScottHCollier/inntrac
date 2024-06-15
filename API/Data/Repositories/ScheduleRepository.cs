using Microsoft.EntityFrameworkCore;
using API.Models;
using API.DTO;

namespace API.Data.Repositories
{
  public class ScheduleRepository(StoreContext context) : Repository<Schedule>(context), IScheduleRepository
  {
    public void AddRange(List<Schedule> schedules)
    {
      _context.Schedules.AddRange(schedules);
    }

    public async Task<List<Schedule>> GetAllAsync(string siteId)
    {
      var schedules = await _context.Schedules.Where(schedule => schedule.SiteId == siteId).ToListAsync();
      return schedules;
    }

    public async Task<bool> UserHasExisting(AddScheduleDto scheduleToAdd)
    {
      var existingSchedule = await _context.Schedules
        .Where(schedule =>
            schedule.UserId == scheduleToAdd.UserId && (schedule.StartTime.Date == scheduleToAdd.StartTime.Date || schedule.EndTime.Date == scheduleToAdd.EndTime.Date)
        ).ToListAsync();
      return existingSchedule.Count > 0;
    }
  }
}
