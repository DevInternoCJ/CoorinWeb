using Loki.DTOs.GespaDTOs;
using Loki.Mark.Procesos.Gespa.Cargo_en_linea.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.Mark.Procesos.Gespa.Cargo_en_linea.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [SwaggerTag("Controladores de la pestaña Gespa/CargoEnLinea.")]
    public class CargoEnLineaGespaController : ControllerBase
    {
        private readonly ICargoEnLineaGespaDAOs _cargoEnLineaGespaInterfaces;

        public CargoEnLineaGespaController(ICargoEnLineaGespaDAOs cargoEnLineaGespaInterfaces)
        {
            _cargoEnLineaGespaInterfaces = cargoEnLineaGespaInterfaces;
        }

        [HttpPost("BusquedaAutorizar")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "CargoEnLineaGespaBusquedaAutorizar - Padrino",
            Description = "Ejecuta distintos stored dependiendo la opcion seleccionada."
        )]
        public async Task<dynamic?> ValidateCargoEnLineaAutorizarBuscar([FromBody]CargoEnLineaGespaAutorizarBuscar request)
        {
            // Validación básica: el campo "Servidor" es obligatorio para la autenticación.
            if (string.IsNullOrWhiteSpace(request.servidor))
            {
                return BadRequest(new { error = "Servidor es obligatorio." });
            }

            var resultadoCargoEnLineaAutorizar = await _cargoEnLineaGespaInterfaces.ValidateCargoEnLineaAutorizarBuscar(request);

            if(resultadoCargoEnLineaAutorizar != null)
            {
                return Ok(resultadoCargoEnLineaAutorizar);
            }
            else
            {
                return BadRequest(new { error = "No se encontró información con los parámetros proporcionados." });
            }
        }

        [HttpPost("EjecutaAutorizar")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "CargoEnLineaGespaAutorizar/NoAutorizar - Padrino",
            Description = "Ejecuta distintos stored dependiendo la cartera."
        )]
        public async Task<dynamic?> ValidateCargoEnLineaAutorizar([FromBody] CargoEnLineaAutorizar request)
        {
            // Validación básica: el campo "Servidor" es obligatorio para la autenticación.
            if (string.IsNullOrWhiteSpace(request.servidor))
            {
                return BadRequest(new { error = "Servidor es obligatorio." });
            }
            var resultadoCargoEnLineaAutorizar = await _cargoEnLineaGespaInterfaces.ValidateCargoEnLineaAutorizar(request);
            if (resultadoCargoEnLineaAutorizar != null)
            {
                return Ok(new {Mensaje = "Proceso correcto"});
            }
            else
            {
                return BadRequest(new { error = "No se encontró información con los parámetros proporcionados." });
            }
        }

        [HttpPost("BusquedaCorregir")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "CargoEnLineaGespaBusquedaCorregir - Padrino",
            Description = "Ejecuta distintos stored dependiendo la opcion seleccionada."
        )]
        public async Task<dynamic?> ValidateCargoEnLineaCorregirBuscar([FromBody] CargoEnLineaCorregirBuscar request)
        {
            // Validación básica: el campo "Servidor" es obligatorio para la autenticación.
            if (string.IsNullOrWhiteSpace(request.servidor))
            {
                return BadRequest(new { error = "Servidor es obligatorio." });
            }

            var resultadoCargoEnLineaAutorizar = await _cargoEnLineaGespaInterfaces.ValidateCargoEnLineaCorregirBuscar(request);

            if (resultadoCargoEnLineaAutorizar != null)
            {
                return Ok(resultadoCargoEnLineaAutorizar);
            }
            else
            {
                return BadRequest(new { error = "No se encontró información con los parámetros proporcionados." });
            }
        }

        [HttpPost("EjecutaCorregir")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "CargoEnLineaGespaCorregir - Padrino",
            Description = "Realiza un update a la tabña cargos ATM"
        )]
        public async Task<dynamic?> ValidateCargoEnLineaCorregir(CargoEnLineaCorregir request)
        {
            // Validación básica: el campo "Servidor" es obligatorio para la autenticación.
            if (string.IsNullOrWhiteSpace(request.servidor))
            {
                return BadRequest(new { error = "Servidor es obligatorio." });
            }
            var resultadoCargoEnLineaCorregir = await _cargoEnLineaGespaInterfaces.ValidateCargoEnLineaCorregir(request);
            if (resultadoCargoEnLineaCorregir == 1)
            {
                return Ok(new { Mensaje = "Actualizacion realizada con éxito." });
            }

            return BadRequest(new { Mensaje = "La cuenta no existe." });



        }




    }
}
