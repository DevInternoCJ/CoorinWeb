using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.GespaDTOs;
using Loki.Mark.Administracion.Consulta.Arrepentimientos.Interfaces;
using Loki.Mark.Procesos.Gespa.Arrepentimientos.Interfaces;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Procesos.Gespa.Arrepentimientos.DAOs
{
    public class ArrepentimientosGespaBusquedaDAOs :IArrepentimientosGespaDAOs
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;

        public ArrepentimientosGespaBusquedaDAOs(IServiceProvider serviceProvider)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = new DaoBase();
        }

        public async Task<dynamic?> ValidateArrepentimientoBusqueda(DefinicionBusqueda request)
        {
            var tipoBase = "Collection";
            var servidor = request.Servidor;
            string busqueda = request.CriterioBusqueda;

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            //Se realiza el filtro segun el parametro de busqueda

            if (busqueda == "Cuenta")
            {
                var estatusCuenta = @"SELECT CA.Cartera,C.idCuenta Cuenta, P.Producto,  CONCAT(CA.Abreviación,C.Expediente) Expediente," +
                "V.Valor Situación , C.NombreDeudor, C.RFC, C.NúmeroCliente, C.Saldo, S.Valor Sucursal " +
                "FROM dbo.Cuentas C " +
                "INNER JOIN dbo.Carteras CA ON CA.idCartera = C.idCartera " +
                "INNER JOIN dbo.Productos P ON P.idProducto = C.idProducto " +
                "INNER JOIN dbo.ValoresCatálogo V ON V.idValor = C.idSituación " +
                "INNER JOIN dbo.ValoresCatálogo S ON S.idValor = C.idSucursal " +
                "WHERE idSituación IN(SELECT idValor1 FROM dbo.RelacionesCatálogos WHERE idValor2 = 3104) AND " +
                "C.idCuenta = @Cuenta AND C.idCartera = @Cartera AND CuentaActiva = 1 ";

                var resultadoCuenta = await sqlConnection.QueryAsync<ResultadoArrepentimientoCuenta>(//listo
                estatusCuenta,
                new { Cuenta = request.idCuenta, Cartera = request.idCartera }
                );
                if (resultadoCuenta != null)
                {
                    return resultadoCuenta;
                }
                else
                {
                    return null;
                }
            }
            if (busqueda == "Teléfono")
            {
                var estatusTelefono = @"SELECT  C.Cartera , " +
                    "T.idCuenta Cuenta, " +
                    "T.NúmeroTelefónico , " +
                    "Cl.Valor Clase , " +
                    "V.Valor Telefonía , " +
                    "O.Valor Origen " +
                    "FROM    dbo.Teléfonos T " +
                    "INNER JOIN dbo.Carteras C ON C.idCartera = T.idCartera " +
                    "INNER JOIN dbo.ValoresCatálogo V ON V.idValor = T.idTelefonía " +
                    "INNER JOIN dbo.ValoresCatálogo O ON O.idValor = T.idOrigen " +
                    "INNER JOIN dbo.ValoresCatálogo Cl ON Cl.idValor = T.idClase " +
                    "WHERE Cl.idValor <> 1502 AND C.idCartera = @idCartera AND T.idCuenta = @idCuenta ";

                var resultadoTelefono = await sqlConnection.QueryAsync<ResultadoArrepentimientosTelefonos>(
                estatusTelefono,
                new { idCuenta = request.idCuenta, idCartera = request.idCartera } 
                );
                if (resultadoTelefono != null)
                {
                    return resultadoTelefono;
                }
                else
                {
                    return null;
                }

            }
            if (busqueda == "Negociación")
            {
                var estatusNegociacion = @"SELECT N.idCuenta Cuenta, " +
                       "N.Fecha_Insert FechaCreacion, " +
                       "N.Segundo_Insert HoraCreacion, " +
                       "H.Nombre Herramienta, " +
                       "E.NombreEjecutivo , " +
                       "N.idEjecutivo ," +
                        "V.NombreEjecutivo Validador, " +
                        "Estados.Valor Estado, " +
                        "N.MontoNegociado , " +
                        "N.SaldoNegociación , " +
                        "N.Plazos , " +
                        "CASE N.CartaConvenio " +
                          "WHEN 1 THEN 'Si' " +
                          "ELSE 'No' " +
                        "END CartaConvenio, " +
                        "N.FechaAcordada " +
                        "FROM Negociaciones N " +
                        "INNER JOIN dbo.Carteras c ON c.idCartera = N.idCartera " +
                        "INNER JOIN dbo.Ejecutivos E ON E.idEjecutivo = N.idEjecutivo " +
                        "INNER JOIN dbo.Herramientas H ON H.idHerramienta = N.idHerramienta " +
                        "INNER JOIN dbo.ValoresCatálogo Estados ON Estados.idValor = N.idEstado " +
                        "INNER JOIN dbo.Ejecutivos V ON V.idEjecutivo = N.idEjecutivoValidador " +
                         "WHERE N.idCartera = @idCartera " +
                         "AND N.idCuenta = @idCuenta " +
                         "AND Estados.idValor = 2901 ";

                var resultadoNegociacion = await sqlConnection.QueryAsync<ResultadoArrepentimientoNegociacion>(
                estatusNegociacion,
                new { idCuenta = request.idCuenta, idCartera = request.idCartera } 
                );
                if (resultadoNegociacion != null)
                {
                    return resultadoNegociacion;
                }
                else
                {
                    return null;
                }

            }
            if (busqueda == "Domicilio")
            {
                var estatusDomicilio = @"SELECT  C.Cartera , " +
                            "D.idCuenta Cuenta , " +
                            "V.Valor Verificado , " +
                            "D.Calle , " +
                            "D.NúmeroExterior , " +
                            "D.NúmeroInterior , " +
                            "D.CódigoPostal , " +
                            "D.ColoniaLocalidad , " +
                            "D.Estado " +
                            "FROM    dbo.Domicilios D " +
                            "INNER JOIN dbo.Carteras C ON C.idCartera = D.idCartera " +
                            "INNER JOIN dbo.ValoresCatálogo V ON V.idValor = D.idInformación " +
                            "WHERE   D.idInformación <> 1901 " +
                            "AND D.idCartera = @idCartera " +
                            "AND D.idCuenta = @idCuenta";

                var resultadoDomicilio = await sqlConnection.QueryAsync<ResultadoArrepentimientoDomicilio>(
                estatusDomicilio,
                new { idCuenta = request.idCuenta, idCartera = request.idCartera } 
                );
                if (resultadoDomicilio != null)
                {
                    return resultadoDomicilio;
                }
                else
                {
                    return null;
                }

            }
            if (busqueda == "Correo")
            {
                var estatusCorreo = @"SELECT  C.Cartera , " +
                        "Co.idCuenta Cuenta , " +
                        "Co.CorreoElectrónico , " +
                        "I.Valor Informacion , " +
                        "O.Valor Origen " +
                        "FROM    dbo.CorreosCuentas Co " +
                        "INNER JOIN dbo.Carteras C ON C.idCartera = Co.idCartera " +
                        "INNER JOIN dbo.ValoresCatálogo O ON O.idValor = Co.idOrigen " +
                        "INNER JOIN dbo.ValoresCatálogo I ON I.idValor = Co.idInformación " +
                        "WHERE   Co.idInformación <> 1901 " +
                        "AND Co.idCartera =@idCartera " +
                        "AND Co.idCuenta = @idCuenta";

                var resultadoCorreo = await sqlConnection.QueryAsync<ResultadoArrepentimientoCorreo>(
                estatusCorreo,
                new { idCuenta = request.idCuenta, idCartera = request.idCartera } 
                );
                if (resultadoCorreo != null)
                {
                    return resultadoCorreo;
                }
                else
                {
                    return null;
                }
            }
            if (busqueda == "Datos Erróneos")
            {
                var estatusDatosErroneos = @"SELECT  C.Cartera , " +
                            "D.idCuenta Cuenta , " +
                            "D.FechaHora_Insert Fecha , " +
                            "E.NombreEjecutivo, " +
                            "DatoErroneo.Valor DatoErróneo " +
                            "FROM    dbo.DatosErróneos D " +
                            "INNER JOIN dbo.Carteras C ON C.idCartera = D.idCartera " +
                            "INNER JOIN dbo.Ejecutivos E ON E.idEjecutivo = D.idEjecutivo_Insert " +
                            "INNER JOIN dbo.ValoresCatálogo DatoErroneo ON DatoErroneo.idValor = D.idDatoErróneo " +
                            "WHERE   idCuenta = @idCuenta " +
                            "AND D.idCartera = @idCartera;";

                var resultadoDatosErroneos = await sqlConnection.QueryAsync<ResultadoArrepentimientoDatosErroneos>(
                estatusDatosErroneos,
                new { idCuenta = request.idCuenta, idCartera = request.idCartera }
                );
                if (resultadoDatosErroneos != null)
                {
                    return resultadoDatosErroneos;
                }
                else
                {
                    return null;
                }

            }
            if (busqueda == "Cargo en línea")
            {
                var estatusCargoEnLinea = @"SELECT  CA.idCuenta Cuenta , " +
                                        "C.Cartera , " +
                                        "CA.Fecha_Insert Fecha , " +
                                        "CA.Segundo_Insert Hora , " +
                                        "E.NombreEjecutivo , " +
                                        "CA.idEjecutivo ClaveEjecutivo , " +
                                        "CA.Monto , " +
                                        "FORMAT(CA.Vencimiento,'MM/yy') Vencimiento , " +
                                        "CA.Tarjeta , " +
                                        "Bancos.Valor Banco " +
                                    "FROM    dbo.CargosATM CA " +
                                        "INNER JOIN dbo.Carteras C ON C.idCartera = CA.idCartera " +
                                        "LEFT JOIN dbo.Ejecutivos E ON E.idEjecutivo = CA.idEjecutivo " +
                                        "LEFT JOIN dbo.ValoresCatálogo Bancos ON Bancos.idValor = CA.idBanco " +
                                    "WHERE   CA.idCuenta = @idCuenta AND CA.idCartera = @idCartera and idEjecutivo_Autorizó IS NULL";

                var resultadoCargoEnLinea = await sqlConnection.QueryAsync<ResultadoArrepentimientoCargoEnLinea>(
                estatusCargoEnLinea,
                new { idCuenta = request.idCuenta, idCartera = request.idCartera } 
                );
                if (resultadoCargoEnLinea != null)
                {
                    return resultadoCargoEnLinea;
                }
                else
                {
                    return null;
                }
            }
            if (busqueda == "Reporte de pago")
            {
                var estatusReporteDePago = @"SELECT  PR.idCuenta Cuenta , " +
                                        "C.Cartera , " +
                                        "PR.Fecha_Insert Fecha , " +
                                        "PR.Segundo_Insert Hora , " +
                                        "E.NombreEjecutivo , " +
                                        "PR.idEjecutivo ClaveEjecutivo , " +
                                        "PR.MontoPago Monto ," +
                                        "PR.Sucursal , " +
                                        "Etapa.Valor Etapa " +
                                "FROM    dbo.PagosReportados PR " +
                                        "INNER JOIN dbo.Carteras C ON C.idCartera = PR.idCartera " +
                                        "LEFT JOIN dbo.Ejecutivos E ON E.idEjecutivo = PR.idEjecutivo " +
                                        "LEFT JOIN dbo.ValoresCatálogo Etapa ON Etapa.idValor = PR.idEtapa " +
                                "WHERE   PR.idCuenta = @idCuenta " +
                                        "AND PR.idCartera = @idCartera " +
                                        "AND PR.idEtapa = 2301";

                var resultadoReporteDePago = await sqlConnection.QueryAsync<ResultadoArrepentimientoReporteDePago>(
                estatusReporteDePago,
                new { idCuenta = request.idCuenta, idCartera = request.idCartera } 
                );
                if (resultadoReporteDePago != null)
                {
                    return resultadoReporteDePago;
                }
                else
                {
                    return null;
                }

            }
            if (busqueda == "Titular")
            {
                var estatusTitular = @"SELECT  " +
                                        "C.Cartera ,   " +
                                        "T.idCuenta Cuenta,   " +
                                        "T.NúmeroTelefónico ,  " +
                                        "O.Valor Origen,	" +
                                        "V.Valor Telefonía   	 " +
                                    "FROM    dbo.Teléfonos T  " +
                                    "INNER JOIN dbo.Carteras C ON C.idCartera = T.idCartera  " +
                                    "INNER JOIN dbo.ValoresCatálogo V ON V.idValor = T.idTelefonía  " +
                                    "INNER JOIN dbo.ValoresCatálogo O ON O.idValor = T.idOrigen  " +
                                    "WHERE T.idOrigen = 1802 AND T.Confirmado = 1 " +
                                        "AND C.idCartera = @idCartera AND T.idCuenta = @idCuenta ";

                var resultadoTitular = await sqlConnection.QueryAsync<ResultadoArrepentimientoTitular>(
                estatusTitular,
                new { idCuenta = request.idCuenta, idCartera = request.idCartera }
                );
                if (resultadoTitular != null)
                {
                    return resultadoTitular;
                }
                else
                {
                    return null;
                }
            }
            if (busqueda == "Correo WLP")
            {
                var estatusCorreoWLP = @"SELECT C.Cartera, Co.idCuenta Cuenta, Co.CorreoElectrónico, I.Valor Informacion, O.Valor Origen " +
                "FROM dbo.CorreosCuentas Co INNER JOIN dbo.Carteras C ON C.idCartera = Co.idCartera " +
                "INNER JOIN dbo.ValoresCatálogo O ON O.idValor = Co.idOrigen " +
                "INNER JOIN dbo.ValoresCatálogo I ON I.idValor = Co.idInformación " +
                "WHERE Co.idOrigen <> 1803 " +
                "AND Co.idCartera = @idCartera " +
                "AND Co.idCuenta = @idCuenta";

                var resultadoCorreoWLP = await sqlConnection.QueryAsync<ResultadoArrepentimientoCorreoWLP>(
                estatusCorreoWLP,
                new { idCuenta = request.idCuenta, idCartera = request.idCartera } 
                );
                if (resultadoCorreoWLP != null)
                {
                    return resultadoCorreoWLP;
                }
                else
                {
                    return null;
                }

            }
            if (busqueda == "Dictaminadas")
            {
                var estatusDictaminadas = @"SELECT * FROM dbCollection..CuentasEspeciales WHERE idCartera = @idCartera AND idCuenta = @idCuenta";

                var resultadoDictaminadas = await sqlConnection.QueryAsync<ResultadoArrepentimientoDictaminadas>(
                estatusDictaminadas,
                new { idCuenta = request.idCuenta, idCartera = request.idCartera }
                );
                if (resultadoDictaminadas != null)
                {
                    return resultadoDictaminadas;
                }
                else
                {
                    return null;
                }
            }
            if (busqueda == "Elimina Negociación")
            {
                var estatusEliminaNegociacion = @"SELECT N.idCuenta Cuenta, " +
                       "N.Fecha_Insert FechaCreacion, " +
                       "N.Segundo_Insert HoraCreacion, " +
                       "H.Nombre Herramienta, " +
                       "E.NombreEjecutivo , " +
                       "N.idEjecutivo ," +
                        "V.NombreEjecutivo Validador, " +
                        "Estados.Valor Estado, " +
                        "N.MontoNegociado , " +
                        "N.SaldoNegociación , " +
                        "N.Plazos , " +
                        "CASE N.CartaConvenio " +
                          "WHEN 1 THEN 'Si' " +
                          "ELSE 'No' " +
                        "END CartaConvenio, " +
                        "N.FechaAcordada " +
                        "FROM Negociaciones N " +
                        "INNER JOIN dbo.Carteras c ON c.idCartera = N.idCartera " +
                        "INNER JOIN dbo.Ejecutivos E ON E.idEjecutivo = N.idEjecutivo " +
                        "INNER JOIN dbo.Herramientas H ON H.idHerramienta = N.idHerramienta " +
                        "INNER JOIN dbo.ValoresCatálogo Estados ON Estados.idValor = N.idEstado " +
                        "INNER JOIN dbo.Ejecutivos V ON V.idEjecutivo = N.idEjecutivoValidador " +
                         "WHERE N.idCartera = @idCartera " +
                         "AND N.idCuenta = @idCuenta " +
                         "AND Estados.idValor = 2901 ";

                var resultadoEliminaNegociacion = await sqlConnection.QueryAsync<ResultadoDefinicionBusqueda>(
                estatusEliminaNegociacion,
                new { idCuenta = request.idCuenta, idCartera = request.idCartera } 
                );
                if (resultadoEliminaNegociacion != null)
                {
                    return resultadoEliminaNegociacion;
                }
                else
                {
                    return null;
                }

            }
            else
            {
                return null;
            }
        }

        public async Task<dynamic?> ValidateArrepentimiento(Arrepentimiento request)
        {
            var tipoBase = "Collection";
            var servidor = request.Servidor;
            string concepto = request.concepto;

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            var queryArrepentimientos = "[4.2.Arrepentimientos]";

            return await _daoBase.ExecuteStoredProcedure(
                sqlConnection,
                queryArrepentimientos,
                new SqlParameter("@idCartera", request.idCartera),
                new SqlParameter("@idCuenta", request.idCuenta),
                new SqlParameter("@idEjecutivo", request.idEjecutivo),
                new SqlParameter("@Concepto", request.concepto),
                new SqlParameter("@Dato", request.dato),
                new SqlParameter("@Fecha_Insert", request.fechaInsert),
                new SqlParameter("@Segundo_Insert", request.segundoInsert),
                new SqlParameter("@Fecha_HoraInsert", request.fechaHoraInsert)
            );

        }

    }
}
