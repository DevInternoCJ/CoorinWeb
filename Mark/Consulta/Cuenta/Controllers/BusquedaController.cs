using Microsoft.AspNetCore.Mvc;
using Loki.DTOs.BusquedaDTOs; // Asegúrate de que este using sea correcto para tus DTOs de búsqueda
using Loki.Mark.Consulta.Cuenta.Interfaces; // Asegúrate de que IBusqueda esté aquí
using Microsoft.AspNetCore.Authorization; // Para el atributo [Authorize]
using System.IO; // Para Path
using System.Net.Mime; // Para MediaTypeNames
using System.Threading.Tasks; // Para Task
using Microsoft.AspNetCore.Http; // Para StatusCodes

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
        public async Task<ActionResult<SearchResultDto>> RealizarBusqueda([FromBody] SearchCriteriaDto criteria)
        {
            // Valida el modelo recibido del cliente
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Retorna errores de validación del modelo automáticamente
            }

            try
            {
                // Llama al servicio de búsquedas para ejecutar la lógica principal
                var result = await _busquedasService.RealizarBusquedaAsync(criteria);

                // Si el servicio ya ha detectado un error de negocio o de base de datos
                if (result.EsError)
                {
                    // Puedes decidir si es un BadRequest (problema con la entrada del usuario)
                    // o un InternalServerError (problema en el servidor).
                    // Aquí lo manejamos como BadRequest si el servicio lo marca como error.
                    return BadRequest(result);
                }

                // Si la búsqueda fue exitosa, devuelve el resultado con un código 200 OK
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Captura cualquier excepción no manejada en el servicio y la relanza.
                // Tu middleware GlobalErrorHandler se encargará de loguearla y formatear la respuesta HTTP 500.
                throw;
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
            {
                return BadRequest("El nombre del archivo es obligatorio para la descarga.");
            }

            // Define la carpeta donde se guardan los archivos Excel exportados.
            // ¡Asegúrate de que esta ruta coincida con la usada en ExcelGeneratorService!
            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "ExcelExports");
            string filePath = Path.Combine(uploadsFolder, filename);

            // Verifica si el archivo existe en el servidor
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound($"El archivo '{filename}' no fue encontrado en el servidor.");
            }

            // Prepara el archivo para ser devuelto como un flujo de bytes
            var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

            // Devuelve el archivo. El tipo de contenido (MediaTypeNames.Application.Octet) es un tipo genérico para datos binarios.
            // Para archivos Excel XLSX, puedes usar "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet".
            return File(fileStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename);
        }
    }
}
