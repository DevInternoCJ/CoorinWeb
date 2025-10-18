using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Loki.Mark.Consulta.Cuenta.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Consulta.Cuenta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CatalogoController : ControllerBase
    {
        private readonly ICatalogosServiceRe _catalogosService;

        public CatalogoController(ICatalogosServiceRe catalogosService) => _catalogosService = catalogosService;

        private List<Dictionary<string, object>> DataTableToList(DataTable dt)
        {
            return dt.AsEnumerable()
                     .Select(dr => dr.Table.Columns.Cast<DataColumn>()
                                 .ToDictionary(col => col.ColumnName, col => dr[col]))
                     .ToList();
        }


        [HttpGet("cargaCatalogos")]
        [Authorize]
        [SwaggerOperation(
     Summary = "carga catálogos - irene",
     Description = "obtiene Carteras, Productos, Rechazos, Catalogos de consulta y Versiones"
 )]
        public async Task<IActionResult> CargarCatalogos([FromQuery] string servidor)
        {
            if (string.IsNullOrWhiteSpace(servidor))
                return BadRequest(new { error = "Debe enviar un servidor válido" });

            await _catalogosService.CargarCatalogosAsync(servidor);

            // Devuelve directamente las listas de DTO, incluyendo CatalogosConsultas
            return Ok(new
            {
                Carteras = _catalogosService.Carteras,
                Productos = _catalogosService.Productos,
                Rechazos = _catalogosService.Rechazos,
                CatalogosConsultas = _catalogosService.CatalogosConsultas, // <--- agregado
                Versiones = _catalogosService.Versiones
            });
        }

        [HttpGet("ColumnasProducto")]
        [SwaggerOperation(
            Summary = "columnas producto - irene",
            Description = "Obtiene la lista de nombres de columnas de un producto específico"
        )]
        public async Task<IActionResult> ColumnasProducto([FromQuery] string servidor, [FromQuery] int idProducto)
        {
            if (string.IsNullOrWhiteSpace(servidor) || idProducto <= 0)
                return BadRequest(new { error = "Debe enviar servidor e idProducto válidos" });

            var columnas = await _catalogosService.ColumnasProductoAsync(servidor, idProducto);
            return Ok(columnas);
        }

        [HttpGet("UsuariosRH")]
        [SwaggerOperation(
            Summary = "usuarios RH - irene",
            Description = "Obtiene los datos del usuario RH por nombre de usuario"
        )]
        public async Task<IActionResult> UsuariosRH([FromQuery] string servidor, [FromQuery] string usuario)
        {
            if (string.IsNullOrWhiteSpace(servidor) || string.IsNullOrWhiteSpace(usuario))
                return BadRequest(new { error = "Debe enviar servidor y usuario válidos" });

            var usuarios = await _catalogosService.CargarUsuariosRHAsync(servidor, "Collection", usuario);
            return Ok(usuarios);
        }

        [HttpGet("Versionamiento")]
        [SwaggerOperation(
            Summary = "versionamiento - irene",
            Description = "Obtiene las versiones de la aplicación Coorin"
        )]
        public async Task<IActionResult> Versionamiento([FromQuery] string servidor)
        {
            if (string.IsNullOrWhiteSpace(servidor))
                return BadRequest(new { error = "Debe enviar un servidor válido" });

            await _catalogosService.CargarVersionamientoAsync(servidor, "Collection");
            return Ok(_catalogosService.Versiones);
        }
    }
}
