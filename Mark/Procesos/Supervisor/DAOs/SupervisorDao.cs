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

        /// <summary>
        /// Inserta cuentas a revisión para los ejecutivos seleccionados.
        /// </summary>
        public async Task<(bool Success, string Message)> InsertarCuentas(InsertarCuentasRequest request, string servidor)
        {
            var consultaRow = AccionamientosQueryHelper.ConsultaGenerador.ObtenerConsulta(request.idConsulta);
            if (consultaRow == null)
            {
                try
                {
                    await AccionamientosQueryHelper.ConsultaGenerador.CargarDesdeBDAsync(_dbContFactory, servidor);
                    consultaRow = AccionamientosQueryHelper.ConsultaGenerador.ObtenerConsulta(request.idConsulta);
                }
                catch (Exception ex)
                {
                    return (false, $"Error crítico al cargar configuraciones: {ex.Message}");
                }
            }

            if (consultaRow == null) return (false, $"El idConsulta {request.idConsulta} no existe.");

            // 2. GENERACIÓN DEL QUERY
            int iFilas = request.NumeroCuentasAAsignar;
            ArrayList alColumnas = new ArrayList();

            var cuentasQueryData = AccionamientosQueryHelper.ConsultaGenerador.QueryCuentas(request.idConsulta, ref alColumnas);
            string sQuerya = cuentasQueryData.Query;

            // --- LOG 1: VERIFICAR EL QUERY INTERNO ---
            Console.WriteLine($"[DEBUG] ID CONSULTA: {request.idConsulta}");
            Console.WriteLine(sQuerya); 


            if (string.IsNullOrEmpty(sQuerya))
            {
                return (false, "Falló al generar el query base. String vacío.");
            }

            string sQueryInsertBase =
                  "DELETE FROM dbCollection.dbo.Revisiones WHERE idEjecutivo = @idEjecutivo AND Fecha = CONVERT(DATE, GETDATE()); \n" +
                  "INSERT INTO dbCollection.dbo.Revisiones (Fecha, idEjecutivo, idCartera, idCuenta) ";

            try
            {
                using var conn = _dbContFactory.GetSqlConnection(servidor, "Collection");
                await conn.OpenAsync();

                using var transaction = conn.BeginTransaction();

                foreach (var ejecutivo in request.Ejecutivos)
                {
                    if (ejecutivo.Asignar)
                    {
                        string sTop5 =
                            $"SELECT TOP {iFilas} GETDATE() Fecha, {ejecutivo.idEjecutivo}, CC.idCartera, CC.idCuenta \r\n" +
                            "FROM ( \r\n " + sQuerya + "\t) CC  \r\n " +
                            "WHERE NOT EXISTS ( \r\n " +
                            "   SELECT 1 FROM dbCollection.dbo.Revisiones R WITH (NOLOCK) \r\n " +
                            "    WHERE R.idCartera = CC.idCartera AND R.idCuenta = CC.idCuenta \n\r" +
                            "AND (R.Realizado = 1 AND R.Fecha >= DATEADD(DAY, - 30, GETDATE()) \n\r" +
                            " OR R.Fecha = CAST(GETDATE() AS DATE) ) \n\r" +
                            ") ORDER BY NEWID() ";

                        string finalQuery = sQueryInsertBase + "\r\n" + sTop5;
                        if (request.Ejecutivos.IndexOf(ejecutivo) == 0)
                        {

                        }

                        var parameters = new { idEjecutivo = ejecutivo.idEjecutivo };
                        await conn.ExecuteAsync(finalQuery, parameters, transaction);
                    }
                }

                transaction.Commit();
                return (true, "Cuentas insertadas correctamente.");
            }
            catch (Exception ex)
            {
                return (false, $"Falló al insertar cuentas a revisión. Error: {ex.Message}");
            }
        }
    }
}