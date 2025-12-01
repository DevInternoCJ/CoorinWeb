using Loki.DTOs.PlantillasCorreoDTOs;
using Loki.Mark.Consulta.Historico.Interfaces;
using Loki.Mark.Consulta.PlantillasCorreo.Interfaces;
using Loki.Mark.Consulta.PlantillasCorreo.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Security.Claims;
using System.Threading.Tasks;
using static Loki.DTOs.PlantillasCorreoDTOs.CargaDatos;

namespace Loki.Mark.Consulta.PlantillasCorreo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Tags("Consulta - PlantillasCorreo")]
    [Authorize]
    public class PlantillasCorreoController : Controller
    {
        private readonly IPlantillasCorreoService _plantillasService;
        private readonly ILogger<PlantillasCorreoController> _logger;
        public PlantillasCorreoController(IPlantillasCorreoService plantillasService, ILogger<PlantillasCorreoController> logger)
        {
            _plantillasService = plantillasService;
            _logger = logger;
        }

        
        [HttpPut("actualizar-plantillas")]
        [SwaggerOperation(Summary = "Actualizar Plantillas Correo - Irene",
        Description = "Actualiza las plantillas de correos existentes.")]
        public async Task<IActionResult> ActualizarPlantilla([FromBody] PlantillaCorreoDto plantilla) // ← Quitar el parámetro id
        {
            if (plantilla == null || plantilla.IdCorreoScript <= 0)
            {
                return BadRequest("Los datos de la plantilla no son válidos o el ID es inválido.");
            }
            // Obtener servidor desde el token
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }
            string nombreBaseDatos = "Collection";
            bool exito = await _plantillasService.ActualizarPlantillaAsync(plantilla, servidorClaim, nombreBaseDatos);

            if (exito)
            {
                return Ok(new { mensaje = "Plantilla actualizada correctamente." });
            }
            else
            {
                return StatusCode(500, new { mensaje = "Error actualizando la plantilla. Intente de nuevo." });
            }
        }

        [HttpPost("crear-plantilla")]
        [SwaggerOperation(Summary = "Insertar Plantilla - Irene",
        Description = "Crea una nueva plantilla de correo con los datos proporcionados.")]
        public async Task<IActionResult> CrearPlantilla([FromBody] PlantillaCorreoInsert plantilla)
        {
            if (plantilla == null)
            {
                return BadRequest("Los datos de la plantilla no son válidos.");
            }
            if (plantilla.IdEjecutivo <= 0)
            {
                return BadRequest("El idEjecutivo debe ser un valor válido mayor a 0.");
            }

            // Obtener servidor desde el token
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            string nombreBaseDatos = "Collection";

            int nuevoId = await _plantillasService.CrearPlantillaAsync(plantilla, servidorClaim, nombreBaseDatos);
            if (nuevoId > 0)
            {
                return CreatedAtAction(
                    nameof(CrearPlantilla),
                    new { id = nuevoId },
                    new { mensaje = "Plantilla insertada correctamente.", idCorreoScript = nuevoId }
                );
            }
            else
            {
                return StatusCode(500, new { mensaje = "Error insertando la plantilla. Por favor intente de nuevo." });
            }
        }

        [HttpDelete("eliminar-plantillas")]
        [SwaggerOperation(Summary = "Eliminar Plantilla - Irene",
        Description = "Elimina una plantilla de correo por su ID.")]
        public async Task<IActionResult> EliminarPlantilla([FromBody] EliminarPlantillaRequest request)
        {
            if (request == null || request.IdCorreoScript <= 0)
            {
                return BadRequest("El ID de la plantilla no es válido.");
            }
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            string nombreBaseDatos = "Collection";

            bool exito = await _plantillasService.EliminarPlantillaAsync(request.IdCorreoScript, servidorClaim, nombreBaseDatos);

            if (exito)
            {
                return Ok(new { mensaje = "Plantilla eliminada correctamente." });
            }
            else
            {
                return StatusCode(500, new { mensaje = "Error eliminando la plantilla. Intente de nuevo." });
            }
        }
        //carga datos
        [HttpPost("carga-datos")]
        [SwaggerOperation(Summary = "Carga datos - Irene",
           Description = "Retorna plantillas, datos de producto y cuenta.")]
        public async Task<IActionResult> CargarDatosCompletos([FromBody] CargaDatosRequest request)
        {
            if (request == null || request.IdProducto <= 0 || request.IdCartera <= 0)
            {
                return BadRequest("Los parámetros no son válidos.");
            }
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            string nombreBaseDatos = "Collection";

            try
            {
                var resultado = await _plantillasService.CargarDatosCompletos(
                    request.IdCartera,
                    request.IdProducto,
                    servidorClaim,
                    nombreBaseDatos
                );

                if (resultado.Exito)
                {
                    _logger.LogInformation($"Datos cargados exitosamente. Plantillas: {resultado.Plantillas.Count}, Tabla existe: {resultado.TablaExiste}");
                    return Ok(resultado);
                }
                else
                {
                    
                    return StatusCode(500, new { mensaje = "Error cargando los datos completos.", error = resultado.MensajeError });
                }
            }
            catch (Exception ex)
            {
         
                return StatusCode(500, new { mensaje = "Error cargando los datos completos.", error = ex.Message });
            }
        }
    }
}