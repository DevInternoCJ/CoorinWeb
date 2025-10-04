using CoorinWeb.Loki.Global;
using Loki.DTOs.CampaniasDTOs;
using Loki.Mark.Administracion.Carteras.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Administracion.Carteras.Controllers
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
        //[HttpGet("get-carteras")]
        //[Authorize]
        //[SwaggerOperation(
        //    Summary = "Carteras",
        //    Description = "obtiene una lista de carteras existentes del servidor"
        //    )]
        //public async Task<IActionResult> GetCuentas([FromQuery] string tipoBase)
        //{
        //    // Extraer el servidor del token
        //    //var servidorClaim = User.Claims.FirstOrDefault(c => c.Type == "servidor");
        //    string? servidorClaim = User.FindFirst("Servidor")?.Value;
        //    if (string.IsNullOrWhiteSpace(servidorClaim))
        //    {
        //        return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
        //    }
        //    //var servidor = servidorClaim.Value;

        //    if (string.IsNullOrWhiteSpace(tipoBase))
        //    {
        //        return BadRequest(new { error = "El tipo de base es obligatorio." });
        //    }
        //    var cuentas = await _carterasService.GetCarteras(servidorClaim, tipoBase);
        //    if (cuentas == null || cuentas.Count == 0)
        //    {
        //        return NotFound(new { error = "No se encontraron cuentas." });
        //    }
        //    return Ok(cuentas);
        //}


        //[HttpGet("get-carteras-productos")]
        //[Authorize]
        //[SwaggerOperation(
        //    Summary = "Obtener carteras productos",
        //    Description = ""
        //    )]
        //public async Task<IActionResult> GetCuentasProductos(string servidor, string tipobase)
        //{
        //    if (string.IsNullOrWhiteSpace(servidor) || string.IsNullOrWhiteSpace(tipobase))
        //    {
        //        return BadRequest(new { error = "Servidor y tipo de base son obligatorios." });
        //    }
        //    var cuentas = await _carterasService.GetCarterasProductos(servidor, tipobase);
        //    if (cuentas == null || cuentas.Count == 0)
        //    {
        //        return NotFound(new { error = "No se encontraron cuentas." });
        //    }
        //    return Ok(cuentas);
        //}

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
            string? servidor = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidor))
            {
                return Unauthorized(new { Error = "No se encontró la información del servidor en el token." });
            }

            try
            {
                bool insercionExitosa = await _carterasDao.NuevaCampaña(request, servidor);

                if (insercionExitosa)
                {
                    return StatusCode(201, new { Message = "Campaña creada correctamente." });
                }
                else
                {
                    return StatusCode(500, new { Error = $"Error al crear la campaña en el servidor {servidor}: No se insertó ninguna fila." });
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(500, new { Error = $"Error en la base de datos al crear la campaña: {ex.Message}" });
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
            Description = "Se asigna un ejecutivo a la campaña indicada"
           )]
        public async Task<ActionResult<string>> AsignaEjecutivoCampaña([FromQuery] bool inserta, int idCampaña, [FromQuery] int idEjecutivo)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }
            if (idCampaña <= 0 || idEjecutivo <= 0) return BadRequest("Parámetros inválidos.");

            try
            {
                var resultado = await _carterasDao.AsignaEjecutivoCampaña(inserta, idCampaña, idEjecutivo, servidorClaim);
                return string.IsNullOrWhiteSpace(resultado) || resultado.StartsWith("Error")
                    ? StatusCode(500, resultado ?? "Error al asignar ejecutivo.")
                    : Ok(resultado);
            }
            catch (ArgumentException ex) { return BadRequest(ex.Message); }
            catch (Exception ex) { return StatusCode(500, $"Error inesperado: {ex.Message}"); }
        }


        [HttpGet("FilasRestantesPorCampaña")]
        [SwaggerOperation(
     Summary = "Actualiza avance",
     Description = "Se obtiene un registro de las filas restantes por idcampaña con avance calculado"
 )]
        public async Task<IActionResult> GetFilasRestantesPorCampaña(
     [FromQuery] int idEncargado,  // Quitar el "?" y el "= null"
     [FromQuery] short? idCartera = null,
     [FromQuery] short? idProducto = null)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            try
            {
                var resultado = await _carterasService.GetAvanceCompletoCampañas(servidorClaim, idEncargado, idCartera, idProducto);

                return resultado == null || !resultado.Any()
                    ? NotFound("No se encontraron datos.")
                    : Ok(resultado);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error inesperado: {ex.Message}");
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
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            if (idCampaña <= 0)
                return BadRequest("El parámetro 'idCampaña' es inválido.");
            try
            {
                var resultado = await _carterasService.Top100Filas(idCampaña, servidorClaim);
                return resultado == null || !resultado.Any()
                    ? NotFound("No se encontraron datos.")
                    : Ok(resultado);
            }
            catch (Exception ex)
            {
                return ex is ArgumentException
                    ? BadRequest(ex.Message)
                    : StatusCode(500, $"Error inesperado: {ex.Message}");
            }
        }


        //[HttpPost("carga-filas")]
        //[SwaggerOperation(
        //    Summary = "Carga Filas",
        //    Description = "Carga las filas asociadas a una campaña desde una tabla temporal específica hacia la tabla FilasDeTrabajo, " +
        //    "además actualiza el número de cuentas en la campaña y elimina la tabla temporal."
        //    )]
        //public async Task<IActionResult> CargaFilas(
        //[FromQuery] int idCampaña,
        //[FromQuery] int idCartera)
        //{
        //    string? servidorClaim = User.FindFirst("Servidor")?.Value;

        //    if (string.IsNullOrWhiteSpace(servidorClaim))
        //    {
        //        return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
        //    }
           
        //    var resultado = await _carterasDao.CargaFilas(idCampaña, idCartera, servidorClaim);

        //    if (resultado == null)
        //    {
        //        return NotFound("No se encontraron resultados.");
        //    }
        //    return Ok(resultado);
        //}

        //[HttpPost("carga-filas-consultas")]
        //[SwaggerOperation(
        //Summary = "Carga consulta filas",
        //Description = "Ejecuta una consulta y procesa los resultados e inserta las " +
        //    "filas en la tabla FilasDeTrabajo. Permite incluir opcionalmente los campos idEjecutivo y NúmeroTelefónico. " +
        //    "También actualiza el número de cuentas asociadas a la campaña."
        //)]

        //public async Task<IActionResult> CargaFilasConsultas(
        //[FromQuery] int idCampaña,
        //[FromQuery] string consulta,
        //[FromQuery] bool ejecutivo,
        //[FromQuery] bool telefono)
        //{
        //    string? servidorClaim = User.FindFirst("Servidor")?.Value;

        //    if (string.IsNullOrWhiteSpace(servidorClaim))
        //    {
        //        return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
        //    }
        //    var resultado = await _carterasDao.CargaFilasConsulta(idCampaña, consulta, ejecutivo, telefono, servidorClaim);
        //    if (resultado == null)
        //    {
        //        return NotFound("No se encontraron resultados.");
        //    }
        //    return Ok(resultado);
        //}


        //[HttpPost("crea-tabla-filasTemp")]
        //[SwaggerOperation(
        //    Summary = "Carga Archivo Filas",
        //    Description = "crea una tabla temporal con el idcampaña especificado la cual a partir de ahi se formará el nombre de la tabla, la cual se almacena en dbmemory"
        //    )]
        //public async Task<IActionResult> CreaTablaFilasTemp(
        //[FromQuery] int idCampaña)
        //{
        //    string? servidorClaim = User.FindFirst("Servidor")?.Value;

        //    if (string.IsNullOrWhiteSpace(servidorClaim))
        //    {
        //        return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
        //    }
        //    var resultado = await _carterasDao.CreaTablaFilasTemp(idCampaña, servidorClaim);
        //    if (resultado == null)
        //    {
        //        return NotFound("No se encontraron resultados.");
        //    }
        //    return Ok(resultado);
        //}
        [HttpGet("Ejecutivos_en-Campaña")]
        [AllowAnonymous]
        [SwaggerOperation(
           Summary = "Ejecutivos en campaña",
           Description = "lista de los ejecutivos existentes en una campaña"
           //Descripcion = ""
           )]
        public async Task<IActionResult> EejecutivosEnCampaña([FromQuery] int idCampaña)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            if (idCampaña <= 0)
                return BadRequest("El parámetro 'idCampaña' es inválido.");
            try
            {
                var resultado = await _carterasService.EjecutivoDeCampaña(idCampaña, servidorClaim);
                return resultado == null || !resultado.Any()
                    ? NotFound("No se encontraron datos.")
                    : Ok(resultado);
            }
            catch (Exception ex)
            {
                return ex is ArgumentException
                    ? BadRequest(ex.Message)
                    : StatusCode(500, $"Error inesperado: {ex.Message}");
            }
        }

    }
}

