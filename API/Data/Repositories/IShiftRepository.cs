using API.DTO;
using API.Models;

namespace API.Data.Repositories
{
    public interface IShiftRepository : IRepository<Shift>
    {
        Task<List<Shift>> GetAllAsync(string siteId);
        void AddRange(List<Shift> shifts);
        Task<bool> UserHasExisting(AddShiftDto shiftToAdd);
    }
}
