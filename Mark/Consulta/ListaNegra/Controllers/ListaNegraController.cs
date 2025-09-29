
using CoorinWeb.Loki.Global;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Loki.Mark.Consulta.ListaNegra.Interfaces;


namespace Loki.Mark.Consulta.ListaNegra.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ListaNegraController : ControllerBase
    {
        private readonly IListaNegraService _listanegraService;
        private readonly IListaNegraDao _listanegraDao;
        private readonly IDbContextFactory _dbContFactory;

        public ListaNegraController(IListaNegraService listanegraService, IListaNegraDao listanegraDao, IDbContextFactory contextfactory)
        {
            _listanegraService = listanegraService;
            _listanegraDao = listanegraDao;
            _dbContFactory = contextfactory;
        }
        [HttpGet("get-lista-negra")]
        [Authorize]
        [SwaggerOperation(
          Summary = "lista negra",
          Description = ""
          )]
        public async Task<IActionResult> listanegra(
        [FromQuery] int idCartera,
        [FromQuery] string selector,
        [FromQuery] string dato)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }
            var resultado = await _listanegraService.listanegra(idCartera, selector, dato, servidorClaim);
            return Ok(new { EnListaNegra = resultado });
        }


    }
}