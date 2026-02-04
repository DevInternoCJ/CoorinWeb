using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.GespaDTOs;
using Loki.Mark.Procesos.Gespa.Comentarios.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Data;
using System.Text.RegularExpressions;


namespace Loki.Mark.Procesos.Gespa.Comentarios.DAOs
{
    public class ComentariosGespaDAOs : IComentariosGespaDAOs
    {

        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;

        public ComentariosGespaDAOs(IServiceProvider serviceProvider)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = new DaoBase();
        }


        public async Task<dynamic?> ValidateComentario(ComentariosGespacs request, string servidor)
        {            
            var tipoBase = "Collection";
            //var servidor = request.Servidor;           

            var sqlConnectionvalida = _dbContFactory.GetSqlConnection(servidor, tipoBase);
            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);
            var sqlConnectionactualiza = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            //verifica que la cuenta exista

            var queryvalida = @"SELECT 1 from dbCollection..Cuentas (NOLOCK) WHERE idCuenta = @Cuenta and idCartera = @idCartera";           
            var cuentaExiste = sqlConnectionvalida.ExecuteScalarAsync<int>(queryvalida, new { Cuenta = request.idCuenta, idCartera = request.idCartera });

            if (cuentaExiste != null)
            {                
                var query = @"INSERT INTO dbCollection..Comentarios " +
                            "(idCartera, idCuenta, Fecha_Insert, Segundo_Insert, idEjecutivo, Comentario) " +
                            "VALUES( @Cartera," +
                            "@Cuenta," +
                            "GETDATE(), " +
                            "GETDATE(),  " +
                            "@idEjecutivo, " +
                            "@Comentario )";                

                var idCartera = new SqlParameter("@Cartera", request.idCartera);
                var idCuenta = new SqlParameter("@Cuenta", request.idCuenta);
                var idEjecutivo = new SqlParameter("@idEjecutivo", request.idEjecutivo);
                var comentario = new SqlParameter("@Comentario", request.Comentario);

                var rowsAffected = await _daoBase.ExecuteNonQueryAsync(
                    sqlConnection,
                    query,
                    idCartera,
                    idCuenta,
                    idEjecutivo,
                    comentario
                );

                if (request.situacion == 1)
                {
                    var queryActualiza = @"UPDATE dbCollection.dbo.Cuentas SET idSituación = @idSituacion, Fecha_Update = GETDATE() WHERE idCartera = @Cartera AND idCuenta = @Cuenta";

                    var idSituacion = new SqlParameter("@idSituacion", request.idSituacion);
                    var idCarteraAct = new SqlParameter("@Cartera", request.idCartera);
                    var idCuentaAct = new SqlParameter("@Cuenta", request.idCuenta);

                    var rowsAffectedAct = await _daoBase.ExecuteNonQueryAsync(
                        sqlConnectionactualiza,
                        queryActualiza,
                        idSituacion,
                        idCarteraAct,
                        idCuentaAct
                    );
                }            
                return rowsAffected;
            }
            else
            {
                return 0; // La cuenta no existe
            }
           
        }
        public async Task<dynamic> InsertarPorExpediente(InsertaExpediente request, string servidor, int idCarteraEjecutivo)
        {
            var tipoBase = "Collection";
            using var conn = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            string idCuentaDb = "";
            int idCarteraDb = 0;

            // 1. LÓGICA DE BÚSQUEDA Y VALIDACIÓN (Expediente vs Cuenta)
            if (request.EsExpediente)
            {
                if (request.IdCuenta.Length <= 3)
                    return new { Success = false, Mensaje = "El expediente es demasiado corto" };

                string parteLimpia = request.IdCuenta.Substring(3).Replace("A", "").Replace("E", "").Trim();
                if (!int.TryParse(parteLimpia, out int numeroExpediente) || numeroExpediente == 0)
                    return new { Success = false, Mensaje = "El número de expediente es inválido." };

                string abreviacion = request.IdCuenta.Substring(0, 3);

                var queryBusca = @"
                SELECT C.idCartera, C.idCuenta 
                FROM dbCollection..Cuentas C (NOLOCK) 
                INNER JOIN dbCollection..Carteras Car (NOLOCK) ON Car.Abreviación = @Abreviacion
                WHERE C.Expediente = @Expediente";

                var tblCuenta = await conn.QueryFirstOrDefaultAsync<dynamic>(queryBusca, new
                {
                    Abreviacion = abreviacion,
                    Expediente = numeroExpediente
                });

                if (tblCuenta == null) return new { Success = false, Mensaje = "El expediente no existe." };

                idCarteraDb = (int)tblCuenta.idCartera;
                idCuentaDb = tblCuenta.idCuenta.ToString();
            }
            else
            {
                var queryDirecta = "SELECT idCartera, idCuenta FROM dbCollection..Cuentas (NOLOCK) WHERE idCuenta = @IdCuenta";
                var tblCuenta = await conn.QueryFirstOrDefaultAsync<dynamic>(queryDirecta, new { IdCuenta = request.IdCuenta.Trim() });

                if (tblCuenta == null) return new { Success = false, Mensaje = "La cuenta no existe." };

                idCarteraDb = (int)tblCuenta.idCartera;
                idCuentaDb = tblCuenta.idCuenta.ToString();
            }

            if (idCarteraEjecutivo != 0 && idCarteraDb != idCarteraEjecutivo)
                return new { Success = false, Mensaje = "El expediente no corresponde a la cartera que está asignado." };

            string comentarioProcesado = ValidaComentario(request.Comentario);

            string sQuery = "";
            if (request.Situacion == 1)
            {
                sQuery += @"UPDATE dbCollection.dbo.Cuentas SET idSituación = @idSituacion, Fecha_Update = GETDATE() 
                    WHERE idCartera = @idCartera AND idCuenta = @idCuenta; ";
            }

            sQuery += @"INSERT INTO dbCollection..Comentarios (idCuenta, idCartera, Fecha_Insert, Segundo_Insert, idEjecutivo, Comentario) 
                VALUES (@idCuenta, @idCartera, GETDATE(), GETDATE(), @idEjecutivo, @Comentario)";

            var affectedRows = await conn.ExecuteAsync(sQuery, new
            {
                idCuenta = idCuentaDb,
                idCartera = idCarteraDb,
                idSituacion = request.IdSituacion,
                idEjecutivo = request.IdEjecutivo,
                Comentario = comentarioProcesado 
            });

            return new { Success = affectedRows > 0, Mensaje = affectedRows > 0 ? "Comentario insertado con éxito." : "Error al insertar." };
        }
        
        public async Task<CargaComentariosResponse> CargaAccionamientosAsync(DataTable tabla, int idCartera, int idEjecutivo, string servidor)
        {
            string baseName = "dbComplemento";
            string schema = "Temp";
            // Siguiendo tu nomenclatura: Com_ + ID
            string tempTable = $"Com_{idEjecutivo}";
            string tableQuoted = $"[{baseName}].[{schema}].[{tempTable}]";

            using var conn = _dbContFactory.GetSqlConnection(servidor, "Collection");
            await conn.OpenAsync();

            try
            {
                // 1. Borrar tabla si existe de una ejecución previa
                await conn.ExecuteAsync($"IF OBJECT_ID('{tableQuoted}', 'U') IS NOT NULL DROP TABLE {tableQuoted};");

                // 2. CREAR TABLA DINÁMICA (Mapeando columnas del Excel/DataTable)
                string sqlCreate = $"CREATE TABLE {tableQuoted} ( ";
                foreach (DataColumn col in tabla.Columns)
                {
                    // Mantenemos lógica de tipos de datos
                    string tipo = (col.ColumnName.Contains("Fecha") || col.ColumnName.Contains("Segundo"))
                        ? "DATETIME NULL" : "VARCHAR(8000) NULL";

                    sqlCreate += $"\r\n [{col.ColumnName}] {tipo},";
                }
                // Agregamos columna idEjecutivo si no viene en el Excel para el SP
                if (!tabla.Columns.Contains("idEjecutivo"))
                    sqlCreate += "\r\n [idEjecutivo] INT NULL,";

                sqlCreate += "\r\n idRegistro INT NOT NULL IDENTITY(1,1) PRIMARY KEY );";
                await conn.ExecuteAsync(sqlCreate);

                using var trx = conn.BeginTransaction();
                try
                {
                    // 3. BULK COPY
                    using (var bulk = new SqlBulkCopy((SqlConnection)conn, SqlBulkCopyOptions.Default, (SqlTransaction)trx))
                    {
                        bulk.DestinationTableName = tableQuoted;
                        bulk.BulkCopyTimeout = 600;
                        foreach (DataColumn col in tabla.Columns)
                            bulk.ColumnMappings.Add(col.ColumnName, col.ColumnName);

                        await bulk.WriteToServerAsync(tabla);
                    }

                    // 4. EJECUTAR STORED PROCEDURE FINAL (El del legacy)
                    // Nota: Tu legacy pasaba @idEjecutivo e @idCartera
                    var erroresSp = (await conn.QueryAsync<dynamic>(
                        $@"EXEC {baseName}.dbo.[1.3.1.InsertaComentarios] @idEjecutivo, @idCartera",
                        new { idEjecutivo, idCartera },
                        transaction: trx
                    )).ToList();

                    int totalRecords = tabla.Rows.Count;
                    int totalErrores = erroresSp.Count;
                    int insertadosRealmente = totalRecords - totalErrores;

                    // 5. LIMPIEZA FINAL
                    await conn.ExecuteAsync($"IF OBJECT_ID('{tableQuoted}', 'U') IS NOT NULL DROP TABLE {tableQuoted};", transaction: trx);

                    trx.Commit();

                    return new CargaComentariosResponse
                    {
                        Success = totalErrores == 0,
                        Total = totalRecords,
                        Insertados = insertadosRealmente,
                        Incorrectos = totalErrores,
                        Errores = erroresSp,
                        Message = totalErrores == 0 ? "Carga masiva completada." : $"Se procesaron {insertadosRealmente} y fallaron {totalErrores}."
                    };
                }
                catch (Exception)
                {
                    if (trx.Connection != null) trx.Rollback();
                    throw;
                }
            }
            catch (Exception ex)
            {
                return new CargaComentariosResponse
                {
                    Success = false,
                    Message = $"Error Crítico: {ex.Message}"
                };
            }
        }

        #region Auxiliar
        private string ValidaComentario(string sComentario)
        {
            if (string.IsNullOrEmpty(sComentario)) return "";

            string sComentarioOriginal = sComentario, sTelefonoSinModificar = "", sTelefonoModificado = "";
            int iContador = 0;
            Regex validador = new Regex("^([+\\d!/!\\\\$*!#%&/()=?¡_<>{}]|-)");

            for (int i = 0; i < sComentario.Length; i++)
            {
                char s = sComentario[i];
                if (validador.IsMatch(s.ToString()) || char.IsWhiteSpace(s))
                {
                    sTelefonoSinModificar += s;
                    if (char.IsNumber(s))
                        iContador++;
                }

                if ((!validador.IsMatch(s.ToString()) && !char.IsWhiteSpace(s)) || i == sComentario.Length - 1)
                {
                    if (iContador >= 10)
                    {
                        sTelefonoModificado = " " + sTelefonoSinModificar.Replace(" ", "") + " ";
                        sTelefonoModificado = sTelefonoModificado.Replace("-", "");
                        sTelefonoModificado = Regex.Replace(sTelefonoModificado, "[+|-|/|\\\\|!|#|$|%|&|/|(|)|=|?|¡'|¿|*|$|<|>|_|;|:|[|]|{|}|]", "");

                        if (sTelefonoModificado.Length >= 5)
                        {
                            sComentarioOriginal = sComentarioOriginal.Replace(sTelefonoSinModificar, " XXXX-" + sTelefonoModificado.Substring(sTelefonoModificado.Length - 5, 4) + " ");
                        }

                        iContador = 0;
                        sTelefonoSinModificar = "";
                    }
                    if (iContador < 10)
                    {
                        iContador = 0;
                        sTelefonoSinModificar = "";
                    }
                }
            }
            return sComentarioOriginal;
        }
        #endregion
    }
}
