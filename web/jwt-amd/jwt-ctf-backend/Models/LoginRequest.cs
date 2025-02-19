namespace jwt_ctf_backend.Models
{
    public class LoginRequest
    {
        public required string NameSurname { get; set; }
        public required string Password { get; set; }
    }
}
