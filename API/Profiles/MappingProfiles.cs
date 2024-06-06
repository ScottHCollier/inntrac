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
      CreateMap<Shift, ShiftDto>()
        .ForMember(dest => dest.Hours, opt => opt.MapFrom<HoursResolver>()); ;
      CreateMap<User, UserDto>();
      CreateMap<User, UserShiftDto>();
      CreateMap<User, AccountDto>()
        .ForMember(dest => dest.IsAdmin, opt => opt.Ignore());
    }
  }
}