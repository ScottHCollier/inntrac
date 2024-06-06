using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {

            if (!context.Sites.Any())
            {
                var kingsHead = new Site
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "The Kings Head",
                };

                context.Sites.Add(kingsHead);

                var kingsHeadManager = new Group
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Manager",
                    Color = "#FF006E",
                    Site = kingsHead,
                };

                var kingsHeadBar = new Group
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Bar",
                    Color = "#FB5607",
                    Site = kingsHead,
                };

                var kingsHeadKitchen = new Group
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Kitchen",
                    Color = "#FFBE0B",
                    Site = kingsHead,
                };

                var kingsHeadEvents = new Group
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Events",
                    Color = "#3A86FF",
                    Site = kingsHead,
                };

                context.Groups.Add(kingsHeadManager);
                context.Groups.Add(kingsHeadBar);
                context.Groups.Add(kingsHeadKitchen);
                context.Groups.Add(kingsHeadEvents);

                var scott = new User
                {
                    Email = "scott@test.com",
                    UserName = "scott@test.com",
                    FirstName = "Scott",
                    Surname = "Collier",
                    Site = kingsHead,
                    Group = kingsHeadKitchen,
                    Status = 6
                };

                await userManager.CreateAsync(scott, "Pa$$w0rd");
                await userManager.AddToRolesAsync(scott, new[] { "Admin", "Member" });

                var ben = new User
                {
                    Email = "ben@test.com",
                    UserName = "ben@test.com",
                    FirstName = "Ben",
                    Surname = "Potts",
                    Site = kingsHead,
                    Group = kingsHeadKitchen,
                    Status = 6
                };

                await userManager.CreateAsync(ben, "Pa$$w0rd");
                await userManager.AddToRoleAsync(ben, "Member");

                var victor = new User
                {
                    Email = "victor@test.com",
                    UserName = "victor@test.com",
                    FirstName = "Victor",
                    Surname = "Wright",
                    Site = kingsHead,
                    Group = kingsHeadBar,
                    Status = 6
                };

                await userManager.CreateAsync(victor, "Pa$$w0rd");
                await userManager.AddToRoleAsync(victor, "Member");

                var kevin = new User
                {
                    Email = "kevin@test.com",
                    UserName = "kevin@test.com",
                    FirstName = "Kevin",
                    Surname = "Marsh",
                    Site = kingsHead,
                    Group = kingsHeadBar,
                    Status = 6
                };

                await userManager.CreateAsync(kevin, "Pa$$w0rd");
                await userManager.AddToRoleAsync(kevin, "Member");

                var jane = new User
                {
                    Email = "jane@test.com",
                    UserName = "jane@test.com",
                    FirstName = "Jane",
                    Surname = "Smith",
                    Site = kingsHead,
                    Group = kingsHeadManager,
                    Status = 6
                };

                await userManager.CreateAsync(jane, "Pa$$w0rd");
                await userManager.AddToRoleAsync(jane, "Member");

                var sarah = new User
                {
                    Email = "sarah@test.com",
                    UserName = "sarah@test.com",
                    FirstName = "Sarah",
                    Surname = "James",
                    Site = kingsHead,
                    Group = kingsHeadKitchen,
                    Status = 6
                };

                await userManager.CreateAsync(sarah, "Pa$$w0rd");
                await userManager.AddToRoleAsync(sarah, "Member");

                var aubrey = new User
                {
                    Email = "aubrey@test.com",
                    UserName = "aubrey@test.com",
                    FirstName = "Aubrey",
                    Surname = "Adams",
                    Site = kingsHead,
                    Group = kingsHeadEvents,
                    Status = 6
                };

                await userManager.CreateAsync(aubrey, "Pa$$w0rd");
                await userManager.AddToRoleAsync(aubrey, "Member");
            }

            context.SaveChanges();
        }
    }
}