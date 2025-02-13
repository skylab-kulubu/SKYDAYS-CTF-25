namespace jwt_ctf_backend.Models
{
    public class StudentLight
    {
        public Guid StudentId { get; set; }
        public required string NameSurname { get; set; }
        public required string Homework { get; set; }
        public int Grade { get; set; }
    }
}
