using jwt_ctf_backend.Interfaces;
using jwt_ctf_backend.Models;
using System.Diagnostics;
using System.Text.Json;

namespace jwt_ctf_backend.Repositories
{
    public class StudentRepository : IStudentService
    {
        private readonly string _studentsDbJson = "Resources/Db/tbl_students.json";
        private readonly ICryptionService _cryptionService;

        public StudentRepository(ICryptionService cryptionService)
        {
            _cryptionService = cryptionService;
        }

        public async Task<string> GetMyHomework(Guid studentId)
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
                return "";
            }

            return student.Homework;
        }

        public async Task<bool> IsCredentialsValid(Guid studentId, string password)
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

            password = _cryptionService.Decrypt(password);
            password = _cryptionService.Hash(password, student.Salt);
            return student.Password == password;
        }

        public async Task<string> SaveMyHomework(Guid studentId, string homework)
        {
            if (!File.Exists(_studentsDbJson))
            {
                return "Student json file is nowhere to be found";
            }

            var jsonData = await File.ReadAllTextAsync(_studentsDbJson);
            var students = JsonSerializer.Deserialize<List<Student>>(jsonData) ?? new List<Student>();
            var perfectStudent = students.FirstOrDefault(s => s.Grade == 100);
            var student = students.FirstOrDefault(s => s.StudentId == studentId);
            if (student == null)
            {
                return "Invalid student id";
            }

            if(perfectStudent == null)
            {
                return "Student json file is corrupted";
            }

            if (homework.Equals(perfectStudent.Homework))
            {
                return "SKYDAYS{API_S3CUR1TY_AND_3NCRYPTION_IS_REALLY_1MPORT4NT}";  // flag döndür
            }

            return "updated";  // update işlemini gerçekten yapmaya gerek yok
        }
    }
}
