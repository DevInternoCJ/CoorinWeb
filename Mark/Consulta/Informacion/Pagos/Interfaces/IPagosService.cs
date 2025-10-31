using Loki.DTOs.Informacion.PagosDTOs;

namespace Loki.Mark.Consulta.Informacion.Pagos.Interfaces
{
	public interface IPagosService
	{
		Task<IEnumerable<dynamic>> ConsultarPagosAsync(string servidor, ConsultaPagosRequest request);
	}
}
