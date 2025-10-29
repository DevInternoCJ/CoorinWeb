using Dapper;
using Loki.DTOs.Global;
using Loki.DTOs.Informacion.PagosDTOs;
using Loki.Global;
using Loki.Mark.Consulta.Informacion.Pagos.DAOs;
using Loki.Mark.Consulta.Informacion.Pagos.Interfaces;
using System.Collections;
using System.Data;
using System.Text;

namespace Loki.Mark.Consulta.Informacion.Pagos.Services
{
	public class PagosService : IPagosService
	{
		private readonly IPagosDAO _pagosDAO;
		private readonly IQueryGeneratorService _queryGenerator;

		public PagosService(IPagosDAO pagosDAO, IQueryGeneratorService queryGenerator)
		{
			_pagosDAO = pagosDAO;
			_queryGenerator = queryGenerator;
		}

		public async Task<IEnumerable<PagoNegociacionDto>> ConsultarPagosAsync(string servidor, ConsultaPagosRequest request)
		{
			// 1. Pedir la subconsulta al servicio especialista.
			// (La interfaz debe ser ajustada para recibir 'servidor' si 'LlenaParametros' lo necesita)
			var subQueryResult = await _queryGenerator.GenerarQueryCuentas(servidor, new QueryGenerationOptions
			{
				IdConsulta = request.IdConsulta,
				IdCartera = request.IdCartera
				// Añadir más propiedades si son necesarias
			});

			// 2. Construir la consulta principal.
			string columnasDinamicas = subQueryResult.Columns.Cast<string>()
				.Aggregate("", (current, col) => current + $", CC.[{col}]");

			// --- INICIO DE LA CORRECCIÓN ---

			// Formateamos las fechas de forma segura para SQL
			string desdeStr = request.Desde.ToString("yyyy-MM-dd");
			string hastaStr = request.Hasta.ToString("yyyy-MM-dd");

			// Embebemos los valores directamente en la llamada a la función
			string sqlPrincipal = $@"
                SELECT Z.* {columnasDinamicas}
                FROM dbCollection.dbo.fn_PagosNegociaciones('{desdeStr}', '{hastaStr}', {request.IdCartera}) Z";

			// El objeto de parámetros ahora solo contendrá los de la subconsulta
			var parametros = new DynamicParameters();

			// --- FIN DE LA CORRECCIÓN ---

			if (!parametros.ParameterNames.Contains("IdCartera"))
			{
				parametros.Add("IdCartera", request.IdCartera);

			}

			// 3. Unir la subconsulta si existe.
			if (!string.IsNullOrEmpty(subQueryResult.Sql))
			{
				sqlPrincipal += $" INNER JOIN ({subQueryResult.Sql}) CC ON Z.Cuenta = CC.idCuenta";
				// Los parámetros de la subconsulta son los únicos que se añaden
				parametros.AddDynamicParams(subQueryResult.Parameters);
			}

			// 4. Llamar al DAO para la ejecución final.
			return await _pagosDAO.ObtenerDatosAsync<PagoNegociacionDto>(servidor, sqlPrincipal, parametros);
		}
	}

}





