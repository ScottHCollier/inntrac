using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class SitesController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly StoreContext _context;
        public SitesController(UserManager<User> userManager, StoreContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<SiteDto>>> GetSites()
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.UserName == User.Identity.Name);

            var sites = await _context.Sites.Where(site => site.Users.Contains(user)).ToListAsync();
            return sites.Select(site => site.MapSiteToDto()).ToList();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddSite(AddSiteDto newSite)
        {

            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == newSite.UserId);

            if (user == null) return BadRequest();

            var siteToAdd = new Site
            {
                Id = Guid.NewGuid().ToString(),
                Name = newSite.TeamName,
            };

            _context.Sites.Add(siteToAdd);

            user.Sites.Add(siteToAdd);
            user.DefaultSite ??= siteToAdd.Id;
            user.AccountStatus = 6;

            var manager = new Group
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Manager",
                Color = "#FF006E",
                Site = siteToAdd,
            };

            user.Groups.Add(manager);
            user.DefaultGroup ??= manager.Id;

            var bar = new Group
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Bar",
                Color = "#FB5607",
                Site = siteToAdd,
            };

            var kitchen = new Group
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Kitchen",
                Color = "#FFBE0B",
                Site = siteToAdd,
            };

            _context.Groups.Add(manager);
            _context.Groups.Add(bar);
            _context.Groups.Add(kitchen);

            // var user = new User
            // {
            //     FirstName = newUser.FirstName.FirstCharToUpper(),
            //     Surname = newUser.Surname.FirstCharToUpper(),
            //     Email = newUser.Email,
            //     UserName = newUser.Email,
            //     Sites = new List<Site>() { site },
            //     DefaultSite = site.Id,
            //     Groups = new List<Group>() { group },
            // };

            // var result = await _userManager.CreateAsync(user);

            // if (!result.Succeeded)
            // {
            //     foreach (var error in result.Errors)
            //     {
            //         ModelState.AddModelError(error.Code, error.Description);
            //     }

            //     return ValidationProblem();
            // }

            // await _userManager.AddToRoleAsync(user, "Member");

            // if (newUser.IsAdmin) await _userManager.AddToRoleAsync(user, "Admin");

            // var email = new Email
            // {
            //     Id = Guid.NewGuid().ToString(),
            //     From = "no-reply@inntrac.com",
            //     To = newUser.Email,
            //     Template = "Welcome",
            //     Subject = "Welcome to Inntrac",
            //     Status = 0,
            //     CreatedAt = DateTime.UtcNow,
            // };

            // _context.Emails.Add(email);
            await _context.SaveChangesAsync();

            return StatusCode(201);

            // // Get the location header
            // var locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));

            // // Return the result
            // return Created(locationHeader, user);
        }
    }
}