using jwt_ctf_backend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;

namespace jwt_ctf_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KeyController : ControllerBase
    {
        private readonly IKeyService _keyService;
        public KeyController(IKeyService keyService)
        {
            _keyService = keyService;
        }

        [HttpGet("get-public-key"), ActionName("GetPublicKey")]
        public ActionResult<string> GetBackendPublicKey()
        {
            var key = _keyService.GetBackendPublicKey();
            if (key.Equals("Key doesn't exist"))
            {
                return NotFound("Key not found");
            }
            return Ok(key);
        }
    }
}
