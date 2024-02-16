using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly StoreContext _context;
        public UsersController(StoreContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> GetUsers([FromQuery] UserParams userParams)
        {
            var site = await _context.Sites.FindAsync(userParams.SiteId);
            if (site == null) return BadRequest(new ProblemDetails { Title = "Invalid site" });

            var users = await _context.Users.Where(user => user.Sites.Contains(site)).ToListAsync();

            return users.Select(user => user.MapUserToDto()).ToList();
        }

        [Authorize]
        [HttpGet("shifts")]
        public async Task<ActionResult<PagedList<UserShiftDto>>> GetUserShifts([FromQuery] ShiftParams shiftParams)
        {
            var site = await _context.Sites.FindAsync(shiftParams.SiteId);
            if (site == null) return BadRequest(new ProblemDetails { Title = "Invalid site" });

            var group = (Group)null;
            if (!shiftParams.GroupId.IsNullOrEmpty())
            {
                group = await _context.Groups.FindAsync(shiftParams.GroupId);
                if (group == null) return BadRequest(new ProblemDetails { Title = "Group not found" });
            }

            var query = _context.Users
                .Where(user => user.Sites.Contains(site))
                .Where(user => shiftParams.UserId.IsNullOrEmpty() || user.Id == shiftParams.UserId)
                .Include(user => user.Sites)
                .Include(user => user.Shifts
                    .Where(shift =>
                        DateTimeOffset.Compare(shift.StartTime, DateTime.Parse(shiftParams.WeekStart)) >= 0
                        && DateTimeOffset.Compare(shift.EndTime, DateTime.Parse(shiftParams.WeekEnd)) < 0
                    ))
                .Where(user => shiftParams.GroupId.IsNullOrEmpty() || user.Groups.Contains(group))
                .Include(user => user.Groups)
                .AsQueryable();

            var count = await query.CountAsync();
            var items = await query.Skip((shiftParams.PageNumber - 1) * shiftParams.PageSize).Take(shiftParams.PageSize).ToListAsync();

            // items.ForEach(async user =>
            // {
            //     var IsAdmin = await _userManager.IsInRoleAsync(user, "Admin");
            //     user.IsAdmin = IsAdmin;
            // });

            var userShiftDto = new PagedList<UserShiftDto>
            (
                items.Select(user => user.MapUserToUserShiftDto()).ToList(),
                count, shiftParams.PageNumber, shiftParams.PageSize);

            Response.AddPaginationHeader(userShiftDto.MetaData);

            return userShiftDto;
        }
    }
}