using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.ProductividadDTO;
using Loki.Global;
using Loki.Mark.Consulta.Productividad.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections;
using System.Data;
using System.Globalization;

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


        #region Métodos de Utilidad

        private async Task<(DataTable tblEjecutivos, int idEjecutivoAjustado)> ObtenerEjecutivosYCrearTVP(
    SqlConnection connection, int idEjecutivo
)
        {
            // Usamos dynamic para mapear el resultado de fn_EjecutivosPropios
            var ejecutivos = await ClasesCoorinMethods.ObtieneEjecutivosPropios(connection, idEjecutivo);

            DataTable tblEjecutivos = new DataTable("PS.tbl_Ejecutivos");
            tblEjecutivos.Columns.Add("idEjecutivo", typeof(int));
            tblEjecutivos.Columns.Add("Usuario", typeof(string));
            tblEjecutivos.Columns.Add("idEncargado", typeof(int));
            tblEjecutivos.Columns.Add("Encargado", typeof(string)); // Columna que ahora llevará el ID
            tblEjecutivos.Columns.Add("Jerarquía", typeof(byte));
            tblEjecutivos.Columns.Add("NombreEjecutivo", typeof(string));

            Console.WriteLine($"Llenando DataTable...");
            foreach (dynamic e in ejecutivos)
            {
                // === CAMBIO CLAVE AQUÍ ===
                // 1. Obtenemos el ID del encargado (e.IdEncargado).
                // 2. Lo convertimos a cadena (.ToString()).
                // 3. Si es nulo, usamos cadena vacía.
                string encargadoValueForTVP = e.IdEncargado?.ToString() ?? string.Empty;
                // =========================

                tblEjecutivos.Rows.Add(
                    e.IdEjecutivo,
                    e.Usuario,
                    e.IdEncargado ?? 0,
                    encargadoValueForTVP, // <--- Ahora pasará el ID como string (ej: "5649")
                    DBNull.Value,
                    e.NombreEjecutivo
                );
            }

            int idEjecutivoParaSP = idEjecutivo;
            if (tblEjecutivos.Rows.Count > 1)
            {
                idEjecutivoParaSP = 0;
            }

            return (tblEjecutivos, idEjecutivoParaSP);
        }
        private async Task<SqlConnection> AbrirConexionAsync(string servidor, string baseDatos)
        {
            var dbContext = _dbContFactory.GetDbContext(servidor, baseDatos);
            var connection = (SqlConnection)dbContext.Database.GetDbConnection();
            await connection.OpenAsync();
            return connection;
        }

        #endregion

        public async Task<object> ObtieneProductividad(string indicador, int idEjecutivo, string servidor, bool esModoHora = false)
        {
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
                    return await EjecutarConsultaPivot(indicador, idEjecutivo, servidor, "Memory");
                }
                else
                {
                    return await EjecutarStoredProcedure(indicador, idEjecutivo, servidor, "Memory");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error en ObtieneProductividad: {ex.Message}");
                throw;
            }
        }


        private async Task<object> EjecutarStoredProcedure(string indicador, int idEjecutivo, string servidor, string baseDatos)
        {

            SqlConnection connection = null;
            try
            {
                connection = await AbrirConexionAsync(servidor, baseDatos);
                var (tblEjecutivos, idEjecutivoParaSP) = await ObtenerEjecutivosYCrearTVP(connection, idEjecutivo);

                var parameters = new DynamicParameters();
                parameters.Add("@Indicador", indicador);
                parameters.Add("@idEjecutivo", idEjecutivoParaSP);
                parameters.Add("@tbl_Ejecutivos", tblEjecutivos.AsTableValuedParameter("PS.tbl_Ejecutivos"));

                object result = null;

                switch (indicador.ToLower())
                {
                    case "sesiones":
                        // 1. Mapeo RAW
                        var rawSesiones = await connection.QueryAsync<SesionesRawDTO>(
                            "[PS].[ProductividadEnLínea]", parameters, commandType: CommandType.StoredProcedure);

                        // 2. Transformación y Formato
                        result = rawSesiones.Select(r => new SesionesOutputDTO
                        {
                            idEncargado = r.Encargado,
                            Ejecutivo = r.Ejecutivo,
                            Extension = r.Extensión ?? "0",
                            Ingreso = r.Ingreso?.ToString("hh:mm tt", new CultureInfo("es-MX")) ?? string.Empty,
                            Salida = r.Salida?.ToString("hh:mm tt", new CultureInfo("es-MX")) ?? string.Empty,
                            PrimerGestion = r.PrimerGestión?.ToString("hh:mm tt", new CultureInfo("es-MX")) ?? string.Empty,
                            Modo = r.Modo,
                            TiempoEnModo = r.TiempoEnModo?.ToString(@"hh\:mm\:ss") ?? "00:00:00"
                        }).ToList();
                        break;

                    case "contactos":
                    case "negociaciones":
                    case "tiempos":
                    case "tiempopromedio":
                    case "porcentajes":

                        result = await connection.QueryAsync<dynamic>("[PS].[ProductividadEnLínea]", parameters, commandType: CommandType.StoredProcedure);
                        break;
                    default:

                        throw new ArgumentException($"Indicador '{indicador}' no soportado para modo día");
                }

                var resultList = (result as IEnumerable)?.Cast<object>().ToList() ?? new List<object>();
                return resultList;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (connection != null && connection.State == ConnectionState.Open)
                {
                    await connection.CloseAsync();
                }
            }
        }

        private async Task<object> EjecutarConsultaPivot(string indicador, int idEjecutivo, string servidor, string baseDatos)
        {
            SqlConnection connection = null;
            try
            {
                connection = await AbrirConexionAsync(servidor, baseDatos);
                var (tblEjecutivos, _) = await ObtenerEjecutivosYCrearTVP(connection, idEjecutivo);

                string queryPivot = $@"
                SELECT 
                    E.Encargado, E.Usuario as Ejecutivo, P.Hora, P.{indicador} as Valor 
                FROM PS.Productividad P 
                INNER JOIN @tblEjecutivos E ON P.idEjecutivo = E.idEjecutivo 
            ";

                string finalQuery = $@"
                SELECT 
                    Encargado, Ejecutivo, [6] as Hora6, [7] as Hora7, [8] as Hora8, [9] as Hora9, 
                    [10] as Hora10, [11] as Hora11, [12] as Hora12, [13] as Hora13, [14] as Hora14, 
                    [15] as Hora15, [16] as Hora16, [17] as Hora17, [18] as Hora18, [19] as Hora19, 
                    [20] as Hora20, [21] as Hora21, [22] as Hora22
                FROM (
                    {queryPivot}
                ) P 
                PIVOT (
                    SUM(Valor) FOR Hora IN ([6], [7], [8], [9], [10], [11], [12], [13], [14], [15], [16], [17], [18], [19], [20], [21], [22])
                ) AS PVT";


                var parameters = new DynamicParameters();
                parameters.Add("@tblEjecutivos", tblEjecutivos.AsTableValuedParameter("PS.tbl_Ejecutivos"));

                var result = await connection.QueryAsync<PivotedProductividadDTO>(
                    finalQuery,
                    parameters,
                    commandType: CommandType.Text
                );

                return result.ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (connection != null && connection.State == ConnectionState.Open)
                {
                    await connection.CloseAsync();
                }
            }
        }
    }
}