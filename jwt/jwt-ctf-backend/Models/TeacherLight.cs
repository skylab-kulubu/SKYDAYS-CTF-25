namespace jwt_ctf_backend.Models
{
    public class TeacherLight
    {
        public Guid TeacherId { get; set; }
        public required string NameSurname { get; set; }
    }
}
