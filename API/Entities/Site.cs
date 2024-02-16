namespace API.Entities
{
    public class Site
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<User> Users { get; set; } = new();
        public List<Group> Groups { get; set; } = new();
        public List<Shift> Shifts { get; set; } = new();

        public void AddGroup(Group group)
        {
            Groups.Add(new Group
            {
                Id = Guid.NewGuid().ToString(),
                Name = group.Name,
                Color = group.Color,
            });
        }
    }
}