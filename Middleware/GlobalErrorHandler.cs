using System.Diagnostics;
using System.Net;
using Microsoft.Data.SqlClient;

namespace Loki.Middleware
{
	public class GlobalErrorHandler
	{
		/// <summary>
		/// Bandera manual. Si es 'true', se mostrarán detalles completos del error
		/// sin importar el entorno (Desarrollo, Producción, etc.).
		/// ADVERTENCIA: Establecer en 'true' solo para depuración temporal. NUNCA en producción.
		/// </summary>
		private const bool _forceDetailedErrors = true;

		private readonly RequestDelegate _next;
		private readonly ILogger<GlobalErrorHandler> _logger;
		private readonly IWebHostEnvironment _env;

		public GlobalErrorHandler(RequestDelegate next, ILogger<GlobalErrorHandler> logger, IWebHostEnvironment env)
		{
			_next = next;
			_logger = logger;
			_env = env;
		}

		public async Task InvokeAsync(HttpContext httpContext)
		{
			try
			{
				await _next(httpContext);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Ocurrió una excepción no controlada: {Message}", ex.Message);
				await HandleExceptionAsync(httpContext, ex);
			}
		}

		private Task HandleExceptionAsync(HttpContext context, Exception ex)
		{
			string detailMessage;

			var statusCode = ex switch
			{
				ArgumentException or ArgumentNullException => HttpStatusCode.BadRequest,
				KeyNotFoundException => HttpStatusCode.NotFound,
				UnauthorizedAccessException => HttpStatusCode.Unauthorized,
				InvalidOperationException => HttpStatusCode.Conflict,
				SqlException => HttpStatusCode.ServiceUnavailable,
				_ => HttpStatusCode.InternalServerError,
			};

			object? errorDetails;

			// La condición ahora revisa la bandera manual O si el entorno es de desarrollo.
			if (_forceDetailedErrors || _env.IsDevelopment())
			{
				// Mostramos todos los detalles para depuración.
				detailMessage = ex.Message;

				var st = new StackTrace(ex, true);
				var frame = st.GetFrame(0);
				var method = frame?.GetMethod();

				// Obtenemos la ruta completa del archivo
				string? fullPath = frame?.GetFileName();
				// Usamos Path.GetFileName para extraer solo el nombre y la extensión
				string? fileNameOnly = string.IsNullOrEmpty(fullPath) ? null : Path.GetFileName(fullPath);

				errorDetails = new
				{
					exceptionType = ex.GetType().Name,
					method = $"{method?.DeclaringType?.FullName}.{method?.Name}",
					file = fileNameOnly, // <-- Se asigna solo el nombre del archivo
					line = frame?.GetFileLineNumber(),
					// Se divide el stack trace en un array de líneas
					stackTrace = ex.ToString().Split(new[] { Environment.NewLine }, StringSplitOptions.None)
				};
			}
			else
			{
				// En Producción, mostramos un mensaje genérico por seguridad.
				detailMessage = "Ocurrió un error inesperado al procesar la solicitud.";
				if (statusCode == HttpStatusCode.ServiceUnavailable)
				{
					detailMessage = "El servicio no está disponible en este momento. Por favor, intente más tarde.";
				}
				errorDetails = null;
			}

			var problemDetails = new
			{
				title = GetDefaultTitle(statusCode),
				status = (int)statusCode,
				detail = detailMessage,
				type = GetRfcLinkForStatus(statusCode),
				instance = context.TraceIdentifier,
				details = errorDetails
			};

			context.Response.ContentType = "application/problem+json";
			context.Response.StatusCode = (int)statusCode;

			return context.Response.WriteAsJsonAsync(problemDetails);
		}

		#region Métodos de Ayuda

		private string GetDefaultTitle(HttpStatusCode statusCode)
		{
			return statusCode switch
			{
				HttpStatusCode.BadRequest => "Bad Request",
				HttpStatusCode.Unauthorized => "Unauthorized",
				HttpStatusCode.NotFound => "Not Found",
				HttpStatusCode.Conflict => "Conflict",
				HttpStatusCode.ServiceUnavailable => "Service Unavailable",
				_ => "Internal Server Error"
			};
		}

		// Método para obtener el enlace RFC correspondiente al código de estado.
		private string GetRfcLinkForStatus(HttpStatusCode statusCode)
		{
			return statusCode switch
			{
				HttpStatusCode.BadRequest => "https://tools.ietf.org/html/rfc9110#section-15.5.1",
				HttpStatusCode.Unauthorized => "https://tools.ietf.org/html/rfc9110#section-15.5.2",
				HttpStatusCode.NotFound => "https://tools.ietf.org/html/rfc9110#section-15.5.5",
				HttpStatusCode.Conflict => "https://tools.ietf.org/html/rfc9110#section-15.5.10",
				HttpStatusCode.ServiceUnavailable => "https://tools.ietf.org/html/rfc9110#section-15.6.4",
				_ => "https://tools.ietf.org/html/rfc9110#section-15.6.1", // Internal Server Error
			};
		}
		#endregion
	}
	public static class GlobalErrorHandlerExtensions
	{
		public static IApplicationBuilder UseGlobalErrorHandler(this IApplicationBuilder builder)
		{
			return builder.UseMiddleware<GlobalErrorHandler>();
		}
	}
}
