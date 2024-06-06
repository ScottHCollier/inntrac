using API.Data;
using API.DTO;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SitesController(IUnitOfWork unitOfWork, IMapper mapper) : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly IMapper _mapper = mapper;

        [HttpGet("{id}", Name = "GetSiteById")]
        public async Task<ActionResult<Site>> GetSiteById(string id)
        {
            var site = await _unitOfWork.Sites.GetByIdAsync(id);

            if (site == null)
            {
                return NotFound();
            }

            return Ok(site);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddSite(AddSiteDto newSite)
        {

            var user = await _unitOfWork.Users.GetByIdAsync(newSite.UserId);

            if (user == null) return BadRequest();

            var siteToAdd = new Site
            {
                Id = Guid.NewGuid().ToString(),
                Name = newSite.TeamName,
            };

            await _unitOfWork.Sites.AddAsync(siteToAdd);

            user.Site = siteToAdd;
            user.Status = 6;

            var manager = new Group
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Manager",
                Color = "#FF006E",
                Site = siteToAdd,
            };

            user.Group = manager;

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

            await _unitOfWork.Groups.AddAsync(manager);
            await _unitOfWork.Groups.AddAsync(bar);
            await _unitOfWork.Groups.AddAsync(kitchen);

            await _unitOfWork.CompleteAsync();

            var site = await _unitOfWork.Sites.GetByIdAsync(siteToAdd.Id);

            // Get the location header
            var locationHeader = new Uri(Url.Link("GetSiteById", new { id = site.Id }));

            // Return the result
            return Created(locationHeader, site);
        }
    }
}