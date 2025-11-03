using CoorinWeb.Loki.Global;
using Loki.DTOs.BusquedaDTOs;
using Loki.DTOs.GeneralesDTOs;
using Loki.Mark.Administracion.Carteras.Interfaces;
using Loki.Mark.Consulta.Generales.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Consulta.Generales.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeneralesController : ControllerBase
    {
        private readonly IGeneralesService _generalesService; 
        private readonly IGeneralesDao _generalesDao;
        private readonly IDbContextFactory _dbContextFactory;
        public GeneralesController(IDbContextFactory dbContextFactory, IGeneralesService generalesService, IGeneralesDao generalesDao)
        {
            _generalesService = generalesService;
            _generalesDao = generalesDao;
            _dbContextFactory = dbContextFactory;

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
                return StatusCode(500, new { error = "Ocurrió un error al procesar la solicitud." });
            }
        }
        //busqueda general
        [HttpPost("busqueda-general")]
        [Authorize]
        [SwaggerOperation(
            Summary = "realizar busqueda - irene",
            Description = "Colocar el número en el tipo de resultado de acuerdo a lo siguiente: 1.- Contar, 2.- Detalle, 3.-Cuentas, 4.- Filas de Trabajo"
        )]
        public async Task<IActionResult> RealizaBusqueda([FromBody] SearchGeneral request)
        {
            var resultado = await _generalesDao.RealizaBusqueda(
                request.IdProducto,
                request.IdCartera,
                request.Servidor,
                request.TipoResultado, 
                request.Jerarquia,
                request.IdConsulta,
                request.ParametrosExtra,
                request.AgruparExtra,
                request.DesdeFecha
            );

            if (resultado.EsError)
                return BadRequest(resultado);

            return Ok(resultado);
        }

    }
}

