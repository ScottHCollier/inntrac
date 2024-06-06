using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data.Repositories
{
  public class SiteRepository(StoreContext context) : Repository<Site>(context), ISiteRepository
  {
  }
}
