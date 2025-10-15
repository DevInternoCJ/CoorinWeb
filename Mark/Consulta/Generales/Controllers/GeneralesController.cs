using CoorinWeb.Loki.Global;
using Loki.Controllers;
using Loki.DTOs.BusquedaDTOs;
using Loki.Mark.Administracion.Carteras.Interfaces;
using Loki.Mark.Consulta.Cuenta.Interfaces;
using Loki.Mark.Consulta.Generales.Interfaces;
using Loki.Mark.Consulta.Generales.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Consulta.Generales.Controllers
{
    public class GeneralesController : Controller
    {
        private readonly IGenerales _generalesService; // Inyecta la interfaz del servicio de búsquedas
        private readonly ILogger<GeneralesController> _logger;


        public GeneralesController(IBusqueda busquedasService, ILogger<GeneralesController> logger, IGenerales generalesService)
        {
            _generalesService = generalesService;
            _logger = logger;


        }
        [HttpGet("carga-herramientas")]
        [Authorize]
        [SwaggerOperation(
            Summary = "carga herramientas - irene",
            Description = ""
        )]
        public async Task<IActionResult> CargaHerramientas([FromQuery] int idCartera)
        {
            string tipoBase = "Collection";

            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return Unauthorized(new { error = "No se encontró el claim 'Servidor' en el token." });
            }
            try
            {
                var resultado = await _generalesService.CargaHerramienta(idCartera, servidorClaim);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al cargar herramientas");
                return StatusCode(500, new { error = "Ocurrió un error al procesar la solicitud." });
            }
        }

        [HttpGet("carga-municipios")]
        [Authorize]
        [SwaggerOperation(
            Summary = "carga municipios - irene",
            Description = "Obtiene la lista de municipios activos de una cartera"
        )]
        public async Task<IActionResult> CargaMunicipios([FromQuery] int idCartera)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return Unauthorized(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            try
            {
                var resultado = await _generalesService.CargaMunicipios(idCartera, servidorClaim);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al cargar municipios");
                return StatusCode(500, new { error = "Ocurrió un error al procesar la solicitud." });
            }
        }


    }
}
