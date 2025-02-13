using jwt_ctf_backend.Interfaces;
using jwt_ctf_backend.Models;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Encodings;
using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;
using System.Security.Cryptography;
using System.Text;

namespace jwt_ctf_backend.Repositories
{
    public class KeyRepository : IKeyService
    {
        private readonly string _backendPublicKeyPath = "Resources/Keys/backendPublic.pem";

        public KeyRepository()
        {
            
        }
        
        public string GetBackendPublicKey()
        {
            if (File.Exists(_backendPublicKeyPath))
            {
                return File.ReadAllText(_backendPublicKeyPath);
            }
            return "Key doesn't exist";
        }
    }
}
