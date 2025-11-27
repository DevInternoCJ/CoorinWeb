using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.MetasDTOs;
using Loki.Mark.Procesos.Metas.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Reflection;

namespace Loki.Mark.Procesos.Metas.DAOs
{
    public class MetasDao: IMetasDao
    {
        private readonly CustomDbContextFactory _dbContFactory;
        public MetasDao(IServiceProvider serviceProvider)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);

        }
        #region Métodos
        public async Task<Bloqueo> Bloqueo(string usuario, string servidor)
            {
                const string sql = "SELECT * FROM [dbCollection].[dbo].[BloqueoMetasEjecutivo] WHERE Usuario = @Usuario";

                try
                {
                    using var conn = _dbContFactory.GetSqlConnection(servidor, "Collection");

                    var bloqueo = await conn.QueryFirstOrDefaultAsync<int?>(sql, new { Usuario = usuario });

                    DateTime minDate, maxDate;
                    DateTime today = DateTime.Today;
                    DateTime firstDayOfMonth = new DateTime(today.Year, today.Month, 1);

                    if (bloqueo.HasValue && bloqueo.Value == 1)
                    {

                        minDate = firstDayOfMonth; 
                        maxDate = firstDayOfMonth.AddDays(9); 
                    }
                    else if (bloqueo.HasValue && bloqueo.Value == 0)
                    {
 
                        minDate = today.AddDays(-180);
                        maxDate = today;
                    }
                    else 
                    {
                        minDate = firstDayOfMonth;
                        maxDate = firstDayOfMonth.AddDays(9);
                    }

                    return new Bloqueo
                    {
                        MinDate = minDate.Date,
                        MaxDate = maxDate.Date,
                        Message = "Rango de fechas para metas obtenido correctamente."
                    };
                }
                catch (Exception ex)
                {
                    return new Bloqueo
                    {
                        MinDate = DateTime.MinValue,
                        MaxDate = DateTime.MinValue, // Usamos MinValue para indicar fallo
                        Message = $"Error al obtener el rango de fechas. Detalles: {ex.Message}"
                    };
                }
            }

        public async Task<CargarMetasResponse> CargarMetas(CargarMetasRequest request,int idEjecutivo,string servidor)
        {
            if (request.DatosMetas == null || !request.DatosMetas.Any())
                return new CargarMetasResponse { Success = false, Message = "La lista de metas está vacía." };

            DataTable dtInfo = ConvertListToDataTable(request.DatosMetas);
            string tempTableName = $"CargaMetas_{idEjecutivo}";
            string errorTableName = $"Error_CargaMetas_{idEjecutivo}";

            using var conn = _dbContFactory.GetSqlConnection(servidor, "Complemento");
            await conn.OpenAsync();

            using var transaction = conn.BeginTransaction();

            try
            {
                // 1. Crear tablas temporales
                await conn.ExecuteAsync($@"
                IF OBJECT_ID('dbComplemento.Temp.{tempTableName}') IS NOT NULL
                    DROP TABLE dbComplemento.Temp.{tempTableName};

                IF OBJECT_ID('dbComplemento.Temp.{errorTableName}') IS NOT NULL
                    DROP TABLE dbComplemento.Temp.{errorTableName};

                CREATE TABLE dbComplemento.Temp.{tempTableName} (
                    Tipo_Personal VARCHAR(8000),
                    No_Empleado VARCHAR(8000),
                    Login VARCHAR(8000),
                    Status VARCHAR(8000),
                    Nombre_Del_Personal VARCHAR(8000),
                    Num_Telefonico_Celular VARCHAR(8000),
                    Puesto VARCHAR(8000),
                    Fecha_De_Ingreso_A_La_Cartera DATE,
                    Cartera VARCHAR(8000),
                    Segmento_Producto VARCHAR(8000),
                    Promesas_por_dia VARCHAR(8000),
                    Gestiones_por_dia VARCHAR(8000),
                    Direccion VARCHAR(8000),
                    SubDirector VARCHAR(8000),
                    Gerente VARCHAR(8000),
                    Coordinador VARCHAR(8000),
                    Supervisor VARCHAR(8000),
                    Turno VARCHAR(8000),
                    Horario VARCHAR(100),
                    Sucursal VARCHAR(8000),
                    Comentarios VARCHAR(8000),
                    Sucursal_ VARCHAR(8000),
                    Calidad VARCHAR(8000),
                    Promesas VARCHAR(8000),
                    Cumplimiento VARCHAR(8000),
                    Semana_1_del_1_al_7 VARCHAR(100),
                    Semana_2_del_8_al_14 VARCHAR(100),
                    Semana_3_del_15_al_21 VARCHAR(100),
                    Semana_4_del_22_al_31 VARCHAR(100),
                    Meta_Total VARCHAR(100)
                );
            ", transaction: transaction);

                // 2. BULK COPY
                using (var bulk = new SqlBulkCopy((SqlConnection)conn, SqlBulkCopyOptions.Default, transaction))
                {
                    bulk.DestinationTableName = $"dbComplemento.Temp.{tempTableName}";
                    bulk.BulkCopyTimeout = 600;

                    foreach (DataColumn col in dtInfo.Columns)
                        bulk.ColumnMappings.Add(col.ColumnName, col.ColumnName);

                    await bulk.WriteToServerAsync(dtInfo);
                }

                // 3. Validación
                var tblVerifica = new DataTable();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "EXEC dbComplemento.dbo.[1.2.2.ValidaEjecutivoMetas] @idEjecutivo_insert, @Fecha_Meta";
                    cmd.Parameters.Add(new SqlParameter("@idEjecutivo_insert", idEjecutivo));
                    cmd.Parameters.Add(new SqlParameter("@Fecha_Meta", request.FechaMeta.ToString("yyyy-MM-dd")));
                    cmd.Transaction = transaction;

                    using var reader = await cmd.ExecuteReaderAsync();
                    tblVerifica.Load(reader);
                }

                if (tblVerifica.Rows.Count > 0)
                {
                    transaction.Rollback();
                    return new CargarMetasResponse
                    {
                        Success = false,
                        Message = "Errores de validación.",
                        Errores = ConvertDataTableToJsonFriendly(tblVerifica)
                    };
                }


                // 4. Inserción final
                var tblMetas = new DataTable();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "EXEC dbComplemento.dbo.[1.2.InsertaEjecutivoMetas] @idEjecutivo_insert, @Fecha_Meta";
                    cmd.Parameters.Add(new SqlParameter("@idEjecutivo_insert", idEjecutivo));
                    cmd.Parameters.Add(new SqlParameter("@Fecha_Meta", request.FechaMeta.ToString("yyyy-MM-dd")));
                    cmd.Transaction = transaction;

                    using var reader = await cmd.ExecuteReaderAsync();
                    tblMetas.Load(reader);
                }

                int eliminacion = (tblMetas.Rows.Count > 0 && tblMetas.Columns.Contains("Eliminacion"))
                            ? Convert.ToInt32(tblMetas.Rows[0]["Eliminacion"]) : 0;

                transaction.Commit();

                return new CargarMetasResponse
                {
                    Success = true,
                    Message = eliminacion == 1
                        ? "Carga de metas exitosa. Se eliminó el registro anterior."
                        : "Carga de metas exitosa."
                };
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return new CargarMetasResponse { Success = false, Message = ex.Message };
            }
        }
        #endregion

        #region Auxiliares
        private DataTable ConvertListToDataTable(List<MetaDetalleDto> list)
        {
            var dt = new DataTable();

            foreach (var prop in typeof(MetaDetalleDto).GetProperties())
                dt.Columns.Add(prop.Name, typeof(string));

            foreach (var item in list)
            {
                var row = dt.NewRow();
                foreach (var prop in typeof(MetaDetalleDto).GetProperties())
                    row[prop.Name] = prop.GetValue(item) ?? "";
                dt.Rows.Add(row);
            }

            return dt;
        }
        private List<Dictionary<string, object>> ConvertDataTableToJsonFriendly(DataTable dt)
        {
            var list = new List<Dictionary<string, object>>();

            foreach (DataRow row in dt.Rows)
            {
                var dict = new Dictionary<string, object>();

                foreach (DataColumn col in dt.Columns)
                    dict[col.ColumnName] = row[col];

                list.Add(dict);
            }

            return list;
        }
        public DataTable LeerMetasDesdeExcel(IFormFile archivo)
        {
            var tabla = new DataTable();

            using (var stream = archivo.OpenReadStream())
            using (var workbook = new ClosedXML.Excel.XLWorkbook(stream))
            {
                var worksheet = workbook.Worksheets.First();

                var headerRow = worksheet.FirstRowUsed();

                foreach (var cell in headerRow.Cells())
                {
                    string columnName = cell.GetString().Trim();
                    if (string.IsNullOrWhiteSpace(columnName))
                        columnName = "Col_" + (tabla.Columns.Count + 1);
                    tabla.Columns.Add(columnName, typeof(string));
                }

                int totalCols = tabla.Columns.Count;

                foreach (var row in worksheet.RowsUsed().Skip(1))
                {
                    var newRow = tabla.NewRow();
                    for (int c = 1; c <= totalCols; c++)
                        newRow[c - 1] = row.Cell(c).GetString()?.Trim();
                    tabla.Rows.Add(newRow);
                }
            }

            return tabla;
        }
        public List<MetaDetalleDto> ConvertDatatableToList(DataTable dt)
        {
            var list = new List<MetaDetalleDto>();

            foreach (DataRow row in dt.Rows)
            {
                var item = new MetaDetalleDto
                {
                    Tipo_Personal = row["Tipo_Personal"]?.ToString(),
                    No_Empleado = row["No_Empleado"]?.ToString(),
                    Login = row["Login"]?.ToString(),
                    Status = row["Status"]?.ToString(),
                    Nombre_Del_Personal = row["Nombre_Del_Personal"]?.ToString(),
                    Num_Telefonico_Celular = row["Num_Telefonico_Celular"]?.ToString(),
                    Puesto = row["Puesto"]?.ToString(),
                    Fecha_De_Ingreso_A_La_Cartera = row["Fecha_De_Ingreso_A_La_Cartera"]?.ToString(),
                    Cartera = row["Cartera"]?.ToString(),
                    Segmento_Producto = row["Segmento_Producto"]?.ToString(),
                    Promesas_por_dia = row["Promesas_por_dia"]?.ToString(),
                    Gestiones_por_dia = row["Gestiones_por_dia"]?.ToString(),
                    Direccion = row["Direccion"]?.ToString(),
                    SubDirector = row["SubDirector"]?.ToString(),
                    Gerente = row["Gerente"]?.ToString(),
                    Coordinador = row["Coordinador"]?.ToString(),
                    Supervisor = row["Supervisor"]?.ToString(),
                    Turno = row["Turno"]?.ToString(),
                    Horario = row["Horario"]?.ToString(),
                    Sucursal = row["Sucursal"]?.ToString(),
                    Comentarios = row["Comentarios"]?.ToString(),
                    Sucursal_ = row["Sucursal_"]?.ToString(),
                    Calidad = row["Calidad"]?.ToString(),
                    Promesas = row["Promesas"]?.ToString(),
                    Cumplimiento = row["Cumplimiento"]?.ToString(),
                    Semana_1_del_1_al_7 = row["Semana_1_del_1_al_7"]?.ToString(),
                    Semana_2_del_8_al_14 = row["Semana_2_del_8_al_14"]?.ToString(),
                    Semana_3_del_15_al_21 = row["Semana_3_del_15_al_21"]?.ToString(),
                    Semana_4_del_22_al_31 = row["Semana_4_del_22_al_31"]?.ToString(),
                    Meta_Total = row["Meta_Total"]?.ToString()
                };

                list.Add(item);
            }

            return list;
        }
        #endregion
    }
}

