using Loki.DTOs.Procesos.Visitas;
using Loki.Mark.Procesos.Visitas.Corregir.DAOs;
using System.Security.Claims;

namespace Loki.Mark.Procesos.Visitas.Corregir.Services
{
    public class CorregirVisitasService : ICorregirVisitasService
    {
        private readonly ICorregirVisitasDAO _dao;

        public CorregirVisitasService(ICorregirVisitasDAO dao)
        {
            _dao = dao;
        }

        public async Task<IEnumerable<VisitaEditableDto>> BuscarVisitasAsync(string servidor, BuscarVisitasRequestDto request)
        {
            return await _dao.BuscarVisitasAsync(servidor, request.IdCartera, request.IdCuenta);
        }

        public async Task<bool> EditarVisitaAsync(string servidor, EditarVisitaRequestDto request, ClaimsPrincipal user)
        {
            // 1. Obtener ID del usuario que realiza la acción
            var idEjecutivoSesionClaim = user.FindFirst("idEjecutivo")?.Value;
            if (!int.TryParse(idEjecutivoSesionClaim, out int idEjecutivoSesion))
                throw new UnauthorizedAccessException("No se pudo identificar al usuario.");

            // 2. Determinar columna y valor a actualizar
            string columnaBD;
            object valorFinal;

            switch (request.Campo)
            {
                case CampoEdicionVisita.FechaVisita:
                    columnaBD = "Fecha_Visita";
                    if (!DateTime.TryParse(request.NuevoValor, out DateTime fecha))
                        throw new ArgumentException("Formato de fecha inválido.");
                    valorFinal = fecha;
                    break;

                case CampoEdicionVisita.Ejecutivo:
                    columnaBD = "idEjecutivo_Visita";
                    // El usuario envía la CLAVE (ej "BELF"), hay que buscar el ID
                    if (request.NuevoValor.Length < 4) throw new ArgumentException("La clave del ejecutivo debe tener 4 caracteres.");
                    var idEjecutivoNuevo = await _dao.ObtenerIdEjecutivoPorUsuarioAsync(servidor, request.NuevoValor);
                    if (idEjecutivoNuevo == null) throw new ArgumentException($"El ejecutivo con clave '{request.NuevoValor}' no existe.");
                    valorFinal = idEjecutivoNuevo.Value;
                    break;

                case CampoEdicionVisita.Sucursal:
                    columnaBD = "idSucursal";
                    if (!int.TryParse(request.NuevoValor, out int idSucursal))
                        throw new ArgumentException("El ID de sucursal debe ser numérico.");
                    valorFinal = idSucursal;
                    break;

                case CampoEdicionVisita.Comentario:
                    columnaBD = "Comentario";
                    valorFinal = request.NuevoValor;
                    break;

                default:
                    throw new ArgumentException("Campo no soportado.");
            }

            // 3. Obtener valor anterior para el Log (Auditoría)
            // Es vital obtenerlo de la BD justo antes de actualizar para que el log sea veraz
            string? valorAnterior = await _dao.ObtenerValorActualAsync(
                servidor, request.IdCartera, request.IdCuenta, request.FechaVisitaKey, request.HoraVisitaKey, columnaBD);

            if (valorAnterior == null)
            {
                // Si retorna null, puede que el registro no exista o el campo era null.
                // Verificamos existencia implícitamente: si Actualizar devuelve false, manejamos el error.
                valorAnterior = "";
            }

            // Recortar comentario anterior si es muy largo (como en el original)
            if (columnaBD == "Comentario" && valorAnterior.Length > 100)
                valorAnterior = valorAnterior.Substring(0, 100);

            // 4. Actualizar
            return await _dao.ActualizarVisitaAsync(
                servidor, request.IdCartera, request.IdCuenta, request.FechaVisitaKey, request.HoraVisitaKey,
                columnaBD, valorFinal, valorAnterior, idEjecutivoSesion);
        }
    }
}