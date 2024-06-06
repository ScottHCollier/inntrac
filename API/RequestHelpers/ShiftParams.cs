namespace API.RequestHelpers
{
    public class ShiftParams : PaginationParams
    {
        public string WeekStart { get; set; }
        public string WeekEnd { get; set; }
        public string UserId { get; set; }
        public string GroupId { get; set; }
        public string SearchTerm { get; set; }
    }

    public class UserParams : PaginationParams
    {
        public string UserId { get; set; }
        public string GroupId { get; set; }
        public string SearchTerm { get; set; }
    }
}