namespace jwt_ctf_backend.Models
{
    public class Teacher
    {
        public Guid TeacherId { get; set; }
        public required string NameSurname { get; set; }
        public required string Password { get; set; }
        public required string Salt { get; set; }
    }
}
