// En: /Mark/Captura/Visitas/Services/ICapturaVisitasService.cs
using Loki.DTOs.Captura.VisitasDTOs;
using System.Threading.Tasks;
using System.Security.Claims;

namespace Loki.Mark.Captura.Visitas.Services
{
	public interface ICapturaVisitasService
	{
		/// <summary>
		/// Busca una cuenta por ID o Expediente y devuelve sus domicilios.
		/// </summary>
		Task<CuentaConDomiciliosDto?> ObtenerCuentaConDomiciliosAsync(string servidor, int idCartera, string cuentaOrExpediente, bool esExpediente);

		/// <summary>
		/// Valida y guarda la información de una visita domiciliaria y sus teléfonos asociados.
		/// </summary>
		Task<(bool Exitoso, string Mensaje)> GuardarVisitaAsync(string servidor, CapturaVisitaRequestDto request);
	}
}