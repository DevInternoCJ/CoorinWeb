using ExcelDataReader;
using Loki.DTOs.Procesos.Accionamientos.CarteoDTOs;
using Loki.Mark.Procesos.Accionamientos.Carteo.Interfaces;
using System.Data;
using System.Security.Claims;

namespace Loki.Mark.Procesos.Accionamientos.Carteo.Services
{
    public class CarteoService : ICarteoService
    {
        private readonly ICarteoDAO _dao;

        public CarteoService(ICarteoDAO dao)
        {
            _dao = dao;
        }

        public async Task<CuentaCarteoResponseDto?> BuscarCuentaAsync(string servidor, int idCartera, string cuentaOrExpediente, bool esExpediente)
        {
            var cuenta = await _dao.BuscarCuentaAsync(servidor, idCartera, cuentaOrExpediente, esExpediente);

            if (cuenta == null) return null;

            var domicilios = await _dao.ObtenerDomiciliosAsync(servidor, idCartera, cuenta.IdCuenta);

            return new CuentaCarteoResponseDto
            {
                Cuenta = cuenta,
                Domicilios = domicilios.ToList()
            };
        }

        public async Task<bool> GuardarCarteoManualAsync(string servidor, GuardarCarteoManualRequestDto request, ClaimsPrincipal user)
        {
            // Validación de fechas
            if (request.FechaRechazo < request.FechaEnvio)
            {
                throw new ArgumentException("La fecha de devolución no puede ser menor a la fecha de envío.");
            }

            var idEjecutivoClaim = user.FindFirst("idEjecutivo")?.Value;
            if (!int.TryParse(idEjecutivoClaim, out int idEjecutivo))
                throw new UnauthorizedAccessException("No se pudo identificar al ejecutivo.");

            return await _dao.InsertarCarteoManualAsync(servidor, request, idEjecutivo);
        }

        public async Task<CargaCarteoResponseDto> ProcesarCargaMasivaAsync(string servidor, CargaCarteoRequestDto request, ClaimsPrincipal user)
        {
            var idEjecutivoClaim = user.FindFirst("idEjecutivo")?.Value;
            if (!int.TryParse(idEjecutivoClaim, out int idEjecutivo))
                throw new UnauthorizedAccessException("No se pudo identificar al ejecutivo.");

            // 1. Leer Excel
            DataTable datosExcel;
            using (var stream = request.ArchivoExcel.OpenReadStream())
            {
                System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                using var reader = ExcelReaderFactory.CreateReader(stream);
                var conf = new ExcelDataSetConfiguration { ConfigureDataTable = _ => new ExcelDataTableConfiguration { UseHeaderRow = true } }; // Asumimos headers
                var ds = reader.AsDataSet(conf);
                if (ds.Tables.Count == 0) throw new ArgumentException("El archivo está vacío.");
                datosExcel = ds.Tables[0];
            }

            // Validación básica de columnas (El código original espera 9 columnas)
            if (datosExcel.Columns.Count < 9)
                throw new ArgumentException("El archivo no tiene las columnas necesarias (mínimo 9).");


            // 2. Crear Tabla Temporal
            string nombreTablaTemp = $"Temp.Carteo_{idEjecutivo}";
            await _dao.CrearTablaTemporalAsync(servidor, idEjecutivo);

            // 3. Bulk Insert
            await _dao.RealizarBulkCopyAsync(servidor, datosExcel, nombreTablaTemp);

            // 4. Procesar
            var errores = await _dao.ProcesarCargaAsync(servidor, idEjecutivo, request.IdCartera, request.Selector);

            // 5. Respuesta
            int totalLeidos = datosExcel.Rows.Count;
            int totalErrores = errores.Count();
            int totalInsertados = totalLeidos - totalErrores;

            return new CargaCarteoResponseDto
            {
                TotalRegistrosLeidos = totalLeidos,
                TotalRegistrosInsertados = totalInsertados,
                Mensaje = totalInsertados > 0 ? "Carga finalizada." : "No se cargaron registros.",
                Errores = errores
            };
        }
    }
}
