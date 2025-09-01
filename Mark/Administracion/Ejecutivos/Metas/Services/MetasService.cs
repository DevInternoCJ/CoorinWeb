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

        public async Task<IEnumerable<ProductividadDTO>> ObtenerMetasEjecutivos(string servidor, List<int> ejecutivoIdsPropios)
        {
            // Definir el tipo de base de datos desde código
            string tipoBase = "Collection"; // O la lógica para determinarlo

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
                    E.idEjecutivo AS IdEjecutivo,
                    ISNULL(M.Cuentas, 0) AS Cuentas,
                    ISNULL(M.Titulares, 0) AS Titulares,
                    ISNULL(M.Negociaciones, 0) AS Negociaciones,
                    ISNULL(M.Cumplimientos, 0) AS Cumplimientos,
                    ISNULL(M.MontoCumplido, 0) AS MontoCumplido,
                    ISNULL(M.SaldoSolucionado, 0) AS SaldoSolucionado,
                    M.HoraEntrada,
                    M.HoraSalida,
                    M.Segmento
                FROM MetasEjecutivo M
                RIGHT JOIN dbo.Ejecutivos E ON E.idEjecutivo = M.idEjecutivo
                WHERE E.idEjecutivo IN @EjecutivoIds;";

                try
                {
                    _logger.LogDebug("Ejecutando query: {Query}", query);

                    var resultados = await connection.QueryAsync<ProductividadDTO>(query, new { EjecutivoIds = ejecutivoIdsPropios });

                    _logger.LogInformation("Consulta exitosa. Se encontraron {Count} registros", resultados.Count());

                    if (!resultados.Any())
                    {
                        _logger.LogWarning("No se encontraron metas para los ejecutivos especificados");
                    }
                    else
                    {
                        _logger.LogDebug("Resultados encontrados: {@Resultados}", resultados);
                    }

                    return resultados.Select(r => { r.server = servidor; return r; }).ToList();
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