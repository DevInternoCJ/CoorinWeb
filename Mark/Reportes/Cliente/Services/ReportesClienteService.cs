using Loki.DTOs.Reportes.ClienteDTOs;
using Loki.Mark.Reportes.Cliente.DAOs;
using CoorinWeb.Loki.Global;
using static CoorinWeb.Loki.Global.EntityTypeHelper;

namespace Loki.Mark.Reportes.Cliente.Services
{
	public class ReportesClienteService : IReportesClienteService
	{
		private readonly IReportesClienteDAO _dao;
		private readonly IDbContextFactory _dbContextFactory;
		// Asumiendo EntityTypeHelper estático o inyectado
		// private readonly EntityTypeHelper _entityTypeHelper;

		public ReportesClienteService(IReportesClienteDAO dao, IDbContextFactory dbContextFactory /*, EntityTypeHelper entityTypeHelper */)
		{
			_dao = dao;
			_dbContextFactory = dbContextFactory;
			// _entityTypeHelper = entityTypeHelper;
		}

		public async Task<IEnumerable<ReporteDefinicionDto>> GetReporteDefinicionesAsync(string servidor)
		{
			// Llama al DAO que ahora usa EntityTypeHelper
			return await _dao.GetReporteDefinicionesAsync(servidor);
		}

		public async Task<Dictionary<string, IEnumerable<dynamic>>> GenerarReporteAsync(string servidor, GenerarReporteRequestDto request)
		{
			dynamic? definicion = await ObtenerDefinicionReporteConHelperAsync(servidor, request.IdReporte);
			if (definicion == null)
			{
				throw new KeyNotFoundException($"No se encontró la definición activa para el reporte con ID {request.IdReporte}.");
			}

			// Validación usando las propiedades dinámicas
			if (definicion.ParamDesde && !request.FechaDesde.HasValue)
				throw new ArgumentException("El parámetro 'FechaDesde' es requerido para este reporte.");
			if (definicion.ParamHasta && !request.FechaHasta.HasValue)
				throw new ArgumentException("El parámetro 'FechaHasta' es requerido para este reporte.");
			if (definicion.ParamProducto && !request.IdProducto.HasValue && !(definicion.IdCartera == 5 && definicion.IdReporte == 21))
				throw new ArgumentException("El parámetro 'IdProducto' es requerido para este reporte.");
			// Añadir más validaciones

			return await _dao.GenerarReporteAsync(servidor, definicion, request);
		}

		private async Task<dynamic?> ObtenerDefinicionReporteConHelperAsync(string servidor, short idReporte)
		{
			var context = _dbContextFactory.GetDbContext(servidor, "Collection"); // O donde esté la tabla

			var filtros = new List<DynamicFilter>
			{
				new() { Campo = "IdReporte", Operador = "=", Valor = idReporte },
				new() { Campo = "Activo", Operador = "=", Valor = true }
			};

			var resultados = await EntityTypeHelper.FetchEntityTableWithFilters(
				context, "ReportesAlCliente", filtros, null, null, 1);

			return resultados.FirstOrDefault();
		}
	}
}