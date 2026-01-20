using CoorinWeb.Loki.Global;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Text;

namespace Loki.Mark.Procesos.Visitas.Carga.DAOs
{
    public class CargaVisitasDAO : ICargaVisitasDAO
    {
        private readonly IDbContextFactory _dbContextFactory;

        public CargaVisitasDAO(IDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public async Task CrearTablaTemporalDinamicaAsync(string servidor, int idEjecutivo, DataTable estructura)
        {
            using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
            {
                // 1. Eliminar si existe (Lógica original línea 169)
                string tableName = $"dbComplemento.Temp.Visi_{idEjecutivo}";
                string dropSql = $@"
                    IF EXISTS (SELECT 1 FROM dbComplemento.sys.tables WHERE name = 'Visi_{idEjecutivo}' AND schema_id=5) 
                    DROP TABLE {tableName}";

                await connection.ExecuteAsync(dropSql);

                // 2. Construir CREATE TABLE dinámico (Lógica original línea 180)
                var sb = new StringBuilder();
                sb.AppendLine($"CREATE TABLE {tableName} (");

                foreach (DataColumn col in estructura.Columns)
                {
                    string colName = col.ColumnName;
                    string sqlType = "VARCHAR(8000)"; // Default

                    // Columnas específicas que deben ser DATETIME según el código original
                    if (colName == "FechaVisita" || colName == "HoraVisita" ||
                        colName == "FechaPagoNegociación" || colName == "FechaPagoNegociacion")
                    {
                        sqlType = "DATETIME";
                    }

                    sb.AppendLine($"  [{colName}] {sqlType} NULL,");
                }

                // Agregamos PK Identity al final
                sb.AppendLine("  idVisita INT NOT NULL IDENTITY(1,1) PRIMARY KEY CLUSTERED");
                sb.AppendLine(");");

                await connection.ExecuteAsync(sb.ToString());
            }
        }

        public async Task RealizarBulkCopyAsync(string servidor, int idEjecutivo, DataTable datos)
        {
            // Apuntamos a Complemento porque ahí vive la tabla Temp
            using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Complemento"))
            {
                await connection.OpenAsync();
                using (var bulkCopy = new SqlBulkCopy(connection))
                {
                    bulkCopy.DestinationTableName = $"dbComplemento.Temp.Visi_{idEjecutivo}";
                    bulkCopy.BulkCopyTimeout = 1800; // 30 min
                    await bulkCopy.WriteToServerAsync(datos);
                }
            }
        }

        public async Task ValidarDatosAsync(string servidor, int idCartera, int idEjecutivo, bool usarComplemento)
        {
            string sp = "dbComplemento.dbo.[1.1.1.InsertaVisitas_Valida]";
            using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
            {
                await connection.ExecuteAsync(sp, new
                {
                    idCartera,
                    idEjecutivo,
                    Base = usarComplemento ? "dbComplemento" : "dbCollection"
                }, commandType: CommandType.StoredProcedure, commandTimeout: 600);
            }
        }

        public async Task InsertarDatosAsync(string servidor, int idCartera, int idEjecutivo, bool usarComplemento)
        {
            string sp = "dbComplemento.dbo.[1.1.2.InsertaVisitas_Inserta]";
            using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
            {
                await connection.ExecuteAsync(sp, new
                {
                    idCartera,
                    idEjecutivo,
                    Base = usarComplemento ? "dbComplemento" : "dbCollection"
                }, commandType: CommandType.StoredProcedure, commandTimeout: 600);
            }
        }

        public async Task<IEnumerable<dynamic>> ObtenerErroresAsync(string servidor, int idCartera, int idEjecutivo)
        {
            string sp = "dbComplemento.dbo.[1.1.3.InsertaVisitas_Resultado]";
            using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
            {
                return await connection.QueryAsync<dynamic>(sp, new
                {
                    idCartera,
                    idEjecutivo
                }, commandType: CommandType.StoredProcedure);
            }
        }
    }
}