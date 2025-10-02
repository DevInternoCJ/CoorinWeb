using System.Text.Json;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.DTOs.EjecutivosDTO;
using Loki.Mark.Administracion.Ejecutivos.Validadores.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Administracion.Ejecutivos.Validadores.Controllers
{
    [ApiController]
    [Route("api/ejecutivos")]
    public class ValidadoresController : ControllerBase
    {
        private readonly IDbContextFactory _dbContFactory;
        private readonly IValidadoresDAOs _validadoresDao;
        private readonly IValidadoresService _validadoresService;
        private readonly DaoBase _daobase;
        

        public ValidadoresController(IValidadoresService validadoresservices, IValidadoresDAOs validadoresdao, IDbContextFactory contextfactory, DaoBase daobase)
        {
            _validadoresService = validadoresservices;
            _validadoresDao = validadoresdao;
            _dbContFactory = contextfactory;
            _daobase = daobase;
        }
        [HttpGet("validadores")]
        [SwaggerOperation(Summary = "Obtiene validadores",
        Description = "obtiene una lista de validadores al ingresar el idproducto y tipobase, la cual retorna una lista de idEejecutivo correspondiente")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ValidadoresDTO>>> ObtieneValidadores(int idProducto)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            string tipoBase = "Collection";

            var validadores = await _validadoresService.ObtieneValidadores(idProducto, servidorClaim, tipoBase);
            if (validadores == null)
            {
                return StatusCode(500, "Ocurrió un error al obtener los validadores.");
            }

            var respuesta = validadores.Select(v => new { v.IdEjecutivo }).ToList();
            return Ok(respuesta);
        }


        [HttpGet("validadores-arrepentimientos")]
        [SwaggerOperation(Summary = "validadores arrepentimientos",
            Description = "obtiene los idEjecutivo de acuerdo al id del producto especificado extrayendo de la tabla validadoresArrepentimientos")]
        [Authorize] 
        public async Task<ActionResult<IEnumerable<ValidadoresDTO>>> ObtieneValidadoresArrepentimientos(int idProducto)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            string tipoBase = "Collection";

            var validadores = await _validadoresService.ObtieneValidadoresArrepentimientos(idProducto, servidorClaim, tipoBase);
            if (validadores == null)
            {
                return StatusCode(500, "Ocurrió un error al obtener los validadores.");
            }

            var respuesta = validadores.Select(v => new { v.IdEjecutivo }).ToList();
            return Ok(respuesta);
        }

        [HttpPost("inserta-elimina-validador")]
        [Authorize]
        [SwaggerOperation(
            summary: "inserta elimina validadores",
            Description = "Inserta un validador en la tabla validadores, de existir hace una eliminación del validador que coincida con el especificado en dbcollection")]

        public async Task<ActionResult> InsertaEliminaValidadores([FromBody] ValidadoresRequest dto)
        {
            var servidorClaim = User.Claims.FirstOrDefault(c => c.Type == "Servidor");

            if (servidorClaim == null || string.IsNullOrWhiteSpace(servidorClaim.Value))
            {
                return Unauthorized(new { error = "No se encontró la información del servidor en el token." });
            }
            string tipoBase = "Collection";
            var servidor = servidorClaim.Value;

            var resultado = await _validadoresDao.InsertaEliminaValidadores(dto, servidor, tipoBase);
            if (resultado == null)
            {
                return StatusCode(500, "Ocurrió un error al eliminar-insertar los validadores.");
            }
            return Ok(resultado);
        }

        [HttpPost("inserta-elimina-validadores-arrepentimientos")]
        [Authorize]
        [SwaggerOperation(
            Summary = "inserta elimina Validadores Arrepentimientos",
            Description = "Inserta un validador arrepentimiento y en caso de existir lo elimina")]
        public async Task<ActionResult> InsertaEliminaValidadoresArrepentimientos([FromBody] ValidadoresRequest dto)
        {

            var servidorClaim = User.Claims.FirstOrDefault(c => c.Type == "Servidor");

            if (servidorClaim == null || string.IsNullOrWhiteSpace(servidorClaim.Value))
            {
                return Unauthorized(new { error = "No se encontró la información del servidor en el token." });
            }
            string tipoBase = "Collection";
            var servidor = servidorClaim.Value;

            var resultado = await _validadoresDao.InsertaEliminaValidadoresArrepentimientos(dto, servidor, tipoBase);
            if (resultado == null)
            {
                return StatusCode(500, "Ocurrió un error al eliminar-insertar los validadores.");
            }
            return Ok(resultado);
        }

    }
}
