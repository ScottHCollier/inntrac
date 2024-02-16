using API.DTO;
using API.Entities;

namespace API.Extensions
{
    public static class ShiftExtensions
    {
        public static ShiftDto MapShiftToDto(this Shift shift)
        {
            var minutes = shift.EndTime.Subtract(shift.StartTime).TotalMinutes;
            var hours = Math.Round(minutes / 15) * 0.25;
            return new ShiftDto
            {
                Id = shift.Id,
                SiteId = shift.SiteId,
                UserId = shift.UserId,
                GroupId = shift.GroupId,
                Pending = shift.Pending,
                Hours = hours,
                StartTime = shift.StartTime,
                EndTime = shift.EndTime
            };
        }
    }
}