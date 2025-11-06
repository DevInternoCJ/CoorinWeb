using CoorinWeb.Loki.Global;
using Loki.Mark.Consulta.Generales.Interfaces;
using Loki.Mark.Procesos.Procesos.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Procesos.Controllers
{
    [ApiController] 
    [Route("api/[controller]")] 
    public class SupervisoresController : ControllerBase
    {
        private readonly IDbContextFactory _dbContextFactory;
        private readonly ISupervisor _supervisor;
        public SupervisoresController(IDbContextFactory dbContextFactory, ISupervisor supervisor)
        {
            _dbContextFactory = dbContextFactory;
            _supervisor = supervisor;
        }

        [HttpGet("supervisores")]
        [Authorize]
        [SwaggerOperation(
           Summary = "supervisores - irene",
           Description = "Obtiene un listado de los supervisores asignados."
       )]
        public async Task<IActionResult> getSupervidores([FromQuery] int idCartera)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            try
            {
                var supervisores = await _supervisor.obtieneSupervisores(servidorClaim, idCartera);
                return Ok(supervisores);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener las frases", error = ex.Message });
            }
        }

        [HttpGet("cuentas")]
        [Authorize]
        [SwaggerOperation(
             Summary = "cuentas - irene",
             Description = "listado de cuentas"
         )]
        public async Task<IActionResult> getCuentas(
         [FromQuery] int idCartera,
         [FromQuery] DateTime fechaDesde,
         [FromQuery] DateTime fechaHasta)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            try
            {
                var cuentas = await _supervisor.obtieneCuentas(servidorClaim, idCartera, fechaDesde, fechaHasta);
                return Ok(cuentas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener las cuentas", error = ex.Message });
            }
        }

    }
}
