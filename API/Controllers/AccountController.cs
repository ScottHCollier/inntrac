using API.Data;
using API.DTO;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Services;
using API.Extensions;

namespace API.Controllers
{
    public class AccountController(IUnitOfWork unitOfWork, TokenService tokenService, IMapper mapper) : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly TokenService _tokenService = tokenService;
        private readonly IMapper _mapper = mapper;

        [HttpPost("login")]
        public async Task<ActionResult<Session>> Login(LoginDto loginDto)
        {
            var user = await _unitOfWork.Users.GetUserByEmailAsync(loginDto.Email);

            if (user == null || !await _unitOfWork.Users.CheckUserPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            user = await _unitOfWork.Users.GetByIdAsync(user.Id);
            var token = await _tokenService.GenerateUserToken(user);

            var session = new Session
            {
                Id = Guid.NewGuid().ToString(),
                Token = token
            };

            return session;
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

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                FirstName = registerDto.FirstName,
                Surname = registerDto.Surname,
                UserName = registerDto.Email,
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                Status = 1
            };

            var result = await _unitOfWork.Users.CreateAccountAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _unitOfWork.Users.SetAdminAsync(user);

            var locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));

            return Created(locationHeader, user);
        }

        [Authorize]
        [HttpPost("setPassword")]
        public async Task<ActionResult<Session>> SetPassword(SetPasswordDto setPasswordDto)
        {
            var validatedToken = _tokenService.ValidateToken(setPasswordDto.Token);
            var userEmail = validatedToken.Claims.First(c => c.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")).Value;

            var user = await _unitOfWork.Users.GetUserByEmailAsync(userEmail);

            if (user == null) return BadRequest();

            var result = await _unitOfWork.Users.SetPasswordAsync(user, setPasswordDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            return await Login(new LoginDto { Email = user.Email, Password = setPasswordDto.Password });
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
        [HttpGet]
        public async Task<ActionResult<AccountDto>> GetCurrentUser()
        {
            var user = await _unitOfWork.Users.GetCurrentUserAsync(User.Identity.Name);

            var isAdmin = await _unitOfWork.Users.IsAdminAsync(user);

            var accountDto = _mapper.Map<AccountDto>(user);
            accountDto.IsAdmin = isAdmin;

            if (accountDto.IsAdmin)
            {
                var notifications = await _unitOfWork.Users.GetNotificationsAsync(user);

                var scheduleNotifications = notifications
                    .GroupBy(n => n.user)
                    .Select(group =>
                    {
                        var dto = _mapper.Map<ScheduleNotificationDto>(group.Key);
                        dto.Schedules = _mapper.Map<List<ScheduleDto>>(group.Select(g => g.schedule).ToList());
                        return dto;
                    }).ToList();

                accountDto.Notifications = scheduleNotifications;
            }

            return accountDto;
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