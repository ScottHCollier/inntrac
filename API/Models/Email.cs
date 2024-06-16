namespace API.Models
{
    public class Email : BaseEntity
    {
        public string Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Template { get; set; }
        public string Cc { get; set; }
        public string Bcc { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public int Status { get; set; }
        private DateTime _dateSent;
        public DateTime DateSent
        {
            get => _dateSent;
            set => _dateSent = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }
        public string Attachments { get; set; }
    }
}