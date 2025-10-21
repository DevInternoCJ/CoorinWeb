using CoorinWeb.Loki.Global;
using Loki.Controllers;
using Loki.DTOs.GeneralesDTOs;
using Loki.Mark.Administracion.Carteras.Interfaces;
//using Loki.Mark.Consulta.Cuenta.Interfaces;
using Loki.Mark.Consulta.Generales.Interfaces;
using Loki.Mark.Consulta.Generales.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Consulta.Generales.Controllers
{
    public class GeneralesController : Controller
    {
        private readonly IGenerales _generalesService; // Inyecta la interfaz del servicio de búsquedas
        private readonly IGeneralesDao _generalesDao; 
        private readonly ILogger<GeneralesController> _logger;


        public GeneralesController(IGenerales generales, ILogger<GeneralesController> logger, IGenerales generalesService, IGeneralesDao generalesDao)
        {
            _generalesService = generales;
            _logger = logger;
            _generalesDao = generalesDao;


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
                _logger.LogError(ex, "Error al cargar herramientas");
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
                _logger.LogError(ex, "Error al cargar municipios");
                return StatusCode(500, new { error = "Ocurrió un error al procesar la solicitud." });
            }
        }

        [HttpPost("realizar-busqueda")]
        [Authorize]
        [SwaggerOperation(
           Summary = "realizar busqueda - irene",
           Description = "realiza una busqueda por medio de idconsulta o parametros y agrupamientos"
        )]
     
        public async Task<IActionResult> RealizarBusqueda([FromBody] SearchGeneral search)
        {
            try
            {
                // Validaciones
                if (string.IsNullOrWhiteSpace(search.Servidor))
                    return BadRequest(new { error = "Debe proporcionar el nombre del servidor." });

                if (!search.IdProducto.HasValue || !search.IdCartera.HasValue)
                    return BadRequest(new { error = "Debe proporcionar IdProducto y IdCartera." });

                // Validar concepto si se proporciona
                string concepto = string.IsNullOrWhiteSpace(search.Concepto) ? "Teléfonos" : search.Concepto;

                var conceptosValidos = new[] { "Teléfonos", "Gestiones", "Negociaciones", "Seguimientos", "Chats" };
                if (!conceptosValidos.Contains(concepto))
                {
                    return BadRequest(new
                    {
                        error = $"El concepto '{concepto}' no es válido. Debe ser uno de: {string.Join(", ", conceptosValidos)}"
                    });
                }

                // Determinar tipo de resultado
                bool esDetalle = search.EsDetalleResultado;
                bool esCuentas = search.EsCuentasResultado;
                bool esContar = search.EsContarResultado;

                var result = await _generalesDao.RealizaBusqueda(
                    search.Servidor!,
                    search.IdCartera.Value,
                    search.IdProducto.Value,
                    esContar,
                    esCuentas,
                    esDetalle,
                    concepto,  // Nuevo parámetro
                    search.IdConsulta,
                    search.ParametrosExtra,
                    search.AgrupamientoExtra
                );

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message, stackTrace = ex.StackTrace });
            }
        }

    }
}
