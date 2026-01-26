using ExcelDataReader;
using Loki.DTOs.Procesos.Visitas;
using Loki.Mark.Procesos.Visitas.Eliminar.DAOs;
using Loki.Mark.Procesos.Visitas.Eliminar.Interfaces;
using System.Data;
using System.Security.Claims;

namespace Loki.Mark.Procesos.Visitas.Eliminar.Services
{
    public class EliminarVisitasService : IEliminarVisitasService
    {
        private readonly IEliminarVisitasDAO _dao;
        private readonly string[] _layoutRequerido = { "Cuenta", "FechaVisita", "HoraVisita" };

        public EliminarVisitasService(IEliminarVisitasDAO dao)
        {
            _dao = dao;
        }

        public async Task<EliminarVisitasResponseDto> ProcesarEliminacionAsync(string servidor, EliminarVisitasRequestDto request, ClaimsPrincipal user)
        {
            var idEjecutivoClaim = user.FindFirst("idEjecutivo")?.Value;
            if (!int.TryParse(idEjecutivoClaim, out int idEjecutivo))
                throw new UnauthorizedAccessException("No se pudo identificar al ejecutivo.");

            // 1. Leer Excel
            DataTable datosExcel;
            using (var stream = request.ArchivoExcel.OpenReadStream())
            {
                System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    var conf = new ExcelDataSetConfiguration { ConfigureDataTable = _ => new ExcelDataTableConfiguration { UseHeaderRow = true } };
                    var ds = reader.AsDataSet(conf);
                    if (ds.Tables.Count == 0) throw new ArgumentException("El archivo Excel está vacío.");
                    datosExcel = ds.Tables[0];
                }
            }

            if (datosExcel.Rows.Count == 0) throw new ArgumentException("El archivo no contiene registros.");

            // 2. Validar Columnas
            foreach (string col in _layoutRequerido)
            {
                if (!datosExcel.Columns.Contains(col))
                    throw new ArgumentException($"Falta la columna requerida: {col}. El layout debe ser: Cuenta, FechaVisita, HoraVisita.");
            }

            // 3. Validar Fechas (Preventivo)
            foreach (DataRow row in datosExcel.Rows)
            {
                if (!DateTime.TryParse(row["FechaVisita"]?.ToString(), out _) ||
                    !DateTime.TryParse(row["HoraVisita"]?.ToString(), out _))
                {
                    throw new ArgumentException($"Error de formato de fecha/hora en la cuenta {row["Cuenta"]}.");
                }
            }

            // 4. Crear Tabla Temporal
            await _dao.CrearTablaTemporalAsync(servidor, idEjecutivo, datosExcel);

            // 5. Bulk Insert
            await _dao.RealizarBulkCopyAsync(servidor, idEjecutivo, datosExcel);

            // 6. Ejecutar Eliminación
            await _dao.EjecutarEliminacionAsync(servidor, request.IdCartera, idEjecutivo);

            return new EliminarVisitasResponseDto
            {
                TotalRegistrosLeidos = datosExcel.Rows.Count,
                Mensaje = "Proceso de eliminación ejecutado correctamente.",
                Exito = true
            };
        }
    }
}