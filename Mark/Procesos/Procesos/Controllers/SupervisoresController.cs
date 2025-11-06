using CoorinWeb.Loki.Global;
using Loki.Mark.Consulta.Generales.Interfaces;
using Loki.Mark.Procesos.Procesos.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Procesos.Controllers
{
    [ApiController] // Indica que esta clase es un controlador de API sin vistas
    [Route("api/[controller]")] // Define la ruta base para este controlador, por ejemplo: /api/Frases
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
                var frases = await _supervisor.obtieneSupervisores(servidorClaim, idCartera);
                return Ok(frases);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener las frases", error = ex.Message });
            }
        }


    }
}
