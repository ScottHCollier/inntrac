using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class GroupsController : BaseApiController
    {
        private readonly StoreContext _context;
        public GroupsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<GroupDto>>> GetGroups(string siteId)
        {
            var groups = await _context.Groups.Where(group => group.SiteId == siteId).ToListAsync();
            return groups.Select(group => group.MapGroupToDto()).ToList();
        }

        [HttpPost]
        public async Task<ActionResult> AddGroup(AddGroupDto group)
        {
            var site = await _context.Sites.FindAsync(group.SiteId);
            if (site == null) return BadRequest(new ProblemDetails { Title = "Site not found" });

            _context.Groups.Add(new Group
            {
                Id = Guid.NewGuid().ToString(),
                Name = group.Name,
                Color = group.Color,
                Site = site
            });

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok(200);

            return BadRequest(new ProblemDetails { Title = "Problem Adding Group" });
        }
    }
}