using API.Data;
using API.DTO;
using API.Helpers.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using API.Models;
using API.Extensions;

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

        [Authorize]
        [HttpGet("{id}", Name = "GetUserById")]
        public async Task<ActionResult<User>> GetUserById(string id)
        {
            var user = await _unitOfWork.Users.GetByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddUser(AddUserDto newUser)
        {
            var site = await _unitOfWork.Sites.GetByIdAsync(newUser.SiteId);
            if (site == null) return BadRequest(new ProblemDetails { Title = "Invalid site" });

            var group = await _unitOfWork.Groups.GetByIdAsync(newUser.GroupId);
            if (group == null) return BadRequest(new ProblemDetails { Title = "Invalid group" });

            var user = new User
            {
                FirstName = newUser.FirstName.FirstCharToUpper(),
                Surname = newUser.Surname.FirstCharToUpper(),
                Email = newUser.Email,
                UserName = newUser.Email,
                Site = site,
                Group = group,
            };

            var result = await _unitOfWork.Users.CreateAccountAsync(user);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            if (newUser.IsAdmin) await _unitOfWork.Users.SetAdminAsync(user);

            _unitOfWork.Emails.SendWelcomeEmail(newUser.Email);
            await _unitOfWork.CompleteAsync();

            var locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));

            return Created(locationHeader, user);
        }

        [Authorize]
        [HttpGet("notifications")]
        public async Task<ActionResult<List<ScheduleNotificationDto>>> GetUserNotifications()
        {
            var user = await _unitOfWork.Users.GetCurrentUserAsync(User.Identity.Name);

            var notifications = await _unitOfWork.Users.GetNotificationsAsync(user);

            var scheduleNotifications = notifications
                .GroupBy(n => n.user)
                .Select(group =>
                {
                    var dto = _mapper.Map<ScheduleNotificationDto>(group.Key);
                    dto.Schedules = _mapper.Map<List<ScheduleDto>>(group.Select(g => g.schedule).ToList());
                    return dto;
                }).ToList();


            return scheduleNotifications;
        }
    }
}