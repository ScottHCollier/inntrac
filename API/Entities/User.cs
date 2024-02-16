using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string DefaultSite { get; set; }
        public List<Site> Sites { get; set; } = new();
        public List<Shift> Shifts { get; set; } = new();
        public string DefaultGroup { get; set; }
        public List<Group> Groups { get; set; } = new();
    }
}