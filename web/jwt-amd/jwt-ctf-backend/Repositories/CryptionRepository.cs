using jwt_ctf_backend.Interfaces;
using jwt_ctf_backend.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Encodings;
using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;

namespace jwt_ctf_backend.Repositories
{
    public class CryptionRepository : ICryptionService
    {
        private readonly string _backendPrivateKeyPath = "Resources/Keys/backendPrivate.pem";

        public CryptionRepository()
        {

        }
        public string Decrypt(string encryptedDataBase64)
        {
            try
            {
                if (!File.Exists(_backendPrivateKeyPath))
                {
                    throw new FileNotFoundException("Private key not found.");
                }

                var privateKeyPem = File.ReadAllText(_backendPrivateKeyPath);
                var privateKey = GetPrivateKeyFromPem(privateKeyPem);
                var rsaEngine = new Pkcs1Encoding(new RsaEngine());

                rsaEngine.Init(false, privateKey);
                var encryptedData = Convert.FromBase64String(encryptedDataBase64);

                var decryptedBytes = rsaEngine.ProcessBlock(encryptedData, 0, encryptedData.Length);
                return Encoding.UTF8.GetString(decryptedBytes);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Decryption failed: {ex.Message}");
                throw;
            }
        }

        private static RsaKeyParameters GetPrivateKeyFromPem(string pem)
        {
            using (var reader = new StringReader(pem))
            {
                var pemReader = new PemReader(reader);
                var keyPair = (AsymmetricCipherKeyPair)pemReader.ReadObject();
                return (RsaKeyParameters)keyPair.Private;
            }
        }

        public string Hash(string plainText, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var combinedBytes = Encoding.UTF8.GetBytes(plainText + salt);
                var hashBytes = sha256.ComputeHash(combinedBytes);
                return Convert.ToBase64String(hashBytes);
            }
        }

        public string Encrypt(string plainData)
        {
            var bytes = Encoding.UTF8.GetBytes(plainData);
            return Convert.ToBase64String(bytes);
        }

        public (string Id, string Role) DecodeToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                throw new ArgumentException("Token is required", nameof(token));
            }

            var handler = new JwtSecurityTokenHandler();
            if (!handler.CanReadToken(token))
            {
                throw new ArgumentException("Invalid token format", nameof(token));
            }

            var jwtToken = handler.ReadJwtToken(token);
            var id = jwtToken.Claims.FirstOrDefault(c => c.Type == "nameid")?.Value;
            var encryptedRole = jwtToken.Claims.FirstOrDefault(c => c.Type == "role")?.Value;

            if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(encryptedRole))
            {
                throw new ArgumentException("Invalid token claims");
            }

            string role = DecodeBase64(encryptedRole);
            return (id, role);
        }

        private static string DecodeBase64(string base64Encoded)
        {
            try
            {
                var bytes = Convert.FromBase64String(base64Encoded);
                return Encoding.UTF8.GetString(bytes);
            }
            catch (FormatException)
            {
                throw new ArgumentException("Invalid encrypted role format");
            }
        }
    }
}
