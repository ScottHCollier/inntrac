using API.DTO;
using API.Models;
using AutoMapper;

namespace API.Profiles
{
  public class HoursResolver : IValueResolver<Shift, ShiftDto, double>
  {
    public double Resolve(Shift shift, ShiftDto shiftDto, double time, ResolutionContext context)
    {
      var minutes = shift.EndTime.Subtract(shift.StartTime).TotalMinutes;
      var hours = Math.Round(minutes / 15) * 0.25;

      return hours;
    }
  }
}