using jwt_ctf_backend.Interfaces;
using jwt_ctf_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace jwt_ctf_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }


        [HttpPost("SaveMyHomework")]
        public async Task<ActionResult<string>> SaveMyHomework([FromBody] SaveHomeworkRequest saveHomeworkRequest)
        {
            if (await _studentService.IsCredentialsValid(Guid.Parse(saveHomeworkRequest.StudentId), saveHomeworkRequest.Password))
            {
                string answer = await _studentService.SaveMyHomework(Guid.Parse(saveHomeworkRequest.StudentId), saveHomeworkRequest.Homework);
                string pattern = @"^.*\{.*\}$";
                if (Regex.IsMatch(answer, pattern))
                {
                    return Ok(answer);
                }
                else if (answer.Equals("updated"))
                {
                    return Ok(answer);
                }
                else if(answer.Contains("Student json file"))
                {
                    return Problem("Db Hatası");
                }
                else if(answer.Equals("Invalid student id"))
                {
                    return BadRequest("Geçersiz kullanıcı bilgisi");
                }
            }

            return BadRequest("Geçersiz kullanıcı bilgisi");
        }
    }
}
