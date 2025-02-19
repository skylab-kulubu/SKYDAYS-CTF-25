using jwt_ctf_backend.Interfaces;
using jwt_ctf_backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace jwt_ctf_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IStudentService _studentService;
        public AuthController(IAuthService authService, IStudentService studentService)
        {
            _authService = authService;
            _studentService = studentService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginAnswer>> Login([FromBody] LoginRequest request)
        {
            LoginAnswer answer = new LoginAnswer() { 
                Token = "Dummy",
                Homework = "Dummy"
            };
            var student = await _authService.StudentLogin(request);
            if(student.NameSurname.Equals("-1"))
            {
                var teacher = await _authService.TeacherLogin(request);
                if (teacher.NameSurname.Equals("-1"))
                {
                    return BadRequest(answer);
                }
                answer.Token = _authService.GenerateJwtToken(teacher.TeacherId, "teacher");
                return Ok(answer);
            }

            answer.Token = _authService.GenerateJwtToken(student.StudentId, "student");
            answer.Homework = await _studentService.GetMyHomework(student.StudentId);
            return Ok(answer);
        }
    }
}
