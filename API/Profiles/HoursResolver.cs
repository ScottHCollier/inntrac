using API.DTO;
using API.Models;
using AutoMapper;

namespace API.Profiles
{
  public class HoursResolver : IValueResolver<Schedule, ScheduleDto, double>
  {
    public double Resolve(Schedule schedule, ScheduleDto scheduleDto, double time, ResolutionContext context)
    {
      var minutes = schedule.EndTime.Subtract(schedule.StartTime).TotalMinutes;
      var hours = Math.Round(minutes / 15) * 0.25;

      return hours;
    }
  }
}