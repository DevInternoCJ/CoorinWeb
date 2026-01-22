using CoorinWeb.Loki.Global;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Text;

namespace Loki.Mark.Procesos.Visitas.Eliminar.DAOs
{
    public class EliminarVisitasDAO : IEliminarVisitasDAO
    {
        private readonly IDbContextFactory _dbContextFactory;

        public EliminarVisitasDAO(IDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public async Task CrearTablaTemporalAsync(string servidor, int idEjecutivo, DataTable estructura)
        {
            using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
            {
                string tableName = $"dbComplemento.Temp.EVIS_{idEjecutivo}";

                // 1. Drop si existe
                string dropSql = $@"IF EXISTS (SELECT 1 FROM dbComplemento.sys.tables WHERE name = 'EVIS_{idEjecutivo}' AND schema_id=5) 
                                    DROP TABLE {tableName}";
                await connection.ExecuteAsync(dropSql);

                // 2. Create dinámico
                var sb = new StringBuilder();
                sb.AppendLine($"CREATE TABLE {tableName} (");

                foreach (DataColumn col in estructura.Columns)
                {
                    string colName = col.ColumnName;
                    string sqlType = "VARCHAR(8000)";

                    if (colName == "FechaVisita" || colName == "HoraVisita")
                        sqlType = "DATETIME";

                    sb.AppendLine($"  [{colName}] {sqlType} NULL,");
                }

                sb.AppendLine("  idVisita INT NOT NULL IDENTITY(1,1) PRIMARY KEY");
                sb.AppendLine(");");

                await connection.ExecuteAsync(sb.ToString());
            }
        }

        public async Task RealizarBulkCopyAsync(string servidor, int idEjecutivo, DataTable datos)
        {
            using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Complemento"))
            {
                await connection.OpenAsync();
                using (var bulkCopy = new SqlBulkCopy(connection))
                {
                    bulkCopy.DestinationTableName = $"dbComplemento.Temp.EVIS_{idEjecutivo}";
                    bulkCopy.BulkCopyTimeout = 1800;
                    await bulkCopy.WriteToServerAsync(datos);
                }
            }
        }

        public async Task EjecutarEliminacionAsync(string servidor, int idCartera, int idEjecutivo)
        {
            // SP que realiza el borrado cruzando la tabla temporal con la real
            string sp = "dbComplemento.dbo.[1.6.EliminaVisitas]";
            // Nota: En frmEliminaVisitas.cs línea 165 llaman a "dbComplemento..[1.6.EliminaVisitas]"

            using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
            {
                await connection.ExecuteAsync(sp, new
                {
                    idCartera,
                    idEjecutivo
                }, commandType: CommandType.StoredProcedure, commandTimeout: 600);
            }
        }
    }
}