using System.Security.Cryptography;
using System.Text;

namespace Loki.Security
{
	public static class AesEncryption
	{
		public static string Encrypt(string plainText, string key)
		{
			using var aes = Aes.Create();
			aes.Key = Encoding.UTF8.GetBytes(key.PadRight(32).Substring(0, 32));
			aes.GenerateIV();

			using var encryptor = aes.CreateEncryptor();
			using var ms = new MemoryStream();
			ms.Write(aes.IV, 0, 16); // Guarda el IV al inicio
			using var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write);
			using var sw = new StreamWriter(cs);
			sw.Write(plainText);
			sw.Close();
			return Convert.ToBase64String(ms.ToArray());
		}

		public static string Decrypt(string cipherText, string key)
		{
			var fullCipher = Convert.FromBase64String(cipherText);
			using var aes = Aes.Create();
			aes.Key = Encoding.UTF8.GetBytes(key.PadRight(32).Substring(0, 32));

			var iv = fullCipher.Take(16).ToArray();
			var cipher = fullCipher.Skip(16).ToArray();
			aes.IV = iv;

			using var decryptor = aes.CreateDecryptor();
			using var ms = new MemoryStream(cipher);
			using var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
			using var sr = new StreamReader(cs);
			return sr.ReadToEnd();
		}
	}
}
