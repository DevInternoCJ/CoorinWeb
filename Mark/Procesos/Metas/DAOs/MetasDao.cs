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
     
    public async Task<Bloqueo> Bloqueo(string usuario, string servidor)
            {
                const string sql = "SELECT * FROM [dbCollection].[dbo].[BloqueoMetasEjecutivo] WHERE Usuario = @Usuario";

                try
                {
                    using var conn = _dbContFactory.GetSqlConnection(servidor, "Collection");

                    // Usamos Dapper para obtener el valor del campo 'Bloqueo' (puede ser null)
                    var bloqueo = await conn.QueryFirstOrDefaultAsync<int?>(sql, new { Usuario = usuario });

                    DateTime minDate, maxDate;
                    DateTime today = DateTime.Today;
                    DateTime firstDayOfMonth = new DateTime(today.Year, today.Month, 1);

                    // ----------------------------------------------------
                    // LÓGICA DE FECHAS (Traducción del código WinForms)
                    // ----------------------------------------------------
                    if (bloqueo.HasValue && bloqueo.Value == 1)
                    {
                        // Bloqueo == 1 (Permite los primeros 10 días del mes)
                        minDate = firstDayOfMonth; // Día 1
                        maxDate = firstDayOfMonth.AddDays(9); // Hasta el día 10
                    }
                    else if (bloqueo.HasValue && bloqueo.Value == 0)
                    {
                        // Bloqueo == 0 (Permite 180 días atrás hasta hoy)
                        minDate = today.AddDays(-180);
                        maxDate = today;
                    }
                    else // No hay registro en la tabla (aplica la lógica de Bloqueo == 1 por defecto)
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
    public async Task<CargarMetasResponse> cargarMetas(CargarMetasRequest request, int idEjecutivo, string servidor)
        {
            if (request.DatosMetas == null || !request.DatosMetas.Any())
            {
                return new CargarMetasResponse { Success = false, Message = "La lista de metas está vacía." };
            }

            // Se usa el ConvertListToDataTable completo
            DataTable dtInfo = ConvertListToDataTable(request.DatosMetas);
            string tempTableName = $"CargaMetas_{idEjecutivo}";
            string errorTableName = $"Error_CargaMetas_{idEjecutivo}";


            using var conn = _dbContFactory.GetSqlConnection(servidor, "dbComplemento");
            await conn.OpenAsync();
            // Nota: Es crucial usar System.Data.SqlClient.SqlTransaction, pero la conversión de
            // DbConnection/DbTransaction a los tipos específicos de Dapper/ADO.NET es compleja.
            // Para simplificar, asumimos que GetSqlConnection devuelve un SqlConnection o es convertible.
            using var transaction = conn.BeginTransaction() as SqlTransaction;

            try
            {
                // ... (El código de DROP/CREATE TABLE y BULK INSERT, VALIDACIÓN e INSERCIÓN FINAL 
                // que tenías está bien y no necesita cambios sustanciales, se mantiene igual) ...

                #region Código de la Lógica de Carga (Omitido para brevedad, ya lo tenías)
                await conn.ExecuteAsync($@"
                 IF OBJECT_ID('dbComplemento.Temp.{tempTableName}') IS NOT NULL 
                     DROP TABLE dbComplemento.Temp.{tempTableName};
                 
                 IF OBJECT_ID('dbComplemento.Temp.{errorTableName}') IS NOT NULL 
                     DROP TABLE dbComplemento.Temp.{errorTableName};
                 
                 CREATE TABLE dbComplemento.Temp.{tempTableName} (
                     Tipo_Personal [VARCHAR](8000) NULL,
                     No_Empleado [VARCHAR](8000) NULL,
                     Login [VARCHAR](8000) NULL,
                     Status [VARCHAR](8000) NULL,
                     Nombre_Del_Personal [VARCHAR](8000) NULL,
                     Num_Telefonico_Celular [VARCHAR](8000) NULL,
                     Puesto [VARCHAR](8000) NULL,
                     Fecha_De_Ingreso_A_La_Cartera [DATE],
                     Cartera [VARCHAR](8000) NULL,
                     Segmento_Producto [VARCHAR](8000) NULL,
                     Promesas_por_dia [VARCHAR](8000) NULL,
                     Gestiones_por_dia [VARCHAR](8000) NULL,
                     Direccion [VARCHAR](8000) NULL,
                     SubDirector [VARCHAR](8000) NULL,
                     Gerente [VARCHAR](8000) NULL,
                     Coordinador [VARCHAR](8000) NULL,
                     Supervisor [VARCHAR](8000) NULL,
                     Turno [VARCHAR](8000) NULL,
                     Horario [VARCHAR](100),
                     Sucursal [VARCHAR](8000) NULL,
                     Comentarios [VARCHAR](8000) NULL,
                     Sucursal_ [VARCHAR](8000) NULL,
                     Calidad [VARCHAR](8000) NULL,
                     Promesas [VARCHAR](8000) NULL,
                     Cumplimiento [VARCHAR](8000) NULL,
                     Semana_1_del_1_al_7 [VARCHAR](100),
                     Semana_2_del_8_al_14 [VARCHAR](100),
                     Semana_3_del_15_al_21 [VARCHAR](100),
                     Semana_4_del_22_al_31 [VARCHAR](100),
                     Meta_Total [VARCHAR](100)
                 );
             ", transaction: transaction);

                // 3. BULK INSERT
                using (var bulk = new SqlBulkCopy((SqlConnection)conn, SqlBulkCopyOptions.Default, transaction))
                {
                    bulk.DestinationTableName = $"dbComplemento.Temp.{tempTableName}";
                    bulk.BulkCopyTimeout = 600;


                    foreach (DataColumn column in dtInfo.Columns)
                    {
                        bulk.ColumnMappings.Add(column.ColumnName, column.ColumnName);
                    }

                    await bulk.WriteToServerAsync(dtInfo);
                }

                // 4. VALIDACIÓN de datos (EXEC dbComplemento.dbo.[1.2.2.ValidaEjecutivoMetas])
                DataTable tblVerifica = new DataTable();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "EXEC dbComplemento.dbo.[1.2.2.ValidaEjecutivoMetas] @idEjecutivo_insert, @Fecha_Meta";
                    cmd.Parameters.Add(new SqlParameter("@idEjecutivo_insert", idEjecutivo));
                    cmd.Parameters.Add(new SqlParameter("@Fecha_Meta", request.FechaMeta.ToString("yyyy-MM-dd")));
                    cmd.Transaction = transaction;

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        tblVerifica.Load(reader);
                    }
                }

                if (tblVerifica.Rows.Count > 0)
                {
                    // Validación fallida: Devolvemos los errores
                    transaction.Rollback();
                    return new CargarMetasResponse
                    {
                        Success = false,
                        Message = "Se encontraron errores de validación. Revise la tabla de errores.",
                        Errores = tblVerifica
                    };
                }

                // 5. INSERCIÓN FINAL (EXEC dbComplemento.dbo.[1.2.InsertaEjecutivoMetas])
                DataTable tblMetas = new DataTable();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "EXEC dbComplemento.dbo.[1.2.InsertaEjecutivoMetas] @idEjecutivo_insert, @Fecha_Meta";
                    cmd.Parameters.Add(new SqlParameter("@idEjecutivo_insert", idEjecutivo));
                    cmd.Parameters.Add(new SqlParameter("@Fecha_Meta", request.FechaMeta.ToString("yyyy-MM-dd")));
                    cmd.Transaction = transaction;

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        tblMetas.Load(reader);
                    }
                }

                int eliminacion = (tblMetas.Rows.Count > 0 && tblMetas.Columns.Contains("Eliminacion"))
                          ? Convert.ToInt32(tblMetas.Rows[0]["Eliminacion"]) : 0;

                // Commit y respuesta
                transaction.Commit();

                string mensaje = eliminacion == 1
                        ? "Carga de metas exitosa. Se eliminó el registro del mes anterior y se cargó el actualizado."
                        : "Carga de metas exitosa.";

                return new CargarMetasResponse { Success = true, Message = mensaje };
                #endregion
            }
            catch (Exception ex)
            {
                if (transaction != null) transaction.Rollback();
                return new CargarMetasResponse { Success = false, Message = $"Fallo crítico en el proceso de carga: {ex.Message}" };
            }
        }

        
        private DataTable ConvertListToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            PropertyInfo[] props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            foreach (PropertyInfo prop in props)
            {
               
                Type colType = prop.PropertyType;
                if (colType.IsGenericType && colType.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    colType = Nullable.GetUnderlyingType(colType)!;
                }
                dataTable.Columns.Add(prop.Name, colType);
            }

            foreach (T item in items)
            {
                var values = new object[props.Length];
                for (int i = 0; i < props.Length; i++)
                {

                    values[i] = props[i].GetValue(item)!;
                }
                dataTable.Rows.Add(values);
            }

            return dataTable;
        }
    }
}

