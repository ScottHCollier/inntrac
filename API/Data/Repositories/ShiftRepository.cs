using Microsoft.EntityFrameworkCore;
using API.Models;
using API.DTO;

namespace API.Data.Repositories
{
  public class ShiftRepository(StoreContext context) : Repository<Shift>(context), IShiftRepository
  {
    public void AddRange(List<Shift> shifts)
    {
      _context.Shifts.AddRange(shifts);
    }

    public async Task<List<Shift>> GetAllAsync(string siteId)
    {
      var shifts = await _context.Shifts.Where(shift => shift.SiteId == siteId).ToListAsync();
      return shifts;
    }

    public async Task<bool> UserHasExisting(AddShiftDto shiftToAdd)
    {
      var existingShift = await _context.Shifts
        .Where(shift =>
            shift.UserId == shiftToAdd.UserId && (shift.StartTime.Date == shiftToAdd.StartTime.Date || shift.EndTime.Date == shiftToAdd.EndTime.Date)
        ).ToListAsync();
      return existingShift.Count > 0;
    }
  }
}
