using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Loki.Mark.Consulta.Productividad.Interfaces;
using Loki.DTOs.ProductividadDTO;
using Microsoft.Extensions.Logging;

namespace Loki.Mark.Consulta.Productividad.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductividadController : ControllerBase
    {
        private readonly IProductividadService _productividadService;
        private readonly ILogger<ProductividadController> _logger;

        public ProductividadController(IProductividadService productividadService, ILogger<ProductividadController> logger)
        {
            _productividadService = productividadService;
            _logger = logger;
        }

        [HttpPost("get-productividad")]
        [SwaggerOperation(
            Summary = "Consulta de Productividad",
            Description = "Obtiene la productividad de uno o más ejecutivos."
        )]
        public async Task<IActionResult> obtieneProductividad([FromBody] ProductividadRequest request)
        {
            Console.WriteLine($"=== CONTROLLER: obtieneProductividad INICIADO ===");
            Console.WriteLine($"Request recibido:");
            Console.WriteLine($"  - Indicador: {request.Indicador}");
            Console.WriteLine($"  - IdsEjecutivos: [{string.Join(", ", request.IdsEjecutivos)}]");
            Console.WriteLine($"  - IdEjecutivoPrincipal: {request.IdEjecutivoPrincipal}");
            Console.WriteLine($"  - EsModoHora: {request.EsModoHora}");

            if (string.IsNullOrWhiteSpace(request.Indicador))
            {
                Console.WriteLine($"❌ ERROR: Indicador requerido");
                return BadRequest(new { error = "El indicador es requerido" });
            }

            if (request.IdsEjecutivos == null || !request.IdsEjecutivos.Any())
            {
                Console.WriteLine($"❌ ERROR: Se requiere al menos un ID de ejecutivo");
                return BadRequest(new { error = "Se requiere al menos un ID de ejecutivo" });
            }

            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                Console.WriteLine($"❌ ERROR: No se encontró el claim 'Servidor'");
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            Console.WriteLine($"Servidor claim: {servidorClaim}");

            try
            {
                var resultados = new List<object>();

                Console.WriteLine($"Procesando {request.IdsEjecutivos.Count} ejecutivo(s)...");

                foreach (var idEjecutivo in request.IdsEjecutivos)
                {
                    Console.WriteLine($"📞 Llamando Service para ejecutivo: {idEjecutivo}");

                    var productividad = await _productividadService.obtieneProductividad(
                        request.Indicador,
                        idEjecutivo,
                        servidorClaim,
                        request.EsModoHora
                    );

                    Console.WriteLine($"✅ Service retornó para ejecutivo {idEjecutivo}");

                    if (productividad is System.Collections.IEnumerable enumerable && productividad is not string)
                    {
                        int count = 0;
                        foreach (var item in enumerable)
                        {
                            resultados.Add(item);
                            count++;
                        }
                        Console.WriteLine($"  - Agregados {count} items del enumerable");
                    }
                    else
                    {
                        resultados.Add(productividad);
                        Console.WriteLine($"  - Agregado 1 item directo");
                    }
                }

                Console.WriteLine($"📊 Total resultados acumulados: {resultados.Count}");

                var response = new ProductividadResponse
                {
                    Datos = resultados,
                    Modo = request.EsModoHora ? "Hora" : "Dia",
                    Indicador = request.Indicador,
                    TotalRegistros = resultados.Count
                };

                Console.WriteLine($"✅ RESPONSE ENVIADO:");
                Console.WriteLine($"  - Indicador: {response.Indicador}");
                Console.WriteLine($"  - Modo: {response.Modo}");
                Console.WriteLine($"  - TotalRegistros: {response.TotalRegistros}");

                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"❌ ArgumentException: {ex.Message}");
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ EXCEPCIÓN NO MANEJADA: {ex.Message}");
                Console.WriteLine($"Stack: {ex.StackTrace}");
                _logger.LogError(ex, "Error obteniendo productividad");
                return StatusCode(500, new { error = "Error interno del servidor" });
            }
        }
    }
}