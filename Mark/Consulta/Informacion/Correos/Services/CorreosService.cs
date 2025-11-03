// En: /Mark/Consulta/Informacion/Correos/Services/CorreosService.cs
using Dapper;
using Loki.DTOs.Global;
using Loki.DTOs.Informacion.CorreosDTOs;
using Loki.Global;
using Loki.Mark.Consulta.Informacion.Correos.Interfaces;

namespace Loki.Mark.Consulta.Informacion.Correos.Services
{
	public class CorreosService : ICorreosService
	{
		private readonly ICorreosDAO _dao;
		private readonly IQueryGeneratorService _queryGenerator;

		public CorreosService(ICorreosDAO dao, IQueryGeneratorService queryGenerator)
		{
			_dao = dao;
			_queryGenerator = queryGenerator;
		}


		/// <summary>
		/// Orquesta la consulta de correos, aplicando filtros de cuentas dinámicas.
		/// </summary>
		/// <param name="servidor">El servidor donde se ejecutará la consulta, obtenido del claim del token.</param>
		/// <param name="idCartera">El ID de la cartera a consultar.</param>
		/// <param name="idConsulta">El ID de la consulta predefinida para aplicar filtros de cuentas.</param>
		/// <returns>Una colección de DTOs con la información de los correos encontrados.</returns>
		public async Task<IEnumerable<dynamic>> ConsultarCorreosAsync(string servidor, int idCartera, int idConsulta)
		{
			// 1. REUTILIZAMOS el generador para la subconsulta de cuentas
			var queryOptions = new QueryGenerationOptions { IdConsulta = idConsulta, IdCartera = idCartera };
			var subQueryResult = await _queryGenerator.GenerarQueryCuentas(servidor, queryOptions);

			// 2. Construimos la consulta principal
			string sqlPrincipal = "FROM dbCollection.dbo.fn_CorreosCartera(@IdCartera) Z";
			string columnasDinamicas = subQueryResult.Columns.Cast<string>()
				.Aggregate("", (current, col) => current + $", CC.[{col}]");

			string sqlFinal = $"SELECT Z.* {columnasDinamicas} {sqlPrincipal}";

			var parametros = new DynamicParameters(subQueryResult.Parameters);

			// 3. Unimos la subconsulta si existe
			if (!string.IsNullOrEmpty(subQueryResult.Sql))
			{
				sqlFinal += $" INNER JOIN ({subQueryResult.Sql}) CC ON Z.Cuenta = CC.idCuenta";
			}

			// Aseguramos que IdCartera (usado por la función) esté en los parámetros.
			if (!parametros.ParameterNames.Contains("IdCartera"))
			{
				parametros.Add("IdCartera", idCartera);
			}

			// 4. Llamamos al DAO
			return await _dao.ObtenerDatosAsync<dynamic>(servidor, sqlFinal, parametros);
		}
	}
}