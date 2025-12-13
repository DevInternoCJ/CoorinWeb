using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Loki.Mark.Consulta.Productividad.Interfaces;
using Loki.DTOs.ProductividadDTO;
using Microsoft.Extensions.Logging;

namespace Loki.Mark.Consulta.Productividad.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Tags("Consulta - Productividad")]
    [Authorize]
    public class ProductividadController : ControllerBase
    {
        private readonly IProductividadService _productividadService;
        private readonly ILogger<ProductividadController> _logger;

        public ProductividadController(IProductividadService productividadService, ILogger<ProductividadController> logger)
        {
            _productividadService = productividadService;
            _logger = logger;
        }

        [HttpPost("get-productividad")]
        [SwaggerOperation(
            Summary = "productividad - Irene",
            Description = "Obtiene la productividad de uno o más ejecutivos."
        )]
        public async Task<IActionResult> ObtieneProductividad([FromBody] ProductividadRequest request)
        {
            Console.WriteLine($"=== CONTROLLER: ObtieneProductividad INICIADO ===");

            // --- 1. Validaciones Iniciales ---
            if (string.IsNullOrWhiteSpace(request.Indicador))
            {
                return BadRequest(new { error = "El indicador es requerido" });
            }

            // Validación y conversión de int? a int
            if (request.IdEjecutivoPrincipal == null || request.IdEjecutivoPrincipal <= 0)
            {
                return BadRequest(new { error = "El IdEjecutivoPrincipal es requerido y debe ser positivo." });
            }

            if (request.IdsEjecutivos == null || request.IdsEjecutivos.Count == 0)
            {
                return BadRequest(new { error = "Se requiere al menos un ID de ejecutivo" });
            }

            int idEjecutivoPrincipal = request.IdEjecutivoPrincipal.Value;

            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            try
            {
                // --- 2. Llamada única al Service ---
                var productividad = await _productividadService.ObtieneProductividad(
                    request.Indicador,
                    idEjecutivoPrincipal,
                    servidorClaim,
                    request.EsModoHora
                );

                // Consolida el resultado (ya formateado si es Sesiones)
                var resultadosList = (productividad as System.Collections.IEnumerable)?.Cast<object>().ToList() ?? new List<object>();

                // --- 3. Construcción de la Respuesta ---
                var response = new ProductividadResponse
                {
                    Datos = resultadosList,
                    Modo = request.EsModoHora ? "Hora" : "Dia",
                    Indicador = request.Indicador,
                    TotalRegistros = resultadosList.Count
                };

                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Error interno del servidor al obtener la productividad" });
            }
        }
    }
}
