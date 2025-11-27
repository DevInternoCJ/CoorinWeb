using ClosedXML.Excel;
using System.Data;
using System.IO;

namespace Loki.Global
{
    /// <summary>
    /// Servicio global para la generación dinámica de archivos Excel (.xlsx).
    /// Esta clase permite exportar datos de un DataTable a un archivo Excel.
    /// Es una adaptación del método original 'ExcelXML.ExportToExcelSAX'.
    /// </summary>
    public class ExcelGeneratorService
    {
        // NOTA: Si esta clase necesitara ejecutar queries o SPs directamente,
        // debería inyectar IDbContextFactory y DaoBase en su constructor.
        // Por ahora, asumimos que recibe un DataTable ya poblado.

        public ExcelGeneratorService()
        {
            // Constructor vacío, no necesita dependencias si solo procesa DataTables.
            // Si en el futuro necesita acceso a la BD, inyecta IDbContextFactory y DaoBase aquí.
        }

        /// <summary>
        /// Exporta los datos de un DataTable a un archivo Excel (.xlsx).
        /// Este método es una adaptación del original `ExcelXML.ExportToExcelSAX`.
        /// </summary>
        /// <param name="data">El DataTable que contiene los datos a exportar. Se pasa por referencia para compatibilidad con la firma original.</param>
        /// <param name="filePath">La ruta completa donde se guardará el archivo Excel.</param>
        /// <param name="sheetName">Opcional: El nombre de la hoja en el Excel. Por defecto es "Datos".</param>
        /// <returns>Una cadena vacía si la exportación es exitosa, o un mensaje de error si falla.</returns>
        public string ExportToExcelSAX(ref DataTable data, string filePath, string sheetName = "Datos")
        {
            try
            {
                // Verifica si el DataTable tiene datos
                if (data == null || data.Rows.Count == 0)
                {
                    return "El DataTable proporcionado está vacío o es nulo.";
                }

                // Crea un nuevo libro de trabajo de ClosedXML
                using (var workbook = new XLWorkbook())
                {
                    // Añade una hoja de trabajo con los datos del DataTable
                    // ClosedXML puede añadir directamente un DataTable a una hoja.
                    var worksheet = workbook.AddWorksheet(sheetName);
                    worksheet.Cell(1, 1).InsertTable(data);

                    // Ajusta el ancho de las columnas para que el contenido sea visible
                    worksheet.Columns().AdjustToContents();

                    // Guarda el libro de trabajo en la ruta especificada
                    workbook.SaveAs(filePath);
                }

                return ""; // Éxito: devuelve una cadena vacía
            }
            catch (Exception ex)
            {
                // Registra el error (puedes usar tu ILogger aquí si lo inyectas)
                Console.WriteLine($"Error al exportar a Excel: {ex.Message}");
                return $"Error al guardar el libro de Excel: {ex.Message}"; // Devuelve el mensaje de error
            }
        }

        /// <summary>
        /// Exporta un DataTable a un MemoryStream, útil para devolver el archivo directamente desde un controlador.
        /// </summary>
        /// <param name="data">El DataTable que contiene los datos.</param>
        /// <param name="sheetName">Opcional: El nombre de la hoja. Por defecto es "Datos".</param>
        /// <returns>Un MemoryStream con el contenido del archivo Excel, o null si falla.</returns>
        public MemoryStream? ExportToExcelStream(DataTable data, string sheetName = "Datos")
        {
            try
            {
                if (data == null || data.Rows.Count == 0)
                {
                    return null;
                }

                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.AddWorksheet(sheetName);
                    worksheet.Cell(1, 1).InsertTable(data);
                    worksheet.Columns().AdjustToContents();

                    var memoryStream = new MemoryStream();
                    workbook.SaveAs(memoryStream);
                    memoryStream.Position = 0; // Reinicia la posición para la lectura
                    return memoryStream;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al exportar a Excel como stream: {ex.Message}");
                return null;
            }
        }

        //Historico

        public MemoryStream ExportDataSetToExcel(DataSet dataSet)
        {
            try
            {
                if (dataSet == null || dataSet.Tables.Count == 0)
                {
                    return CreateEmptyExcel();
                }

                var memoryStream = new MemoryStream();

                using (var workbook = new XLWorkbook())
                {
                    foreach (DataTable table in dataSet.Tables)
                    {
                        var sheetName = GetSafeSheetName(
                            string.IsNullOrEmpty(table.TableName) ? "Datos" : table.TableName
                        );

                        var worksheet = workbook.AddWorksheet(sheetName);

                        if (table.Rows.Count == 0)
                        {
                            for (int col = 0; col < table.Columns.Count; col++)
                            {
                                worksheet.Cell(1, col + 1).Value = table.Columns[col].ColumnName;
                                worksheet.Cell(1, col + 1).Style.Font.Bold = true;
                                worksheet.Cell(1, col + 1).Style.Fill.BackgroundColor = XLColor.LightGray;
                            }

                            worksheet.Columns().AdjustToContents();
                            continue;
                        }

                        worksheet.Cell(1, 1).InsertTable(table);
                        worksheet.Columns().AdjustToContents();
                    }

                    workbook.SaveAs(memoryStream);
                }

                memoryStream.Position = 0;
                return memoryStream;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al exportar DataSet a Excel: {ex.Message}");
                return CreateErrorExcel(ex.Message);
            }
        }
        private string GetSafeSheetName(string proposedName)
        {
            var safeName = proposedName.Length > 31 ? proposedName.Substring(0, 31) : proposedName;
            var invalidChars = new char[] { '\\', '/', '*', '?', ':', '[', ']' };

            foreach (var c in invalidChars)
            {
                safeName = safeName.Replace(c, '_');
            }

            return safeName;
        }

        private MemoryStream CreateEmptyExcel()
        {
            var memoryStream = new MemoryStream();
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.AddWorksheet("Datos");
                worksheet.Cell(1, 1).Value = "No hay datos disponibles";
                workbook.SaveAs(memoryStream);
            }
            memoryStream.Position = 0;
            return memoryStream;
        }

        private MemoryStream CreateErrorExcel(string errorMessage)
        {
            var memoryStream = new MemoryStream();
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.AddWorksheet("Error");
                worksheet.Cell(1, 1).Value = "Error al generar el archivo Excel";
                worksheet.Cell(2, 1).Value = errorMessage;
                workbook.SaveAs(memoryStream);
            }
            memoryStream.Position = 0;
            return memoryStream;
        }
    }
}
