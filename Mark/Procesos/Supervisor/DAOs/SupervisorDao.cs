using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.EjecutivosDTO;
using Loki.DTOs.SupervisorDTO;
using Loki.Mark.Procesos.Procesos.Interfaces;
using System.Collections;
using System.Data;
using static CoorinWeb.Loki.Global.AccionamientosQueryHelper;

namespace Loki.Mark.Procesos.Procesos.DAOs
{
    public class SupervisorDao : ISupervisorDao
    {
        private readonly IDbContextFactory _dbContFactory;
        private readonly AccionamientosQueryHelper _accionamientosQueryHelper;

        public SupervisorDao(IDbContextFactory dbContFactory, AccionamientosQueryHelper accionamientosQueryHelper)
        {
            _dbContFactory = dbContFactory;
            _accionamientosQueryHelper = accionamientosQueryHelper;
        }

        public async Task<(bool success, string message)> insertaCuentas(string servidor,int idCartera,int idConsulta,int iFilas,List<EjecutivoDto> ejecutivos)
        {
            using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "Collection");

            if (sqlConnection.State != ConnectionState.Open)
                await sqlConnection.OpenAsync();

            using var transaction = await sqlConnection.BeginTransactionAsync();

            try
            {
                int totalInsertados = 0;
                var alColumnas = new ArrayList();

                // Obtener SqlQueryData
                SqlQueryData queryData = ConsultaGenerador.QueryCuentas(idConsulta, ref alColumnas);

                // Verificar si el query data es válido
                if (queryData == null || string.IsNullOrEmpty(queryData.Query))
                {
                    return (false, "No se pudo generar la consulta de cuentas");
                }

                string sQuerya = queryData.Query;

                foreach (var ejecutivo in ejecutivos.Where(e => e.Asignar))
                {
                    // Primero eliminar registros existentes del día
                    string deleteQuery = @"
                        DELETE FROM dbCollection.dbo.Revisiones 
                        WHERE idEjecutivo = @idEjecutivo 
                        AND Fecha = CONVERT(DATE, GETDATE())";

                    await sqlConnection.ExecuteAsync(deleteQuery,
                        new { idEjecutivo = ejecutivo.idEjecutivo }, transaction);

                    // Insertar nuevas cuentas
                    string insertQuery = $@"
                        INSERT INTO dbCollection.dbo.Revisiones (Fecha, idEjecutivo, idCartera, idCuenta)
                        SELECT TOP {iFilas} 
                            GETDATE() AS Fecha, 
                            {ejecutivo.idEjecutivo} AS idEjecutivo, 
                            CC.idCartera, 
                            CC.idCuenta 
                        FROM ({sQuerya}) CC  
                        WHERE NOT EXISTS (
                            SELECT 1 FROM dbCollection.dbo.Revisiones R 
                            WHERE R.idCartera = CC.idCartera 
                            AND R.idCuenta = CC.idCuenta 
                            AND (
                                (R.Realizado = 1 AND R.Fecha >= DATEADD(DAY, -30, GETDATE())) 
                                OR R.Fecha = CAST(GETDATE() AS DATE)
                            )
                        ) 
                        ORDER BY NEWID()";

                    int filasInsertadas = await sqlConnection.ExecuteAsync(insertQuery, null, transaction);
                    totalInsertados += filasInsertadas;
                }

                await transaction.CommitAsync();
                return (true, $"Cuentas insertadas correctamente. Total: {totalInsertados}");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return (false, $"Error al insertar cuentas: {ex.Message}");
            }
        }
    }
}