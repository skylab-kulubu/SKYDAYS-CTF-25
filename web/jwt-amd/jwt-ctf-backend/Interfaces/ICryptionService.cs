using jwt_ctf_backend.Models;

namespace jwt_ctf_backend.Interfaces
{
    public interface ICryptionService
    {
        string Decrypt(string encryptedDataBase64);
        string Hash(string plainText, string salt);
        string Encrypt(string plainData);
        (string Id, string Role) DecodeToken(string token);
    }
}
