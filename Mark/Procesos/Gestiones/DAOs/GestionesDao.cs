using ClosedXML.Excel;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.GestionesDTOs;
using Loki.Mark.Procesos.Gestiones.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Formats.Asn1;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using static Loki.Mark.Consulta.Cuenta.Services.BusquedasService;

namespace Loki.Mark.Procesos.Gestiones.DAOs
{
    public class GestionesDao : IGestionesDao
    {
        private readonly DaoBase _daoBase;
        private readonly CustomDbContextFactory _dbContFactory;

        public GestionesDao(IServiceProvider serviceProvider, DaoBase daoBase)
        {
            _daoBase = daoBase;
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
        }

        public async Task<(bool success, string message)> actualizaComentario(string servidor, ActualizaComentarioRequest request)
        {
            using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "Collection");

            if (sqlConnection.State != ConnectionState.Open)
                await sqlConnection.OpenAsync();

            using var transaction = await sqlConnection.BeginTransactionAsync();

            try
            {
                // Validaciones
                if (string.IsNullOrWhiteSpace(request.Comentario))
                {
                    return (false, "Favor de introducir un comentario.");
                }

                string comentarioLimpio = Loki.Global.Funciones.QuitaTeléfonos(request.Comentario.Replace("'", "").Trim());

                // Query para la base de datos principal - SEGUNDO_INSERT siempre es GETDATE()
                string queryPrincipal = @"
                    UPDATE dbo.Comentarios 
                    SET Comentario = @Comentario, 
                        Fecha_Insert = @FechaNueva,
                        Segundo_Insert = GETDATE()
                    WHERE idCuenta = @idCuenta 
                    AND idCartera = @idCartera 
                    AND Fecha_Insert = @FechaOriginal 
                    AND Segundo_Insert = @SegundoInsert";

                var parametersPrincipal = new
                {
                    Comentario = comentarioLimpio,
                    request.idCuenta,
                    request.idCartera,
                    FechaOriginal = request.FechaOriginal,
                    SegundoInsert = request.SegundoInsert,
                    FechaNueva = request.FechaNueva
                };

                int filasAfectadasPrincipal = await sqlConnection.ExecuteAsync(
                    queryPrincipal, parametersPrincipal, transaction);

                // Query para la base de history
                string queryHistory = @"
                    UPDATE dbHistory.dbo.Comentarios 
                    SET Comentario = @Comentario, 
                        Fecha_Insert = @FechaNueva,
                        Segundo_Insert = GETDATE()
                    WHERE idCuenta = @idCuenta 
                    AND idCartera = @idCartera 
                    AND Fecha_Insert = @FechaOriginal 
                    AND Segundo_Insert = @SegundoInsert";

                int filasAfectadasHistory = await sqlConnection.ExecuteAsync(
                    queryHistory, parametersPrincipal, transaction);

                await transaction.CommitAsync();

                if (filasAfectadasPrincipal > 0 || filasAfectadasHistory > 0)
                {
                    string mensaje = "";

                    if (filasAfectadasPrincipal > 0 && filasAfectadasHistory > 0)
                        mensaje = "Comentario actualizado correctamente en ambas bases de datos.";
                    else if (filasAfectadasPrincipal > 0)
                        mensaje = "Comentario actualizado solo en la base principal (Collection).";
                    else
                        mensaje = "Comentario actualizado solo en la base de historial (History).";

                    return (true, mensaje);
                }
                else
                {
                    return (false, "No se pudo actualizar el comentario en ninguna base de datos. Verifique los datos.");
                }
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return (false, $"Error al actualizar el comentario: {ex.Message}");
            }
        }


        //carga gestiones
        #region carga llamadas
        public async Task<(bool success, string message, DataTable errores)> CargarLlamadasAsync(CargaLlamadasRequest request, string servidor)
        {

            if (request.Archivo == null || request.Archivo.Length == 0)
                return (false, "Archivo inválido", null);

            DataTable tblLlamadas;
            var extension = Path.GetExtension(request.Archivo.FileName).ToLowerInvariant();


            try
            {
                // Leer archivo según extensión
                if (extension == ".csv" || extension == ".txt")
                {
                    Console.WriteLine("Leyendo desde CSV...");
                    tblLlamadas = await LeerLlamadasDesdeCSV(request.Archivo);
                }
                else if (extension == ".xlsx" || extension == ".xls")
                {
                    Console.WriteLine("Leyendo desde Excel...");
                    tblLlamadas = LeerLlamadasDesdeExcel(request.Archivo);
                }
                else
                {
                    return (false, "Formato de archivo no soportado. Solo CSV, TXT o Excel.", null);
                }

                // Validar que el DataTable tenga datos
                if (tblLlamadas.Rows.Count == 0)
                    return (false, "El archivo no contiene registros válidos.", null);

                return await ProcesarCargaCompleta(tblLlamadas, request, servidor);
            }
            catch (Exception ex)
            {
       
                return (false, $"Error al procesar archivo: {ex.Message}", null);
            }
        }

        private async Task<DataTable> LeerLlamadasDesdeCSV(IFormFile archivo)
        {
            var tblLlamadas = new DataTable();

            using var stream = archivo.OpenReadStream();
            using var reader = new StreamReader(stream);

            // Leer primera línea para headers
            string firstLine = await reader.ReadLineAsync();
            if (string.IsNullOrEmpty(firstLine))
                return tblLlamadas;

            var headers = firstLine.Split(',').Select(h => h.Trim('"').Trim()).ToArray();

            // Crear columnas basadas en headers
            foreach (var header in headers)
            {
                tblLlamadas.Columns.Add(header, typeof(string));
            }

            // Leer el resto de líneas
            string line;
            int lineCount = 0;
            while ((line = await reader.ReadLineAsync()) != null)
            {
                if (string.IsNullOrWhiteSpace(line))
                    continue;

                var values = ParseCSVLine(line);
                var row = tblLlamadas.NewRow();

                for (int i = 0; i < Math.Min(headers.Length, values.Length); i++)
                {
                    row[headers[i]] = values[i].Trim('"').Trim();
                }
                tblLlamadas.Rows.Add(row);
                lineCount++;

                if (lineCount <= 3) // Mostrar primeras 3 filas para debug
                {
                }
            }

            return tblLlamadas;
        }

        private string[] ParseCSVLine(string line)
        {
            var values = new List<string>();
            var current = new StringBuilder();
            bool inQuotes = false;

            for (int i = 0; i < line.Length; i++)
            {
                char c = line[i];

                if (c == '"')
                {
                    inQuotes = !inQuotes;
                }
                else if (c == ',' && !inQuotes)
                {
                    values.Add(current.ToString());
                    current.Clear();
                }
                else
                {
                    current.Append(c);
                }
            }

            values.Add(current.ToString());
            return values.ToArray();
        }

        private DataTable LeerLlamadasDesdeExcel(IFormFile archivo)
        {
            var tblLlamadas = new DataTable();

            using var stream = archivo.OpenReadStream();
            using var workbook = new XLWorkbook(stream);
            var worksheet = workbook.Worksheet(1);

            var rows = worksheet.RangeUsed().RowsUsed().ToList();
            Console.WriteLine($"Filas encontradas en Excel: {rows.Count}");

            if (rows.Count == 0) return tblLlamadas;

            // Leer headers (primera fila)
            var headerRow = rows[0];
            foreach (var cell in headerRow.Cells())
            {
                var header = cell.Value.ToString();
                tblLlamadas.Columns.Add(header, typeof(string));
            }

            // Leer datos (filas siguientes)
            for (int i = 1; i < rows.Count; i++)
            {
                var dataRow = rows[i];
                var row = tblLlamadas.NewRow();

                for (int col = 0; col < tblLlamadas.Columns.Count; col++)
                {
                    var cell = dataRow.Cell(col + 1);
                    row[col] = cell.Value.ToString() ?? string.Empty;
                }

                tblLlamadas.Rows.Add(row);

                if (i <= 3) // Mostrar primeras 3 filas para debug
                {
                }
            }

            return tblLlamadas;
        }

        private async Task<(bool success, string message, DataTable errores)> ProcesarCargaCompleta(
            DataTable tblLlamadas,
            CargaLlamadasRequest request,
            string servidor)
        {

            foreach (DataColumn col in tblLlamadas.Columns)
            {

            }

            using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "Collection");


            if (sqlConnection.State != ConnectionState.Open)
            {

                await sqlConnection.OpenAsync();
            }

            using var transaction = await sqlConnection.BeginTransactionAsync() as IDbTransaction;

            try
            {
                // 0. Validar y limpiar datos ANTES de crear la tabla temporal
                Console.WriteLine("Validando y limpiando datos...");
                ValidarYLimpiarDatos(tblLlamadas);

                // 1. Crear tabla temporal
                string tempTableName = $"LLAM_{request.IdEjecutivo}";
                Console.WriteLine($"Creando tabla temporal: {tempTableName}");
                await CrearTablaTemporal(sqlConnection, transaction, tempTableName, tblLlamadas);

                // 2. Bulk insert
                Console.WriteLine("Iniciando BulkInsert...");
                await BulkInsertLlamadas(sqlConnection, transaction, tempTableName, tblLlamadas);

                // 3. Ejecutar stored procedure
                Console.WriteLine("Ejecutando stored procedure...");
                var spResult = await EjecutarStoredProcedure(sqlConnection, transaction, request, tempTableName);

                bool success = spResult.success;
                string message = spResult.message;
                DataTable errores = spResult.errores;

                if (success)
                {
                    // 4. Registrar log - Pasar totalRegistros como parámetro
                    await RegistrarLogProceso(
                        sqlConnection,
                        transaction,
                        request,
                        tblLlamadas.Rows.Count - (errores?.Rows.Count ?? 0),
                        tblLlamadas.Rows.Count
                    );

                    transaction?.Commit();

                    int registrosCargados = tblLlamadas.Rows.Count - (errores?.Rows.Count ?? 0);
                    return (true, $"Llamadas cargadas: {registrosCargados} de {tblLlamadas.Rows.Count}", errores);
                }
                else
                {
                    transaction?.Rollback();

                    return (false, message, errores);
                }
            }
            catch (Exception ex)
            {    
                transaction?.Rollback();
                return (false, $"Error en carga completa: {ex.Message}", null);
            }
        }

        private void ValidarYLimpiarDatos(DataTable tblLlamadas)
        {

            int filasConProblemas = 0;

            for (int i = 0; i < tblLlamadas.Rows.Count; i++)
            {
                var row = tblLlamadas.Rows[i];
                bool tieneProblemas = false;


                // Si después de limpiar tenemos problemas, usar valores por defecto
                if (tblLlamadas.Columns.Contains("FechaGestion"))
                {
                    string fechaOriginal = row["FechaGestion"]?.ToString() ?? "NULL";
                    string fechaLimpia = LimpiarYFormatearFecha(fechaOriginal);

                    if (fechaLimpia == null && !string.IsNullOrWhiteSpace(fechaOriginal))
                    {
                        tieneProblemas = true;
                        Console.WriteLine($"⚠️  Fila {i + 1}: FechaGestion no válida - '{fechaOriginal}'");

                        // USAR FECHA POR DEFECTO EN LUGAR DE NULL
                        fechaLimpia = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");
                    
                    }

                    row["FechaGestion"] = fechaLimpia ?? (object)DBNull.Value;
                }

                if (tblLlamadas.Columns.Contains("HoraGestion"))
                {
                    string horaOriginal = row["HoraGestion"]?.ToString() ?? "NULL";
                    string horaLimpia = LimpiarYFormatearHora(horaOriginal);

                    if (horaLimpia == null && !string.IsNullOrWhiteSpace(horaOriginal))
                    {
                        tieneProblemas = true;
                     
                        horaLimpia = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");
                       
                    }

                    row["HoraGestion"] = horaLimpia ?? (object)DBNull.Value;
                }

                if (tblLlamadas.Columns.Contains("Duracion"))
                {
                    string duracionOriginal = row["Duracion"]?.ToString() ?? "NULL";
                    string duracionLimpia = LimpiarYFormatearDuracion(duracionOriginal);

                    if (duracionLimpia == null && !string.IsNullOrWhiteSpace(duracionOriginal))
                    {
                        tieneProblemas = true;

                        // USAR DURACIÓN POR DEFECTO EN LUGAR DE NULL
                        duracionLimpia = new DateTime(1900, 1, 1, 0, 5, 0).ToString("yyyy-MM-dd HH:mm:ss.fff");
                       
                    }

                    row["Duracion"] = duracionLimpia ?? (object)DBNull.Value;
                }


                if (tieneProblemas)
                {
                    filasConProblemas++;
                }
            }

        }

        private string LimpiarYFormatearFecha(string fecha)
        {
            if (string.IsNullOrWhiteSpace(fecha))
                return null;

            fecha = fecha.Trim();
       
            // Manejar formato específico "1103208:00:00" - parece ser días desde alguna fecha base
            if (fecha.Contains(":") && double.TryParse(fecha.Split(':')[0], out double diasDesdeBase))
            {
                try
                {
                    // Asumir que es días desde 1900-01-01 (formato Excel común)
                    DateTime fechaBase = new DateTime(1900, 1, 1);
                    DateTime fechaCalculada = fechaBase.AddDays(diasDesdeBase - 2); // -2 por diferencia de base Excel
                 
                    return fechaCalculada.ToString("yyyy-MM-dd HH:mm:ss.fff");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error calculando fecha desde días: {ex.Message}");
                }
            }

            // Intentar diferentes formatos de fecha tradicionales
            string[] formatos = {
                "dd/MM/yyyy", "d/M/yyyy", "dd-MM-yyyy", "d-M-yyyy",
                "MM/dd/yyyy", "M/d/yyyy", "MM-dd-yyyy", "M-d-yyyy",
                "yyyy-MM-dd", "yyyy/MM/dd", "yyyy-M-d",
                "ddMMyyyy", "dMyyyy"
            };

            foreach (string formato in formatos)
            {
                if (DateTime.TryParseExact(fecha, formato, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime fechaDate))
                {
                    return fechaDate.ToString("yyyy-MM-dd HH:mm:ss.fff");
                }
            }

            // Intentar parseo normal
            if (DateTime.TryParse(fecha, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime fechaParseada))
            {
                return fechaParseada.ToString("yyyy-MM-dd HH:mm:ss.fff");
            }

         
            return null;
        }

        private string LimpiarYFormatearHora(string hora)
        {
            if (string.IsNullOrWhiteSpace(hora))
                return null;

            hora = hora.Trim();
            Console.WriteLine($"Parseando hora: '{hora}'");

            // Caso específico: "1899-12-30 21:00:00.000" - extraer solo la parte de hora
            if (hora.Contains("1899-12-30"))
            {
                try
                {
                    if (DateTime.TryParse(hora, out DateTime fechaHora))
                    {
                        // Extraer solo el componente de tiempo
                        DateTime horaConvertida = new DateTime(1900, 1, 1, fechaHora.Hour, fechaHora.Minute, fechaHora.Second, fechaHora.Millisecond);
                        Console.WriteLine($"Hora extraída de fecha 1899: {horaConvertida}");
                        return horaConvertida.ToString("yyyy-MM-dd HH:mm:ss.fff");
                    }
                }
                catch (Exception ex)
                {
                  
                }
            }

            // Intentar parsear como TimeSpan
            if (TimeSpan.TryParse(hora, out TimeSpan horaTime))
            {
                DateTime fechaHora = DateTime.MinValue.Add(horaTime);
                Console.WriteLine($"Hora parseada como TimeSpan: {fechaHora}");
                return fechaHora.ToString("yyyy-MM-dd HH:mm:ss.fff");
            }

            // Si es un número, asumir que son segundos desde medianoche
            if (double.TryParse(hora, out double segundosDesdeMedianoche) && segundosDesdeMedianoche > 0)
            {
                try
                {
                    TimeSpan ts = TimeSpan.FromSeconds(segundosDesdeMedianoche);
                    DateTime fechaHora = DateTime.MinValue.Add(ts);
                   
                    return fechaHora.ToString("yyyy-MM-dd HH:mm:ss.fff");
                }
                catch (Exception ex)
                {
                    
                }
            }

            // Manejar formato HHmmss o variantes
            if (hora.Replace(":", "").All(char.IsDigit) && hora.Replace(":", "").Length >= 4)
            {
                string horaSinSeparadores = hora.Replace(":", "");
                try
                {
                    int horas = int.Parse(horaSinSeparadores.Substring(0, 2));
                    int minutos = int.Parse(horaSinSeparadores.Substring(2, 2));
                    int segundosHora = horaSinSeparadores.Length >= 6 ? int.Parse(horaSinSeparadores.Substring(4, 2)) : 0;

                    if (horas >= 0 && horas < 24 && minutos >= 0 && minutos < 60 && segundosHora >= 0 && segundosHora < 60)
                    {
                        DateTime fechaHora = new DateTime(1900, 1, 1, horas, minutos, segundosHora);
                      
                        return fechaHora.ToString("yyyy-MM-dd HH:mm:ss.fff");
                    }
                }
                catch
                {
                    // Si falla, continuar con otros métodos
                }
            }

          
            return null;
        }

        private string LimpiarYFormatearDuracion(string duracion)
        {
            if (string.IsNullOrWhiteSpace(duracion))
                return null;

            duracion = duracion.Trim();
          

            // Manejar formato específico "1103232:01:31" - parece ser segundos totales con formato HH:mm:ss
            if (duracion.Contains(":"))
            {
                var partes = duracion.Split(':');
                if (partes.Length == 3 && double.TryParse(partes[0], out double valorPrincipal))
                {
                    try
                    {
                        // Si el primer número es muy grande, podría ser segundos totales
                        if (valorPrincipal > 8760) // Más de 365 días en horas
                        {
                            // Interpretar como segundos totales en formato HH:mm:ss
                            double segundosTotales = valorPrincipal * 3600 +
                                                   (partes.Length > 1 ? double.Parse(partes[1]) * 60 : 0) +
                                                   (partes.Length > 2 ? double.Parse(partes[2]) : 0);

                            TimeSpan ts = TimeSpan.FromSeconds(segundosTotales);

                            // Validar que sea una duración razonable (menos de 24 horas para una llamada)
                            if (ts.TotalHours <= 24)
                            {
                                DateTime fechaDuracion = DateTime.MinValue.Add(ts);
                             
                                return fechaDuracion.ToString("yyyy-MM-dd HH:mm:ss.fff");
                            }
                            else
                            {
                             
                                return null;
                            }
                        }
                        else
                        {
                            // Intentar parsear como TimeSpan normal
                            if (TimeSpan.TryParse(duracion, out TimeSpan duracionTime))
                            {
                                DateTime fechaDuracion = DateTime.MinValue.Add(duracionTime);
                            
                                return fechaDuracion.ToString("yyyy-MM-dd HH:mm:ss.fff");
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                       
                    }
                }
            }

            // Si es un número simple, asumir segundos
            if (double.TryParse(duracion, out double segundos))
            {
                try
                {
                    TimeSpan ts = TimeSpan.FromSeconds(segundos);

                    // Validar duración razonable
                    if (ts.TotalHours <= 24)
                    {
                        DateTime fechaDuracion = DateTime.MinValue.Add(ts);
                      
                        return fechaDuracion.ToString("yyyy-MM-dd HH:mm:ss.fff");
                    }
                    else
                    {
                       
                        return null;
                    }
                }
                catch (Exception ex)
                {
                    
                }
            }

            // Intentar parsear como TimeSpan normal
            if (TimeSpan.TryParse(duracion, out TimeSpan duracionTimeSpan))
            {
                DateTime fechaDuracion = DateTime.MinValue.Add(duracionTimeSpan);
                
                return fechaDuracion.ToString("yyyy-MM-dd HH:mm:ss.fff");
            }

            
            return null;
        }

        private async Task CrearTablaTemporal(SqlConnection sqlConnection, IDbTransaction transaction, string tempTableName, DataTable tblLlamadas)
        {
   
            string createSchema = @"
            IF NOT EXISTS (SELECT 1 FROM dbComplemento.sys.schemas WHERE name = 'Temp')
            BEGIN
                EXEC('CREATE SCHEMA Temp')
            END";

            Console.WriteLine("Ejecutando creación de esquema...");
            await sqlConnection.ExecuteAsync(createSchema, null, transaction);

            // Luego crear la tabla - SIGUIENDO EL PATRÓN DEL CÓDIGO ORIGINAL
            string createTable = $@"
            IF EXISTS (SELECT 1 FROM dbComplemento.sys.tables WHERE name = '{tempTableName}' AND schema_id = SCHEMA_ID('Temp')) 
                DROP TABLE dbComplemento.Temp.{tempTableName};

            CREATE TABLE dbComplemento.Temp.{tempTableName} (";

            foreach (DataColumn col in tblLlamadas.Columns)
            {
                if (col.ColumnName.Equals("idLlamada", StringComparison.OrdinalIgnoreCase))
                {
                    continue; // Saltar idLlamada del DataTable
                }
                else if (col.ColumnName.Equals("FechaGestion", StringComparison.OrdinalIgnoreCase) ||
                         col.ColumnName.Equals("HoraGestion", StringComparison.OrdinalIgnoreCase) ||
                         col.ColumnName.Equals("Duracion", StringComparison.OrdinalIgnoreCase))
                {
                    createTable += $"\r\n [{col.ColumnName}] [DATETIME] NULL,";

                }
                else
                {
                    createTable += $"\r\n [{col.ColumnName}] [VARCHAR] (8000) NULL,";
                   
                }
            }

            createTable += $"\r\n idLlamada INT NOT NULL IDENTITY(1,1) PRIMARY KEY );";


            await sqlConnection.ExecuteAsync(createTable, null, transaction);
          
        }

        private async Task BulkInsertLlamadas(SqlConnection sqlConnection, IDbTransaction transaction, string tempTableName, DataTable tblLlamadas)
        {
  
            for (int i = 0; i < Math.Min(3, tblLlamadas.Rows.Count); i++)
            {
                var row = tblLlamadas.Rows[i];
                Console.WriteLine($"Fila {i + 1}:");
                foreach (DataColumn col in tblLlamadas.Columns)
                {
                    if (col.ColumnName.Equals("FechaGestion", StringComparison.OrdinalIgnoreCase) ||
                        col.ColumnName.Equals("HoraGestion", StringComparison.OrdinalIgnoreCase) ||
                        col.ColumnName.Equals("Duracion", StringComparison.OrdinalIgnoreCase))
                    {
                        object valor = row[col];
                        string valorStr = (valor == DBNull.Value || valor == null) ? "NULL" : $"'{valor}'";
                        Console.WriteLine($"  {col.ColumnName}: {valorStr}");
                    }
                }
            }

            var sqlTransaction = transaction as SqlTransaction;

            using var bulk = new SqlBulkCopy(sqlConnection, SqlBulkCopyOptions.Default, sqlTransaction);
            bulk.DestinationTableName = $"dbComplemento.Temp.{tempTableName}";
            bulk.BulkCopyTimeout = 30 * 60;

            Console.WriteLine($"DestinationTableName: {bulk.DestinationTableName}");

            // Mapear solo las columnas del DataTable, excluyendo idLlamada
            foreach (DataColumn col in tblLlamadas.Columns)
            {
                if (!col.ColumnName.Equals("idLlamada", StringComparison.OrdinalIgnoreCase))
                {
                    bulk.ColumnMappings.Add(col.ColumnName, col.ColumnName);
                    Console.WriteLine($"Mapeando columna: {col.ColumnName}");
                }
            }

            try
            {
         
                await bulk.WriteToServerAsync(tblLlamadas);

            }
            catch (Exception ex)
            {
                throw;
            }

        }

        private async Task<(bool success, string message, DataTable errores)> EjecutarStoredProcedure(
            SqlConnection sqlConnection,
            IDbTransaction transaction,
            CargaLlamadasRequest request,
            string tempTableName)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@idCartera", request.IdCartera);
            parameters.Add("@idEjecutivo", request.IdEjecutivo);
            parameters.Add("@Base", "dbComplemento");

            try
            {
                using var multi = await sqlConnection.QueryMultipleAsync(
                    "dbComplemento.dbo.[1.0.InsertaLlamadas]",
                    parameters,
                    transaction,
                    commandType: CommandType.StoredProcedure
                );

                DataTable errores = new DataTable();

                try
                {
                    var errorData = await multi.ReadAsync<dynamic>();
                    if (errorData != null && errorData.Any())
                    {
                        errores = ConvertToDataTable(errorData.ToList());
                        Console.WriteLine($"Errores encontrados: {errores.Rows.Count}");
                    }
                }
                catch
                {
                    // Si no hay resultset, continuar
                    Console.WriteLine("No se encontraron resultados de errores");
                }

                if (errores.Rows.Count > 0 && errores.Columns.Contains("Mensaje"))
                {
                    string errorMessage = errores.Rows[0]["Mensaje"]?.ToString() ?? "Error desconocido";
                    Console.WriteLine($"Mensaje de error del SP: {errorMessage}");
                    return (false, errorMessage, errores);
                }

                Console.WriteLine("Stored procedure ejecutado correctamente");
                return (true, "Procesado correctamente", errores);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR en stored procedure: {ex.Message}");
                return (false, $"Error al ejecutar stored procedure: {ex.Message}", new DataTable());
            }
        }

        private DataTable ConvertToDataTable(List<dynamic> items)
        {
            if (items == null || items.Count == 0)
                return new DataTable();

            var dt = new DataTable();

            var firstItem = (IDictionary<string, object>)items[0];
            foreach (var key in firstItem.Keys)
            {
                dt.Columns.Add(key);
            }

            foreach (var item in items)
            {
                var dict = (IDictionary<string, object>)item;
                var row = dt.NewRow();

                foreach (var key in dict.Keys)
                {
                    row[key] = dict[key] ?? DBNull.Value;
                }

                dt.Rows.Add(row);
            }

            return dt;
        }

        private async Task RegistrarLogProceso(
            SqlConnection sqlConnection,
            IDbTransaction transaction,
            CargaLlamadasRequest request,
            int registrosInsertados,
            int totalRegistros)
        {
            Console.WriteLine("Registrando log de proceso...");

            string query = @"
        INSERT INTO [dbCollection].[dbo].[LogProceso] 
        VALUES(@Fecha1Hora, @IdCartera, @IdEjecutivo_Insert, @Archivo, @Registros, @Dominio, @Computadora, @Usuario, @Insertados, @Error, @Proceso)";

            var parameters = new
            {
                Fecha1Hora = DateTime.Now,
                IdCartera = request.IdCartera,
                IdEjecutivo_Insert = request.IdEjecutivo,
                Archivo = request.Archivo.FileName,
                Registros = totalRegistros,
                Dominio = Environment.UserDomainName,
                Computadora = Environment.MachineName,
                Usuario = request.IdEjecutivo,
                Insertados = registrosInsertados,
                Error = "CORRECTO",
                Proceso = 1
            };

            await sqlConnection.ExecuteAsync(query, parameters, transaction);
            Console.WriteLine("Log registrado correctamente");
        }

        public List<Dictionary<string, object>> ConvertDataTableToList(DataTable dt)
        {
            var list = new List<Dictionary<string, object>>();

            foreach (DataRow row in dt.Rows)
            {
                var dict = new Dictionary<string, object>();

                foreach (DataColumn col in dt.Columns)
                {
                    dict[col.ColumnName] = row[col] ?? string.Empty;
                }

                list.Add(dict);
            }

            return list;
        }
        #endregion
    }
}