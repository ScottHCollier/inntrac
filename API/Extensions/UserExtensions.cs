using API.DTO;
using API.Entities;

namespace API.Extensions
{
    public static class UserExtensions
    {
        // public static IQueryable<User> Sort(this IQueryable<User> query, string orderBy)
        // {
        //     if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);

        //     query = orderBy switch
        //     {
        //         "price" => query.OrderBy(p => p.Price),
        //         "priceDesc" => query.OrderByDescending(p => p.Price),
        //         _ => query.OrderBy(p => p.Name)
        //     };

        //     return query;
        // }

        public static IQueryable<User> Search(this IQueryable<User> query, string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(u => u.FirstName.ToLower().Contains(lowerCaseSearchTerm) || u.FirstName.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<User> FilterWeek(this IQueryable<User> query, string weekStart, string weekEnd)
        {
            // query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
            // query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));

            Console.WriteLine("//////////////////////////////////////////////");
            Console.WriteLine("//////////////////////////////////////////////");
            Console.WriteLine("//////////////////////////////////////////////");
            Console.WriteLine(weekStart);
            Console.WriteLine(weekEnd);
            var test = DateTime.Compare(DateTime.Parse(weekStart), DateTime.Parse(weekEnd));
            Console.WriteLine(test);
            Console.WriteLine("//////////////////////////////////////////////");
            Console.WriteLine("//////////////////////////////////////////////");
            Console.WriteLine("//////////////////////////////////////////////");

            return query;
        }

        public static UserDto MapUserToDto(this User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Name = $"{user.FirstName} {user.Surname}",
                Email = user.Email,
            };
        }

        public static UserShiftDto MapUserToUserShiftDto(this User user)
        {
            return new UserShiftDto
            {
                Id = user.Id,
                Name = $"{user.FirstName} {user.Surname}",
                Email = user.Email,
                Group = user.Group.MapGroupToDto(),
                Shifts = user.Shifts.Select(shift => shift.MapShiftToDto()).ToList(),
                Site = user.Site.MapSiteToDto()
            };
        }

        public static AccountDto MapUserToAccountDto(this User user, string token)
        {
            return new AccountDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                Surname = user.Surname,
                Token = token,
                IsAdmin = true,
                Site = user.Site.MapSiteToDto(),
                Group = user.Group.MapGroupToDto(),
                Shifts = user.Shifts.Select(shift => shift.MapShiftToDto()).ToList()
            };
        }
    }
}