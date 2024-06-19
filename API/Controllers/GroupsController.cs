using API.Data;
using API.DTO;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GroupsController(IUnitOfWork unitOfWork, IMapper mapper) : BaseApiController
    {
        private readonly IMapper _mapper = mapper;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<GroupDto>>> GetGroups()
        {
            var user = await _unitOfWork.Users.GetCurrentUserAsync(User.Identity.Name);
            var groups = await _unitOfWork.Groups.GetAllAsync(user.Site.Id);
            return _mapper.Map<List<GroupDto>>(groups);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddGroup(AddGroupDto group)
        {
            var site = await _unitOfWork.Sites.GetByIdAsync(group.SiteId);
            if (site == null) return BadRequest(new ProblemDetails { Title = "Site not found" });

            await _unitOfWork.Groups.AddAsync(new Group
            {
                Id = Guid.NewGuid().ToString(),
                Name = group.Name,
                Color = group.Color,
                Site = site
            });

            var result = await _unitOfWork.CompleteAsync() > 0;
            if (result) return Ok(200);

            return BadRequest(new ProblemDetails { Title = "Problem Adding Group" });
        }
    }
}