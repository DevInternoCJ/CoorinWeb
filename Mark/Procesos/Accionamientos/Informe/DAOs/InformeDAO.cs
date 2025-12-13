using CoorinWeb.Loki.Global;
using Dapper;
using Loki.Mark.Procesos.Accionamientos.Informe.Interfaces;

namespace Loki.Mark.Procesos.Accionamientos.Informe.DAOs
{
    public class InformeDAO : IInformeDAO
    {
        private readonly IDbContextFactory _dbContextFactory;

        public InformeDAO(IDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public async Task<IEnumerable<dynamic>> ObtenerInformeAsync(string servidor, string sql, object parametros)
        {
            // La conexión base suele ser "Collection", aunque la consulta puede atacar dbComplemento
            // usando la sintaxis de tres partes (dbComplemento..Tabla)
            using var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection");
            // Usamos un timeout mayor porque estos informes pueden ser pesados
            return await connection.QueryAsync<dynamic>(sql, parametros, commandTimeout: 3600);
        }
    }
}