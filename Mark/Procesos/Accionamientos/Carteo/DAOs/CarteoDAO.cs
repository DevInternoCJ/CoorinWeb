using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.Procesos.Accionamientos.CarteoDTOs;
using Loki.Mark.Procesos.Accionamientos.Carteo.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Loki.Mark.Procesos.Accionamientos.Carteo.DAOs
{
    public class CarteoDAO : ICarteoDAO
    {
        private readonly IDbContextFactory _dbContextFactory;

        public CarteoDAO(IDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public async Task<CarteoBusquedaDto?> BuscarCuentaAsync(string servidor, int idCartera, string cuentaOrExpediente, bool esExpediente)
        {
            string sql;
            object parametros;

            using var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection");
            // Reutilizamos la lógica segura de búsqueda
            if (esExpediente)
            {
                if (cuentaOrExpediente.Length <= 3 || !int.TryParse(cuentaOrExpediente.AsSpan(3), out int numExp)) return null;

                sql = @"SELECT C.idCuenta, Car.Abreviación + CONVERT(VARCHAR(10), C.Expediente) AS Expediente, C.NombreDeudor
                            FROM dbo.Cuentas C INNER JOIN dbo.Carteras Car ON C.idCartera = Car.idCartera
                            WHERE Car.Abreviación = @Abreviacion AND C.Expediente = @NumeroExp AND C.idCartera = @IdCartera";
                parametros = new { Abreviacion = cuentaOrExpediente.Substring(0, 3), NumeroExp = numExp, IdCartera = idCartera };
            }
            else
            {
                sql = @"SELECT C.idCuenta, Car.Abreviación + CONVERT(VARCHAR(10), C.Expediente) AS Expediente, C.NombreDeudor
                            FROM dbo.Cuentas C INNER JOIN dbo.Carteras Car ON C.idCartera = Car.idCartera
                            WHERE C.idCuenta = @IdCuenta AND C.idCartera = @IdCartera";
                parametros = new { IdCuenta = cuentaOrExpediente, IdCartera = idCartera };
            }
            return await connection.QuerySingleOrDefaultAsync<CarteoBusquedaDto>(sql, parametros);
        }

        public async Task<IEnumerable<DomicilioCarteoDto>> ObtenerDomiciliosAsync(string servidor, int idCartera, string idCuenta)
        {
            // Consulta específica de este módulo (directa a dbHistory.dbo.Domicilios)
            string sql = @"
                SELECT idCuenta,
                       CONCAT(Calle, ' ', NúmeroExterior, '', CódigoPostal) AS Domicilio,
                       CódigoPostal
                FROM dbHistory.dbo.Domicilios
                WHERE idCuenta = @idCuenta AND idCartera = @idCartera";

            using var connection = _dbContextFactory.GetSqlConnection(servidor, "History"); // Ojo: La consulta original dice dbHistory
            return await connection.QueryAsync<DomicilioCarteoDto>(sql, new { idCuenta, idCartera });
        }

        public async Task<bool> InsertarCarteoManualAsync(string servidor, GuardarCarteoManualRequestDto request, int idEjecutivo)
        {
            string spName = "dbCollection.dbo.InsertaCarteoDevuelto";

            using var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection");
            var p = new DynamicParameters();
            p.Add("@idCartera", request.IdCartera);
            p.Add("@idCuenta", request.IdCuenta);
            p.Add("@idEjecutivo_Insert", idEjecutivo);
            p.Add("@FechaEnvío", request.FechaEnvio);
            p.Add("@FechaRechazo", request.FechaRechazo);
            p.Add("@Calle_Num", request.Domicilio);
            p.Add("@CódigoPostal", request.CodigoPostal);
            p.Add("@idRechazo", request.IdRechazo);

            // Execute devuelve el número de filas afectadas. Si es > 0, fue exitoso.
            int rows = await connection.ExecuteAsync(spName, p, commandType: CommandType.StoredProcedure);
            return rows > 0; // Ojo: A veces los SPs tienen SET NOCOUNT ON, en cuyo caso esto podría retornar -1.
                             // Si el SP original hace un SELECT al final o return, habría que ajustar.
                             // Basado en el código original: DataBaseConn.Execute devuelve bool.
        }

        // --- Métodos de Carga Masiva ---

        public async Task CrearTablaTemporalAsync(string servidor, int idEjecutivo)
        {
            string spName = "dbComplemento.dbo.[1.2.1CreaTablaTempCarteo]";

            using var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"); // Ejecuta desde contexto Collection hacia Complemento
            await connection.ExecuteAsync(spName, new { idEjecutivo }, commandType: CommandType.StoredProcedure);
        }

        public async Task RealizarBulkCopyAsync(string servidor, DataTable datos, string nombreTablaDestino)
        {
            // Conectamos a dbComplemento porque ahí se crean las tablas temporales
            using var connection = _dbContextFactory.GetSqlConnection(servidor, "Complemento");
            await connection.OpenAsync();

            using var bulkCopy = new SqlBulkCopy(connection);
            bulkCopy.DestinationTableName = nombreTablaDestino;
            bulkCopy.BulkCopyTimeout = 1800;
            await bulkCopy.WriteToServerAsync(datos);
        }

        public async Task<IEnumerable<dynamic>> ProcesarCargaAsync(string servidor, int idEjecutivo, int idCartera, string selector)
        {
            string spName = "dbComplemento.[dbo].[1.3.1.InsertaCarteo]";

            using var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection");
            var p = new { idEjecutivo, idCartera, selector };
            // Este SP devuelve una tabla con los registros NO cargados (errores)
            return await connection.QueryAsync<dynamic>(spName, p, commandType: CommandType.StoredProcedure, commandTimeout: 600);
        }
    }
}
