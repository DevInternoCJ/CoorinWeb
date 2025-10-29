using System.Collections;
using CoorinWeb.Loki.Common;
using CoorinWeb.Loki.Global;
using Loki.Controllers;
using Loki.DTOs.BusquedaDTOs;
using Loki.DTOs.GeneralesDTOs;
using Loki.Mark.Administracion.Carteras.DAOs;
using Loki.Mark.Administracion.Carteras.Interfaces;
//using Loki.Mark.Consulta.Cuenta.Interfaces;
using Loki.Mark.Consulta.Generales.Interfaces;
using Loki.Mark.Consulta.Generales.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using static CoorinWeb.Loki.Global.AccionamientosQueryHelper;

namespace Loki.Mark.Consulta.Generales.Controllers
{
    public class GeneralesController : Controller
    {
        private readonly IGenerales _generalesService; // Inyecta la interfaz del servicio de búsquedas
        private readonly IGeneralesDao _generalesDao; 
        private readonly ILogger<GeneralesController> _logger;
        private readonly IDbContextFactory _dbContextFactory;
        private readonly ICarterasDAOs _carterasDaos;


        public GeneralesController(IGenerales generales, ILogger<GeneralesController> logger, IGenerales generalesService, IGeneralesDao generalesDao, IDbContextFactory dbContextFactory, ICarterasDAOs carterasDaos)
        {
            _generalesService = generales;
            _logger = logger;
            _generalesDao = generalesDao;
            _dbContextFactory = dbContextFactory;
            _carterasDaos = carterasDaos;
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
                // Validaciones básicas
                if (string.IsNullOrWhiteSpace(criteria.Servidor))
                    return BadRequest(new { error = "Debe proporcionar el nombre del servidor." });

                if (criteria.IdProducto == 0 || criteria.IdCartera == 0)
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
                    search.AgrupamientoExtra,
                    search.Desde
                );

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message, stackTrace = ex.StackTrace });
            }
        }


        [HttpPost("carga-filas-trabajo")]
        [SwaggerOperation(
             Summary = "cargar filas de trabajo generales - irene",
             Description = "Carga filas de trabajo a una campaña en búsqueda (admite idConsulta + parámetros/agrupaciones dinámicos)"
         )]


        public async Task<IActionResult> CargarFilasDeTrabajo([FromBody] CargaFilasTrabajo request)
        {
            try
            {

                string? servidorClaim = User.FindFirst("Servidor")?.Value;
                if (string.IsNullOrWhiteSpace(servidorClaim))
                    return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });


                await ConsultaGenerador.CargarDesdeBDAsync(_dbContextFactory, servidorClaim);

                ArrayList columnas = new ArrayList();
                string queryFinal;


                if (request.IdConsulta.HasValue)
                {
                    var consulta = ConsultaGenerador.ObtenerConsulta(request.IdConsulta.Value);
                    if (consulta == null)
                        return BadRequest(new { error = $"No se encontró la consulta con ID {request.IdConsulta.Value}" });

                    _logger.LogInformation($"Consulta encontrada: {consulta["NombreConsulta"]}");

                    var queryData = ConsultaGenerador.QueryCuentas(request.IdConsulta.Value, ref columnas);
                    if (string.IsNullOrEmpty(queryData.Query))
                        return BadRequest(new { error = "No se pudo generar la consulta SQL base." });

                    queryFinal = queryData.Query;
                }
                else
                {
                    //  Generar consulta dinámica desde parámetros
                    var tblParametros = AccionamientosQueryHelper.Ejecutivo1.TablaParámetros;
                    var tblAgrupar = AccionamientosQueryHelper.Ejecutivo1.TablaAgrupar;

                    tblParametros.Rows.Clear();
                    tblAgrupar.Rows.Clear();


                    tblParametros.Rows.Add("idCartera", "=", request.IdCartera.ToString(), "AND", "int");

                    // Agregar parámetros adicionales dinámicamente
                    foreach (var p in request.Parametros)
                        tblParametros.Rows.Add(p.Concepto, p.Campo, p.Valores, "AND", p.Dato);

                    // Agregar agrupaciones dinámicas
                    foreach (var g in request.Agrupar)
                        tblAgrupar.Rows.Add(g.Concepto, g.Campo);

                    var queryData = ConsultaGenerador.GeneraQueryCuentas(
                        request.IdCartera,
                        tblParametros,
                        tblAgrupar,
                        Resultado.Detalle,
                        DateTime.Today.AddMonths(-1),
                        request.IdCartera,
                        ref columnas
                    );

                    queryFinal = queryData.Query;
                }

                _logger.LogInformation($"Query generada final (antes de limpiar):\n{queryFinal}");

                // 5Limpiar filtros vacíos para que la query no rompa
                queryFinal = LimpiarFiltrosVacios(queryFinal);

                _logger.LogInformation($"Query final limpia:\n{queryFinal}");


                var resultado = await _carterasDaos.CargaFilasConsulta(
                    request.IdCampania,
                    queryFinal,
                    request.IncluirUsuario,
                    request.IncluirTelefono,
                    servidorClaim
                );


                return Ok(new
                {
                    mensaje = "Filas de trabajo cargadas correctamente.",
                    columnasGeneradas = columnas,
                    queryGenerada = queryFinal,
                    resultado
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al cargar filas de trabajo");
                return StatusCode(500, new { error = $"Error al cargar filas de trabajo: {ex.Message}" });
            }
        }

        private string LimpiarFiltrosVacios(string query)
        {
            if (string.IsNullOrWhiteSpace(query)) return query;

            var lines = query.Split('\n')
                             .Select(l => l.TrimEnd())
                             .Where(l =>
                             {

                                 if (l.EndsWith("IN (AND)", StringComparison.OrdinalIgnoreCase)) return false;
                                 if (l.EndsWith("AND") && l.Contains("C.id")) return false;
                                 return true;
                             });

            return string.Join("\n", lines);
        }
    }
}
