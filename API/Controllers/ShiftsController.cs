using API.Data;
using API.DTO;
using API.Models;
using API.RequestHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    public class ShiftsController(IUnitOfWork unitOfWork, IMapper mapper) : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly IMapper _mapper = mapper;

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<PagedList<UserShiftDto>>> GetShifts([FromQuery] ShiftParams shiftParams)
        {
            var currentUser = await _unitOfWork.Users.GetUserForQueryAsync(User.Identity.Name);

            if (!shiftParams.GroupId.IsNullOrEmpty())
            {
                var group = await _unitOfWork.Groups.GetByIdAsync(shiftParams.GroupId);
                if (group == null) return BadRequest(new ProblemDetails { Title = "Group not found" });
            }

            var query = _unitOfWork.Users.GetShiftsQueryable(currentUser, shiftParams);

            var count = await query.CountAsync();
            var shifts = await query.Skip((shiftParams.PageNumber - 1) * shiftParams.PageSize).Take(shiftParams.PageSize).ToListAsync();

            var shiftsDto = new PagedList<UserShiftDto>
            (
                _mapper.Map<List<UserShiftDto>>(shifts),
                count, shiftParams.PageNumber, shiftParams.PageSize
            );

            Response.AddPaginationHeader(shiftsDto.MetaData);

            return shiftsDto;
        }

        [HttpPost]
        public async Task<ActionResult> AddShift(AddShiftDto addShiftDto)
        {
            if (DateTime.Compare(addShiftDto.StartTime, addShiftDto.EndTime) >= 0)
            {
                ModelState.AddModelError("401", "Shift start must be before shift end");
                return ValidationProblem();
            }

            var existingShift = await _unitOfWork.Shifts.UserHasExisting(addShiftDto);

            if (existingShift)
            {
                ModelState.AddModelError("401", "Cannot add more than one shift per day. Try using split shift");
                return ValidationProblem();
            }

            var site = await _unitOfWork.Sites.GetByIdAsync(addShiftDto.SiteId);
            if (site == null) return BadRequest(new ProblemDetails { Title = "Site not found" });

            var user = await _unitOfWork.Users.GetByIdAsync(addShiftDto.UserId);
            if (user == null) return BadRequest(new ProblemDetails { Title = "User not found" });

            var group = await _unitOfWork.Groups.GetByIdAsync(addShiftDto.GroupId);
            if (group == null) return BadRequest(new ProblemDetails { Title = "Group not found" });

            var newShift = new Shift
            {
                Id = Guid.NewGuid().ToString(),
                Pending = addShiftDto.Pending,
                StartTime = addShiftDto.StartTime,
                EndTime = addShiftDto.EndTime,
                Site = site,
                User = user,
                Group = group,
                Type = addShiftDto.Type,
            };

            await _unitOfWork.Shifts.AddAsync(newShift);

            var result = await _unitOfWork.CompleteAsync() > 0;
            if (result) return Ok(200);

            return BadRequest(new ProblemDetails { Title = "Problem Adding Shift" });
        }

        [HttpPost("requestTimeOff")]
        public async Task<ActionResult> RequestTimeOff(AddShiftDto addShiftDto)
        {
            var existingShift = await _unitOfWork.Shifts.UserHasExisting(addShiftDto);

            if (existingShift)
            {
                ModelState.AddModelError("401", "Cannot add more than one shift per day. Try using split shift");
                return ValidationProblem();
            }

            var site = await _unitOfWork.Sites.GetByIdAsync(addShiftDto.SiteId);
            if (site == null) return BadRequest(new ProblemDetails { Title = "Site not found" });

            var user = await _unitOfWork.Users.GetByIdAsync(addShiftDto.UserId);
            if (user == null) return BadRequest(new ProblemDetails { Title = "User not found" });

            var newShift = new Shift
            {
                Id = Guid.NewGuid().ToString(),
                Pending = addShiftDto.Pending,
                StartTime = addShiftDto.StartTime,
                EndTime = addShiftDto.EndTime,
                Site = site,
                User = user,
                Type = addShiftDto.Type,
            };

            await _unitOfWork.Shifts.AddAsync(newShift);

            var result = await _unitOfWork.CompleteAsync() > 0;
            if (result) return Ok(200);

            return BadRequest(new ProblemDetails { Title = "Problem Adding Shift" });
        }

        [HttpPost("addBulk")]
        public async Task<ActionResult> AddBulkShifts(AddShiftDto[] shiftsArray)
        {
            var shifts = new List<Shift>();

            foreach (var addShiftDto in shiftsArray)
            {
                if (DateTime.Compare(addShiftDto.StartTime, addShiftDto.EndTime) >= 0)
                {
                    ModelState.AddModelError("401", "Shift start must be before shift end");
                    return ValidationProblem();
                }

                var existingShift = await _unitOfWork.Shifts.UserHasExisting(addShiftDto);

                if (existingShift)
                {
                    ModelState.AddModelError("401", "Cannot add more than one shift per day. Try using split shift");
                    return ValidationProblem();
                }

                var site = await _unitOfWork.Sites.GetByIdAsync(addShiftDto.SiteId);
                if (site == null) return BadRequest(new ProblemDetails { Title = "Site not found" });

                var user = await _unitOfWork.Users.GetByIdAsync(addShiftDto.UserId);
                if (user == null) return BadRequest(new ProblemDetails { Title = "User not found" });

                var group = await _unitOfWork.Groups.GetByIdAsync(addShiftDto.GroupId);
                if (group == null) return BadRequest(new ProblemDetails { Title = "Group not found" });

                var newShift = new Shift
                {
                    Id = Guid.NewGuid().ToString(),
                    Pending = addShiftDto.Pending,
                    StartTime = addShiftDto.StartTime,
                    EndTime = addShiftDto.EndTime,
                    Site = site,
                    User = user,
                    Group = group,
                    Type = addShiftDto.Type,
                };

                shifts.Add(newShift);
            }

            _unitOfWork.Shifts.AddRange(shifts);

            var result = await _unitOfWork.CompleteAsync() > 0;
            if (result) return Ok(200);

            return BadRequest(new ProblemDetails { Title = "Problem Adding Shift" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteShift(string id)
        {
            var shift = await _unitOfWork.Shifts.GetByIdAsync(id);
            if (shift == null) return BadRequest(new ProblemDetails { Title = "Shift not found" });

            _unitOfWork.Shifts.Remove(shift);
            await _unitOfWork.CompleteAsync();
            return Ok(200);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateShift(EditShiftDto editShiftDto)
        {
            if (DateTime.Compare(editShiftDto.StartTime, editShiftDto.EndTime) >= 0)
            {
                ModelState.AddModelError("401", "Shift start must be before shift end");
                return ValidationProblem();
            }

            var existingShift = await _unitOfWork.Shifts.GetByIdAsync(editShiftDto.Id);
            if (existingShift == null) return BadRequest(new ProblemDetails { Title = "Shift not found" });

            var site = await _unitOfWork.Sites.GetByIdAsync(editShiftDto.SiteId);
            if (site == null) return BadRequest(new ProblemDetails { Title = "Site not found" });

            var user = await _unitOfWork.Users.GetByIdAsync(editShiftDto.UserId);
            if (user == null) return BadRequest(new ProblemDetails { Title = "User not found" });

            var group = await _unitOfWork.Groups.GetByIdAsync(editShiftDto.GroupId);
            if (group == null) return BadRequest(new ProblemDetails { Title = "Group not found" });

            existingShift.Pending = editShiftDto.Pending;
            existingShift.StartTime = editShiftDto.StartTime;
            existingShift.EndTime = editShiftDto.EndTime;
            existingShift.Site = site;
            existingShift.User = user;
            existingShift.Group = group;

            var result = await _unitOfWork.CompleteAsync() > 0;
            if (result) return Ok(200);

            return BadRequest(new ProblemDetails { Title = "Problem Adding Shift" });
        }
    }
}