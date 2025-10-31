using Loki.DTOs.Informacion.PagosDTOs;
using Loki.DTOs.Informacion.PagosReportadosDTOs;

namespace Loki.Mark.Consulta.Informacion.PagosReportados.Interfaces
{
	public interface IPagosReportadosService
	{
		/// <summary>
		/// Orquesta la consulta de pagos reportados, construyendo y ejecutando la consulta SQL necesaria.
		/// </summary>
		/// <param name="servidor">El servidor donde se ejecutará la consulta, obtenido del claim del token.</param>
		/// <param name="request">El DTO que contiene los parámetros de la petición, como el rango de fechas y el ID de la consulta.</param>
		/// <returns>Una colección de DTOs con los resultados de los pagos reportados.</returns>
		Task<IEnumerable<dynamic>> ConsultarPagosReportadosAsync(string servidor, ConsultaPagosRequest request);
	}
}
