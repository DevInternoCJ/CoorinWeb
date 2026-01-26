using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.Procesos.Visitas;

namespace Loki.Mark.Procesos.Visitas.Corregir.DAOs
{
    public class CorregirVisitasDAO : ICorregirVisitasDAO
    {
        private readonly IDbContextFactory _dbContextFactory;

        public CorregirVisitasDAO(IDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public async Task<IEnumerable<VisitaEditableDto>> BuscarVisitasAsync(string servidor, int idCartera, string idCuenta)
        {
            string sql = @"
                SELECT 
                    G.Fecha_Insert AS FechaCaptura, 
                    G.Segundo_Insert AS HoraCaptura, 
                    G.Fecha_Visita AS FechaVisita, 
                    G.Segundo_Visita AS HoraVisita, 
                    G.idEjecutivo_Visita AS IdEjecutivo,
                    E.Usuario AS Usuario, 
                    E.NombreEjecutivo, 
                    Sucursal.idValor AS IdSucursal, 
                    Sucursal.Valor AS Sucursal, 
                    Contacto.Valor AS Contacto, 
                    Situación.Valor AS Situacion, 
                    G.Comentario  
                FROM dbCollection..GestionesDomiciliarias G 
                INNER JOIN dbCollection..Ejecutivos E ON G.idEjecutivo_Visita = E.idEjecutivo 
                LEFT JOIN dbCollection..ValoresCatálogo Contacto ON G.idContacto = Contacto.idValor 
                LEFT JOIN dbCollection..ValoresCatálogo Situación ON G.idSituación = Situación.idValor 
                LEFT JOIN dbCollection..ValoresCatálogo Sucursal ON G.idSucursal = Sucursal.idValor 
                WHERE G.idCartera = @idCartera AND G.idCuenta = @idCuenta
                ORDER BY G.Fecha_Visita DESC";

            using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
            {
                return await connection.QueryAsync<VisitaEditableDto>(sql, new { idCartera, idCuenta });
            }
        }

        public async Task<int?> ObtenerIdEjecutivoPorUsuarioAsync(string servidor, string usuario)
        {
            string sql = "SELECT idEjecutivo FROM dbCollection..Ejecutivos WHERE Usuario = @Usuario AND idEncargado <> 1";
            using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
            {
                return await connection.QueryFirstOrDefaultAsync<int?>(sql, new { Usuario = usuario });
            }
        }

        public async Task<string?> ObtenerValorActualAsync(string servidor, int idCartera, string idCuenta, DateTime fechaKey, TimeSpan horaKey, string nombreColumnaBD)
        {
            // Usamos interpolación para el nombre de columna (seguro porque viene de un switch interno en el servicio)
            string sql = $@"
                SELECT CAST({nombreColumnaBD} AS VARCHAR(MAX))
                FROM dbCollection..GestionesDomiciliarias
                WHERE idCartera = @idCartera AND idCuenta = @idCuenta AND Fecha_Visita = @fechaKey AND Segundo_Visita = @horaKey";

            using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
            {
                return await connection.QueryFirstOrDefaultAsync<string?>(sql, new { idCartera, idCuenta, fechaKey, horaKey });
            }
        }

        public async Task<bool> ActualizarVisitaAsync(string servidor, int idCartera, string idCuenta, DateTime fechaKey, TimeSpan horaKey, string nombreColumnaBD, object nuevoValor, string valorAnterior, int idEjecutivoSesion)
        {
            using (var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection"))
            {
                await connection.OpenAsync();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        // 1. Update
                        string sqlUpdate = $@"
                            UPDATE dbCollection..GestionesDomiciliarias 
                            SET {nombreColumnaBD} = @nuevoValor 
                            WHERE idCartera=@idCartera AND idCuenta=@idCuenta AND Fecha_Visita=@fechaKey AND Segundo_Visita=@horaKey";

                        int rows = await connection.ExecuteAsync(sqlUpdate, new { nuevoValor, idCartera, idCuenta, fechaKey, horaKey }, transaction);

                        if (rows == 0) return false;

                        // 2. Log (Audit)
                        // Según código original: Concepto = Nombre de la columna, Dato = Valor Anterior
                        string sqlLog = @"
                            INSERT INTO dbCollection..LogArrepentimientos 
                            (FechaHora_Insert, idCartera, idCuenta, idEjecutivo, Concepto, Dato) 
                            VALUES (GETDATE(), @idCartera, @idCuenta, @idEjecutivo, @Concepto, @Dato)";

                        await connection.ExecuteAsync(sqlLog, new
                        {
                            idCartera,
                            idCuenta,
                            idEjecutivo = idEjecutivoSesion,
                            Concepto = nombreColumnaBD,
                            Dato = valorAnterior ?? "" // Manejo de nulls
                        }, transaction);

                        transaction.Commit();
                        return true;
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }
    }
}