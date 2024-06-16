namespace API.Helpers.Request
{
    public class UserParams : PaginationParams
    {
        public string UserId { get; set; }
        public string GroupId { get; set; }
        public string SearchTerm { get; set; }
    }
}