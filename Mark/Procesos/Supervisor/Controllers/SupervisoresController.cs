using CoorinWeb.Loki.Global;
using Loki.DTOs.SupervisorDTO;
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
        private readonly ISupervisorService _supervisorService;
        private readonly ISupervisorDao _supervisorDao;
        public SupervisoresController(IDbContextFactory dbContextFactory, ISupervisorService supervisor, ISupervisorDao supervisorDao )
        {
            _dbContextFactory = dbContextFactory;
            _supervisorService = supervisor;
            _supervisorDao = supervisorDao;
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
                var supervisores = await _supervisorService.obtieneSupervisores(servidorClaim, idCartera);
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
                var cuentas = await _supervisorService.obtieneCuentas(servidorClaim, idCartera, fechaDesde, fechaHasta);
                return Ok(cuentas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al obtener las cuentas", error = ex.Message });
            }
        }

        [HttpPost("inserta-cuentas")]
        [Authorize]
        [SwaggerOperation(
            Summary = "inserta cuentas - irene",
            Description = "inserta o elimina cuentas"
        )]

        public async Task<IActionResult> AsignarCuentas([FromBody] InsertarCuentasRequest request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token de seguridad." });
            }

            if (request == null || request.Ejecutivos == null || request.NumeroCuentasAAsignar <= 0)
            {
                return BadRequest(new { error = "Solicitud inválida. Verifique que 'NumeroCuentasAAsignar' sea mayor a cero y que la lista de 'Ejecutivos' no esté vacía." });
            }

            try
            {
                var (success, message) = await _supervisorDao.InsertarCuentas(request, servidorClaim);

                if (success)
                {
                    return Ok(new { message = message });
                }
                else
                {
                    return BadRequest(new { error = message });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno al asignar las cuentas.", error = ex.Message });
            }
        }



    }
}
