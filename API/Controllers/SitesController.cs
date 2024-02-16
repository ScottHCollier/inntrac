using API.Data;
using API.DTO;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class SitesController : BaseApiController
    {
        private readonly StoreContext _context;
        public SitesController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<SiteDto>>> GetSites()
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.UserName == User.Identity.Name);

            var sites = await _context.Sites.Where(site => site.Users.Contains(user)).ToListAsync();
            return sites.Select(site => site.MapSiteToDto()).ToList();
        }
    }
}