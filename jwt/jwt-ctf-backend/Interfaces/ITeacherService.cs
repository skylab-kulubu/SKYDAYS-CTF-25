using jwt_ctf_backend.Models;

namespace jwt_ctf_backend.Interfaces
{
    public interface ITeacherService
    {
        Task<List<StudentLight>> GetStudents();

        Task<bool> GradeStudent(Guid studentId, int grade);

        Task<bool> IsCredentialsValid(Guid teacherId, string password);
        Task<bool> IsCredentialsValid(string token);
    }
}
