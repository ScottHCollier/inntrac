using API.Data;
using API.DTO;
using API.Helpers.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace API.Controllers
{
    public class UsersController(IUnitOfWork unitOfWork, IMapper mapper) : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly IMapper _mapper = mapper;

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> GetUsers([FromQuery] UserParams userParams)
        {
            var user = await _unitOfWork.Users.GetCurrentUserAsync(User.Identity.Name);
            var users = await _unitOfWork.Users.GetAllAsync(user.Site.Id);
            return _mapper.Map<List<UserDto>>(users);
        }
    }
}