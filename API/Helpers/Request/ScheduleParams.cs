namespace API.Helpers.Request
{
    public class ScheduleParams : PaginationParams
    {
        public string WeekStart { get; set; }
        public string WeekEnd { get; set; }
        public string UserId { get; set; }
        public string GroupId { get; set; }
        public string SearchTerm { get; set; }

        public DateTime? GetUtcWeekStart()
        {
            if (DateTime.TryParse(WeekStart, out var date))
            {
                return DateTime.SpecifyKind(date, DateTimeKind.Utc);
            }
            return null;
        }

        public DateTime? GetUtcWeekEnd()
        {
            if (DateTime.TryParse(WeekEnd, out var date))
            {
                return DateTime.SpecifyKind(date, DateTimeKind.Utc);
            }
            return null;
        }
    }
}