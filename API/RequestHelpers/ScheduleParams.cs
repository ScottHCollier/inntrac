namespace API.RequestHelpers
{
    public class ScheduleParams : PaginationParams
    {
        public string WeekStart { get; set; }
        public string WeekEnd { get; set; }
        public string UserId { get; set; }
        public string GroupId { get; set; }
        public string SearchTerm { get; set; }
    }
}