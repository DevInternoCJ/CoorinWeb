using CoorinWeb.Loki.Global;
using Dapper;

namespace Loki.Mark.Procesos.Visitas.Consulta.DAOs
{
    public class ConsultaVisitasDAO : IConsultaVisitasDAO
    {
        private readonly IDbContextFactory _dbContextFactory;

        public ConsultaVisitasDAO(IDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public async Task<IEnumerable<dynamic>> ObtenerVisitasAsync(string servidor, string sql, object parametros)
        {
            using var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection");
            return await connection.QueryAsync<dynamic>(sql, parametros, commandTimeout: 120);
        }
    }
}