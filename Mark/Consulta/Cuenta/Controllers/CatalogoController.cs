using Loki.DTOs.CatalogosDTOs;
using Loki.Mark.Consulta.Cuenta.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Loki.Mark.Consulta.Cuenta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Asegura que solo usuarios autenticados puedan acceder a este controlador
    public class CatalogoController : ControllerBase
    {
        private readonly ICatalogosServiceRe _catalogosService;

        public CatalogoController(ICatalogosServiceRe catalogosService)
        {
            _catalogosService = catalogosService;
        }

       
    }
}
