using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.DTOs.GespaDTOs;
using Loki.Mark.Procesos.Gespa.Cargo_en_linea.Interfaces;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Procesos.Gespa.Cargo_en_linea.DAOs
{
    public class CargoEnLineaGespaDAOs : ICargoEnLineaGespaDAOs
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;

        public CargoEnLineaGespaDAOs(IServiceProvider serviceProvider)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = new DaoBase();
        }

        public async Task<dynamic?> ValidateCargoEnLineaAutorizarBuscar(CargoEnLineaGespaAutorizarBuscar request, string servidor)
        {
            var tipoBase = "Collection";
            //var servidor = request.servidor;

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            var queryCargoEnLineaAutorizarBuscar = @"[4.6.CargosEnLínea]";

            return await _daoBase.ExecuteStoredProcedure(
                sqlConnection,
                queryCargoEnLineaAutorizarBuscar,
                new SqlParameter("@Selector", request.selector),
                new SqlParameter("@idCartera", request.idCartera)
            );


        }
        public async Task<dynamic?> ValidateCargoEnLineaAutorizar(CargoEnLineaAutorizar request, string servidor)
        {
            var tipoBase = "Collection";
            //var servidor = request.servidor;
            int idCartera = Convert.ToInt32(request.idCartera);

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            var queryCargoEnLineaAutorizar = @"[4.6.CargosEnLínea]";

            if (idCartera == 13 || idCartera == 9 || idCartera == 8)
            {
                return await _daoBase.ExecuteStoredProcedure(
                sqlConnection,
                queryCargoEnLineaAutorizar,
                new SqlParameter("@Selector", request.selector),
                new SqlParameter("@idCartera", request.idCartera),
                new SqlParameter("@FechaInicial", request.fechaInicial),
                new SqlParameter("@FechaFinal", request.fechaFinal),
                new SqlParameter("@Autorizacion", request.autorizacion),
                new SqlParameter("@idEjecutivo", request.idEjecutivo),
                new SqlParameter("@idCuenta", request.idCuenta),
                new SqlParameter("@Fecha_Insert", request.fechaInsert),
                new SqlParameter("@Segundo_Insert", request.segundoInsert),
                new SqlParameter("@Motivo", request.motivo)                
                );                
            }
            else
            {
                return await _daoBase.ExecuteStoredProcedure(
                sqlConnection,
                queryCargoEnLineaAutorizar,
                new SqlParameter("@Selector", request.selector),
                new SqlParameter("@idCartera", request.idCartera),
                new SqlParameter("@FechaInicial", request.fechaInicial),
                new SqlParameter("@FechaFinal", request.fechaFinal),
                new SqlParameter("@Autorizacion", request.autorizacion),
                new SqlParameter("@idEjecutivo", request.idEjecutivo),
                new SqlParameter("@idCuenta", request.idCuenta),
                new SqlParameter("@Fecha_Insert", request.fechaInsert),
                new SqlParameter("@Segundo_Insert", request.segundoInsert)                
                );
            }

        }

        public async Task<dynamic?> ValidateCargoEnLineaCorregirBuscar(CargoEnLineaCorregirBuscar request, string servidor)
        {
            var tipoBase = "Collection";
            //var servidor = request.servidor;

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            var queryCargoEnLineaAutorizarBuscar = @"[4.6.CargosEnLínea_Prueba]";

            return await _daoBase.ExecuteStoredProcedure(
                sqlConnection,
                queryCargoEnLineaAutorizarBuscar,
                new SqlParameter("@Selector", request.selector),
                new SqlParameter("@idCartera", request.idCartera)
            );


        }

        public async Task<dynamic?> ValidateCargoEnLineaCorregir(CargoEnLineaCorregir request, string servidor)
        {
            var tipoBase = "Collection";
            //var servidor = request.servidor;
            string vencimiento = request.vencimiento;
            vencimiento = "20" + vencimiento.Substring(3, 2) + "-" + vencimiento.Substring(0, 2) + "-01";

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            var queryCargoEnLineaCorregir = @"SET DATEFORMAT DMY;
                                        UPDATE  dbCollection..CargosATM
                                        SET     Tarjeta = @Tarjeta,
                                                Vencimiento = CAST(@Vencimiento AS DATE),
                                                Autorización = @Autorización,
                                                Monto = @Monto,
                                                Domiciliado = @Recurrente 
                                        WHERE   idCartera = @idCartera 
                                                AND idCuenta = @idCuenta 
                                                AND Fecha_Insert = CAST(LEFT(@Fecha, 10) AS DATE) 
                                                AND Segundo_Insert = @Segundo_Insert";

            var Tarjeta = new SqlParameter("@Tarjeta", request.tarjeta);
            var Vencimiento = new SqlParameter("@Vencimiento", vencimiento);
            var Autorización = new SqlParameter("@Autorización", request.autorizacion);
            var Monto = new SqlParameter("@Monto", request.monto);
            var Domiciliado = new SqlParameter("@Recurrente", request.recurrente);
            var idCartera = new SqlParameter("@idCartera", request.idCartera);
            var idCuenta = new SqlParameter("@idCuenta", request.idCuenta);
            var Fecha_Insert = new SqlParameter("@Fecha", request.fechaInsert);
            var Segundo_Insert = new SqlParameter("@Segundo_Insert", request.segundoInsert);


            var rowsAffected = await _daoBase.ExecuteNonQueryAsync(
                sqlConnection,
                queryCargoEnLineaCorregir,
                Tarjeta,
                Vencimiento,
                Autorización,
                Monto,
                Domiciliado,
                idCartera,
                idCuenta,
                Fecha_Insert,
                Segundo_Insert
            );
            return rowsAffected;
        }

    }
}
