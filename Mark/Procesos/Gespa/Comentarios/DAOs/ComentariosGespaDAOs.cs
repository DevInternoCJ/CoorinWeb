using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.GespaDTOs;
using Loki.Mark.Procesos.Gespa.Comentarios.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

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
        public async Task<dynamic> InsertarPorExpediente(ComentariosGespacs request, string servidor, int idCarteraEjecutivo)
        {
            var tipoBase = "Collection";
            using var conn = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            // --- LÓGICA DE BUSCAEXPEDIENTE ---

            // 1. Valida largo del expediente
            if (request.idCuenta.Length <= 3)
                return new { Success = false, Mensaje = "El expediente es demasiado corto" };

            // 2. Valida número de expediente (Parsing de los últimos caracteres)
            string parteNumerica = request.idCuenta.Substring(3).Replace("A", "").Replace("E", "");
            if (!int.TryParse(parteNumerica, out int numeroExpediente) || numeroExpediente == 0)
                return new { Success = false, Mensaje = "El número de expediente es inválido." };

            // 3. Valida existencia en DB
            // Nota: Se usa la abreviatura (primeros 3) y el número parseado
            string abreviacion = request.idCuenta.Substring(0, 3);

            var queryBusca = @"SELECT C.idCartera, C.idCuenta, C.NombreDeudor 
                       FROM dbCollection..Cuentas C (NOLOCK)
                       INNER JOIN dbCollection..Carteras Car ON Car.Abreviación = @Abreviacion
                       WHERE C.Expediente = @Expediente";

            var cuenta = await conn.QueryFirstOrDefaultAsync<dynamic>(queryBusca, new
            {
                Abreviacion = abreviacion,
                Expediente = numeroExpediente
            });

            if (cuenta == null)
                return new { Success = false, Mensaje = "El expediente no existe." };

            int idCarteraDb = (int)cuenta.idCartera;
            string idCuentaDb = cuenta.idCuenta.ToString();

            // 4. Valida cartera asignada (Equivale a ValidaCartera = true en el legacy)
            if (idCarteraEjecutivo != 0 && idCarteraDb != idCarteraEjecutivo)
                return new { Success = false, Mensaje = "El expediente no corresponde a la cartera que está asignado." };

            // --- LÓGICA DE INSERCIÓN ---

            string sQuery = "";
            if (request.situacion == 1)
            {
                sQuery += @"UPDATE dbCollection.dbo.Cuentas 
                    SET idSituación = @idSituacion, Fecha_Update = GETDATE() 
                    WHERE idCartera = @idCartera AND idCuenta = @idCuenta; ";
            }

            sQuery += @"INSERT INTO dbCollection..Comentarios 
                (idCuenta, idCartera, Fecha_Insert, Segundo_Insert, idEjecutivo, Comentario) 
                VALUES (@idCuenta, @idCartera, GETDATE(), GETDATE(), @idEjecutivo, @Comentario)";

            var affectedRows = await conn.ExecuteAsync(sQuery, new
            {
                idCuenta = idCuentaDb,
                idCartera = idCarteraDb,
                idSituacion = request.idSituacion,
                idEjecutivo = request.idEjecutivo,
                Comentario = request.Comentario
            });

            return new { Success = affectedRows > 0, Mensaje = affectedRows > 0 ? "Comentario insertado con éxito." : "Falló al insertar comentario." };
        }
    }
}
