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

        #region editarComentario
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

        #endregion


        //carga gestiones
        #region carga gestiones tel
        public async Task<CargaLlamadasResponse> CargarLlamadasAsync( DataTable tabla, int idCartera, int idEjecutivo, string servidor)
        {
            string baseName = "dbComplemento";
            string schema = "Temp";
            string tempTable = $"LLAM_{idEjecutivo}";

            string tableFull = $"{baseName}.{schema}.{tempTable}";
            string tableQuoted = $"[{baseName}].[{schema}].[{tempTable}]";

            using var conn = _dbContFactory.GetSqlConnection(servidor, "Collection");
            await conn.OpenAsync();

            try
            {
                // Crear tabla solo una vez, si no existe
                var sqlCreate = $@"
                IF NOT EXISTS (
                    SELECT 1 FROM sys.tables t
                    JOIN sys.schemas s ON t.schema_id = s.schema_id
                    WHERE t.name = '{tempTable}' AND s.name = '{schema}'
                )
                BEGIN
                    CREATE TABLE {tableQuoted} (
                ";

                foreach (DataColumn col in tabla.Columns)
                {
                    string tipo =
                        (col.ColumnName == "FechaGestion" ||
                         col.ColumnName == "HoraGestion" ||
                         col.ColumnName == "Duracion")
                        ? "DATETIME NULL"
                        : "VARCHAR(8000) NULL";

                    sqlCreate += $" [{col.ColumnName}] {tipo},";
                }

                sqlCreate += @"
                        idLlamada INT NOT NULL IDENTITY(1,1) PRIMARY KEY
                    );
                END
                ";

                await conn.ExecuteAsync(sqlCreate);

                // Borrar registros ANTES del bulk
                await conn.ExecuteAsync($"DELETE FROM {tableQuoted};");

                using var trx = conn.BeginTransaction();

                try
                {
                    // === BULKCOPY ===
                    using (var bulk = new SqlBulkCopy((SqlConnection)conn, SqlBulkCopyOptions.Default, trx))
                    {
                        bulk.DestinationTableName = tableQuoted;
                        bulk.BulkCopyTimeout = 1800;

                        foreach (DataColumn col in tabla.Columns)
                            bulk.ColumnMappings.Add(col.ColumnName, col.ColumnName);

                        await bulk.WriteToServerAsync(tabla);
                    }

                    // === Ejecutar el SP con tabla llena ===
                    var errores = await conn.QueryAsync(
                        $@"EXEC {baseName}.dbo.[1.0.InsertaLlamadas]
                   @idCartera, @idEjecutivo, @Base",
                        new
                        {
                            idCartera,
                            idEjecutivo,
                            Base = baseName
                        },
                        transaction: trx
                    );

                    trx.Commit();

                    int total = tabla.Rows.Count;
                    int incorrectos = errores.Count();
                    int insertados = total - incorrectos;

                    return new CargaLlamadasResponse
                    {
                        Success = true,
                        Total = total,
                        Insertados = insertados,
                        Incorrectos = incorrectos,
                        Errores = errores,
                        Message = "Carga de llamadas finalizada correctamente."
                    };
                }
                catch (Exception exBulk)
                {
                    try { trx.Rollback(); } catch { }

                    return new CargaLlamadasResponse
                    {
                        Success = false,
                        Message = $"Error durante Bulk/SP: {exBulk.Message}"
                    };
                }
            }
            catch (Exception ex)
            {
                return new CargaLlamadasResponse
                {
                    Success = false,
                    Message = $"Error creando tabla temporal: {ex.Message}"
                };
            }
        }

        public DataTable LeerArchivo(IFormFile archivo)
        {
            var extension = Path.GetExtension(archivo.FileName).ToLower();
            var tabla = new DataTable();

            if (extension == ".csv")
            {
                using var reader = new StreamReader(archivo.OpenReadStream());

                bool header = true;
                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();
                    if (line == null) continue;

                    var cols = line.Split(',');

                    if (header)
                    {
                        foreach (var col in cols)
                        {
                            string columnName = string.IsNullOrWhiteSpace(col)
                                ? "Col_" + (tabla.Columns.Count + 1)
                                : col.Trim();

                            tabla.Columns.Add(columnName, typeof(string));
                        }

                        header = false;
                        continue;
                    }

                    tabla.Rows.Add(cols);
                }

                return tabla;
            }

            if (extension == ".xlsx" || extension == ".xls")
            {
                using var stream = archivo.OpenReadStream();
                using var workbook = new ClosedXML.Excel.XLWorkbook(stream);

                var worksheet = workbook.Worksheets.First();

                var headerRow = worksheet.FirstRowUsed();

                // Crear columnas
                foreach (var cell in headerRow.Cells())
                {
                    string name = cell.GetString().Trim();
                    if (string.IsNullOrWhiteSpace(name))
                        name = "Col_" + (tabla.Columns.Count + 1);

                    tabla.Columns.Add(name, typeof(string));
                }

                int totalCols = tabla.Columns.Count;

                // Leer filas
                foreach (var row in worksheet.RowsUsed().Skip(1))
                {
                    var newRow = tabla.NewRow();
                    for (int c = 1; c <= totalCols; c++)
                        newRow[c - 1] = row.Cell(c).GetString()?.Trim();

                    tabla.Rows.Add(newRow);
                }

                return tabla;
            }

            throw new Exception("Formato no soportado. Solo CSV o Excel.");
        }


        #endregion


        #region Editar Gestiones
        public async Task<int> EditarGestion(string servidor, int idCartera, string idCuenta, DateTime fecha, TimeSpan hora, string comentario, int idEjecutivo)
        {
            using var conn = _dbContFactory.GetSqlConnection(servidor, "Collection");

            var sql = @"
            UPDATE dbCollection..GestionesTelefónicas SET Comentario = @Comentario 
            WHERE idCartera=@idCartera AND idCuenta=@idCuenta AND Fecha_Insert=@Fecha AND Segundo_Insert=@Hora;

            UPDATE dbCollection..GestionesChat SET Comentario = @Comentario 
            WHERE idCartera=@idCartera AND idCuenta=@idCuenta AND Fecha_Insert=@Fecha AND Segundo_Insert=@Hora;

            INSERT dbCollection..LogArrepentimientos (FechaHora_Insert, idCartera, idCuenta, idEjecutivo, Concepto, Dato)
            VALUES(GETDATE(), @idCartera, @idCuenta, @idEjecutivo, 'Comentario', CONVERT(DATETIME,@Fecha) + CONVERT(DATETIME,@Hora))";

            var parameters = new
            {
                idCartera,
                idCuenta,
                Fecha = fecha.Date,
                Hora = hora,
                Comentario = comentario,
                idEjecutivo
            };

            return await conn.ExecuteAsync(sql, parameters);
        }
        #endregion

        #region Intentos Vicidial
        public async Task<CargarIntentosResponse> CargarIntentos( DataTable dt,int idCartera, int idEjecutivo, string servidor)
        {
            var tempTable = $"Temp.GES_VICI_{idEjecutivo}";

            using var conn = _dbContFactory.GetSqlConnection(servidor, "Complemento");
            await conn.OpenAsync();

            using var transaction = conn.BeginTransaction();

            try
            {
                // 1. Crear tabla temporal
                await conn.ExecuteAsync(
                    "EXEC dbComplemento.dbo.[1.5.Gestiones_Vicidial] @idEjecutivo, @Selector, @idCartera",
                    new
                    {
                        idEjecutivo,
                        Selector = "CreaTabla",
                        idCartera
                    },
                    transaction
                );

                // 2. Cargar registros (BulkCopy)
                using (var bulk = new SqlBulkCopy((SqlConnection)conn, SqlBulkCopyOptions.Default, transaction))
                {
                    bulk.DestinationTableName = $"dbComplemento.{tempTable}";
                    bulk.BulkCopyTimeout = 600;

                    foreach (DataColumn column in dt.Columns)
                        bulk.ColumnMappings.Add(column.ColumnName, column.ColumnName);

                    await bulk.WriteToServerAsync(dt);
                }

                // 3. Insertar gestiones
                var lista = await conn.QueryAsync<int>(
                   "EXEC dbComplemento.dbo.[1.5.Gestiones_Vicidial] @idEjecutivo, @Selector, @idCartera",
                    new
                    {
                        idEjecutivo,
                        Selector = "InsertarCuentas",
                        idCartera
                    },
                    transaction
                );

                transaction.Commit();

                return new CargarIntentosResponse
                {
                    Success = true,
                    Insertadas = lista.FirstOrDefault(),
                    Message = $"Se insertaron {lista.FirstOrDefault()} gestiones nuevas."
                };
            }
            catch (Exception ex)
            {
                transaction.Rollback();

                return new CargarIntentosResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }
        #endregion


        #region Auxiliares
        public DataTable LeerIntentosCsv(IFormFile archivo)
        {
            var dt = CrearTablaVici();

            using var stream = new StreamReader(archivo.OpenReadStream());
            bool header = true;

            while (!stream.EndOfStream)
            {
                var line = stream.ReadLine();
                if (line == null) continue;

                var cols = line.Split(',').Select(c => c.Trim()).ToList();

                if (header)
                {
                    header = false;
                    continue;
                }

                // DEBUG
                Console.WriteLine($"CSV → {cols.Count} columnas");

                if (cols.Count == 5)
                    cols.Insert(1, cols[0]);

                dt.Rows.Add(cols.ToArray());
            }

            return dt;
        }

        public DataTable LeerIntentosExcel(IFormFile archivo)
        {
            var dt = CrearTablaVici();

            using var stream = archivo.OpenReadStream();
            using var workbook = new XLWorkbook(stream);
            var ws = workbook.Worksheet(1);

            bool isHeader = true;

            foreach (var row in ws.RowsUsed())
            {
                var cells = row.CellsUsed().Select(c => c.GetValue<string>().Trim()).ToList();

                // DEBUG
                Console.WriteLine($"EXCEL → {cells.Count} columnas");

                if (isHeader)
                {
                    isHeader = false;
                    continue;
                }

                if (cells.Count == 5)
                    cells.Insert(1, cells[0]);

                dt.Rows.Add(cells.ToArray());
            }

            return dt;
        }
        private DataTable CrearTablaVici()
        {
            var dt = new DataTable();

            dt.Columns.Add("last_local_call_time");
            dt.Columns.Add("last_local_call_time2");
            dt.Columns.Add("phone_number");
            dt.Columns.Add("status");
            dt.Columns.Add("user");
            dt.Columns.Add("vendor_lead_code");

            return dt;
        }

        private readonly HashSet<string> STATUS_CON_CONTACTO = new()
        {
            "NEW","PPV","PPI","NOD","NEP","FAM","TER","TEQ","CLC",
            "COLGADO","COLGO ANTES DE ESCUCHAR LLAMADA COMPLETA",
            "COMPLETADO","CONTESTO","DROP","EN COLA","ENVIADO","NOC",
            "PDROP","PU","CELULAR CASA","CASA TITULAR","FAMILIAR",
            "TERCERO","OFICINA TITULAR"
        };
        public DataTable LimpiarGestiones(DataTable dt)
        {
            var copia = dt.Copy();

            foreach (DataRow row in copia.Rows.Cast<DataRow>().ToList())
            {
                string status = row["status"]?.ToString()?.Trim() ?? "";

                if (STATUS_CON_CONTACTO.Contains(status))
                    row.Delete();
            }

            copia.AcceptChanges();
            return copia;
        }
        #endregion
    }
}