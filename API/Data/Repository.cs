using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.Data
{
  public class Repository<T>(StoreContext context) : IRepository<T> where T : class
  {
    protected readonly StoreContext _context = context;
    protected readonly DbSet<T> _dbSet = context.Set<T>();

    public async Task<T> GetByIdAsync(string id)
    {
      return await _dbSet.FindAsync(id);
    }

    public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
      return await _dbSet.Where(predicate).ToListAsync();
    }

    public async Task AddAsync(T entity)
    {
      await _dbSet.AddAsync(entity);
    }

    public void Remove(T entity)
    {
      _dbSet.Remove(entity);
    }
  }
}
