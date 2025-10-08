using Loki.DTOs.CatalogosDTOs;
using Loki.Mark.Consulta.Cuenta.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Loki.Mark.Consulta.Cuenta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Asegura que solo usuarios autenticados puedan acceder a este controlador
    public class CatalogoController : ControllerBase
    {
        private readonly ICatalogosServiceRe _catalogosService;

        public CatalogoController(ICatalogosServiceRe catalogosService)
        {
            _catalogosService = catalogosService;
        }

        /// <summary>
        /// Obtiene todos los datos iniciales y catálogos necesarios para la aplicación.
        /// </summary>
        /// <param name="servidor">El nombre del servidor para obtener los datos (ej. "Thor", "Asura").</param>
        /// <param name="idCarteraPreseleccionada">Opcional: ID de una cartera preseleccionada.</param>
        /// <param name="idProductoPreseleccionado">Opcional: ID de un producto preseleccionado.</param>
        /// <returns>Un DTO con todos los datos iniciales para el frontend.</returns>
        [HttpGet("initial-data")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InitialAppDataDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<InitialAppDataDto>> GetInitialAppData(
            [FromQuery] string servidor,
            [FromQuery] int? idCarteraPreseleccionada = null,
            [FromQuery] int? idProductoPreseleccionado = null)
        {
            if (string.IsNullOrWhiteSpace(servidor))
            {
                return BadRequest("El parámetro 'servidor' es obligatorio.");
            }

            // Simular Ejecutivo.Datos["Jerarquía"] usando un claim del JWT si lo tienes
            // O pasa directamente el valor si viene en el request
            int idUsuarioJerarquia = 0; // Valor por defecto
            var jerarquiaClaim = User.Claims.FirstOrDefault(c => c.Type == "Jerarquia"); // Asume un claim de JWT para jerarquía
            if (jerarquiaClaim != null && int.TryParse(jerarquiaClaim.Value, out int jerarquia))
            {
                idUsuarioJerarquia = jerarquia;
            }
            // Alternativamente, si el usuario siempre envía la jerarquía:
            // [FromQuery] int idUsuarioJerarquia

            try
            {
                var data = await _catalogosService.GetInitialAppDataAsync(
                    servidor,
                    idUsuarioJerarquia,
                    idCarteraPreseleccionada,
                    idProductoPreseleccionado
                );
                return Ok(data);
            }
            catch (Exception ex)
            {
                // El GlobalErrorHandler debería manejar esto, pero un catch aquí permite logging específico
                // o transformar la excepción antes de que llegue al GlobalErrorHandler.
                // Para simplificar, relanzamos y dejamos que el middleware global actúe.
                throw;
            }
        }

        /// <summary>
        /// Obtiene los valores de un catálogo específico por su ID.
        /// </summary>
        /// <param name="servidor">El nombre del servidor.</param>
        /// <param name="idCatalogo">El ID del catálogo a obtener.</param>
        /// <returns>Lista de valores del catálogo.</returns>
        [HttpGet("catalog-values/{idCatalogo}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<dynamic>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<dynamic>>> GetCatalogValues(string servidor, int idCatalogo)
        {
            if (string.IsNullOrWhiteSpace(servidor))
            {
                return BadRequest("El parámetro 'servidor' es obligatorio.");
            }
            var values = await _catalogosService.GetCatalogValuesAsync(servidor, idCatalogo);
            return Ok(values);
        }

        /// <summary>
        /// Obtiene la tabla de valores booleanos (bit).
        /// </summary>
        /// <param name="servidor">El nombre del servidor.</param>
        /// <returns>Lista de valores booleanos.</returns>
        [HttpGet("boolean-table")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<dynamic>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<dynamic>>> GetBooleanTable(string servidor)
        {
            if (string.IsNullOrWhiteSpace(servidor))
            {
                return BadRequest("El parámetro 'servidor' es obligatorio.");
            }
            var values = await _catalogosService.GetBooleanTableAsync(servidor);
            return Ok(values);
        }
    }
}
