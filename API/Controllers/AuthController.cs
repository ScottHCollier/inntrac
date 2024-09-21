using API.Data;
using API.DTO;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Services;

namespace API.Controllers
{
    public class AuthController(IUnitOfWork unitOfWork, TokenService tokenService, IMapper mapper) : BaseApiController
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

            user = await _unitOfWork.Users.GetUserByIdAsync(user.Id);

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
            var token = await _tokenService.GenerateUserToken(user);

            var session = new Session
            {
                Id = Guid.NewGuid().ToString(),
                Jwt = token,
                User = accountDto,
            };

            return session;
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

        [HttpGet("me")]
        public async Task<ActionResult<AccountDto>> GetCurrentUser()
        {
            var user = await _unitOfWork.Users.GetCurrentUserAsync(User.Identity.Name);

            if (user == null) return Ok(null);

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

            return Ok(accountDto);
        }
    }
}