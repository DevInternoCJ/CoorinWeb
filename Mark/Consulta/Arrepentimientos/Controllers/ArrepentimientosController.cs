using CoorinWeb.Loki.Global;
using Loki.Mark.Administracion.Consulta.Arrepentimientos.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;


namespace Loki.Mark.Administracion.Consulta.Controllers
{


    [ApiController]
    [Route("api/arrepentimientos")]
    [Tags("Consulta - Arrepentimientos")]
    public class ArrepentimientosController : ControllerBase
    {
        private readonly IArrepentimientosService _arrepentimientoService;

        private readonly IDbContextFactory _dbContFactory;


        public ArrepentimientosController(IArrepentimientosService arrepentimientoService, IDbContextFactory contextfactory)
        {
            _arrepentimientoService = arrepentimientoService;


            _dbContFactory = contextfactory;
        }
        [HttpGet("get-arrepentimientos")]
        [Authorize]
        [SwaggerOperation(
           Summary = "Arrepentimientos",
           Description = ""
        )]
        public async Task<IActionResult> arrepentimientos(
        [FromQuery] int idCartera,
        [FromQuery] string cuenta)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            var arrepentimiento = await _arrepentimientoService.arrepentimientos(idCartera, cuenta, servidorClaim);

            if (arrepentimiento == null || arrepentimiento.Count == 0)
            {
                return NotFound(new { error = "No se encontraron arrepentimientos." });
            }
            return Ok(arrepentimiento);
        }



    }
}

       
