namespace jwt_ctf_backend.Models
{
    public class SaveHomeworkRequest
    {
        public required string StudentId { get; set; }
        public required string Password { get; set; }
        public required string Homework { get; set; }
    }
}
