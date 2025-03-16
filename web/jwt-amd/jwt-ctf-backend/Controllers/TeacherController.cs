using jwt_ctf_backend.Interfaces;
using jwt_ctf_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace jwt_ctf_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _teacherService;
        public TeacherController(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        [HttpGet("GetStudents")]
        public async Task<ActionResult<List<StudentLight>>> GetStudents([FromHeader] string Authorization)
        {
            Console.WriteLine(Authorization);
            if(await _teacherService.IsCredentialsValid(Authorization))
            {
                var students = await _teacherService.GetStudents();
                Console.WriteLine(students);
                return Ok(students);
            }
            return BadRequest("Geçersiz öğretmen bilgisi");
        }

        [HttpPost("GradeStudent/{gradeRequest}/{password}/{studentId}/{grade}")]
        public async Task<IActionResult> GradeStudent([FromRoute] GradeRequest gradeRequest)
        {
            if(await _teacherService.IsCredentialsValid(gradeRequest.TeacherId, gradeRequest.Password))
            {
                var isSuccess = await _teacherService.GradeStudent(gradeRequest.StudentId, gradeRequest.Grade); 
                if (isSuccess)
                {
                    return Ok();
                }
                return Problem("Öğrenci puanlandırma işlemi başarısız oldu.");
            }
            return BadRequest("Geçersiz öğretmen bilgisi");
        }
    }
}
