using System.Data;
using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.ProductividadDTO;
using Loki.Mark.Consulta.Productividad.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Data.SqlClient;
using Loki.Global;

namespace Loki.Mark.Consulta.Productividad.Services
{
    public class ProductividadService : IProductividadService
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly ILogger<ProductividadService> _logger;

        public ProductividadService(IServiceProvider serviceProvider, ILogger<ProductividadService> logger)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _logger = logger;
        }

        public async Task<object> obtieneProductividad(string indicador, int idEjecutivo, string servidor, bool esModoHora = false)
        {
            Console.WriteLine($"=== INICIANDO obtieneProductividad ===");
            Console.WriteLine($"Indicador: {indicador}");
            Console.WriteLine($"idEjecutivo: {idEjecutivo}");
            Console.WriteLine($"servidor: {servidor}");
            Console.WriteLine($"esModoHora: {esModoHora}");

            var indicadoresDia = new[] { "Sesiones", "Contactos", "Negociaciones", "Porcentajes", "Tiempos", "TiempoPromedio" };
            var indicadoresHora = new[] {
                "Cuentas", "Titulares", "Conocidos", "Desconocidos",
                "SinContacto", "Negociaciones", "MontoNegociaciones", "SaldoSolucionado"
            };

            if (esModoHora && !indicadoresHora.Contains(indicador, StringComparer.OrdinalIgnoreCase))
            {
                throw new ArgumentException($"Indicador '{indicador}' no válido para modo hora");
            }
            if (!esModoHora && !indicadoresDia.Contains(indicador, StringComparer.OrdinalIgnoreCase))
            {
                throw new ArgumentException($"Indicador '{indicador}' no válido para modo día");
            }

            try
            {
                if (esModoHora)
                {
                    Console.WriteLine($"MODO: HORA (PIVOT)");
                    return await EjecutarConsultaPivot(indicador, idEjecutivo, servidor);
                }
                else
                {
                    Console.WriteLine($"MODO: DÍA (STORED PROCEDURE)");
                    return await EjecutarStoredProcedure(indicador, idEjecutivo, servidor);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ ERROR en obtieneProductividad: {ex.Message}");
                Console.WriteLine($"Stack: {ex.StackTrace}");
                _logger.LogError(ex, $"Error en obtieneProductividad: {ex.Message}");
                throw;
            }
        }

        private async Task<object> EjecutarStoredProcedure(string indicador, int idEjecutivo, string servidor)
        {
            Console.WriteLine($"=== EJECUTANDO STORED PROCEDURE ===");
            Console.WriteLine($"Indicador: {indicador}");
            Console.WriteLine($"idEjecutivo: {idEjecutivo}");
            Console.WriteLine($"servidor: {servidor}");

            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");
            var connection = dbContext.Database.GetDbConnection();

            Console.WriteLine($"Cadena conexión: {connection.ConnectionString}");

            try
            {
                Console.WriteLine($"Abriendo conexión...");
                await connection.OpenAsync();
                Console.WriteLine($"✅ Conexión abierta");

                Console.WriteLine($"Obteniendo ejecutivos propios...");
                var ejecutivos = await ClasesCoorinMethods.ObtieneEjecutivosPropios((SqlConnection)connection, idEjecutivo);
                Console.WriteLine($"✅ Ejecutivos obtenidos: {ejecutivos?.Count ?? 0}");

                DataTable tblEjecutivos = new DataTable();
                tblEjecutivos.Columns.Add("idEjecutivo", typeof(int));
                tblEjecutivos.Columns.Add("Usuario", typeof(string));
                tblEjecutivos.Columns.Add("idEncargado", typeof(int));
                tblEjecutivos.Columns.Add("Encargado", typeof(string));
                tblEjecutivos.Columns.Add("Jerarquía", typeof(byte));
                tblEjecutivos.Columns.Add("NombreEjecutivo", typeof(string));

                Console.WriteLine($"Llenando DataTable...");
                foreach (var e in ejecutivos)
                {
                    Console.WriteLine($"  - Ejecutivo: {e.IdEjecutivo}, Usuario: {e.Usuario}");
                    tblEjecutivos.Rows.Add(
                        e.IdEjecutivo,
                        e.Usuario,
                        e.IdEncargado ?? 0,
                        DBNull.Value,
                        DBNull.Value,
                        e.NombreEjecutivo
                    );
                }
                Console.WriteLine($"✅ DataTable llenado: {tblEjecutivos.Rows.Count} filas");

                var parameters = new DynamicParameters();
                parameters.Add("@Indicador", indicador);
                parameters.Add("@idEjecutivo", idEjecutivo);
                parameters.Add("@tbl_Ejecutivos", tblEjecutivos.AsTableValuedParameter("PS.tbl_Ejecutivos"));

                Console.WriteLine($"Parámetros SP:");
                Console.WriteLine($"  - @Indicador: {indicador}");
                Console.WriteLine($"  - @idEjecutivo: {idEjecutivo}");
                Console.WriteLine($"  - @tbl_Ejecutivos: {tblEjecutivos.Rows.Count} filas");

                object result;

                // CORRECCIÓN: Usar switch tradicional en lugar de switch expression
                if (idEjecutivo == 0)
                {
                    Console.WriteLine($"MODO: GRUPAL (idEjecutivo = 0)");

                    switch (indicador.ToLower())
                    {
                        case "sesiones":
                            result = await connection.QueryAsync<SesionesDTO>("[PS].[ProductividadEnLínea]", parameters, commandType: CommandType.StoredProcedure);
                            break;
                        case "contactos":
                            result = await connection.QueryAsync<ContactosDTO>("[PS].[ProductividadEnLínea]", parameters, commandType: CommandType.StoredProcedure);
                            break;
                        case "porcentajes":
                            result = await connection.QueryAsync<PorcentajesDTO>("[PS].[ProductividadEnLínea]", parameters, commandType: CommandType.StoredProcedure);
                            break;
                        case "negociaciones":
                            result = await connection.QueryAsync<NegociacionesDTO>("[PS].[ProductividadEnLínea]", parameters, commandType: CommandType.StoredProcedure);
                            break;
                        case "tiempos":
                            result = await connection.QueryAsync<TiemposDTO>("[PS].[ProductividadEnLínea]", parameters, commandType: CommandType.StoredProcedure);
                            break;
                        case "tiempopromedio":
                            result = await connection.QueryAsync<TiempoPromedioDTO>("[PS].[ProductividadEnLínea]", parameters, commandType: CommandType.StoredProcedure);
                            break;
                        default:
                            throw new ArgumentException($"Indicador '{indicador}' no soportado para modo grupal");
                    }
                }
                else
                {
                    Console.WriteLine($"MODO: INDIVIDUAL (idEjecutivo = {idEjecutivo})");

                    switch (indicador.ToLower())
                    {
                        case "sesiones":
                            result = await connection.QueryAsync<SesionesIndividualDTO>("[PS].[ProductividadEnLínea]", parameters, commandType: CommandType.StoredProcedure);
                            break;
                        case "contactos":
                            result = await connection.QueryAsync<ProductividadIndividualDTO>("[PS].[ProductividadEnLínea]", parameters, commandType: CommandType.StoredProcedure);
                            break;
                        case "negociaciones":
                            result = await connection.QueryAsync<NegociacionesIndividualDTO>("[PS].[ProductividadEnLínea]", parameters, commandType: CommandType.StoredProcedure);
                            break;
                        default:
                            throw new ArgumentException($"Indicador '{indicador}' no soportado para modo individual");
                    }
                }

                // Convertir a lista y contar resultados
                var resultList = (result as System.Collections.IEnumerable)?.Cast<object>().ToList() ?? new List<object>();
                Console.WriteLine($"✅ SP ejecutado. Resultados: {resultList.Count} filas");

                if (resultList.Count > 0)
                {
                    foreach (var item in resultList)
                    {
                        Console.WriteLine($"  - Item: {System.Text.Json.JsonSerializer.Serialize(item)}");
                    }
                }
                else
                {
                    Console.WriteLine($"  - ⚠️  NO HAY RESULTADOS");
                }

                return resultList;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ ERROR en EjecutarStoredProcedure: {ex.Message}");
                Console.WriteLine($"Stack: {ex.StackTrace}");
                _logger.LogError(ex, $"Error en EjecutarStoredProcedure: {ex.Message}");
                throw;
            }
            finally
            {
                Console.WriteLine($"Cerrando conexión...");
                await connection.CloseAsync();
                Console.WriteLine($"✅ Conexión cerrada");
            }
        }

        private async Task<object> EjecutarConsultaPivot(string indicador, int idEjecutivo, string servidor)
        {
            Console.WriteLine($"=== EJECUTANDO CONSULTA PIVOT ===");
            Console.WriteLine($"Indicador: {indicador}");
            Console.WriteLine($"idEjecutivo: {idEjecutivo}");
            Console.WriteLine($"servidor: {servidor}");

            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");
            var connection = dbContext.Database.GetDbConnection();

            try
            {
                await connection.OpenAsync();

                var ejecutivos = await ClasesCoorinMethods.ObtieneEjecutivosPropios((SqlConnection)connection, idEjecutivo);

                DataTable tblEjecutivos = new DataTable();
                tblEjecutivos.Columns.Add("idEjecutivo", typeof(int));
                tblEjecutivos.Columns.Add("Usuario", typeof(string));
                tblEjecutivos.Columns.Add("idEncargado", typeof(int));
                tblEjecutivos.Columns.Add("Encargado", typeof(string));
                tblEjecutivos.Columns.Add("Jerarquía", typeof(byte));
                tblEjecutivos.Columns.Add("NombreEjecutivo", typeof(string));

                foreach (var e in ejecutivos)
                {
                    tblEjecutivos.Rows.Add(
                        e.IdEjecutivo,
                        e.Usuario,
                        e.IdEncargado ?? 0,
                        DBNull.Value,
                        DBNull.Value,
                        e.NombreEjecutivo
                    );
                }

                string queryPivot = @"
                    SELECT 
                        Encargado, Ejecutivo, [6] as Hora6, [7] as Hora7, [8] as Hora8, [9] as Hora9, 
                        [10] as Hora10, [11] as Hora11, [12] as Hora12, [13] as Hora13, [14] as Hora14, 
                        [15] as Hora15, [16] as Hora16, [17] as Hora17, [18] as Hora18, [19] as Hora19, 
                        [20] as Hora20, [21] as Hora21, [22] as Hora22
                    FROM (
                        SELECT 
                            E.Encargado, E.Usuario as Ejecutivo, P.Hora, P.{0} as Valor 
                        FROM dbMemory.PS.Productividad P 
                        INNER JOIN @tblEjecutivos E ON P.idEjecutivo = E.idEjecutivo 
                    ) P 
                    PIVOT (
                        SUM(Valor) FOR Hora IN ([6], [7], [8], [9], [10], [11], [12], [13], [14], [15], [16], [17], [18], [19], [20], [21], [22])
                    ) AS PVT";

                queryPivot = string.Format(queryPivot, indicador);

                var parameters = new DynamicParameters();
                parameters.Add("@tblEjecutivos", tblEjecutivos.AsTableValuedParameter("PS.tbl_Ejecutivos"));

                var result = await connection.QueryAsync<PivotedProductividadDTO>(
                    queryPivot,
                    parameters,
                    commandType: CommandType.Text
                );

                var resultList = result.ToList();
                Console.WriteLine($"✅ PIVOT ejecutado. Resultados: {resultList.Count} filas");

                return resultList;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ ERROR en EjecutarConsultaPivot: {ex.Message}");
                _logger.LogError(ex, $"Error en EjecutarConsultaPivot: {ex.Message}");
                throw;
            }
            finally
            {
                await connection.CloseAsync();
            }
        }
    }
}