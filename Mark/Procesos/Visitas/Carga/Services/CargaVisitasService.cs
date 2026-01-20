using ExcelDataReader;
using Loki.DTOs.Procesos.Visitas;
using Loki.Mark.Procesos.Visitas.Carga.DAOs;
using System.Data;
using System.Security.Claims;

namespace Loki.Mark.Procesos.Visitas.Carga.Services
{
    public class CargaVisitasService : ICargaVisitasService
    {
        private readonly ICargaVisitasDAO _dao;

        // Layout Base (36 Columnas)
        private readonly string[] _layoutBase = [
            "Cuenta", "MapeoVivienda", "ColorFachada", "ColorPuerta", "ColorHerreria", "NivelesPisos", "TipoVivienda",
            "NivelEconomico", "PropietarioVivienda", "AutoMapeo", "AutoMarca", "AutoModelo", "AutoAño", "AutoPlacas",
            "PersonaAtendio", "Contacto", "Parentesco", "Situacion", "CausaNoPago", "FechaVisita", "HoraVisita",
            "ClaveVisitador", "Observación", "Teléfono1Visita", "Teléfono2Visita", "Teléfono3Visita", "Correo",
            "CalleHorizontalNorte", "CalleHorizontalSur", "CalleVerticalEste", "CalleVerticalOeste", "Sucursal",
            "PaqueteVisitas", "MontoNegociación", "FechaPagoNegociación", "Herramienta"
        ];

        // Layout Cartera 24 (42 Columnas)
        private readonly string[] _layoutExtra = [
            "NúmeroMedidor", "EnergíaElectrica", "AcuseRequerimiento", "FotografíaPredio", "Latitud", "Longitud"
        ];

        public CargaVisitasService(ICargaVisitasDAO dao)
        {
            _dao = dao;
        }

        public async Task<CargaVisitasResponseDto> ProcesarCargaAsync(string servidor, CargaVisitasRequestDto request, ClaimsPrincipal user)
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

            // 2. Validar Layout (Columnas)
            var layoutEsperado = request.IdCartera == 24
                ? _layoutBase.Concat(_layoutExtra).ToArray()
                : _layoutBase;

            foreach (string col in layoutEsperado)
            {
                if (!datosExcel.Columns.Contains(col))
                    throw new ArgumentException($"Falta la columna requerida: {col}");
            }

            // 3. Validar Fechas (Lógica de 'validaFechas')
            // Es crucial porque la tabla SQL se creará con DATETIME para estas columnas.
            // Si va basura, el BulkCopy fallará.
            ValidarFormatosFecha(datosExcel);

            // 4. Crear Tabla Temporal Dinámica
            // Pasamos el DataTable para que el DAO sepa qué columnas crear
            await _dao.CrearTablaTemporalDinamicaAsync(servidor, idEjecutivo, datosExcel);

            // 5. Bulk Insert
            await _dao.RealizarBulkCopyAsync(servidor, idEjecutivo, datosExcel);

            // 6. Ejecutar secuencia de SPs
            await _dao.ValidarDatosAsync(servidor, request.IdCartera, idEjecutivo, request.UsarComplemento);
            await _dao.InsertarDatosAsync(servidor, request.IdCartera, idEjecutivo, request.UsarComplemento);

            // 7. Obtener Errores
            var errores = await _dao.ObtenerErroresAsync(servidor, request.IdCartera, idEjecutivo);
            var listaErrores = errores.ToList();

            int insertados = datosExcel.Rows.Count - listaErrores.Count;

            return new CargaVisitasResponseDto
            {
                TotalRegistrosLeidos = datosExcel.Rows.Count,
                TotalRegistrosCargados = insertados,
                Mensaje = insertados > 0 ? "Proceso finalizado." : "No se insertaron registros.",
                Errores = listaErrores
            };
        }

        private void ValidarFormatosFecha(DataTable dt)
        {
            string[] colFechas = { "FechaVisita", "HoraVisita", "FechaPagoNegociación", "FechaPagoNegociacion" };

            foreach (DataRow row in dt.Rows)
            {
                foreach (string col in colFechas)
                {
                    if (dt.Columns.Contains(col))
                    {
                        string valor = row[col]?.ToString()?.Trim();
                        if (!string.IsNullOrEmpty(valor))
                        {
                            if (!DateTime.TryParse(valor, out _))
                            {
                                throw new ArgumentException($"Error de formato de fecha en la columna '{col}' para la cuenta '{row["Cuenta"]}'. Valor: '{valor}'");
                            }
                        }
                    }
                }
            }
        }
    }
}