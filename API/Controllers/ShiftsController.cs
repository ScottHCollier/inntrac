using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ShiftsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ShiftsController(StoreContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> AddShift(AddShiftDto addShiftDto)
        {
            if (DateTime.Compare(addShiftDto.StartTime, addShiftDto.EndTime) >= 0)
            {
                ModelState.AddModelError("401", "Shift start must be before shift end");
                return ValidationProblem();
            }

            // var shiftClash = await _context.Shifts
            //     .Where(shift =>
            //         shift.UserId == addShiftDto.UserId &&
            //         (shift.StartTime < addShiftDto.StartTime && addShiftDto.StartTime < shift.EndTime) ||
            //         (shift.StartTime < addShiftDto.EndTime && addShiftDto.EndTime < shift.EndTime) ||
            //         (addShiftDto.StartTime < shift.StartTime && shift.EndTime < addShiftDto.EndTime)
            //     ).ToListAsync();

            // if (shiftClash.Count > 0)
            // {
            //     ModelState.AddModelError("401", "The new shift overlaps with an existing shift");
            //     return ValidationProblem();
            // }

            var existingShift = await _context.Shifts
                .Where(shift =>
                    shift.UserId == addShiftDto.UserId && (shift.StartTime.Date == addShiftDto.StartTime.Date || shift.EndTime.Date == addShiftDto.EndTime.Date)
                ).ToListAsync();

            if (existingShift.Count > 0)
            {
                ModelState.AddModelError("401", "Cannot add more than one shift per day. Try using split shift");
                return ValidationProblem();
            }

            var site = await _context.Sites.FindAsync(addShiftDto.SiteId);
            if (site == null) return BadRequest(new ProblemDetails { Title = "Site not found" });

            var user = await _context.Users.FindAsync(addShiftDto.UserId);
            if (user == null) return BadRequest(new ProblemDetails { Title = "User not found" });

            var group = await _context.Groups.FindAsync(addShiftDto.GroupId);
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
            };

            _context.Shifts.Add(newShift);

            var result = await _context.SaveChangesAsync() > 0;
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

                var existingShift = await _context.Shifts
                    .Where(shift =>
                        shift.UserId == addShiftDto.UserId && (shift.StartTime.Date == addShiftDto.StartTime.Date || shift.EndTime.Date == addShiftDto.EndTime.Date)
                    ).ToListAsync();

                if (existingShift.Count > 0)
                {
                    ModelState.AddModelError("401", "Cannot add more than one shift per day. Try using split shift");
                    return ValidationProblem();
                }

                var site = await _context.Sites.FindAsync(addShiftDto.SiteId);
                if (site == null) return BadRequest(new ProblemDetails { Title = "Site not found" });

                var user = await _context.Users.FindAsync(addShiftDto.UserId);
                if (user == null) return BadRequest(new ProblemDetails { Title = "User not found" });

                var group = await _context.Groups.FindAsync(addShiftDto.GroupId);
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
                };

                shifts.Add(newShift);
            }

            _context.Shifts.AddRange(shifts);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok(200);

            return BadRequest(new ProblemDetails { Title = "Problem Adding Shift" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteShift(string id)
        {
            var shift = await _context.Shifts.FirstOrDefaultAsync(shift => shift.Id == id);
            if (shift == null) return BadRequest(new ProblemDetails { Title = "Shift not found" });

            _context.Shifts.Remove(shift);
            _context.SaveChanges();
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

            var existingShift = await _context.Shifts.FindAsync(editShiftDto.Id);
            if (existingShift == null) return BadRequest(new ProblemDetails { Title = "Shift not found" });

            var site = await _context.Sites.FindAsync(editShiftDto.SiteId);
            if (site == null) return BadRequest(new ProblemDetails { Title = "Site not found" });

            var user = await _context.Users.FindAsync(editShiftDto.UserId);
            if (user == null) return BadRequest(new ProblemDetails { Title = "User not found" });

            var group = await _context.Groups.FindAsync(editShiftDto.GroupId);
            if (group == null) return BadRequest(new ProblemDetails { Title = "Group not found" });

            existingShift.Pending = editShiftDto.Pending;
            existingShift.StartTime = editShiftDto.StartTime;
            existingShift.EndTime = editShiftDto.EndTime;
            existingShift.Site = site;
            existingShift.User = user;
            existingShift.Group = group;

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok(200);

            return BadRequest(new ProblemDetails { Title = "Problem Adding Shift" });
        }
    }
}