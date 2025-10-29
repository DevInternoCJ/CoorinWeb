using Dapper;
using Loki.DTOs.Global;
using Loki.DTOs.Informacion.BusquedasDTOs;
using Loki.DTOs.Informacion.PagosDTOs;
using Loki.Global;
using Loki.Mark.Consulta.Informacion.Busquedas.Interfaces;

namespace Loki.Mark.Consulta.Informacion.Busquedas.Services
{
	public class BusquedasService : IBusquedasService
	{
		private readonly IBusquedasDAO _dao;
		private readonly IQueryGeneratorService _queryGenerator;

		public BusquedasService(IBusquedasDAO dao, IQueryGeneratorService queryGenerator)
		{
			_dao = dao;
			_queryGenerator = queryGenerator;
		}

		/// <summary>
		/// Orquesta la consulta de búsquedas de cuentas, aplicando filtros dinámicos.
		/// </summary>
		public async Task<IEnumerable<BusquedaDto>> ConsultarBusquedasAsync(string servidor, ConsultaPagosRequest request)
		{
			var queryOptions = new QueryGenerationOptions { IdConsulta = request.IdConsulta, IdCartera = request.IdCartera };
			var subQueryResult = await _queryGenerator.GenerarQueryCuentas(servidor, queryOptions);

			// Construimos la consulta principal, pasando los parámetros de fecha y cartera a la función
			string sqlPrincipal = "FROM dbCollection.dbo.fn_BúsquedasPeriodo(@Desde, @Hasta, @IdCartera) Z";
			string columnasDinamicas = subQueryResult.Columns.Cast<string>()
				.Aggregate("", (current, col) => current + $", CC.[{col}]");

			string sqlFinal = $"SELECT Z.* {columnasDinamicas} {sqlPrincipal}";

			var parametros = new DynamicParameters(subQueryResult.Parameters);

			parametros.Add("Desde", request.Desde);
			parametros.Add("Hasta", request.Hasta);

			if (!string.IsNullOrEmpty(subQueryResult.Sql))
			{
				sqlFinal += $" INNER JOIN ({subQueryResult.Sql}) CC ON Z.Cuenta = CC.idCuenta";
			}

			if (!parametros.ParameterNames.Contains("IdCartera"))
			{
				parametros.Add("IdCartera", request.IdCartera);

			}
			return await _dao.ObtenerDatosAsync<BusquedaDto>(servidor, sqlFinal, parametros);
		}
	}
}