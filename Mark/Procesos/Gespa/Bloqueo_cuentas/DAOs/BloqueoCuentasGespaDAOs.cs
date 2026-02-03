using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.GespaDTOs;
using Loki.Mark.Procesos.Gespa.Bloqueo_cuentas.Interfaces;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Procesos.Gespa.Bloqueo_cuentas.DAOs
{
    public class BloqueoCuentasGespaDAOs : IBloqueoCuentasGespaDAOs
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;

        public BloqueoCuentasGespaDAOs(IServiceProvider serviceProvider)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = new DaoBase();
        }

        public async Task<dynamic?> ValidateBloqueoCuentasBusqueda(BloqueoCuentasBusqueda request, string servidor)
        {
            var tipoBase = "Collection";
            //var servidor = request.servidor;

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            var BloqueoCuentasBusqueda = @"SELECT
                CA.Cartera, P.Producto, C.idCuenta Cuenta, CONCAT(CA.Abreviación,C.Expediente) Expediente,
                V.Valor Situación , ISNULL(C.[Bloqueo], 0) [Bloqueo], C.NombreDeudor, C.RFC, C.NúmeroCliente, C.Saldo, S.Valor Sucursal
                FROM dbo.Cuentas C 
                INNER JOIN Carteras CA ON CA.idCartera = C.idCartera 
                INNER JOIN Productos P ON P.idProducto = C.idProducto 
                INNER JOIN ValoresCatálogo V ON V.idValor = C.idSituación 
                INNER JOIN ValoresCatálogo S ON S.idValor = C.idSucursal 
                INNER JOIN RelacionesCatálogos RC ON C.idSituación = RC.idValor1 AND RC.idValor2 <> 3104 
                WHERE C.idCuenta = @Cuenta AND C.idCartera = @Cartera AND CuentaActiva = 1";

            var resultadoBloqueoCuentasBusqueda = await sqlConnection.QueryFirstOrDefaultAsync<ResultadoBloqueoCuentasBusqueda>(
                BloqueoCuentasBusqueda,
                new
                {
                    Cuenta = request.idCuenta,
                    Cartera = request.idCartera
                }
            );
            if (resultadoBloqueoCuentasBusqueda != null)
            {
                return resultadoBloqueoCuentasBusqueda;
            }
            else
            {
                return null;
            }

        }

        public async Task<dynamic?> ValidateBloqueoCuentas(BloqueoCuentasBusqueda request, string servidor)
        {
            var tipoBase = "Complemento";
            //var servidor = request.servidor;

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            var querybloqueoCuentas = "[4.5.BloqueaCuenta]";

            return await _daoBase.ExecuteStoredProcedure(
                sqlConnection,
                querybloqueoCuentas,
                new SqlParameter("@idCartera", request.idCartera),
                new SqlParameter("@idCuenta", request.idCuenta),                
                new SqlParameter("@idEjecutivo", request.idEjecutivo),
                new SqlParameter("@Comentario", request.comentarios),
                new SqlParameter("@Bloqueo", request.bloqueo)
            );
        }

    }
}
