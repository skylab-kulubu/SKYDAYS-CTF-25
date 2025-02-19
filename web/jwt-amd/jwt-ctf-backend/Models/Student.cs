namespace jwt_ctf_backend.Models
{
    public class Student
    {
        public Guid StudentId { get; set; }
        public required string NameSurname { get; set; }
        public required string Homework { get; set; }
        public required string Password {  get; set; }
        public required string Salt { get; set; }
        public int Grade {  get; set; }
    }
}
