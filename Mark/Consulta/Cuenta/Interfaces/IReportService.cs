using Loki.DTOs.QueysDTOs;

namespace Loki.Mark.Consulta.Cuenta.Interfaces
{
	public interface IReportService
	{
		Task<string> GetAccionamientosQueryAsync(AccionamientosReportParams parameters);
		Task<string> GetPagosReportadosQueryAsync(PagosReportParams parameters);
	}
}
