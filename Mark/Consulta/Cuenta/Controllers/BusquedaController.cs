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
using System.Data; // Para StatusCodes

namespace Loki.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize] // Asegura que solo usuarios autenticados puedan acceder a este controlador
    public class BusquedasController : ControllerBase
    {
        private readonly IBusqueda _busquedasService; // Inyecta la interfaz del servicio de búsquedas
 

        public BusquedasController(IBusqueda busquedasService)
        {
            _busquedasService = busquedasService;
        }

        /// <summary>
        /// Realiza una búsqueda de cuentas basada en los criterios proporcionados.
        /// Este endpoint procesa los filtros y agrupaciones, y devuelve un resultado
        /// que puede ser un resumen en JSON o un enlace para descargar un Excel.
        /// </summary>
        /// <param name="criteria">DTO con los criterios de búsqueda (filtros, agrupaciones, tipo de resultado, etc.).</param>
        /// <returns>Un SearchResultDto con el mensaje de resultado, datos (si es conteo) o ruta de descarga (si es detalle).</returns>
        [HttpPost("realizar-busqueda")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SearchResultDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
     
        public async Task<IActionResult> RealizarBusqueda([FromBody] SearchCriteriaDto criteria)
        {
            try
            {
                var result = await _busquedasService.RealizarBusquedaAsync(criteria);
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Aquí puedes usar un middleware global para errores
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

    }

}
