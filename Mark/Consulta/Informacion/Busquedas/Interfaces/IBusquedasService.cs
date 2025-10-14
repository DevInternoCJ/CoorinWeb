using Loki.DTOs.Informacion.BusquedasDTOs;
using Loki.DTOs.Informacion.PagosDTOs; // Reutilizamos el DTO de Pagos

namespace Loki.Mark.Consulta.Informacion.Busquedas.Services
{
	public interface IBusquedasService
	{
		/// <summary>
		/// Orquesta la consulta de búsquedas de cuentas, aplicando filtros dinámicos.
		/// </summary>
		Task<IEnumerable<BusquedaDto>> ConsultarBusquedasAsync(string servidor, ConsultaPagosRequest request);
	}
}