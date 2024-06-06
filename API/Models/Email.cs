namespace API.Models
{
    public class Email
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
        public DateTime DateSent { get; set; }
        public string Attachments { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}