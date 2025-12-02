using Loki.Global;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace Loki.EncryptorDecryptor;

public class EncryptorDecryptor
{
	private readonly RequestDelegate _next;
	private readonly ILogger<EncryptorDecryptor> _logger;
	private readonly RSAServices _rsaService;
	private readonly IConfiguration _configuration;

	public EncryptorDecryptor(RequestDelegate next, ILogger<EncryptorDecryptor> logger, RSAServices rsaService, IConfiguration configuration)
	{
		_next = next;
		_logger = logger;
		_rsaService = rsaService;
		_configuration = configuration;
	}

	public async Task InvokeAsync(HttpContext context)
	{
		// Omitir rutas como Scalar
		if (context.Request.Path.StartsWithSegments("/scalar"))
		{
			_logger.LogInformation("Omitiendo cifrado para la ruta de Scalar: {Path}", context.Request.Path);
			await _next(context);
			return;
		}

		// Validar clave pública en header
		string publicKeyPem = context.Request.Headers["X-Frontend-PublicKey"].FirstOrDefault();
		if (string.IsNullOrEmpty(publicKeyPem))
		{
			_logger.LogWarning("Petición rechazada. Falta la clave pública del frontend en la ruta: {Path}", context.Request.Path);
			context.Response.StatusCode = StatusCodes.Status400BadRequest;
			context.Response.ContentType = "application/json";
			await context.Response.WriteAsync(JsonSerializer.Serialize(new
			{
				error = "Missing public key header 'X-Frontend-PublicKey'. Encryption is required."
			}));
			return;
		}

		// Validar que la clave pública sea válida (importable)
		RSA rsa;
		try
		{
			rsa = RSA.Create();
			rsa.ImportRSAPublicKey(Convert.FromBase64String(publicKeyPem), out _);
		}
		catch (Exception ex)
		{
			_logger.LogWarning(ex, "Clave pública inválida en la ruta: {Path}", context.Request.Path);
			context.Response.StatusCode = StatusCodes.Status400BadRequest;
			context.Response.ContentType = "application/json";
			await context.Response.WriteAsync(JsonSerializer.Serialize(new
			{
				error = "Invalid public key provided in header 'X-Frontend-PublicKey'."
			}));
			return;
		}

		// Interceptar la respuesta
		var originalResponseBody = context.Response.Body;
		using var responseBody = new MemoryStream();
		context.Response.Body = responseBody;

		await _next(context); // Ejecutar pipeline

		// Solo cifrar respuestas exitosas y tipo JSON
		if (context.Response.StatusCode >= 200 &&
			context.Response.StatusCode < 300 &&
			context.Response.ContentType?.Contains("application/json", StringComparison.OrdinalIgnoreCase) == true)
		{
			_logger.LogInformation("Cifrando la respuesta para la ruta: {Path} con código de estado: {StatusCode}", context.Request.Path, context.Response.StatusCode);

			responseBody.Seek(0, SeekOrigin.Begin);
			string responseData = await new StreamReader(responseBody).ReadToEndAsync();

			using Aes aes = Aes.Create();
			aes.KeySize = 256;
			aes.GenerateKey();
			byte[] aesKey = aes.Key;
			byte[] iv = aes.IV;

			byte[] encryptedData;
			using (var ms = new MemoryStream())
			using (var cryptoStream = new CryptoStream(ms, aes.CreateEncryptor(), CryptoStreamMode.Write))
			{
				byte[] dataBytes = Encoding.UTF8.GetBytes(responseData);
				await cryptoStream.WriteAsync(dataBytes);
				await cryptoStream.FlushFinalBlockAsync();
				encryptedData = ms.ToArray();
			}

			byte[] encryptedAesKey = rsa.Encrypt(aesKey, RSAEncryptionPadding.OaepSHA256);

			var encryptedResponse = new
			{
				Ciphertext = Convert.ToBase64String(encryptedData),
				IV = Convert.ToBase64String(iv),
				EncryptedKey = Convert.ToBase64String(encryptedAesKey)
			};

			string encryptedJson = JsonSerializer.Serialize(encryptedResponse);
			byte[] responseBytes = Encoding.UTF8.GetBytes(encryptedJson);

			context.Response.Body = originalResponseBody;
			context.Response.ContentLength = responseBytes.Length;
			context.Response.ContentType = "application/json";
			await context.Response.Body.WriteAsync(responseBytes);
		}
		else
		{
			// No cifrar: devolver la respuesta original
			_logger.LogInformation("No se cifrará la respuesta para la ruta: {Path} con código: {StatusCode}", context.Request.Path, context.Response.StatusCode);
			context.Response.Body = originalResponseBody;
			responseBody.Seek(0, SeekOrigin.Begin);
			await responseBody.CopyToAsync(context.Response.Body);
		}
	}


}

public static class EncryptionMiddlewareExtensions
{
	public static IApplicationBuilder UseEncryption(this IApplicationBuilder builder)
	{
		return builder.UseMiddleware<EncryptorDecryptor>();
	}
}