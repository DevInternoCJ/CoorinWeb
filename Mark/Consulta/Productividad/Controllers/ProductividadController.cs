
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

        //[HttpGet("get-productividad")]
        //[Authorize]
        //[SwaggerOperation(
        //  Summary = "Consulta de Productividad",
        //  Description = "Obtiene la productividad de un ejecutivo en una campaña específica."
        //  )]


        [HttpPost("get-productividad")] // Cambiado a POST para recibir JSON
        [Authorize]
        [SwaggerOperation(
        Summary = "Consulta de Productividad",
        Description = "Obtiene la productividad de uno o más ejecutivos."
        )]
        public async Task<IActionResult> obtieneProductividad([FromBody] ProductividadRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Indicador))
                return BadRequest(new { error = "El indicador es requerido" });

            if (request.IdsEjecutivos == null || !request.IdsEjecutivos.Any())
                return BadRequest(new { error = "Se requiere al menos un ID de ejecutivo" });

            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            // Ejecutar para cada ejecutivo y combinar resultados
            var resultados = new List<DTOs.ProductividadDTO.ProductividadDTO>();
            foreach (var idEjecutivo in request.IdsEjecutivos)
            {
                var productividad = await _productividadService.obtieneProductividad(
                    request.Indicador,
                    idEjecutivo,
                    servidorClaim
                );
                resultados.AddRange(productividad);
            }

            return resultados.Any()
                ? Ok(resultados)
                : Ok(new { message = "No hay registros de productividad disponibles." });
        }

    }

}