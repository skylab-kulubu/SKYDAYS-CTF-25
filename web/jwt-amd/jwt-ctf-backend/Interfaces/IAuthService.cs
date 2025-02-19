using jwt_ctf_backend.Models;

namespace jwt_ctf_backend.Interfaces
{
    public interface IAuthService
    {
        Task<StudentLight> StudentLogin(LoginRequest request);
        Task<TeacherLight> TeacherLogin(LoginRequest request);

        string GenerateJwtToken(Guid id, string role);
    }
}
