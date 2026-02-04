using DocumentFormat.OpenXml.Drawing.Diagrams;
using ExcelDataReader;
using Loki.DTOs.GespaDTOs;
using Loki.Mark.Auth.Controllers;
using Loki.Mark.Procesos.Gespa.Comentarios.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Data;

namespace Loki.Mark.Procesos.Gespa.Comentarios.Controllers
{
    [Route("api/[controller]")]
    [Tags("Procesos - Comentarios")]
    [ApiController]
    [SwaggerTag("Controlador de la pestaña Gespa/Comentarios.")]

    public class ComentariosController : ControllerBase
    {
        private readonly IComentariosGespaDAOs _comentariosGespaInterfaces;

        public ComentariosController(IComentariosGespaDAOs comentariosGespaInterfaces)
        {
            _comentariosGespaInterfaces = comentariosGespaInterfaces;
        }

        [HttpPost("modificar")]
        [AllowAnonymous]
        [SwaggerOperation(
            Summary = "Modificar Comentario - Padrino",
            Description = "Inserta comentarios y/o cambia la situacion de la cuenta."
        )]

        public async Task<IActionResult> ComentariosGespa([FromBody] ComentariosGespacs request)
        {

            // Validación básica: el campo "Servidor" es obligatorio para la autenticación.
            //if (string.IsNullOrWhiteSpace(request.Servidor))
            //{
            //    return BadRequest(new { error = "Servidor es obligatorio." });
            //}
            string? servidorClaim = User.FindFirst("Servidor")?.Value;

            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }


            if (string.IsNullOrWhiteSpace(request.Comentario))
            {
                return BadRequest(new { error = "Un comentario es obligatorio." });
            }

            var resultComentarios = await _comentariosGespaInterfaces.ValidateComentario(request, servidorClaim);
            if (resultComentarios == 1)
            {
                return Ok(new { Mensaje = "Actualizacion realizada con éxito." });
            }

            return BadRequest(new { Mensaje = "La cuenta no existe." });
        }
        [HttpPost("insertar-expediente")]
        [SwaggerOperation(
            Summary = "Insertar por Expediente - Irene",
            Description = "Inserta comentario por expediente, Situación : 0 para insertar y Situación: 1 para actualizar"
        )]
        public async Task<IActionResult> InsertarExpediente([FromBody] InsertaExpediente request)
        {
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            int idCarteraEjecutivo = int.Parse(User.FindFirst("idCartera")?.Value ?? "0");

            if (string.IsNullOrWhiteSpace(servidorClaim))
                return BadRequest(new { error = "No se encontró el servidor en el token." });

            if (request == null || string.IsNullOrWhiteSpace(request.Comentario))
                return BadRequest(new { error = "El comentario es obligatorio." });

            if (string.IsNullOrWhiteSpace(request.IdCuenta))
                return BadRequest(new { error = "El expediente/cuenta es obligatorio." });

            var resultado = await _comentariosGespaInterfaces.InsertarPorExpediente(request, servidorClaim, idCarteraEjecutivo);

            if (resultado.Success)
            {
                return Ok(new { Mensaje = resultado.Mensaje });
            }

            return BadRequest(new { Mensaje = resultado.Mensaje });
        }

        [HttpPost("carga-accionamientos")]
        [SwaggerOperation(
             Summary = "Carga Accionamientos - Irene",
             Description = "Endpoint para subir un archivo Excel (.xlsx) y procesar comentarios masivos."
         )]
        public async Task<IActionResult> CargaAccionamientos(IFormFile archivo, [FromQuery] int idCartera)
        {
            // 1. Validaciones de Identidad (Claims)
            string? servidorClaim = User.FindFirst("Servidor")?.Value;
            if (string.IsNullOrWhiteSpace(servidorClaim))
            {
                return BadRequest(new { error = "No se encontró el claim 'Servidor' en el token." });
            }

            int idEjecutivo = int.Parse(User.FindFirst("idEjecutivo")?.Value ?? "0");

            // 2. Validación del Archivo
            if (archivo == null || archivo.Length == 0)
            {
                return BadRequest("Por favor, seleccione un archivo Excel válido.");
            }

            // 3. Convertir el archivo subido a DataTable
            DataTable tabla = new DataTable();
            try
            {
                using (var stream = archivo.OpenReadStream())
                {
                    // Usamos ExcelDataReader para leer el Stream
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        var result = reader.AsDataSet(new ExcelDataSetConfiguration()
                        {
                            ConfigureDataTable = (_) => new ExcelDataTableConfiguration() { UseHeaderRow = true }
                        });
                        tabla = result.Tables[0];
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Error al leer el formato del archivo Excel", detalle = ex.Message });
            }

            // 4. Llamar al DAO con el DataTable resultante
            // Tu método CargaAccionamientosAsync ya recibe el DataTable y hace el BulkCopy
            var resultCarga = await _comentariosGespaInterfaces.CargaAccionamientosAsync(tabla, idCartera, idEjecutivo, servidorClaim);

            return resultCarga.Success ? Ok(resultCarga) : BadRequest(resultCarga);
        }
    }
}
