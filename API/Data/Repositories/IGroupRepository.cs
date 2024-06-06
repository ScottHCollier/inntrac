using API.Models;

namespace API.Data.Repositories
{
    public interface IGroupRepository : IRepository<Group>
    {
        Task<List<Group>> GetAllAsync(string siteId);
    }
}
