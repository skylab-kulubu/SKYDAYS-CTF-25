namespace jwt_ctf_backend.Models
{
    public class LoginAnswer
    {
        public required string Token { get; set; }
        public required string Homework { get; set; }
    }
}
