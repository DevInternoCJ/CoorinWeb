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
    public class MetasController : ControllerBase
    {
        private readonly IDbContextFactory _dbContextFactory;
        private readonly IMetasService _metasService;
        private readonly IMetasDao _metasDao;

        public MetasController(IDbContextFactory dbContextFactory, IMetasService metasSrvice, IMetasDao metasDao)
        {
            _dbContextFactory = dbContextFactory;
            _metasService = metasSrvice;
            _metasDao = metasDao;
        }
        [HttpGet("bloqueo")]
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
        [HttpPost("cargar-metas")]
        [Authorize]
        [SwaggerOperation(
                Summary = "Carga y valida metas de ejecutivos desde un JSON pre-parseado.",
                Description = "El cliente envía el contenido del Excel ya procesado como JSON. La API realiza la carga y validación SQL."
            )]
        // *** CAMBIO CLAVE: Volvemos a [FromBody] ***
        public async Task<IActionResult> CargarMetas([FromBody] CargarMetasRequest request, int idEjecutivo)
        {
            // 1. Obtener Claims necesarios del token
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
           

            // 2. Validar Claims
            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });

            // 3. Validar Request
            if (request == null || request.DatosMetas == null || request.DatosMetas.Count == 0)
            {
                return BadRequest(new { error = "La solicitud está vacía o no contiene datos de metas." });
            }

            try
            {
                // 4. Llamar al DAO (que ahora devuelve CargarMetasResponse)
                var response = await _metasDao.cargarMetas(request, idEjecutivo, servidorClaim);

                if (response.Success)
                {
                    return Ok(new { message = response.Message });
                }
                else
                {
                    // 5. Manejar error de validación 
                    if (response.Errores != null && response.Errores.Rows.Count > 0)
                    {
                        // Asumiendo que ConvertDataTableToList sigue disponible
                        var erroresList = ConvertDataTableToList(response.Errores);

                        return BadRequest(new
                        {
                            error = response.Message,
                            detalle = "Se encontró un error en el archivo, favor de revisar la tabla de errores y volver a cargar.",
                            errores = erroresList
                        });
                    }

                    // 6. Manejar error crítico
                    return StatusCode(500, new { error = response.Message });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno al procesar la carga de metas.", error = ex.Message });
            }
        }

        // Método auxiliar (sin cambios)
        private List<Dictionary<string, object>> ConvertDataTableToList(DataTable dt)
        {
            var list = new List<Dictionary<string, object>>();
            foreach (DataRow row in dt.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    dict.Add(col.ColumnName, row[col] == DBNull.Value ? null : row[col]);
                }
                list.Add(dict);
            }
            return list;
        }
    }
}
