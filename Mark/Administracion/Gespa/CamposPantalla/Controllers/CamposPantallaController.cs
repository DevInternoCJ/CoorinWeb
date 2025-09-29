using Loki.Mark.Administracion.Gespa.CamposPantalla.DAOs;
using Loki.DTOs.CamposPantallaDTOs;
using Loki.Mark.Administracion.Gespa.CamposPantalla.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Loki.Mark.Administracion.Gespa.CamposPantalla.Interfaces;

namespace Loki.Mark.Administracion.Gespa.CamposPantalla.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [SwaggerTag("Operaciones relacionadas con Campos Pantalla. Recuerda llenar antes los dropdowns llamando los endpoints de Cartera y Producto.")]
    public class CamposPantallaController : ControllerBase
    {
        private readonly ICamposPantallaService _campService;
        public CamposPantallaController(ICamposPantallaService service)
        {
            _campService = service;
        }


        [HttpGet("existe-tabla-producto/{servidor}/{idProducto}")]
        [SwaggerOperation(
            Summary = "Verificar existencia de tabla de producto",
            Description = "Verifica si existe la tabla Producto_{idProducto} en el servidor especificado."
        )]
        [ProducesResponseType(typeof(bool), 200)]
        public async Task<IActionResult> ExisteTablaProducto(string servidor, int idProducto)
        {
            var existe = await _campService.ObtenerObjectIdProductoAsync(servidor, idProducto);
            return Ok(existe.HasValue);
        }

        [HttpGet("campos-pantalla/{servidor}/{idProducto}")]
        [SwaggerOperation(
            Summary = "Obtener campos de pantalla",
            Description = "Obtiene los campos configurados para la pantalla del producto indicado en el servidor especificado."
        )]
        [ProducesResponseType(typeof(List<object>), 200)]
        public async Task<IActionResult> GetCamposPantalla(string servidor, int idProducto)
        {
            var campos = await _campService.GetCamposPantalla(servidor, idProducto);
            return Ok(campos);
        }


        [HttpGet("grid-producto-sample/{servidor}/{idProducto}/{porcentaje}/{maximo}")]
        [SwaggerOperation(
            Summary = "Grid de Producto",
            Description = "Devuelve la info. para el grid del producto mediante una muestra aleatoria de registros de la tabla Producto_{idProducto} usando porcentaje y/o máximo."
        )]
        [ProducesResponseType(typeof(List<object>), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GridProductoSample(string servidor, int idProducto, double porcentaje = 70, int? maximo = 5)
        {
            var existe = await _campService.ObtenerObjectIdProductoAsync(servidor, idProducto);
            if (!existe.HasValue)
                return NotFound($"Error: No se encuentra la tabla Producto_{idProducto} en el servidor '{servidor}'.");

            var resultado = await _campService.GridProductoTableSample(servidor, idProducto, porcentaje, maximo);
            return Ok(resultado);
        }

        /// <summary>
        /// Inserta o actualiza los campos visibles de la pantalla del producto.
        /// </summary>
        /// <param name="servidor">Nombre del servidor.</param>
        /// <param name="request">Datos del producto y los campos a insertar/actualizar.</param>
        /// <returns>True si se actualizó correctamente.</returns>
        [HttpPost("guardar-campos-pantalla/{servidor}")]
        [SwaggerOperation(
            Summary = "Guardar Campos Pantalla",
            Description = "Permite actualizar o agregar los Campos Pantalla visibles en Gespa para el menú de Cuentas."
        )]
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GuardarCamposPantalla(string servidor, [FromBody] CampoPantallaRequest request)
        {
            if (request == null || request.Campos == null || request.Campos.Count == 0)
            {
                return BadRequest("No se recibieron campos para guardar.");
            }

            if (request.Jerarquia < 2)
            {
                return BadRequest(new { Mensaje = "Permisos insuficientes" });
            }

            foreach (var (item, index) in request.Campos.Select((val, i) => (val, i + 1)))
            {
                if (string.IsNullOrWhiteSpace(item.Alias) && !string.IsNullOrWhiteSpace(item.NombreCampo))
                    return BadRequest($"La posición {index} debe tener un Alias.");

                if (string.IsNullOrWhiteSpace(item.NombreCampo) && !string.IsNullOrWhiteSpace(item.Alias))
                    return BadRequest($"La posición {index} debe tener un campo asociado.");
            }

            var resultado = await _campService.InsertaActualizaCamposPantalla(servidor, request);
            return Ok(resultado);
        }



    }
}