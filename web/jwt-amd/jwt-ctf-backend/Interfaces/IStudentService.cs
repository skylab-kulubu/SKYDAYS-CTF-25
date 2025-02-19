namespace jwt_ctf_backend.Interfaces
{
    public interface IStudentService
    {
        Task<string> SaveMyHomework(Guid studentId, string homework);
        Task<string> GetMyHomework(Guid studentId);
        Task<bool> IsCredentialsValid(Guid studentId, string password);
    }
}
