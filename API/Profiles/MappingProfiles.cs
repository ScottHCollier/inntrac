using API.DTO;
using API.Models;
using AutoMapper;

namespace API.Profiles
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<Site, SiteDto>();
      CreateMap<Group, GroupDto>();
      CreateMap<Schedule, ScheduleDto>()
        .ForMember(dest => dest.Hours, opt => opt.MapFrom<HoursResolver>()); ;
      CreateMap<User, UserDto>();
      CreateMap<User, UserScheduleDto>();
      CreateMap<User, AccountDto>()
        .ForMember(dest => dest.IsAdmin, opt => opt.Ignore());
      CreateMap<User, ScheduleNotificationDto>()
        .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
        .ForMember(dest => dest.Surname, opt => opt.MapFrom(src => src.Surname))
        .ForMember(dest => dest.Schedules, opt => opt.Ignore());
    }
  }
}