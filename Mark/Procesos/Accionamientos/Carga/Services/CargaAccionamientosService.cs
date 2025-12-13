using ExcelDataReader; // ¡Librería Open Source!
using Loki.DTOs.Procesos.Accionamientos.CargaDTOs;
using Loki.Mark.Procesos.Accionamientos.Carga.Interfaces;
using System.Data;
using System.Security.Claims;

namespace Loki.Mark.Procesos.Accionamientos.Carga.Services
{
    public class CargaAccionamientosService : ICargaAccionamientosService
    {
        private readonly ICargaAccionamientosDAO _dao;

        public CargaAccionamientosService(ICargaAccionamientosDAO dao)
        {
            _dao = dao;
        }

        public async Task<CargaAccionamientosResponseDto> ProcesarCargaAsync(string servidor, CargaAccionamientosRequestDto request, ClaimsPrincipal user)
        {
            // 1. Obtener ID del Ejecutivo
            var idEjecutivoClaim = user.FindFirst("idEjecutivo")?.Value;
            if (!int.TryParse(idEjecutivoClaim, out int idEjecutivo))
                throw new UnauthorizedAccessException("No se pudo identificar al ejecutivo.");

            // 2. Leer el archivo Excel a un DataTable
            // Esto carga el archivo en memoria. ExcelDataReader es muy eficiente.
            DataTable datosExcel;
            using (var stream = request.ArchivoExcel.OpenReadStream())
            {
                // Necesario para soportar codificaciones antiguas (aunque xlsx suele ser UTF8)
                System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

                using var reader = ExcelReaderFactory.CreateReader(stream);
                var conf = new ExcelDataSetConfiguration
                {
                    ConfigureDataTable = _ => new ExcelDataTableConfiguration { UseHeaderRow = true }
                };
                var dataSet = reader.AsDataSet(conf);

                if (dataSet.Tables.Count == 0)
                    throw new ArgumentException("El archivo Excel no contiene hojas.");

                datosExcel = dataSet.Tables[0]; // Usamos la primera hoja
            }

            if (datosExcel.Rows.Count == 0)
                throw new ArgumentException("El archivo Excel está vacío.");

            // 3. Validar Columnas (Replicando lógica de 'MuestraVistaPrevia')
            // Determinamos qué columnas esperamos según la cartera y tipo
            var (columnasEsperadas, tipoAccionamiento, esPorTipo) = DeterminarConfiguracionCarga(request);

            ValidarColumnasExcel(datosExcel, columnasEsperadas);

            // 4. Crear Tabla Temporal
            string nombreTablaTemp = $"Temp.ACCI_{idEjecutivo}"; // Nombre fijo usado por los SPs
                                                                 // A veces los SPs usan sufijos como _SMS_CATA_ según lógica interna, pero el SP 1.2 recibe el tema.
                                                                 // Asumiremos el flujo estándar definido en el DAO.

            await _dao.CrearTablaTemporalAsync(servidor, idEjecutivo, tipoAccionamiento, request.IdAcercamiento, request.IdCartera, esPorTipo);

            // 5. Bulk Insert (Subir datos a la tabla temporal)
            // Nota: SqlBulkCopy mapea columnas por orden si no se especifican mappings.
            // Aseguramos que el DataTable tenga solo las columnas necesarias en el orden correcto.
            DataTable datosLimpios = PrepararTablaParaBulk(datosExcel, columnasEsperadas);

            await _dao.RealizarBulkCopyAsync(servidor, datosLimpios, nombreTablaTemp);

            // 6. Procesar Carga (Mover de temporal a real)
            string baseDatos = request.UsarComplemento ? "dbComplemento.." : "dbCollection..";

            var errores = await _dao.ProcesarCargaAsync(
                servidor,
                request.IdCartera,
                idEjecutivo,
                request.IdAcercamiento,
                request.NombrePaquete,
                request.Descripcion,
                baseDatos,
                esPorTipo
            );

            // 7. Registrar Log y Responder
            var listaErrores = errores.ToList();
            int totalInsertados = datosExcel.Rows.Count - listaErrores.Count;

            await _dao.RegistrarLogProcesoAsync(servidor, request.IdCartera, idEjecutivo, request.ArchivoExcel.FileName, datosExcel.Rows.Count, totalInsertados);

            return new CargaAccionamientosResponseDto
            {
                TotalRegistrosLeidos = datosExcel.Rows.Count,
                TotalRegistrosCargados = totalInsertados,
                TotalErrores = listaErrores.Count,
                Mensaje = totalInsertados > 0 ? "Carga procesada correctamente." : "La carga se procesó pero ningún registro fue insertado.",
                RegistrosConError = listaErrores // El frontend puede usar esto para generar un Excel de errores
            };
        }

        // --- Métodos Auxiliares Privados ---

        private (string[] Columnas, string TipoAccionamiento, bool EsPorTipo) DeterminarConfiguracionCarga(CargaAccionamientosRequestDto r)
        {
            // Lógica replicada de 'frmAccionamientos.cs' -> 'MuestraVistaPrevia'

            // Caso: Email
            if (r.IdAcercamiento == 1607) // Email
            {
                if (r.IdCartera == 1)
                    return (new[] { "Expediente", "CorreoElectrónico", "Asunto", "Mensaje", "Hora", "Resultados" }, "AccionamientosEmail", false);

                return (new[] { "Expediente", "CorreoElectrónico", "Asunto", "Mensaje", "Resultados" }, "AccionamientosEmail", false);
            }

            // Caso: SMS/Whatsapp (Amex id 1 con actualización)
            if (r.IdAcercamiento == 1606 && r.IdCartera == 1 && r.EsActualizacion)
            {
                // Aquí la lógica original cambia drásticamente las columnas
                return (new[] { "TipoMensaje", "Mensaje", "Descuento", "Pagos", "Resultados" }, "AccionamientosSmsWhatsapp", true);
            }

            // Caso: SMS/Whatsapp (Amex id 1 normal)
            if (r.IdAcercamiento == 1606 && r.IdCartera == 1)
            {
                return (new[] { "Expediente", "Mensaje", "Telefono", "Hora", "Resultados" }, "AccionamientosSmsWhatsapp", false);
            }

            // Caso: SMS Genérico (Otras carteras)
            if (r.IdAcercamiento == 1606 || r.IdAcercamiento == 1609 || r.IdAcercamiento == 1605) // SMS, WA, Blaster
            {
                if (r.IdCartera == 7 && r.TieneTipoMensaje)
                    return (new[] { "Expediente", "Mensaje", "Telefono", "TipoMensaje", "Resultados" }, "AccionamientosSmsWhatsapp", true);

                return (new[] { "Expediente", "Mensaje", "Telefono", "Resultados" }, "AccionamientosSmsWhatsapp", false);
            }

            // Default (Cartas, Telegramas, etc.)
            return (new[] { "Expediente", "Mensaje", "Resultados" }, "Accionamientos", false);
        }

        private void ValidarColumnasExcel(DataTable dt, string[] columnasEsperadas)
        {
            // Validamos solo por cantidad de columnas por ahora, o podríamos checar nombres si el excel tiene headers
            // El código original renombra las columnas del DataTable según lo esperado.
            // Aquí verificamos que tenga al menos las necesarias.
            if (dt.Columns.Count < columnasEsperadas.Length)
            {
                throw new ArgumentException($"El archivo Excel no tiene el formato correcto. Se esperaban {columnasEsperadas.Length} columnas: {string.Join(", ", columnasEsperadas)}.");
            }
        }

        private DataTable PrepararTablaParaBulk(DataTable dtOriginal, string[] columnasEsperadas)
        {
            // Crea un nuevo DataTable con solo las columnas que vamos a insertar y en el orden correcto
            // SqlBulkCopy es posicional si no se mapea.
            DataTable dtBulk = new();
            foreach (var col in columnasEsperadas)
            {
                dtBulk.Columns.Add(col);
            }

            foreach (DataRow row in dtOriginal.Rows)
            {
                var newRow = dtBulk.NewRow();
                for (int i = 0; i < columnasEsperadas.Length; i++)
                {
                    // Copiamos por índice. Asumimos que el usuario subió el excel con las columnas en orden.
                    newRow[i] = row[i];
                }
                dtBulk.Rows.Add(newRow);
            }
            return dtBulk;
        }
    }
}