using System.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Loki.Mark.Consulta.Cuenta.Interfaces;
using CoorinWeb.Loki.Global;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Consulta.Cuenta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CatalogoController : ControllerBase
    {
        private readonly ICatalogosServiceRe _catalogosService;
        private readonly IDbContextFactory _dbContFactory;
        private const string TipoBase = "Collection";

        public CatalogoController(ICatalogosServiceRe catalogosService, IDbContextFactory dbContFactory)
        {
            _catalogosService = catalogosService;
            _dbContFactory = dbContFactory;
        }

        private bool ValidarClaimServidor(out string servidorClaim)
        {
            servidorClaim = User.FindFirst("Servidor")?.Value ?? string.Empty;
            return !string.IsNullOrWhiteSpace(servidorClaim);
        }

        private List<Dictionary<string, object>> DataTableToList(DataTable dt)
        {
            return dt.AsEnumerable()
                     .Select(dr => dt.Columns.Cast<DataColumn>()
                     .ToDictionary(col => col.ColumnName, col => dr[col]))
                     .ToList();
        }

        [HttpGet("CargarCatalogos")]
        [Authorize]
        [SwaggerOperation(
             Summary = "Cargar catálogos - Irene",
             Description = "Carga la lista de catálogos"
         )]
        public async Task<IActionResult> CargarCatalogos([FromQuery] string servidor)
        {
            const string tipoBase = "Collection"; // Valor fijo

            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            try
            {
                bool resultado = await _catalogosService.CargarCatalogosAsync(_dbContFactory, servidorClaim, tipoBase);
                if (!resultado)
                    return StatusCode(500, "Falló al cargar los catálogos.");

                var ds = _catalogosService.ObtenerDataSet();
                var catalogos = ds.Tables.Contains("Catálogos")
                    ? DataTableToList(ds.Tables["Catálogos"])
                    : new List<Dictionary<string, object>>();
                var valores = ds.Tables.Contains("ValoresCatálogo")
                    ? DataTableToList(ds.Tables["ValoresCatálogo"])
                    : new List<Dictionary<string, object>>();

                return Ok(new { Catalogos = catalogos, Valores = valores });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Error al cargar catálogos: {ex.Message}" });
            }
        }

        [HttpGet("UsuariosRH")]
        [Authorize]
        [SwaggerOperation(
            Summary = "usuarios RH - irene",
            Description = ""
            )]

        public async Task<(DataTable dt, int idEjecutivo, string mensaje)> CargarUsuariosRHAsync(IDbContextFactory dbContextFactory, string servidor, string tipoBase, string usuarioRH)
        {
            var dtUsuariosRH = new DataTable("UsuariosRH");
            int idEjecutivo = 0;
            string mensaje = string.Empty;

            try
            {
                using var conn = dbContextFactory.GetSqlConnection(servidor, tipoBase);

                // --- 1. Obtener idEjecutivo ---
                const string queryId = @"
        SELECT idEjecutivo 
        FROM dbCollection..Ejecutivos 
        WHERE LOWER(Usuario) = LOWER(@Usuario)";

                using (var cmd = new SqlCommand(queryId, conn))
                {
                    cmd.Parameters.AddWithValue("@Usuario", usuarioRH);

                    await conn.OpenAsync();
                    var result = await cmd.ExecuteScalarAsync();
                    idEjecutivo = result != null ? Convert.ToInt32(result) : 0;
                }

                Console.WriteLine($"idEjecutivo encontrado para '{usuarioRH}': {idEjecutivo}");

                if (idEjecutivo == 0)
                {
                    mensaje = $"No se encontró idEjecutivo para el usuario '{usuarioRH}'";
                    Console.WriteLine($"⚠ {mensaje}");
                    return (dtUsuariosRH, idEjecutivo, mensaje);
                }

                // --- 2. Obtener datos de Usuarios RH ---
                const string queryUsuarios = "SELECT IdEjecutivo AS Num_Empleado, Nombreejecutivo AS Nombre_Ejecutivo FROM [dbCollection].[dbo].[fn_Encuesta2da] (@IdEjecutivo)";

                using (var cmd = new SqlCommand(queryUsuarios, conn))
                {
                    cmd.Parameters.AddWithValue("@IdEjecutivo", idEjecutivo);

                    using var da = new SqlDataAdapter(cmd);
                    da.Fill(dtUsuariosRH);
                }

                mensaje = $"Se encontraron {dtUsuariosRH.Rows.Count} registros para el idEjecutivo {idEjecutivo}";
                Console.WriteLine($"✅ {mensaje}");

                return (dtUsuariosRH, idEjecutivo, mensaje);
            }
            catch (Exception ex)
            {
                mensaje = $"Error al cargar usuarios RH: {ex.Message}";
                Console.WriteLine(mensaje);
                return (dtUsuariosRH, idEjecutivo, mensaje);
            }
        }

        //[HttpGet("Evidencia")]
        //[Authorize]
        //[SwaggerOperation(
        //    Summary = "evidencia - irene",
        //    Description = ""
        //    )]
        //public async Task<IActionResult> ObtenerEvidencia([FromQuery] string servidor)
        //{
        //    if (!ValidarClaimServidor(out var servidorClaim))
        //        return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

        //    try
        //    {
        //        var dt = await _catalogosService.CargarEvidenciaAsync(_dbContFactory, servidor, TipoBase);
        //        return Ok(DataTableToList(dt));
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { error = $"Error al cargar evidencia: {ex.Message}" });
        //    }
        //}

        [HttpGet("Versionamiento")]
        [Authorize]
        [SwaggerOperation(
             Summary = "versionamiento - irene",
             Description = ""
         )]
        public async Task<IActionResult> ObtenerVersionamiento()
        {
            const string tipoBase = "Collection"; // valor fijo

            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            try
            {
                bool resultado = await _catalogosService.CargarVersionamientoAsync(_dbContFactory, servidorClaim, tipoBase);
                if (!resultado)
                    return StatusCode(500, "Falló al cargar la información de versionamiento.");

                var ds = _catalogosService.ObtenerDataSet();
                var dtVersiones = ds.Tables.Contains("Versionamiento") ? ds.Tables["Versionamiento"] : new DataTable();

                return Ok(DataTableToList(dtVersiones));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Error al obtener versionamiento: {ex.Message}" });
            }
        }

        [HttpGet("ColumnasProducto")]
        [Authorize]
        [SwaggerOperation(Summary = "columnas producto - irene", Description = "")]
        public async Task<IActionResult> ColumnasProducto([FromQuery] int idProducto) // Cambiado de object a int
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            if (idProducto <= 0) // Validación más específica
                return BadRequest(new { error = "Debe enviar un idProducto válido." });

            try
            {
                await _catalogosService.CargarColumnasProductoAsync(_dbContFactory, servidorClaim, "Collection", idProducto);

                string tableName = $"Producto_{idProducto}";
                var ds = _catalogosService.ObtenerDataSet();

                if (!ds.Tables.Contains(tableName) || ds.Tables[tableName].Rows.Count == 0)
                    return NotFound(new { error = $"No se encontraron columnas para el producto {idProducto}." });

                return Ok(DataTableToList(ds.Tables[tableName]));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Error al obtener columnas: {ex.Message}" });
            }
        }
    }
}
