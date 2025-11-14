using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.ProductividadDTO;
using Loki.Global;
using Loki.Mark.Consulta.Productividad.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Data;
using System.Dynamic;

namespace Loki.Mark.Consulta.Productividad.Services
{
    public class ProductividadService : IProductividadService
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly ILogger<ProductividadService> _logger;

        public ProductividadService(IServiceProvider serviceProvider, ILogger<ProductividadService> logger)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _logger = logger;
        }

        public async Task<ProductividaddDTO> ObtenerProductividad(string indicador, int? ejecutivoId, string servidor)
        {
            try
            {
                _logger.LogInformation("Obteniendo productividad - Indicador: {Indicador}, EjecutivoId: {EjecutivoId}, Servidor: {Servidor}",
                    indicador, ejecutivoId, servidor);

                int idEjecutivo = ejecutivoId ?? 0;

                using (var context = _dbContFactory.GetDbContext(servidor, "Memory"))
                {
                    var connection = context.Database.GetDbConnection();
                    await connection.OpenAsync();

                    var sqlConnection = (SqlConnection)connection;

                    var tblEjecutivos = await CrearTablaEjecutivos(sqlConnection, idEjecutivo);

                    var parameters = new
                    {
                        Indicador = indicador,
                        idEjecutivo = idEjecutivo,
                        tbl_Ejecutivos = tblEjecutivos.AsTableValuedParameter("PS.tbl_Ejecutivos")
                    };

                    var dto = new ProductividaddDTO
                    {
                        Indicador = indicador,
                        IdEjecutivo = ejecutivoId
                    };

                    switch (indicador.ToLower())
                    {
                        case "sesiones":
                            var resultadosSesiones = await sqlConnection.QueryAsync<dynamic>(
                                "PS.ProductividadEnLínea", parameters, commandType: CommandType.StoredProcedure);

                            var sesiones = new List<SesionesDTO>();
                            foreach (var row in resultadosSesiones)
                            {
                                var rowDict = (IDictionary<string, object>)row;
                                var sesion = new SesionesDTO();

                                // Mapeo manual de columnas disponibles
                                if (rowDict.ContainsKey("Extensión"))
                                    sesion.Extensión = rowDict["Extensión"]?.ToString();

                                if (rowDict.ContainsKey("Ingreso"))
                                    sesion.Ingreso = ConvertirFecha(rowDict["Ingreso"]);

                                if (rowDict.ContainsKey("Salida"))
                                    sesion.Salida = ConvertirFecha(rowDict["Salida"]);

                                if (rowDict.ContainsKey("PrimerGestión"))
                                    sesion.PrimerGestión = ConvertirFecha(rowDict["PrimerGestión"]);

                                if (rowDict.ContainsKey("Modo"))
                                    sesion.Modo = rowDict["Modo"]?.ToString();

                                if (rowDict.ContainsKey("TiempoEnModo") && rowDict["TiempoEnModo"] != null)
                                    sesion.TiempoEnModo = TimeSpan.Parse(rowDict["TiempoEnModo"].ToString());

                                // Obtener información del ejecutivo y encargado (IDs)
                                var infoEjecutivo = await ObtenerInformacionEjecutivoCompleta(sqlConnection, idEjecutivo);
                                sesion.EncargadoId = infoEjecutivo.EncargadoId;
                                sesion.IdEjecutivo = infoEjecutivo.IdEjecutivo;

                                sesiones.Add(sesion);
                            }
                            dto.Datos = sesiones;
                            break;

                        case "contactos":
                            var resultadosContactos = await sqlConnection.QueryAsync<dynamic>(
                                "PS.ProductividadEnLínea", parameters, commandType: CommandType.StoredProcedure);

                            var contactos = new List<ContactosDTO>();
                            foreach (var row in resultadosContactos)
                            {
                                var rowDict = (IDictionary<string, object>)row;
                                var contacto = new ContactosDTO();

                                // Para contactos, el stored procedure sí retorna Encargado y Ejecutivo cuando idEjecutivo = 0
                                if (idEjecutivo == 0)
                                {
                                    if (rowDict.ContainsKey("Encargado"))
                                        contacto.EncargadoId = rowDict["Encargado"] != null ? Convert.ToInt32(rowDict["Encargado"]) : (int?)null;
                                    if (rowDict.ContainsKey("Ejecutivo"))
                                        contacto.IdEjecutivo = rowDict["Ejecutivo"] != null ? Convert.ToInt32(rowDict["Ejecutivo"]) : (int?)null;
                                }
                                else
                                {
                                    var infoEjecutivo = await ObtenerInformacionEjecutivoCompleta(sqlConnection, idEjecutivo);
                                    contacto.EncargadoId = infoEjecutivo.EncargadoId;
                                    contacto.IdEjecutivo = infoEjecutivo.IdEjecutivo;
                                }

                                if (rowDict.ContainsKey("Cuentas"))
                                    contacto.Cuentas = rowDict["Cuentas"] != null ? Convert.ToInt32(rowDict["Cuentas"]) : (int?)null;
                                if (rowDict.ContainsKey("Gestiones"))
                                    contacto.Gestiones = rowDict["Gestiones"] != null ? Convert.ToInt32(rowDict["Gestiones"]) : (int?)null;
                                if (rowDict.ContainsKey("Entrada"))
                                    contacto.Entrada = rowDict["Entrada"] != null ? Convert.ToInt32(rowDict["Entrada"]) : (int?)null;
                                if (rowDict.ContainsKey("Titulares"))
                                    contacto.Titulares = rowDict["Titulares"] != null ? Convert.ToInt32(rowDict["Titulares"]) : (int?)null;
                                if (rowDict.ContainsKey("Conocidos"))
                                    contacto.Conocidos = rowDict["Conocidos"] != null ? Convert.ToInt32(rowDict["Conocidos"]) : (int?)null;
                                if (rowDict.ContainsKey("Desconocidos"))
                                    contacto.Desconocidos = rowDict["Desconocidos"] != null ? Convert.ToInt32(rowDict["Desconocidos"]) : (int?)null;
                                if (rowDict.ContainsKey("SinContacto"))
                                    contacto.SinContacto = rowDict["SinContacto"] != null ? Convert.ToInt32(rowDict["SinContacto"]) : (int?)null;

                                contactos.Add(contacto);
                            }
                            dto.Datos = contactos;
                            break;

                        case "porcentajes":
                            var resultadosPorcentajes = await sqlConnection.QueryAsync<dynamic>(
                                "PS.ProductividadEnLínea", parameters, commandType: CommandType.StoredProcedure);

                            var porcentajes = new List<PorcentajesDTO>();
                            foreach (var row in resultadosPorcentajes)
                            {
                                var rowDict = (IDictionary<string, object>)row;
                                var porcentaje = new PorcentajesDTO();

                                if (rowDict.ContainsKey("Encargado"))
                                    porcentaje.EncargadoId = rowDict["Encargado"] != null ? Convert.ToInt32(rowDict["Encargado"]) : (int?)null;
                                if (rowDict.ContainsKey("Ejecutivo"))
                                    porcentaje.IdEjecutivo = rowDict["Ejecutivo"] != null ? Convert.ToInt32(rowDict["Ejecutivo"]) : (int?)null;
                                if (rowDict.ContainsKey("Negociación"))
                                    porcentaje.Negociación = rowDict["Negociación"] != null ? Convert.ToDecimal(rowDict["Negociación"]) : (decimal?)null;
                                if (rowDict.ContainsKey("Gestión"))
                                    porcentaje.Gestión = rowDict["Gestión"] != null ? Convert.ToDecimal(rowDict["Gestión"]) : (decimal?)null;
                                if (rowDict.ContainsKey("Entrada"))
                                    porcentaje.Entrada = rowDict["Entrada"] != null ? Convert.ToDecimal(rowDict["Entrada"]) : (decimal?)null;
                                if (rowDict.ContainsKey("Titulares"))
                                    porcentaje.Titulares = rowDict["Titulares"] != null ? Convert.ToDecimal(rowDict["Titulares"]) : (decimal?)null;
                                if (rowDict.ContainsKey("Conocidos"))
                                    porcentaje.Conocidos = rowDict["Conocidos"] != null ? Convert.ToDecimal(rowDict["Conocidos"]) : (decimal?)null;
                                if (rowDict.ContainsKey("Desconocidos"))
                                    porcentaje.Desconocidos = rowDict["Desconocidos"] != null ? Convert.ToDecimal(rowDict["Desconocidos"]) : (decimal?)null;
                                if (rowDict.ContainsKey("SinContacto"))
                                    porcentaje.SinContacto = rowDict["SinContacto"] != null ? Convert.ToDecimal(rowDict["SinContacto"]) : (decimal?)null;

                                porcentajes.Add(porcentaje);
                            }
                            dto.Datos = porcentajes;
                            break;

                        case "negociaciones":
                            var resultadosNegociaciones = await sqlConnection.QueryAsync<dynamic>(
                                "PS.ProductividadEnLínea", parameters, commandType: CommandType.StoredProcedure);

                            var negociaciones = new List<NegociacionesDTO>();
                            foreach (var row in resultadosNegociaciones)
                            {
                                var rowDict = (IDictionary<string, object>)row;
                                var negociacion = new NegociacionesDTO();

                                if (rowDict.ContainsKey("Encargado"))
                                    negociacion.EncargadoId = rowDict["Encargado"] != null ? Convert.ToInt32(rowDict["Encargado"]) : (int?)null;
                                if (rowDict.ContainsKey("Ejecutivo"))
                                    negociacion.IdEjecutivo = rowDict["Ejecutivo"] != null ? Convert.ToInt32(rowDict["Ejecutivo"]) : (int?)null;
                                if (rowDict.ContainsKey("Negociaciones"))
                                    negociacion.Negociaciones = rowDict["Negociaciones"] != null ? Convert.ToInt32(rowDict["Negociaciones"]) : (int?)null;
                                if (rowDict.ContainsKey("MontoNegociaciones"))
                                    negociacion.MontoNegociaciones = rowDict["MontoNegociaciones"] != null ? Convert.ToDecimal(rowDict["MontoNegociaciones"]) : (decimal?)null;
                                if (rowDict.ContainsKey("SaldoSolucionado"))
                                    negociacion.SaldoSolucionado = rowDict["SaldoSolucionado"] != null ? Convert.ToDecimal(rowDict["SaldoSolucionado"]) : (decimal?)null;
                                if (rowDict.ContainsKey("MontoPromedio"))
                                    negociacion.MontoPromedio = rowDict["MontoPromedio"] != null ? Convert.ToDecimal(rowDict["MontoPromedio"]) : (decimal?)null;
                                if (rowDict.ContainsKey("SaldoPromedio"))
                                    negociacion.SaldoPromedio = rowDict["SaldoPromedio"] != null ? Convert.ToDecimal(rowDict["SaldoPromedio"]) : (decimal?)null;

                                negociaciones.Add(negociacion);
                            }
                            dto.Datos = negociaciones;
                            break;

                        default:
                            var resultadosDefault = await sqlConnection.QueryAsync<dynamic>(
                                "PS.ProductividadEnLínea", parameters, commandType: CommandType.StoredProcedure);

                            var datosDinamicos = new List<Dictionary<string, object>>();
                            foreach (var row in resultadosDefault)
                            {
                                var dict = new Dictionary<string, object>();
                                var rowDict = (IDictionary<string, object>)row;

                                // Si es para ejecutivo individual y no tiene encargado/ejecutivo, agregarlos
                                if (idEjecutivo > 0 && !rowDict.ContainsKey("Encargado"))
                                {
                                    var infoEjecutivo = await ObtenerInformacionEjecutivoCompleta(sqlConnection, idEjecutivo);
                                    dict["EncargadoId"] = infoEjecutivo.EncargadoId;
                                    dict["EjecutivoId"] = infoEjecutivo.IdEjecutivo;
                                }

                                foreach (var prop in rowDict)
                                {
                                    if (prop.Value != null && (prop.Key.Contains("Ingreso") || prop.Key.Contains("Salida") || prop.Key.Contains("Gestión")))
                                    {
                                        dict[prop.Key] = ConvertirFecha(prop.Value);
                                    }
                                    else
                                    {
                                        dict[prop.Key] = prop.Value;
                                    }
                                }
                                datosDinamicos.Add(dict);
                            }
                            dto.Datos = datosDinamicos;
                            break;
                    }

                    return dto;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener productividad");
                throw;
            }
        }

        private async Task<DataTable> CrearTablaEjecutivos(SqlConnection connection, int idEjecutivo)
        {
            var tblEjecutivos = new DataTable();

            tblEjecutivos.Columns.Add("idEjecutivo", typeof(int));
            tblEjecutivos.Columns.Add("Usuario", typeof(string));
            tblEjecutivos.Columns.Add("Encargado", typeof(string));
            tblEjecutivos.Columns.Add("Extensión", typeof(string));
            tblEjecutivos.Columns.Add("Jerarquía", typeof(int));
            tblEjecutivos.Columns.Add("Activo", typeof(bool));

            if (idEjecutivo == 0)
            {
                int idEncargadoRaiz = 1;
                var ejecutivos = await ClasesCoorinMethods.ObtieneEjecutivosPropios(connection, idEncargadoRaiz);

                foreach (var ejecutivo in ejecutivos)
                {
                    tblEjecutivos.Rows.Add(
                        ejecutivo.IdEjecutivo,
                        ejecutivo.Usuario,
                        ejecutivo.IdEncargado.ToString(), // Usar IdEncargado en lugar de Encargado
                        string.Empty,
                        ejecutivo.Jerarquía,
                        true
                    );
                }
            }
            else
            {
                int idEncargado = await ObtenerIdEncargado(connection, idEjecutivo);
                var ejecutivos = await ClasesCoorinMethods.ObtieneEjecutivosPropios(connection, idEncargado);

                foreach (var ejecutivo in ejecutivos)
                {
                    tblEjecutivos.Rows.Add(
                        ejecutivo.IdEjecutivo,
                        ejecutivo.Usuario,
                        ejecutivo.IdEncargado.ToString(), // Usar IdEncargado en lugar de Encargado
                        string.Empty,
                        ejecutivo.Jerarquía,
                        true
                    );
                }
            }

            return tblEjecutivos;
        }

        private async Task<int> ObtenerIdEncargado(SqlConnection connection, int idEjecutivo)
        {
            try
            {
                var sql = "SELECT idEncargado FROM dbCollection..Ejecutivos WHERE idEjecutivo = @idEjecutivo";
                var idEncargado = await connection.QueryFirstOrDefaultAsync<int?>(sql, new { idEjecutivo });
                return idEncargado ?? idEjecutivo;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "No se pudo obtener el idEncargado para el ejecutivo {IdEjecutivo}, usando el mismo ID", idEjecutivo);
                return idEjecutivo;
            }
        }

        // Método para obtener información completa del ejecutivo (IDs)
        private async Task<EjecutivoInfoDTO> ObtenerInformacionEjecutivoCompleta(SqlConnection connection, int idEjecutivo)
        {
            try
            {
                var sql = @"
                    SELECT 
                        E1.idEjecutivo as IdEjecutivo,
                        E1.idEncargado as EncargadoId
                    FROM dbCollection..Ejecutivos E1
                    WHERE E1.idEjecutivo = @idEjecutivo";

                var resultado = await connection.QueryFirstOrDefaultAsync<EjecutivoInfoDTO>(sql, new { idEjecutivo });

                return resultado ?? new EjecutivoInfoDTO
                {
                    IdEjecutivo = idEjecutivo,
                    EncargadoId = 0 // 0 si no tiene encargado
                };
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "No se pudo obtener información del ejecutivo {IdEjecutivo}", idEjecutivo);
                return new EjecutivoInfoDTO
                {
                    IdEjecutivo = idEjecutivo,
                    EncargadoId = 0
                };
            }
        }

        private DateTime? ConvertirFecha(object valor)
        {
            if (valor == null || valor == DBNull.Value)
                return null;

            try
            {
                if (valor is DateTime fecha)
                    return fecha;

                if (DateTime.TryParse(valor.ToString(), out DateTime resultado))
                    return resultado;

                if (valor is TimeSpan tiempo)
                    return DateTime.Today.Add(tiempo);

                return null;
            }
            catch
            {
                return null;
            }
        }

        // Método alternativo usando SqlCommand
        public async Task<ProductividaddDTO> ObtenerProductividadConCommand(string indicador, int? Idejecutivo, string servidor)
        {
            try
            {
                int idEjecutivo = Idejecutivo ?? 0;

                using (var context = _dbContFactory.GetDbContext(servidor, "Memory"))
                {
                    var connection = context.Database.GetDbConnection();
                    await connection.OpenAsync();

                    var sqlConnection = (SqlConnection)connection;

                    using var command = sqlConnection.CreateCommand();
                    command.CommandText = "PS.ProductividadEnLínea";
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@Indicador", indicador);
                    command.Parameters.AddWithValue("@idEjecutivo", idEjecutivo);

                    var tblEjecutivos = await CrearTablaEjecutivos(sqlConnection, idEjecutivo);
                    var param = command.Parameters.AddWithValue("@tbl_Ejecutivos", tblEjecutivos);
                    param.SqlDbType = SqlDbType.Structured;
                    param.TypeName = "PS.tbl_Ejecutivos";

                    var dto = new ProductividaddDTO
                    {
                        Indicador = indicador,
                        IdEjecutivo = Idejecutivo
                    };

                    using var reader = await command.ExecuteReaderAsync();

                    switch (indicador.ToLower())
                    {
                        case "sesiones":
                            var sesiones = new List<SesionesDTO>();
                            while (await reader.ReadAsync())
                            {
                                var sesion = new SesionesDTO();

                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    var columnName = reader.GetName(i);
                                    var value = reader.GetValue(i);

                                    switch (columnName.ToLower())
                                    {
                                        case "extensión":
                                            sesion.Extensión = value?.ToString();
                                            break;
                                        case "ingreso":
                                            sesion.Ingreso = value != DBNull.Value ? ConvertirFecha(value) : null;
                                            break;
                                        case "salida":
                                            sesion.Salida = value != DBNull.Value ? ConvertirFecha(value) : null;
                                            break;
                                        case "primergestión":
                                            sesion.PrimerGestión = value != DBNull.Value ? ConvertirFecha(value) : null;
                                            break;
                                        case "modo":
                                            sesion.Modo = value?.ToString();
                                            break;
                                        case "tiempoenmodo":
                                            if (value != DBNull.Value && TimeSpan.TryParse(value.ToString(), out TimeSpan tiempo))
                                                sesion.TiempoEnModo = tiempo;
                                            break;
                                    }
                                }

                                // Obtener información del ejecutivo (IDs)
                                var infoEjecutivo = await ObtenerInformacionEjecutivoCompleta(sqlConnection, idEjecutivo);
                                sesion.EncargadoId = infoEjecutivo.EncargadoId;
                                sesion.IdEjecutivo = infoEjecutivo.IdEjecutivo;

                                sesiones.Add(sesion);
                            }
                            dto.Datos = sesiones;
                            break;

                        default:
                            var datos = new List<Dictionary<string, object>>();
                            while (await reader.ReadAsync())
                            {
                                var registro = new Dictionary<string, object>();

                                // Agregar encargado y ejecutivo para casos individuales
                                if (idEjecutivo > 0)
                                {
                                    var infoEjecutivo = await ObtenerInformacionEjecutivoCompleta(sqlConnection, idEjecutivo);
                                    registro["EncargadoId"] = infoEjecutivo.EncargadoId;
                                    registro["EjecutivoId"] = infoEjecutivo.IdEjecutivo;
                                }

                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    var columnName = reader.GetName(i);
                                    var value = reader.GetValue(i);

                                    if (value != DBNull.Value && (columnName.Contains("Ingreso") || columnName.Contains("Salida") || columnName.Contains("Gestión")))
                                    {
                                        registro[columnName] = ConvertirFecha(value);
                                    }
                                    else
                                    {
                                        registro[columnName] = value == DBNull.Value ? null : value;
                                    }
                                }
                                datos.Add(registro);
                            }
                            dto.Datos = datos;
                            break;
                    }

                    return dto;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en ObtenerProductividadConCommand");
                throw;
            }
        }
    }

    // DTO auxiliar para información del ejecutivo (IDs)
    public class EjecutivoInfoDTO
    {
        public int IdEjecutivo { get; set; }
        public int EncargadoId { get; set; }
    }
}