using System.Linq.Expressions;

namespace API.Data
{
  public interface IRepository<T> where T : class
  {
    Task<T> GetByIdAsync(string id);
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
    Task AddAsync(T entity);
    void Remove(T entity);
  }
}
