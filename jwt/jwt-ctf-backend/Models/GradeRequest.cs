namespace jwt_ctf_backend.Models
{
    public class GradeRequest
    {
        public Guid TeacherId { get; set; }
        public required string Password { get; set; }
        public Guid StudentId { get; set; }
        public int Grade { get; set; }
    }
}
