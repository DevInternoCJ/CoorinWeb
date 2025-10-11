
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

		public ListaNegraController(IListaNegraService listanegraService)
		{
			_listanegraService = listanegraService;
		}


		[HttpGet("lista-negra")]
		[Authorize]
		[SwaggerOperation(
		  Summary = "Lista Negra",
		  Description = ""
		  )]
		public async Task<IActionResult> ListaNegra(
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