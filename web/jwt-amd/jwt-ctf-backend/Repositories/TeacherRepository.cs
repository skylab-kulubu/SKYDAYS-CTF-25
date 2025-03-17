using jwt_ctf_backend.Interfaces;
using jwt_ctf_backend.Models;
using System.Text.Json;

namespace jwt_ctf_backend.Repositories
{
    public class TeacherRepository : ITeacherService
    {
        private readonly string _studentsDbJson = "Resources/Db/tbl_students.json";
        private readonly string _teachersDbJson = "Resources/Db/tbl_teachers.json";
        private readonly ICryptionService _cryptionService;
        public TeacherRepository(ICryptionService cryptionService)
        {
            _cryptionService = cryptionService;
        }
        public async Task<List<StudentLight>> GetStudents()
        {
            if (!File.Exists(_studentsDbJson))
            {
                throw new FileNotFoundException("Öğrenci veritabanı json dosyası bulunamadı");
            }

            var jsonData = await File.ReadAllTextAsync(_studentsDbJson);
            return JsonSerializer.Deserialize<List<StudentLight>>(jsonData) ?? new List<StudentLight>();
        }

        public async Task<bool> GradeStudent(Guid studentId, int grade)
        {
            if (!File.Exists(_studentsDbJson))
            {
                throw new FileNotFoundException("Öğrenci veritabanı json dosyası bulunamadı");
            }

            var jsonData = await File.ReadAllTextAsync(_studentsDbJson);
            var students = JsonSerializer.Deserialize<List<Student>>(jsonData) ?? new List<Student>();
            var student = students.FirstOrDefault(s => s.StudentId == studentId);
            if (student == null)
            {
                return false;
            }

            student.Grade = grade;
            var updatedJson = JsonSerializer.Serialize(students, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(_studentsDbJson, updatedJson);
            return true;
        }

        public async Task<bool> IsCredentialsValid(string token)
        {
            if (!File.Exists(_teachersDbJson))
            {
                throw new FileNotFoundException("Öğretmen veritabanı json dosyası bulunamadı");
            }

            (string Id, string Role) credentials = _cryptionService.DecodeToken(token);

            return credentials.Role == "teacher";
        }

        public async Task<bool> IsCredentialsValid(Guid teacherId, string password)
        {
            if (!File.Exists(_teachersDbJson))
            {
                throw new FileNotFoundException("Öğretmen veritabanı json dosyası bulunamadı");
            }

            var jsonData = await File.ReadAllTextAsync(_teachersDbJson);
            var teachers = JsonSerializer.Deserialize<List<Teacher>>(jsonData) ?? new List<Teacher>();
            var teacher = teachers.FirstOrDefault(s => s.TeacherId == teacherId);
            if(teacher == null)
            {
                return false;
            }

            password = _cryptionService.Decrypt(password);
            password = _cryptionService.Hash(password, teacher.Salt);
            return teacher.Password == password;
        }
    }
}
