using jwt_ctf_backend.Models;
using Microsoft.AspNetCore.Identity.Data;

namespace jwt_ctf_backend.Interfaces
{
    public interface IKeyService
    {
        string GetBackendPublicKey();
    }
}
