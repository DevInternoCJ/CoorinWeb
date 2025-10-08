using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.EjecutivosDTO;
using Loki.Mark.Administracion.Ejecutivos.Metas.Interfaces;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Data;
using Microsoft.Extensions.Logging;

namespace Loki.Mark.Administracion.Ejecutivos.Metas.Services
{
    public class MetasService : IMetasService
    {
        public MetasService(IServiceProvider serviceProvider, ILogger<MetasService> logger)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _logger = logger;
        }

        private readonly CustomDbContextFactory _dbContFactory;
        private readonly ILogger<MetasService> _logger;

        public async Task<IEnumerable<MetasRequest>> ObtenerMetasEjecutivos(string servidor, List<int> ejecutivoIdsPropios)
        {
            string tipoBase = "Collection";

            // Logging de información de conexión
            _logger.LogInformation("Conectando a la base de datos - Servidor: {Servidor}, Base: {TipoBase}", servidor, tipoBase);
            _logger.LogInformation("Consultando metas para ejecutivos: {EjecutivoIds}", string.Join(", ", ejecutivoIdsPropios));

            using (var connection = _dbContFactory.GetSqlConnection(servidor, tipoBase))
            {
                if (connection.State != ConnectionState.Open)
                {
                    await connection.OpenAsync();
                    _logger.LogDebug("Conexión abierta exitosamente");
                }

                var query = @"
                SELECT 
                    Cast(0 AS BIT) as Cambiar, 
                    E.idEjecutivo as IdEjecutivo, 
                    E.NombreEjecutivo as Ejecutivo, 
                    E.Usuario,  
                    ISNULL(M.Cuentas, 0) as Cuentas, 
                    ISNULL(M.Titulares, 0) as Titulares, 
                    ISNULL(M.Negociaciones, 0) as Negociaciones, 
                    ISNULL(M.Cumplimientos, 0) as Cumplimientos, 
                    ISNULL(M.MontoCumplido, 0) as MontoCumplido, 
                    ISNULL(M.SaldoSolucionado, 0) as SaldoSolucionado, 
                    E.idEncargado as IdEncargado, 
                    M.Segmento, 
                    M.HoraEntrada, 
                    M.HoraSalida, 
                    CASE WHEN M.idEjecutivo IS NOT NULL THEN 0 ELSE 1 END as Nuevo 
                FROM Ejecutivos E 
                    LEFT JOIN MetasEjecutivo M ON E.idEjecutivo = M.idEjecutivo 
                WHERE E.idEjecutivo IN @EjecutivoIds";

                try
                {
                    _logger.LogDebug("Ejecutando query: {Query}", query);

                    var resultados = await connection.QueryAsync<MetasRequest>(query, new { EjecutivoIds = ejecutivoIdsPropios });

                    _logger.LogInformation("Consulta exitosa. Se encontraron {Count} registros", resultados.Count());

                    foreach (var resultado in resultados)
                    {
                        resultado.Server = servidor;
                    }

                    return resultados;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error al ejecutar la consulta de metas para ejecutivos {EjecutivoIds}",
                        string.Join(", ", ejecutivoIdsPropios));
                    throw;
                }
            }
        }
    }
}