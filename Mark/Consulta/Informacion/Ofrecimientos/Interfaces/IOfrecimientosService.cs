using Loki.DTOs.Informacion.OfrecimientosDTOs;
using Loki.DTOs.Informacion.PagosDTOs; // Reutilizamos el DTO de Pagos

namespace Loki.Mark.Consulta.Informacion.Ofrecimientos.Services
{
	public interface IOfrecimientosService
	{
		/// <summary>
		/// Orquesta la consulta de ofrecimientos, aplicando filtros dinámicos.
		/// </summary>
		Task<IEnumerable<OfrecimientoDto>> ConsultarOfrecimientosAsync(string servidor, ConsultaPagosRequest request);
	}
}