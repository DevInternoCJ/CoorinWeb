using CoorinWeb.Loki.Global;
using Loki.DTOs.MetasDTOs;
using Loki.Mark.Administracion.Ejecutivos.Metas.Interfaces;
using Loki.Mark.Procesos.Gestiones.Interfaces;
using Loki.Mark.Procesos.Metas.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Data;
using IMetasService = Loki.Mark.Procesos.Metas.Interfaces.IMetasService;

namespace Loki.Mark.Procesos.Metas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Tags("Procesos - Metas")]
    public class ProcesosMetasController : ControllerBase
    {
        private readonly IDbContextFactory _dbContextFactory;
        private readonly IMetasService _metasService;
        private readonly IMetasDao _metasDao;

        public ProcesosMetasController(IDbContextFactory dbContextFactory, IMetasService metasSrvice, IMetasDao metasDao)
        {
            _dbContextFactory = dbContextFactory;
            _metasService = metasSrvice;
            _metasDao = metasDao;
        }
        [HttpGet("bloqueo - irene")]
        [Authorize]
        [SwaggerOperation(
            Summary = "bloqueo",
            Description = "Determina las fechas MinDate y MaxDate basadas en el estado de bloqueo del ejecutivo."
          )]
        public async Task<IActionResult> Bloqueo(string usuario)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });           
            try
            {
                var bloqueoData = await _metasDao.Bloqueo(usuario, servidorClaim);

                if (bloqueoData.MinDate == DateTime.MinValue)
                {
                    return StatusCode(500, new { message = bloqueoData.Message });
                }

                return Ok(bloqueoData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno al verificar el bloqueo de metas.", error = ex.Message });
            }
        }
        //controller carga metas
        [HttpPost("cargar-metas")]
        [Authorize]
        [SwaggerOperation(
            Summary = "cargar metas - irene",
            Description = "Procesa y valida la información de metas cargadas para los ejecutivos. Verifica formatos, campos obligatorios, sumatorias y reglas de negocio, retornando un listado de errores si existen inconsistencias."
          )]
        public async Task<IActionResult> CargarMetas([FromForm] CargarMetasRequest request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            if (request.Archivo == null || request.Archivo.Length == 0)
                return BadRequest("Debe subir un archivo válido.");

            DataTable dtExcel;
            var extension = Path.GetExtension(request.Archivo.FileName).ToLowerInvariant();

            if (extension == ".xlsx")
                dtExcel = _metasDao.LeerMetasDesdeExcel(request.Archivo);
            else
                return BadRequest("Formato no soportado. Solo .xlsx");

            var listaMetas = _metasDao.ConvertDatatableToList(dtExcel);

            var result = await _metasDao.CargarMetas(
                new CargarMetasRequest
                {
                    FechaMeta = request.FechaMeta,
                    DatosMetas = listaMetas
                },
                request.IdEjecutivo,
                servidorClaim
            );

            return Ok(result);
        }
        
    }
}
