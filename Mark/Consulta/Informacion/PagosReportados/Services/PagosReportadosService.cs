using Dapper;
using Loki.DTOs.Global;
using Loki.DTOs.Informacion.PagosDTOs;
using Loki.DTOs.Informacion.PagosReportadosDTOs;
using Loki.Global;
using Loki.Mark.Consulta.Informacion.PagosReportados.Interfaces;

namespace Loki.Mark.Consulta.Informacion.PagosReportados.Services
{
	public class PagosReportadosService : IPagosReportadosService
	{
		private readonly IPagosReportadosDAO _dao;
		private readonly IQueryGeneratorService _queryGenerator;

		public PagosReportadosService(IPagosReportadosDAO dao, IQueryGeneratorService queryGenerator)
		{
			_dao = dao;
			_queryGenerator = queryGenerator;
		}

		/// <summary>
		/// Orquesta la consulta de pagos reportados, construyendo y ejecutando la consulta SQL necesaria.
		/// </summary>
		/// <param name="servidor">El servidor donde se ejecutará la consulta, obtenido del claim del token.</param>
		/// <param name="request">El DTO que contiene los parámetros de la petición, como el rango de fechas y el ID de la consulta.</param>
		/// <returns>Una colección de DTOs con los resultados de los pagos reportados.</returns>
		public async Task<IEnumerable<PagoReportadoDto>> ConsultarPagosReportadosAsync(string servidor, ConsultaPagosRequest request)
		{
			// 1. REUTILIZAMOS el generador para la subconsulta de cuentas
			var queryOptions = new QueryGenerationOptions { IdConsulta = request.IdConsulta, IdCartera = request.IdCartera };
			var subQueryResult = await _queryGenerator.GenerarQueryCuentas(servidor, queryOptions);

			// 2. Construimos la consulta principal de forma segura
			// NOTA: Se modificó la consulta original para devolver el MontoPago como decimal, no como texto.
			string sqlPrincipal = @"
                SELECT
                    C.Cartera,
                    P.idCuenta AS Cuenta,
                    E.NombreEjecutivo,
                    P.FechaPago,
                    P.Segundo_Insert AS Hora,
                    P.MontoPago,
                    P.Referencia,
                    P.Sucursal
                FROM dbo.PagosReportados P
                INNER JOIN dbo.Carteras C ON C.idCartera = P.idCartera
                INNER JOIN dbo.Ejecutivos E ON E.idEjecutivo = P.idEjecutivo
                WHERE P.idCartera = @IdCartera AND P.FechaPago BETWEEN @Desde AND @Hasta";

			string columnasDinamicas = subQueryResult.Columns.Cast<string>().Aggregate("", (c, n) => c + $", CC.[{n}]");

			string sqlFinal = $@"
                SELECT Z.* {columnasDinamicas}
                FROM ({sqlPrincipal}) Z";

			var parametros = new DynamicParameters();

			parametros.Add("Desde", request.Desde);
			parametros.Add("Hasta", request.Hasta);

			// 3. Unimos la subconsulta si existe
			if (!string.IsNullOrEmpty(subQueryResult.Sql))
			{
				sqlFinal += $" INNER JOIN ({subQueryResult.Sql}) CC ON Z.Cuenta = CC.idCuenta";
				parametros.AddDynamicParams(subQueryResult.Parameters);
			}

			if (!parametros.ParameterNames.Contains("IdCartera"))
			{
				parametros.Add("IdCartera", request.IdCartera);

			}

			// 4. Llamamos al DAO
			return await _dao.ObtenerDatosAsync<PagoReportadoDto>(servidor, sqlFinal, parametros);
		}
	}
}