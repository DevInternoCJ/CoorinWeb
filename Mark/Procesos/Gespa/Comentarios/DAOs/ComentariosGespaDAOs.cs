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


        public async Task<dynamic?> ValidateComentario(ComentariosGespacs request)
        {            
            var tipoBase = "Collection";
            var servidor = request.Servidor;           

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
    }
}
