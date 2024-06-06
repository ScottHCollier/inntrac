using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data.Repositories
{
  public class GroupRepository(StoreContext context) : Repository<Group>(context), IGroupRepository
  {
    public async Task<List<Group>> GetAllAsync(string siteId)
    {
      var groups = await _context.Groups.Where(group => group.SiteId == siteId).ToListAsync();
      return groups;
    }
  }
}
