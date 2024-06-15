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
    public class SchedulesController(IUnitOfWork unitOfWork, IMapper mapper) : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly IMapper _mapper = mapper;

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<PagedList<UserScheduleDto>>> GetSchedules([FromQuery] ScheduleParams ScheduleParams)
        {
            var currentUser = await _unitOfWork.Users.GetUserForQueryAsync(User.Identity.Name);

            if (!ScheduleParams.GroupId.IsNullOrEmpty())
            {
                var group = await _unitOfWork.Groups.GetByIdAsync(ScheduleParams.GroupId);
                if (group == null) return BadRequest(new ProblemDetails { Title = "Group not found" });
            }

            var query = _unitOfWork.Users.GetSchedulesQueryable(currentUser, ScheduleParams);

            var count = await query.CountAsync();
            var schedules = await query.Skip((ScheduleParams.PageNumber - 1) * ScheduleParams.PageSize).Take(ScheduleParams.PageSize).ToListAsync();

            var schedulesDto = new PagedList<UserScheduleDto>
            (
                _mapper.Map<List<UserScheduleDto>>(schedules),
                count, ScheduleParams.PageNumber, ScheduleParams.PageSize
            );

            Response.AddPaginationHeader(schedulesDto.MetaData);

            return schedulesDto;
        }

        [HttpPost]
        public async Task<ActionResult> AddSchedule(AddScheduleDto addScheduleDto)
        {
            if (DateTime.Compare(addScheduleDto.StartTime, addScheduleDto.EndTime) >= 0)
            {
                ModelState.AddModelError("401", "Schedule start must be before schedule end");
                return ValidationProblem();
            }

            var existingSchedule = await _unitOfWork.Schedules.UserHasExisting(addScheduleDto);

            if (existingSchedule)
            {
                ModelState.AddModelError("401", "Cannot add more than one schedule per day. Try using split schedule");
                return ValidationProblem();
            }

            var site = await _unitOfWork.Sites.GetByIdAsync(addScheduleDto.SiteId);
            if (site == null) return BadRequest(new ProblemDetails { Title = "Site not found" });

            var user = await _unitOfWork.Users.GetByIdAsync(addScheduleDto.UserId);
            if (user == null) return BadRequest(new ProblemDetails { Title = "User not found" });

            var group = await _unitOfWork.Groups.GetByIdAsync(addScheduleDto.GroupId);
            if (group == null) return BadRequest(new ProblemDetails { Title = "Group not found" });

            var newSchedule = new Schedule
            {
                Id = Guid.NewGuid().ToString(),
                Status = addScheduleDto.Status,
                StartTime = addScheduleDto.StartTime,
                EndTime = addScheduleDto.EndTime,
                Site = site,
                User = user,
                Group = group,
                Type = addScheduleDto.Type,
            };

            await _unitOfWork.Schedules.AddAsync(newSchedule);

            var result = await _unitOfWork.CompleteAsync() > 0;
            if (result) return Ok(200);

            return BadRequest(new ProblemDetails { Title = "Problem Adding Schedule" });
        }

        [HttpPost("requestTimeOff")]
        public async Task<ActionResult> RequestTimeOff(AddScheduleTimeOffDto addScheduleTimeOffDto)
        {
            foreach (var date in addScheduleTimeOffDto.Dates)
            {
                DateTime startOfDay = new(date.Year, date.Month, date.Day, 0, 0, 0);

                DateTime endOfDay = new(date.Year, date.Month, date.Day, 23, 59, 59, 999);

                var site = await _unitOfWork.Sites.GetByIdAsync(addScheduleTimeOffDto.SiteId);
                if (site == null) return BadRequest(new ProblemDetails { Title = "Site not found" });

                var user = await _unitOfWork.Users.GetByIdAsync(addScheduleTimeOffDto.UserId);
                if (user == null) return BadRequest(new ProblemDetails { Title = "User not found" });

                var group = await _unitOfWork.Groups.GetByIdAsync(addScheduleTimeOffDto.GroupId);
                if (group == null) return BadRequest(new ProblemDetails { Title = "Group not found" });

                var newSchedule = new AddScheduleDto
                {
                    Status = addScheduleTimeOffDto.Status,
                    StartTime = startOfDay,
                    EndTime = endOfDay,
                    SiteId = site.Id,
                    UserId = user.Id,
                    GroupId = group.Id,
                    Type = addScheduleTimeOffDto.Type,
                };

                var existingSchedule = await _unitOfWork.Schedules.UserHasExisting(newSchedule);

                if (existingSchedule)
                {
                    ModelState.AddModelError("401", "Cannot add more than one schedule per day. Try using split schedule");
                    return ValidationProblem();
                }

                var schedule = new Schedule
                {
                    Id = Guid.NewGuid().ToString(),
                    Status = newSchedule.Status,
                    StartTime = newSchedule.StartTime,
                    EndTime = newSchedule.EndTime,
                    Site = site,
                    User = user,
                    Group = group,
                    Type = newSchedule.Type,
                };

                await _unitOfWork.Schedules.AddAsync(schedule);
            };

            var result = await _unitOfWork.CompleteAsync() > 0;
            if (result) return Ok(200);

            return BadRequest(new ProblemDetails { Title = "Problem Adding Schedule" });
        }

        [HttpPost("addBulk")]
        public async Task<ActionResult> AddBulkSchedules(AddScheduleDto[] schedulesArray)
        {
            var schedules = new List<Schedule>();

            foreach (var addScheduleDto in schedulesArray)
            {
                if (DateTime.Compare(addScheduleDto.StartTime, addScheduleDto.EndTime) >= 0)
                {
                    ModelState.AddModelError("401", "Schedule start must be before schedule end");
                    return ValidationProblem();
                }

                var existingSchedule = await _unitOfWork.Schedules.UserHasExisting(addScheduleDto);

                if (existingSchedule)
                {
                    ModelState.AddModelError("401", "Cannot add more than one schedule per day. Try using split schedule");
                    return ValidationProblem();
                }

                var site = await _unitOfWork.Sites.GetByIdAsync(addScheduleDto.SiteId);
                if (site == null) return BadRequest(new ProblemDetails { Title = "Site not found" });

                var user = await _unitOfWork.Users.GetByIdAsync(addScheduleDto.UserId);
                if (user == null) return BadRequest(new ProblemDetails { Title = "User not found" });

                var group = await _unitOfWork.Groups.GetByIdAsync(addScheduleDto.GroupId);
                if (group == null) return BadRequest(new ProblemDetails { Title = "Group not found" });

                var newSchedule = new Schedule
                {
                    Id = Guid.NewGuid().ToString(),
                    Status = addScheduleDto.Status,
                    StartTime = addScheduleDto.StartTime,
                    EndTime = addScheduleDto.EndTime,
                    Site = site,
                    User = user,
                    Group = group,
                    Type = addScheduleDto.Type,
                };

                schedules.Add(newSchedule);
            }

            _unitOfWork.Schedules.AddRange(schedules);

            var result = await _unitOfWork.CompleteAsync() > 0;
            if (result) return Ok(200);

            return BadRequest(new ProblemDetails { Title = "Problem Adding Schedule" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSchedule(string id)
        {
            var schedule = await _unitOfWork.Schedules.GetByIdAsync(id);
            if (schedule == null) return BadRequest(new ProblemDetails { Title = "Schedule not found" });

            _unitOfWork.Schedules.Remove(schedule);
            await _unitOfWork.CompleteAsync();
            return Ok(200);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateSchedule(EditScheduleDto editScheduleDto)
        {
            if (DateTime.Compare(editScheduleDto.StartTime, editScheduleDto.EndTime) >= 0)
            {
                ModelState.AddModelError("401", "Schedule start must be before schedule end");
                return ValidationProblem();
            }

            var existingSchedule = await _unitOfWork.Schedules.GetByIdAsync(editScheduleDto.Id);
            if (existingSchedule == null) return BadRequest(new ProblemDetails { Title = "Schedule not found" });

            var site = await _unitOfWork.Sites.GetByIdAsync(editScheduleDto.SiteId);
            if (site == null) return BadRequest(new ProblemDetails { Title = "Site not found" });

            var user = await _unitOfWork.Users.GetByIdAsync(editScheduleDto.UserId);
            if (user == null) return BadRequest(new ProblemDetails { Title = "User not found" });

            var group = await _unitOfWork.Groups.GetByIdAsync(editScheduleDto.GroupId);
            if (group == null) return BadRequest(new ProblemDetails { Title = "Group not found" });

            existingSchedule.Status = editScheduleDto.Status;
            existingSchedule.StartTime = editScheduleDto.StartTime;
            existingSchedule.EndTime = editScheduleDto.EndTime;
            existingSchedule.Site = site;
            existingSchedule.User = user;
            existingSchedule.Group = group;

            var result = await _unitOfWork.CompleteAsync() > 0;
            if (result) return Ok(200);

            return BadRequest(new ProblemDetails { Title = "Problem Adding Schedule" });
        }
    }
}