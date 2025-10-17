using System.Data;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.GespaDTOs;
using Loki.Mark.Procesos.Gespa.Definicion.Interfaces;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Procesos.Gespa.Definicion.DAOs
{
    public class DefinicionGespaBusquedaDAOs : IDefinicionGespaBuscaDAOs
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;

        public DefinicionGespaBusquedaDAOs(IServiceProvider serviceProvider)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = new DaoBase();
        }


        public async Task<dynamic?> ValidateDefinicionBusqueda(DefinicionBusqueda request)
        {
            var tipoBase = "Collection";
            var servidor = request.Servidor;

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);


            var queryBusqueda = @"SELECT" +
                    "CA.Cartera, P.Producto, C.idCuenta Cuenta, CONCAT(CA.Abreviación,C.Expediente) Expediente," +
                    "V.Valor Situación , C.NombreDeudor, C.RFC, C.NúmeroCliente, C.Saldo, S.Valor Sucursal " +
                    "FROM dbo.Cuentas C " +
                    "INNER JOIN Carteras CA ON CA.idCartera = C.idCartera " +
                    "INNER JOIN Productos P ON P.idProducto = C.idProducto " +
                    "INNER JOIN ValoresCatálogo V ON V.idValor = C.idSituación " +
                    "INNER JOIN ValoresCatálogo S ON S.idValor = C.idSucursal " +
                    "INNER JOIN RelacionesCatálogos RC ON C.idSituación = RC.idValor1 AND RC.idValor2 <> 3104 " +
                    "WHERE C.idCuenta = @Cuenta AND C.idCartera = @Cartera AND CuentaActiva = 1 ";

            // Ejecuta la consulta y mapea el resultado a tu clase
            // Usa 'await' para obtener el objeto de resultado, no la Tarea (Task)
            var resultadoBusqueda = await sqlConnection.QueryFirstOrDefaultAsync<ResultadoDefinicionBusqueda>(
                queryBusqueda,
                new { Cuenta = request.idCuenta, Cartera = request.idCartera } // Asegúrate de usar 'Cartera' como alias del parámetro
            );
            if (resultadoBusqueda != null)
            {               
                return resultadoBusqueda;
            }
            else
            {
                return null;
            }

        }

        public async Task<dynamic?> ValidateDefinicion(Define request)
        {
            var tipoBase = "Collection";
            var servidor = request.Servidor;

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            var querydefine = "[4.4.DefineCuentas]";

            return await _daoBase.ExecuteStoredProcedure(
                sqlConnection, 
                querydefine,
                new SqlParameter("@idCartera", request.idCartera),
                new SqlParameter("@idCuenta", request.idCuenta),
                new SqlParameter("@Selector", request.selector),
                new SqlParameter("@idEjecutivo", request.idEjecutivo),
                new SqlParameter("@idSituacion", request.idSituacion),
                new SqlParameter("@Comentario", request.comentario)
            );

        }

    }
}
