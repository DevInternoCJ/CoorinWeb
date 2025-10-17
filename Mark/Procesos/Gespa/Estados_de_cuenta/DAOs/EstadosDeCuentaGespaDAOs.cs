using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.GespaDTOs;
using Loki.Mark.Procesos.Gespa.Estados_de_cuenta.Interfaces;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Procesos.Gespa.Estados_de_cuenta.DAOs
{
    public class EstadosDeCuentaGespaDAOs : IEstadosDeCuentaGespaDAOs
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;

        public EstadosDeCuentaGespaDAOs(IServiceProvider serviceProvider)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = new DaoBase();
        }

        public async Task<dynamic?> ValidateEstadosDeCuenta(EstadosDeCuenta request)
        {
            var tipoBase = "Collection";
            var servidor = request.servidor;

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            var queryEstadosDeCuenta = "WAITFOR DELAY '00:00:00'; SELECT E.* FROM dbCollection.dbo.fn_EstadosDeCuenta(@FechaDesde,@FechaHasta,@idCartera) E";

            var resultadoBusqueda = await sqlConnection.QueryFirstOrDefaultAsync<ResultadoEstadosDeCuentaGespa>(
                queryEstadosDeCuenta,
                new { FechaDesde = request.fechaDesde, FechaHasta = request.fechaHasta, idCartera = request.idCartera }
            );
            if ( resultadoBusqueda != null)
            {
                return resultadoBusqueda;
            }
            else
            {
                return null;
            }
            
        }


        public async Task<dynamic?> ValidateEstadosDeCuentaModifica(EstadosDeCuentaGespaModificar request)
        {
            var tipoBase = "Collection";
            var servidor = request.servidor;

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            var queryEstadosDeCuentaModifica = "WAITFOR DELAY '00:00:00';UPDATE dbCollection..SolicitudesEstadosDeCuenta SET Enviado =  1" +
                                               " WHERE idCuenta = @idCuenta AND Fecha_Insert = @Fecha AND Segundo_Insert = @Hora ";

            var idCuenta = new SqlParameter("@idCuenta", request.idCuenta);
            var Fecha_Insert = new SqlParameter("@Fecha", request.fechaInsert);
            var Segundo_Insert = new SqlParameter("@Hora", request.hora);

            var rowsAffected = await _daoBase.ExecuteNonQueryAsync(
                sqlConnection,
                queryEstadosDeCuentaModifica,
                idCuenta,
                Fecha_Insert,
                Segundo_Insert
            );
            return rowsAffected;
        }

    }
}
