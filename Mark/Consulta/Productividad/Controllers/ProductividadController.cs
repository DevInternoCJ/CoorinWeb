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
            Summary = "Consulta productividad",
            Description = "Obtiene la productividad de uno o más ejecutivos."
        )]
        public async Task<ActionResult<ProductividaddDTO>> ObtenerProductividad(
            [FromQuery] string indicador,
            [FromQuery] int? ejecutivoId = null)
        {
            try
            {
                var servidorClaim = User.FindFirst("Servidor")?.Value;
                if (string.IsNullOrWhiteSpace(servidorClaim))
                {
                    return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
                }

                _logger.LogInformation("Solicitud de productividad - Indicador: {Indicador}, EjecutivoId: {EjecutivoId}",
                    indicador, ejecutivoId);

                var resultado = await _productividadService.ObtenerProductividadConCommand(indicador, ejecutivoId, servidorClaim);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener productividad");
                return StatusCode(500, new { error = "Error interno del servidor" });
            }
        }

        
    }
}