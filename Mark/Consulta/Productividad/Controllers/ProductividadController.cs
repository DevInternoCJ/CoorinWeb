
using CoorinWeb.Loki.Global;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Loki.Mark.Consulta.Productividad.Interfaces;

using Loki.DTOs.EjecutivosDTO;
using Loki.DTOs.ProductividadDTO;


namespace Loki.Mark.Consulta.Productividad.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductividadController : ControllerBase
    {
        private readonly IProductividadService _productividadService;
        private readonly IDbContextFactory _dbContFactory;

     public ProductividadController(IProductividadService productividadService, IDbContextFactory contextfactory)
        {
            _productividadService = productividadService;

            _dbContFactory = contextfactory;
        }

        [HttpGet("get-productividad")]
        [Authorize]
        [SwaggerOperation(
          Summary = "Consulta de Productividad",
          Description = "Obtiene la productividad de un ejecutivo en una campaña específica."
          )]


        public async Task<IActionResult> obtieneProductividad([FromQuery] string indicador, int idejecutivo)
        {
            if (string.IsNullOrWhiteSpace(indicador))
                return BadRequest(new { error = "El indicador es requerido" });

            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            var productividad = await _productividadService.obtieneProductividad(indicador, idejecutivo, servidorClaim);
            return productividad?.Any() == true
                ? Ok(productividad.Select(v => new { v.IdEjecutivo }))
                : Ok(new { message = "No hay registros de productividad disponibles." });
        }

    }

}
