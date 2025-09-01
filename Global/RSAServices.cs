using System.Security.Cryptography;
using System.Text.Json;


namespace Loki.Global
{
	public class RSAServices
	{
		private readonly RSA _rsa;
		private readonly string _privateKeyFilePath = "rsa_private_key.pem"; // Rutas por defecto
		private readonly string _publicKeyFilePath = "rsa_public_key.pem";   // Rutas por defecto


		public RSAServices(IConfiguration configuration)
		{
			_privateKeyFilePath = configuration["RsaPrivateKeyPath"] ?? _privateKeyFilePath;
			_publicKeyFilePath = configuration["RsaPublicKeyPath"] ?? _publicKeyFilePath;
			_rsa = RSA.Create();

			if (!TryLoadKeys())
			{
				GenerateAndSaveKeys();
			}
		}

		public string GetPublicKey()
		{
			return ExportPublicKeyAsPem(_rsa);
		}


		public byte[] Decrypt(byte[] encryptedDate)
		{
			return _rsa.Decrypt(encryptedDate, RSAEncryptionPadding.OaepSHA256);
		}
		private bool TryLoadKeys()
		{
			try
			{
				if (File.Exists(_privateKeyFilePath) && File.Exists(_publicKeyFilePath))
				{
					string priveteKeyPem = File.ReadAllText(_privateKeyFilePath);
					string publicKeyPem = File.ReadAllText(_publicKeyFilePath);
					_rsa.ImportRSAPrivateKey(Convert.FromBase64String(ExtractBase64FromPem(priveteKeyPem)), out _);
					_rsa.ImportRSAPublicKey(Convert.FromBase64String(ExtractBase64FromPem(publicKeyPem)), out _);
					 return true;
				}

				return false;
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error loading keys: {ex.Message}");
				return false;
			}
		}


		private void GenerateAndSaveKeys()
		{

			// Generate new keys
			_rsa.KeySize = 2048;
			string privateKeyPem = ExportPrivateKeyAsPem(_rsa);
			string publicKeyPem = ExportPublicKeyAsPem(_rsa);

			File.WriteAllText(_privateKeyFilePath, privateKeyPem);
			File.WriteAllText(_publicKeyFilePath, publicKeyPem);
			Console.WriteLine("Keys generated and saved successfully.");

		}

		public string ExportPublicKeyAsPem(RSA rsa)
		{
			var publicKeyBytes = rsa.ExportRSAPublicKey();
			return "-----BEGIN PUBLIC KEY-----\n" +
				   Convert.ToBase64String(publicKeyBytes) +
				   "\n-----END PUBLIC KEY-----\n";

		}

		public string ExportPrivateKeyAsPem(RSA rsa)
		{
			var privateKeyBytes = rsa.ExportRSAPrivateKey();
			return "-----BEGIN PRIVATE KEY-----\n" +
				   Convert.ToBase64String(privateKeyBytes) +
				   "\n-----END PRIVATE KEY-----\n";
		}

		public string ExtractBase64FromPem(string pem)
		{
			var lines = pem.Split('\n');
			return string.Join("", lines.Skip(1).Take(lines.Length - 2));
		}




	}
}
