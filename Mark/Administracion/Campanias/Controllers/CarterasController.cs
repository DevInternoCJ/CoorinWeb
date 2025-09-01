using CoorinWeb.Loki.Global;
using Loki.DTOs.CampaniasDTOs;
using Loki.Mark.Administracion.Campanias.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Administracion.Campanias.Controllers
{


    [ApiController]
    [Route("api/carteras")]
    public class CarterasController : ControllerBase
    {
        private readonly ICarterasService _carterasService;
        private readonly ICarterasDAOs _carterasDao;
        private readonly IDbContextFactory _dbContFactory;


        public CarterasController(ICarterasService campaniasService, ICarterasDAOs carterasDao, IDbContextFactory contextfactory)
        {
            _carterasService = campaniasService;
            _carterasDao = carterasDao;

            _dbContFactory = contextfactory;
        }
        [HttpGet("get-carteras")]
        [Authorize]
        [SwaggerOperation(
            Summary = "Carteras",
            Description = "obtiene una lista de carteras existentes del servidor"
            )]
        public async Task<IActionResult> GetCuentas([FromQuery] string tipoBase)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            if (string.IsNullOrWhiteSpace(tipoBase))
            {
                return BadRequest(new { error = "El tipo de base es obligatorio." });
            }

            var cuentas = await _carterasService.GetCarteras(servidorClaim, tipoBase);

            if (cuentas == null || cuentas.Count == 0)
            {
                return NotFound(new { error = "No se encontraron cuentas." });
            }
            return Ok(cuentas);
        }


        [HttpGet("get-carteras-productos")]
        [Authorize]
        [SwaggerOperation(
            Summary = "Obtener carteras productos",
            Description = ""
            )]
        public async Task<ActionResult> GetCuentasProductos([FromQuery] string tipobase)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            if (string.IsNullOrWhiteSpace(tipobase))
            {
                return BadRequest(new { error = "El parámetro 'tipobase' es obligatorio." });
            }

            var cuentas = await _carterasService.GetCarterasProductos(servidorClaim, tipobase);

            if (cuentas == null || cuentas.Count == 0)
            {
                return NotFound(new { error = "No se encontraron cuentas." });
            }

            return Ok(cuentas);
        }

        [HttpPost("nueva-campania")]
        [Authorize]
        [SwaggerOperation(
            Summary = "Inserta campaña",
            Description = "Crear una nueva campaña"
            )]
        public async Task<ActionResult<object>> NuevaCampaña([FromBody] CampañaDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { Error = "No se encontró el claim 'Servidor' en el token." });
            }

            try
            {
                bool insercionExitosa = await _carterasDao.NuevaCampaña(request, servidorClaim);

                if (insercionExitosa)
                {
                    return StatusCode(201, new { Message = "Campaña creada correctamente." });
                }
                else
                {
                    return StatusCode(500, new { Error = $"Error al crear la campaña: No se insertó ninguna fila." });
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(500, new { Error = $"Error al crear la campaña: {ex.Message}" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = $"Error inesperado al crear la campaña: {ex.Message}" });
            }
        }

        [HttpDelete("eliminar-campania")]
        [Authorize]
        [SwaggerOperation(
            Summary = "Eliminar Campaña",
            Description = "Elimina una campaña de la db memory "
        //Description = ""
        )]
        public async Task<ActionResult<string>> EliminarCampaña([FromQuery] int idCampaña)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            var resultado = await _carterasDao.EliminarCampaña(idCampaña, servidorClaim);

            if (resultado.StartsWith("Error:", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(resultado);
            }
            else
            {
                return Ok(resultado);
            }
        }


        [HttpPut("limpiar-campania")]
        [Authorize]
        [SwaggerOperation(
        Summary = "Limpiar campaña",
            Description = "Elimina el numero de cuentas de la campaña correspondiente reseteandolo a 0"
        )]
        public async Task<ActionResult<string>> LimpiarCampaña([FromQuery] int idCampaña)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            var resultado = await _carterasDao.LimpiarCampaña(idCampaña, servidorClaim);

            if (resultado.StartsWith("Error:", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(resultado);
            }
            else
            {
                return Ok(resultado);
            }
        }



        [HttpPost("Asigna-ejecutivos-campaña")]
        [AllowAnonymous]
        [SwaggerOperation(
           Summary = "Asigna ejecutivos",
            Description = "Se asigna una campaña encendida a cierto ejecutivo"
           )]
        public async Task<ActionResult<string>> AsignaEjecutivoCampaña(
        [FromQuery] bool inserta,
        int idCampaña,
        [FromQuery] int idEjecutivo)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "Falta el servidor en el token." });
            }
            if (idCampaña <= 0 || idEjecutivo <= 0)
            {
                return BadRequest(new { error = "Parámetros inválidos." });
            }
            try
            {
                var resultado = await _carterasDao.AsignaEjecutivoCampaña(inserta, idCampaña, idEjecutivo, servidorClaim);

                if (string.IsNullOrWhiteSpace(resultado) || resultado.StartsWith("Error", StringComparison.OrdinalIgnoreCase))
                {
                    return StatusCode(500, resultado ?? "Error al asignar ejecutivo.");
                }
                return Ok(resultado);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Error inesperado: {ex.Message}" });
            }
        }


        [HttpGet("FilasRestantesPorCampaña")]
        [SwaggerOperation(
        Summary = "Filas restantes por campaña",
            Description = "Se obtiene un registro de las filas restantes por idcampaña"
        //Descripcion = ""
        )]
        [Authorize]
        public async Task<IActionResult> GetFilasRestantesPorCampaña([FromQuery] int idCampaña)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "Falta el servidor en el token." });
            }
            if (idCampaña <= 0)
            {
                return BadRequest(new { error = "El parámetro 'idCampaña' es inválido." });
            }
            try
            {
                var resultado = await _carterasService.FilasRestantesPorCampaña(idCampaña, servidorClaim);
                return resultado == null
                    ? NotFound(new { error = "No se encontraron datos." })
                    : Ok(resultado);
            }
            catch (Exception ex)
            {
                return ex is ArgumentException
                    ? BadRequest(new { error = ex.Message })
                    : StatusCode(500, new { error = $"Error inesperado: {ex.Message}" });
            }
        }

        [HttpGet("Top100Filas")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "Top 100 filas",
            Description = "Se obtiene un conjunto de registros de la tabla FilasDeTrabajo correspondientes a la campaña seleccionada"
            //Descripcion = ""
            )]
        public async Task<IActionResult> Top100Filas([FromQuery] int idCampaña)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "Falta el servidor en el token." });
            }

            if (idCampaña <= 0)
            {
                return BadRequest(new { error = "El parámetro 'idCampaña' es inválido." });
            }

            try
            {
                var resultado = await _carterasService.Top100Filas(idCampaña, servidorClaim);

                return resultado == null || !resultado.Any()
                    ? NotFound(new { error = "No se encontraron datos." })
                    : Ok(resultado);
            }
            catch (Exception ex)
            {
                return ex is ArgumentException
                    ? BadRequest(new { error = ex.Message })
                    : StatusCode(500, new { error = $"Error inesperado: {ex.Message}" });
            }
        }


        [HttpPost("carga-filas")]
        [SwaggerOperation(
            Summary = "Carga Filas",
            Description = "Carga las filas asociadas a una campaña desde una tabla temporal específica hacia la tabla FilasDeTrabajo, " +
            "además actualiza el número de cuentas en la campaña y elimina la tabla temporal."
            )]
        public async Task<IActionResult> CargaFilas(
        [FromQuery] int idCampaña,
        [FromQuery] int idCartera)
        {
            // Extraer el servidor del token usando FindFirst
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            var resultado = await _carterasDao.CargaFilas(idCampaña, idCartera, servidorClaim);

            if (resultado == null)
            {
                return NotFound(new { error = "No se encontraron resultados." });
            }
            return Ok(resultado);
        }

        [HttpPost("carga-filas-consultas")]
        [SwaggerOperation(
        Summary = "Carga filas de consultas",
        Description = "Ejecuta una consulta y procesa los resultados e inserta las " +
            "filas en la tabla FilasDeTrabajo. Permite incluir opcionalmente los campos idEjecutivo y NúmeroTelefónico. " +
            "También actualiza el número de cuentas asociadas a la campaña."
        )]

        public async Task<IActionResult> CargaFilasConsultas(
        [FromQuery] int idCampaña,
        [FromQuery] string consulta,
        [FromQuery] bool ejecutivo,
        [FromQuery] bool telefono)
        {
 
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }
            var resultado = await _carterasDao.CargaFilasConsulta(idCampaña, consulta, ejecutivo, telefono, servidorClaim);

            if (resultado == null)
            {
                return NotFound(new { error = "No se encontraron resultados." });
            }
            return Ok(resultado);
        }


        [HttpPost("crea-tabla-filasTemp")]
        [SwaggerOperation(
            Summary = "Crea Tabla Filas Temp",
            Description = "crea una tabla temporal con el idcampaña especificado la cual a partir de ahi se formará el nombre de la tabla, la cual se almacena en dbmemory"
            )]
        public async Task<IActionResult> CreaTablaFilasTemp(
        [FromQuery] int idCampaña)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            var resultado = await _carterasDao.CreaTablaFilasTemp(idCampaña, servidorClaim);

            if (resultado == null)
            {
                return NotFound(new { error = "No se encontraron resultados." });
            }
            return Ok(resultado);
        }
    }
}

       
