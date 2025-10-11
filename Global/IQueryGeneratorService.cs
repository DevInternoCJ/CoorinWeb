using Loki.DTOs.Global;
using Loki.DTOs.Informacion.PagosDTOs;
using System.Collections;

namespace Loki.Global
{
	// DTO para el resultado de la generación de la subconsulta
	public class SubQueryResult
	{
		public string Sql { get; set; } = string.Empty;
		public object Parameters { get; set; } = new { };
		public ArrayList Columns { get; set; } = [];
	}

	public interface IQueryGeneratorService
	{
		/// <summary>
		/// Genera una subconsulta SQL parametrizada para filtrar un conjunto de cuentas.
		/// </summary>
		/// <param name="request">El DTO con los parámetros de la consulta principal.</param>
		/// <returns>Un objeto con el SQL, los parámetros y las columnas de la subconsulta.</returns>
		Task<SubQueryResult> GenerarQueryCuentas(string servidor, QueryGenerationOptions options);
	}
}
