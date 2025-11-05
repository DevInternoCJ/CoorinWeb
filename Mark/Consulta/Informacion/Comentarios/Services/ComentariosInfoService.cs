using Dapper;
using Loki.DTOs.Global;
using Loki.DTOs.Informacion.ComentariosDTOs;
using Loki.DTOs.Informacion.PagosDTOs;
using Loki.Global;
using Loki.Mark.Consulta.Informacion.Comentarios.DAOs;

namespace Loki.Mark.Consulta.Informacion.Comentarios.Services
{
	public class ComentariosInfoService : IComentariosInfoService
	{
		private readonly IComentariosInfoDAO _dao;
		private readonly IQueryGeneratorService _queryGenerator;

		public ComentariosInfoService(IComentariosInfoDAO dao, IQueryGeneratorService queryGenerator)
		{
			_dao = dao;
			_queryGenerator = queryGenerator;
		}

		/// <summary>
		/// Orquesta la consulta de comentarios de cuentas, aplicando filtros dinámicos.
		/// </summary>
		public async Task<IEnumerable<dynamic>> ConsultarComentariosAsync(string servidor, ConsultaPagosRequest request)
		{
			var queryOptions = new QueryGenerationOptions { IdConsulta = request.IdConsulta, IdCartera = request.IdCartera };
			var subQueryResult = await _queryGenerator.GenerarQueryCuentas(servidor, queryOptions);

			string sqlPrincipal = "FROM dbCollection.dbo.fn_Comentarios(@Desde, @Hasta, @IdCartera) Z";
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

			return await _dao.ObtenerDatosAsync<dynamic>(servidor, sqlFinal, parametros);
		}
	}
}