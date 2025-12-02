using Dapper;
using Loki.DTOs.Global;
using Loki.DTOs.Informacion.DomicilioDTOs;
using Loki.DTOs.Informacion.PagosDTOs;
using Loki.Global;
using Loki.Mark.Consulta.Informacion.Domicilios.Interfaces;

namespace Loki.Mark.Consulta.Informacion.Domicilios.Services
{
	public class DomiciliosService : IDomiciliosService
	{
		private readonly IDomiciliosDAO _dao;
		private readonly IQueryGeneratorService _queryGenerator;

		public DomiciliosService(IDomiciliosDAO dao, IQueryGeneratorService queryGenerator)
		{
			_dao = dao;
			_queryGenerator = queryGenerator;
		}

		public async Task<IEnumerable<dynamic>> ConsultarDomiciliosAsync(string servidor, int idCartera, int idConsulta)
		{
			// 1. REUTILIZAMOS el generador para la subconsulta de cuentas
			var queryOptions = new QueryGenerationOptions { IdConsulta = idConsulta, IdCartera = idCartera };
			var subQueryResult = await _queryGenerator.GenerarQueryCuentas(servidor, queryOptions);

			// 2. Construimos la consulta principal, esta vez usando un parámetro para la función
			string sqlPrincipal = "dbCollection.dbo.fn_DomiciliosVisitas(@IdCartera)";
			string columnasDinamicas = subQueryResult.Columns.Cast<string>()
				.Aggregate("", (current, col) => current + $", CC.[{col}]");

			// El SELECT final ahora toma todo de 'Z' y las columnas dinámicas de 'CC'
			string sqlFinal = $"SELECT Z.* {columnasDinamicas} FROM {sqlPrincipal} Z";

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
