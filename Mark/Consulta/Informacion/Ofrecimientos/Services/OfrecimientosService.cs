using Dapper;
using Loki.DTOs.Global;
using Loki.DTOs.Informacion.OfrecimientosDTOs;
using Loki.DTOs.Informacion.PagosDTOs;
using Loki.Global;
using Loki.Mark.Consulta.Informacion.Ofrecimientos.DAOs;

namespace Loki.Mark.Consulta.Informacion.Ofrecimientos.Services
{
	public class OfrecimientosService : IOfrecimientosService
	{
		private readonly IOfrecimientosDAO _dao;
		private readonly IQueryGeneratorService _queryGenerator;

		public OfrecimientosService(IOfrecimientosDAO dao, IQueryGeneratorService queryGenerator)
		{
			_dao = dao;
			_queryGenerator = queryGenerator;
		}

		/// <summary>
		/// Orquesta la consulta de ofrecimientos, aplicando filtros dinámicos.
		/// </summary>
		public async Task<IEnumerable<OfrecimientoDto>> ConsultarOfrecimientosAsync(string servidor, ConsultaPagosRequest request)
		{
			var queryOptions = new QueryGenerationOptions { IdConsulta = request.IdConsulta, IdCartera = request.IdCartera };
			var subQueryResult = await _queryGenerator.GenerarQueryCuentas(servidor, queryOptions);

			string sqlPrincipal = "FROM dbCollection.dbo.fn_Ofrecimientos(@Desde, @Hasta, @IdCartera) Z";
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

			return await _dao.ObtenerDatosAsync<OfrecimientoDto>(servidor, sqlFinal, parametros);
		}
	}
}