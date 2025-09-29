using System.Data;
using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.ProductividadDTO;
using Loki.Mark.Consulta.Productividad.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using Microsoft.Extensions.Logging;
using Loki.DTOs.SesionesDTOs;
using Loki.Mark.Administracion.Ejecutivos.Encargados.Interfaces;
using System.Diagnostics;
using Microsoft.Data.SqlClient;
using Loki.Global;

namespace Loki.Mark.Consulta.Productividad.Services
{
    public class ProductividadService : IProductividadService
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly IEncargadosService _encargadosService;
        private readonly ILogger<ProductividadService> _logger;

        public ProductividadService(IServiceProvider serviceProvider,
                                  IEncargadosService encargadosService,
                                  ILogger<ProductividadService> logger)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _encargadosService = encargadosService;
            _logger = logger;
        }

        public async Task<List<ProductividadDTO>> obtieneProductividad(string indicador, int idejecutivo, string servidor)
        {
            _logger.LogInformation($"Iniciando obtieneProductividad - Indicador: {indicador}, IdEjecutivo: {idejecutivo}");

            var indicadoresDia = new[] { "Sesiones", "Contactos", "Negociaciones", "Porcentajes", "Tiempos", "Tiempo Promedio" };
            var indicadoresHora = new[] {
                "Cuentas", "Titulares", "Conocidos", "Desconocidos",
                "Sin Contacto", "Negociaciones", "Monto Negociaciones", "Saldo Solucionado"
            };

            if (!indicadoresDia.Contains(indicador, StringComparer.OrdinalIgnoreCase) &&
                !indicadoresHora.Contains(indicador, StringComparer.OrdinalIgnoreCase))
            {
                _logger.LogWarning($"Indicador no válido: {indicador}");
                throw new ArgumentException($"Indicador '{indicador}' no válido");
            }

            try
            {
                return await EjecutarStoredProcedure(indicador, idejecutivo, servidor);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error en obtieneProductividad: {ex.Message}");
                throw;
            }
        }

        private async Task<List<ProductividadDTO>> EjecutarStoredProcedure(string indicador, int idejecutivo, string servidor)
        {
            _logger.LogInformation($"Ejecutando SP para indicador: {indicador}, ejecutivo: {idejecutivo}");

            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");
            var connection = dbContext.Database.GetDbConnection();

            try
            {
                await connection.OpenAsync();


                _logger.LogInformation("Obteniendo ejecutivos propios...");
                var ejecutivos = await ClasesCoorinMethods.ObtieneEjecutivosPropios((SqlConnection)connection, idejecutivo);
                _logger.LogInformation($"Ejecutivos obtenidos: {ejecutivos?.Count ?? 0}");

                // Construir el DataTable para el TVP
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


                var parameters = new DynamicParameters();
                parameters.Add("@Indicador", indicador);
                parameters.Add("@idEjecutivo", idejecutivo);
                parameters.Add("@tbl_Ejecutivos", tblEjecutivos.AsTableValuedParameter("PS.tbl_Ejecutivos"));

                _logger.LogInformation("Ejecutando stored procedure...");
                var result = await connection.QueryAsync<ProductividadDTO>(
                    "[PS].[ProductividadEnLínea]",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                _logger.LogInformation($"SP ejecutado exitosamente. Resultados: {result?.Count() ?? 0}");
                return result.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error en EjecutarStoredProcedure: {ex.Message}");
                throw;
            }
            finally
            {
                await connection.CloseAsync();
            }
        }
    }
}