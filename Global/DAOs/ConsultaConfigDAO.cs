using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.Global;

namespace Loki.Global.DAOs
{
	public class ConsultaConfigDAO : IConsultaConfigDAO
	{
		private readonly IDbContextFactory _dbContextFactory;

		public ConsultaConfigDAO(IDbContextFactory dbContextFactory)
		{
			_dbContextFactory = dbContextFactory;
		}

		public async Task<ConsultaConfigDto?> GetConsultaConfigAsync(string servidor, int idConsulta)
		{
			// SQL para traer los datos de las 3 tablas en una sola llamada
			var sql = @"
            SELECT idProducto, Desde FROM Consultas WHERE idConsulta = @IdConsulta;
            SELECT Concepto, Campo, Valores, Parámetros AS Parametros, Dato FROM ConsultaParámetros WHERE idConsulta = @IdConsulta;
            SELECT Concepto, Campo, Concepto AS Origen FROM ConsultaAgrupar WHERE idConsulta = @IdConsulta;
			";

			using var connection = _dbContextFactory.GetSqlConnection(servidor, "collection");
			using var multi = await connection.QueryMultipleAsync(sql, new { IdConsulta = idConsulta });


			// Leemos el primer resultado (la tabla Consultas)
			var consulta = await multi.ReadSingleOrDefaultAsync<ConsultaConfigDto>();
			if (consulta == null)
			{
				return null; // Si no se encuentra la consulta, devolvemos null
			}

			// Leemos los siguientes resultados y los asignamos al objeto
			consulta.Parametros = (await multi.ReadAsync<ConsultaParametroDto>()).ToList();
			consulta.Agrupaciones = (await multi.ReadAsync<ConsultaAgruparDto>()).ToList();

			return consulta;
		}
	}
}
