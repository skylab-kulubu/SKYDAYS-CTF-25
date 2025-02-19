using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace jwt_ctf_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Dummy : ControllerBase
    {
        [HttpPost("HashIt")]
        public ActionResult<string> HashIt(string plainText, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var combinedBytes = Encoding.UTF8.GetBytes(plainText + salt);
                var hashBytes = sha256.ComputeHash(combinedBytes);
                return Ok(Convert.ToBase64String(hashBytes));
            }
        }
    }
}
