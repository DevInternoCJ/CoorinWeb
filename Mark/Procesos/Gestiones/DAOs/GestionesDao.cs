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