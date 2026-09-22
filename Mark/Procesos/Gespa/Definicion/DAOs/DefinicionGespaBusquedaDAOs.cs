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

            var spResult = await _daoBase.ExecuteStoredProcedure(
                sqlConnection, 
                querydefine,
                new SqlParameter("@idCartera", string.IsNullOrWhiteSpace(request.idCartera) ? (object)DBNull.Value : request.idCartera),
                new SqlParameter("@idCuenta", string.IsNullOrWhiteSpace(request.idCuenta) ? (object)DBNull.Value : request.idCuenta),
                new SqlParameter("@Selector", string.IsNullOrWhiteSpace(request.selector) ? (object)DBNull.Value : request.selector),
                new SqlParameter("@idEjecutivo", string.IsNullOrWhiteSpace(request.idEjecutivo) ? (object)DBNull.Value : request.idEjecutivo),
                new SqlParameter("@idSituacion", string.IsNullOrWhiteSpace(request.idSituacion) ? (object)DBNull.Value : request.idSituacion),
                new SqlParameter("@Comentario", string.IsNullOrWhiteSpace(request.comentario) ? (object)DBNull.Value : request.comentario)
            );

            // Replicar la lógica legacy de frmDefinirCuentas.cs:
            // if ( tblResultado.Columns.Contains("Mensaje") ) lblResultado.Text = tblResultado.Rows[0]["Mensaje"].ToString();
            if (spResult != null && spResult.Count > 0)
            {
                var primeraFila = spResult[0];
                if (primeraFila is IDictionary<string, object> dictFila)
                {
                    if (dictFila.TryGetValue("Mensaje", out var msgVal) && msgVal != null && !string.IsNullOrWhiteSpace(msgVal.ToString()))
                    {
                        return msgVal.ToString();
                    }
                    if (dictFila.TryGetValue("mensaje", out var msgValLower) && msgValLower != null && !string.IsNullOrWhiteSpace(msgValLower.ToString()))
                    {
                        return msgValLower.ToString();
                    }
                }
                else
                {
                    try
                    {
                        var propMensaje = primeraFila?.Mensaje ?? primeraFila?.mensaje;
                        if (propMensaje != null && !string.IsNullOrWhiteSpace(propMensaje.ToString()))
                        {
                            return propMensaje.ToString();
                        }
                    }
                    catch
                    {
                        // Si no contiene la propiedad Mensaje, se asume ejecución exitosa sin advertencias.
                    }
                }
            }

            return null;
        }

    }
}
