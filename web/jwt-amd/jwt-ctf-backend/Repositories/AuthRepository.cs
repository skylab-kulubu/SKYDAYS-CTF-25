using jwt_ctf_backend.Interfaces;
using jwt_ctf_backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace jwt_ctf_backend.Repositories
{
    public class AuthRepository : IAuthService
    {
        private readonly string _studentsDbJson = "Resources/Db/tbl_students.json";
        private readonly string _teachersDbJson = "Resources/Db/tbl_teachers.json";
        private readonly ICryptionService _cryptionService;
        private const string SecretKey = "MySuperSecretKeyThatIsAtLeast32CharactersLong!";
        private readonly byte[] _key;

        public AuthRepository(ICryptionService cryptionService)
        {
            _cryptionService = cryptionService;
            _key = Encoding.UTF8.GetBytes(SecretKey);
        }

        public string GenerateJwtToken(Guid id, string role)
        {
            var encryptedRole = _cryptionService.Encrypt(role);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.NameIdentifier, id.ToString()),
                new Claim("role", encryptedRole)
            }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<StudentLight> StudentLogin(LoginRequest request)
        {
            if (!File.Exists(_studentsDbJson))
            {
                throw new FileNotFoundException("Öğrenci veritabanı json dosyası bulunamadı");
            }

            request.NameSurname = _cryptionService.Decrypt(request.NameSurname);
            request.Password = _cryptionService.Decrypt(request.Password);

            var jsonData = await File.ReadAllTextAsync(_studentsDbJson);
            var students = JsonSerializer.Deserialize<List<Student>>(jsonData) ?? new List<Student>();
            var student = students.FirstOrDefault(s => s.NameSurname == request.NameSurname);
            if (student == null)
            {
                return new StudentLight() { StudentId = Guid.NewGuid(), NameSurname = "-1", Homework = "-1" };
            }

            request.Password = _cryptionService.Hash(request.Password, student.Salt);
            return student.Password == request.Password ? new StudentLight() { StudentId = student.StudentId, NameSurname = student.NameSurname, Homework = student.Homework }
                                                        : new StudentLight() { StudentId = Guid.NewGuid(), NameSurname = "-1", Homework = "-1" };
        }

        public async Task<TeacherLight> TeacherLogin(LoginRequest request)
        {
            if (!File.Exists(_teachersDbJson))
            {
                throw new FileNotFoundException("Öğretmen veritabanı json dosyası bulunamadı");
            }

            var jsonData = await File.ReadAllTextAsync(_teachersDbJson);
            var teachers = JsonSerializer.Deserialize<List<Teacher>>(jsonData) ?? new List<Teacher>();
            var teacher = teachers.FirstOrDefault(s => s.NameSurname == request.NameSurname);
            if (teacher == null)
            {
                return new TeacherLight() { TeacherId = Guid.NewGuid(), NameSurname = "-1"};
            }

            request.Password = _cryptionService.Hash(request.Password, teacher.Salt);
            return teacher.Password == request.Password ? new TeacherLight() { TeacherId = teacher.TeacherId, NameSurname = teacher.NameSurname }
                                                        : new TeacherLight() { TeacherId = Guid.NewGuid(), NameSurname = "-1" };
        }
    }
}
