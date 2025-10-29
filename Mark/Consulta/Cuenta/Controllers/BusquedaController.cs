using Microsoft.AspNetCore.Mvc;
using Loki.DTOs.BusquedaDTOs; // Asegúrate de que este using sea correcto para tus DTOs de búsqueda
using Loki.Mark.Consulta.Cuenta.Interfaces; // Asegúrate de que IBusqueda esté aquí
using Microsoft.AspNetCore.Authorization; // Para el atributo [Authorize]
using System.IO; // Para Path
using System.Net.Mime; // Para MediaTypeNames
using System.Threading.Tasks; // Para Task
using Microsoft.AspNetCore.Http;
using Swashbuckle.AspNetCore.Annotations;
using Loki.Global;
using System.Data;
using static CoorinWeb.Loki.Global.AccionamientosQueryHelper;
using CoorinWeb.Loki.Global;
using Loki.Mark.Administracion.Carteras.Interfaces;
using System.Collections;
using CoorinWeb.Loki.Common; // Para StatusCodes

namespace Loki.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize] // Asegura que solo usuarios autenticados puedan acceder a este controlador
    public class BusquedasController : ControllerBase
    {
        private readonly IBusqueda _busquedasService; // Inyecta la interfaz del servicio de búsquedas
        private readonly IDbContextFactory _dbContextFactory;
        private readonly ILogger<BusquedasController> _logger;
        private readonly ICarterasDAOs _carterasDao;

        public BusquedasController(IBusqueda busquedasService, ILogger<BusquedasController> logger, IDbContextFactory dbContextFactory, ICarterasDAOs carterasdao)
        {
            _busquedasService = busquedasService;
            _logger = logger;
            _dbContextFactory = dbContextFactory;
            _carterasDao = carterasdao;
        }

        /// <summary>
        /// Realiza una búsqueda de cuentas basada en los criterios proporcionados.
        /// Este endpoint procesa los filtros y agrupaciones, y devuelve un resultado
        /// que puede ser un resumen en JSON o un enlace para descargar un Excel.
        /// </summary>
        /// <param name="criteria">DTO con los criterios de búsqueda (filtros, agrupaciones, tipo de resultado, etc.).</param>
        /// <returns>Un SearchResultDto con el mensaje de resultado, datos (si es conteo) o ruta de descarga (si es detalle).</returns>
        [HttpPost("realizar-busqueda")]
        [Authorize]
        [SwaggerOperation(
            Summary = "realizar busqueda - irene",
            Description = "realiza una busqueda por medio de idconsulta o parametros y agrupamientos"
            )]
        public async Task<IActionResult> RealizarBusqueda([FromBody] SearchCriteriaDto criteria)
        {
            try
            {
                // Validaciones básicas
                if (string.IsNullOrWhiteSpace(criteria.Servidor))
                    return BadRequest(new { error = "Debe proporcionar el nombre del servidor." });

                if (criteria.IdProducto == 0 || criteria.IdCartera == 0)
                    return BadRequest(new { error = "Debe proporcionar IdProducto y IdCartera." });

                // Llamada al servicio de búsqueda
                var result = await _busquedasService.RealizaBusqueda(
                    idProducto: criteria.IdProducto,
                    idCartera: criteria.IdCartera,
                    servidor: criteria.Servidor,
                    esDetalleResultado: criteria.EsDetalleResultado,
                    jerarquiaEjecutivo: criteria.JerarquiaEjecutivo,
                    idConsulta: criteria.IdConsulta,
                    parametrosExtra: criteria.Parametros,
                    agruparExtra: criteria.Agrupar,  // ← Pasar las agrupaciones
                    desdeFecha: criteria.DesdeFecha
                );

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }


        /// <summary>
        /// Permite la descarga de un archivo Excel previamente generado por una búsqueda de detalle.
        /// El frontend llamará a este endpoint con el nombre del archivo recibido en el SearchResultDto.
        /// </summary>
        /// <param name="filename">El nombre del archivo Excel a descargar (sin ruta, solo el nombre).</param>
        /// <returns>El archivo Excel como un flujo de bytes para descarga.</returns>
        [HttpGet("download-excel")]
        [Authorize]
        [SwaggerOperation(
            Summary = "descargar excel - Ramón",
            Description = "descarga en un excel los datos obtenidos de la busqueda"
            )]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult DownloadExcel([FromQuery] string filename)
        {
            if (string.IsNullOrWhiteSpace(filename))
                return BadRequest("El nombre del archivo es obligatorio.");

            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "ExcelExports", filename);

            if (!System.IO.File.Exists(filePath))
                return NotFound("El archivo no existe o ya fue eliminado.");

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename);
        }

        [HttpPost("guardar-consulta")]
        [AllowAnonymous]
        [SwaggerOperation(
           Summary = "guardar/eliminar consulta - irene",
           Description = "Se genera una consulta personalizada para reutilizarla posteriormente"
        )]

        public async Task<ActionResult<string>> GuardarConsulta([FromBody] GuardarConsultaRequest request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            // Preparar DataTable de parámetros
 
            var parametros = new DataTable();
            parametros.Columns.Add("idConsulta", typeof(int)); 
            parametros.Columns.Add("Concepto", typeof(string));
            parametros.Columns.Add("Campo", typeof(string));
            parametros.Columns.Add("Valores", typeof(string));
            parametros.Columns.Add("Parámetros", typeof(string));
            parametros.Columns.Add("Dato", typeof(string));

            foreach (var p in request.Parametros)
            {
                var row = parametros.NewRow();
                row["Concepto"] = p.Concepto;
                row["Campo"] = p.Campo;
                row["Valores"] = p.Valores;
                row["Parámetros"] = p.Parámetros;
                row["Dato"] = p.Dato;
                parametros.Rows.Add(row);
            }

            // Preparar DataTable de agrupar
            var agrupar = new DataTable();
            agrupar.Columns.Add("idConsulta", typeof(int)); 
            agrupar.Columns.Add("Campo", typeof(string));
            agrupar.Columns.Add("Concepto", typeof(string));

            foreach (var a in request.Agrupar)
            {
                var row = agrupar.NewRow();
                row["Campo"] = a.Campo;
                row["Concepto"] = a.Concepto;
                agrupar.Rows.Add(row);
            }

            string tipoBase = "Collection";

            var result = await _busquedasService.GuardarConsulta(
                request.idConsulta,          
                request.NombreConsulta,
                request.IdProducto,
                request.IdCartera,
                parametros,
                agrupar,
                request.Desde,
                request.IdEjecutivo,
                servidorClaim,
                tipoBase
            );

            if (result.StartsWith("Error:", StringComparison.OrdinalIgnoreCase))
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("carga-filas-trabajo")]
        [SwaggerOperation(
              Summary = "cargar filas de trabajo - Irene",
              Description = "Carga filas de trabajo a una campaña en búsqueda (admite idConsulta + parámetros/agrupaciones dinámicos)"
          )]

       
        public async Task<IActionResult> CargarFilasDeTrabajo([FromBody] CargaFilasTrabajo request)
        {
            try
            {
                
                string? servidorClaim = User.FindFirst("Servidor")?.Value;
                if (string.IsNullOrWhiteSpace(servidorClaim))
                    return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

        
                await ConsultaGenerador.CargarDesdeBDAsync(_dbContextFactory, servidorClaim);

                ArrayList columnas = new ArrayList();
                string queryFinal;


                if (request.IdConsulta.HasValue)
                {
                    var consulta = ConsultaGenerador.ObtenerConsulta(request.IdConsulta.Value);
                    if (consulta == null)
                        return BadRequest(new { error = $"No se encontró la consulta con ID {request.IdConsulta.Value}" });

                    _logger.LogInformation($"Consulta encontrada: {consulta["NombreConsulta"]}");

                    var queryData = ConsultaGenerador.QueryCuentas(request.IdConsulta.Value, ref columnas);
                    if (string.IsNullOrEmpty(queryData.Query))
                        return BadRequest(new { error = "No se pudo generar la consulta SQL base." });

                    queryFinal = queryData.Query;
                }
                else
                {
                    //  Generar consulta dinámica desde parámetros
                    var tblParametros = AccionamientosQueryHelper.Ejecutivo1.TablaParámetros;
                    var tblAgrupar = AccionamientosQueryHelper.Ejecutivo1.TablaAgrupar;

                    tblParametros.Rows.Clear();
                    tblAgrupar.Rows.Clear();


                    tblParametros.Rows.Add("idCartera", "=", request.IdCartera.ToString(), "AND", "int");

                    // Agregar parámetros adicionales dinámicamente
                    foreach (var p in request.Parametros)
                        tblParametros.Rows.Add(p.Concepto, p.Campo, p.Valores, "AND", p.Dato);

                    // Agregar agrupaciones dinámicas
                    foreach (var g in request.Agrupar)
                        tblAgrupar.Rows.Add(g.Concepto, g.Campo);

                    var queryData = ConsultaGenerador.GeneraQueryCuentas(
                        request.IdCartera,
                        tblParametros,
                        tblAgrupar,
                        Resultado.Detalle,
                        DateTime.Today.AddMonths(-1),
                        request.IdCartera,
                        ref columnas
                    );

                    queryFinal = queryData.Query;
                }

                _logger.LogInformation($"Query generada final (antes de limpiar):\n{queryFinal}");

                // 5Limpiar filtros vacíos para que la query no rompa
                queryFinal = LimpiarFiltrosVacios(queryFinal);

                _logger.LogInformation($"Query final limpia:\n{queryFinal}");


                var resultado = await _carterasDao.CargaFilasConsulta(
                    request.IdCampania,
                    queryFinal,
                    request.IncluirUsuario,
                    request.IncluirTelefono,
                    servidorClaim
                );

        
                return Ok(new
                {
                    mensaje = "Filas de trabajo cargadas correctamente.",
                    columnasGeneradas = columnas,
                    queryGenerada = queryFinal,
                    resultado
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al cargar filas de trabajo");
                return StatusCode(500, new { error = $"Error al cargar filas de trabajo: {ex.Message}" });
            }
        }


        private string LimpiarFiltrosVacios(string query)
        {
            if (string.IsNullOrWhiteSpace(query)) return query;

            var lines = query.Split('\n')
                             .Select(l => l.TrimEnd())
                             .Where(l =>
                             {

                                 if (l.EndsWith("IN (AND)", StringComparison.OrdinalIgnoreCase)) return false;
                                 if (l.EndsWith("AND") && l.Contains("C.id")) return false;
                                 return true;
                             });

            return string.Join("\n", lines);
        }


    }

}
