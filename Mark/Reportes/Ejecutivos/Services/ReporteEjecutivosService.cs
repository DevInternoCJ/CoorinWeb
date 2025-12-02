using Dapper;
using Loki.DTOs.Reportes.EjecutivosDTOs;
using Loki.Mark.Reportes.Ejecutivos.DAOs;

namespace Loki.Mark.Reportes.Ejecutivos.Services
{
	public class ReporteEjecutivosService : IReporteEjecutivosService
	{
		private readonly IReporteEjecutivosDAO _dao;
		public ReporteEjecutivosService(IReporteEjecutivosDAO dao) => _dao = dao;

		/// <summary>
		/// Orquesta la consulta del reporte de productividad de ejecutivos.
		/// </summary>
		public async Task<IEnumerable<ReporteEjecutivoDto>> ConsultarReporteAsync(string servidor, ReporteEjecutivosRequestDto request)
		{
			var parametros = new DynamicParameters();
			parametros.Add("IdCartera", request.IdCartera);
			parametros.Add("FechaInicial", request.FechaInicial);
			parametros.Add("FechaFinal", request.FechaFinal);
			parametros.Add("IdProducto", request.IdProducto);
			parametros.Add("Encargado", request.Encargado);

			return await _dao.ObtenerReporteAsync(servidor, parametros);
		}
	}
}