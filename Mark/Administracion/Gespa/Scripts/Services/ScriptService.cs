using System.Data;
using CoorinWeb.Loki.Global;
using Loki.DTOs.ScriptsDTOs;
using Loki.Mark.Administracion.Gespa.Scripts.Interfaces;
using Loki.Mark.Consulta.PlantillasCorreo.Interfaces;
using Loki.Mark.Consulta.PlantillasCorreo.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Loki.Mark.Administracion.Gespa.Scripts.Services
{
    public class ScriptService : IScriptService
    {

        private readonly IDbContextFactory _dbContFactory;
        private readonly ILogger<PlantillasCorreoService> _logger;

        public ScriptService(IDbContextFactory dbContextFactory, ILogger<PlantillasCorreoService> logger)
        {
            _dbContFactory = dbContextFactory;
            _logger = logger;
        }

        public async Task<cargaDatosDTO.ResultadoCargaProductoDto> CargaDatosProducto(int idCartera, int idProducto, string servidor, string nombreBaseDatos)
        {
            try
            {
                var dbContext = _dbContFactory.GetDbContext(servidor, nombreBaseDatos);
                var connection = dbContext.Database.GetDbConnection();

                var resultado = new cargaDatosDTO.ResultadoCargaProductoDto();

                // 1. Obtener scripts del producto
                string queryScripts = @"
            SELECT idScript, Nombre, Descripción, Script 
            FROM Scripts 
            WHERE idProducto = @IdProducto";

                await using (var command = connection.CreateCommand())
                {
                    command.CommandText = queryScripts;
                    command.CommandType = CommandType.Text;
                    command.Parameters.Add(new SqlParameter("@IdProducto", idProducto));

                    if (connection.State != ConnectionState.Open)
                        await connection.OpenAsync();

                    var scripts = new List<cargaDatosDTO.ScriptDto>();
                    using var reader = await command.ExecuteReaderAsync();

                    while (await reader.ReadAsync())
                    {
                        scripts.Add(new cargaDatosDTO.ScriptDto
                        {
                            IdScript = reader.GetInt16(0),
                            Nombre = reader.GetString(1),
                            Descripcion = reader.IsDBNull(2) ? string.Empty : reader.GetString(2),
                            Script = reader.IsDBNull(3) ? string.Empty : reader.GetString(3)
                        });
                    }

                    // Agregar opción "Nuevo"
                    scripts.Insert(0, new cargaDatosDTO.ScriptDto
                    {
                        IdScript = 0,
                        Nombre = " -- Nuevo -- ",
                        Descripcion = "",
                        Script = ""
                    });

                    resultado.Scripts = scripts;
                }

                // 2. Verificar existencia de tabla de asignación
                string queryVerificarTabla = @"
            SELECT object_id 
            FROM dbCollection.sys.objects 
            WHERE name = 'Producto_' + @IdProducto 
            AND type in ('U')";

                await using (var command = connection.CreateCommand())
                {
                    command.CommandText = queryVerificarTabla;
                    command.CommandType = CommandType.Text;
                    command.Parameters.Add(new SqlParameter("@IdProducto", idProducto.ToString()));

                    var tablaExiste = await command.ExecuteScalarAsync();
                    if (tablaExiste == null)
                    {
                        resultado.Mensaje = "Error, no se encuentra la tabla de asignación";
                        resultado.Exitoso = false;
                        return resultado;
                    }
                }

                // 3. Obtener ejemplo de producto
                string queryEjemploProducto = @"
            SELECT TOP 1 * 
            FROM dbCollection.Y.Producto_@IdProducto 
            TABLESAMPLE (30 PERCENT)";

                await using (var command = connection.CreateCommand())
                {
                    command.CommandText = queryEjemploProducto.Replace("@IdProducto", idProducto.ToString());
                    command.CommandType = CommandType.Text;

                    var tablaEjemplo = new DataTable();
                    using var reader = await command.ExecuteReaderAsync();
                    tablaEjemplo.Load(reader);

                    resultado.EjemploProducto = tablaEjemplo.Rows.Count > 0 ?
                        ConvertirDataRowADictionary(tablaEjemplo.Rows[0]) : new Dictionary<string, object>();
                }

                // 4. Obtener ejemplo de cuentas
                string queryEjemploCuentas = @"
            SELECT TOP 1 idCuenta, NombreDeudor, RFC, NúmeroCliente, Saldo 
            FROM Cuentas 
            WHERE CuentaActiva = 1 
            AND idCartera = @IdCartera 
            AND idProducto = @IdProducto";

                await using (var command = connection.CreateCommand())
                {
                    command.CommandText = queryEjemploCuentas;
                    command.CommandType = CommandType.Text;
                    command.Parameters.Add(new SqlParameter("@IdCartera", idCartera));
                    command.Parameters.Add(new SqlParameter("@IdProducto", idProducto));

                    var tablaCuentas = new DataTable();
                    using var reader = await command.ExecuteReaderAsync();
                    tablaCuentas.Load(reader);

                    resultado.EjemploCuentas = tablaCuentas.Rows.Count > 0 ?
                        ConvertirDataRowADictionary(tablaCuentas.Rows[0]) : new Dictionary<string, object>();
                }

                resultado.Exitoso = true;
                resultado.Mensaje = "Seleccione un nuevo script o modificar uno existente.";

                return resultado;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en CargaDatosProducto para cartera {IdCartera}, producto {IdProducto}",
                    idCartera, idProducto);

                return new cargaDatosDTO.ResultadoCargaProductoDto
                {
                    Exitoso = false,
                    Mensaje = "Error al cargar los datos del producto"
                };
            }
        }
   
        // Método auxiliar para convertir DataRow a Dictionary
        private Dictionary<string, object> ConvertirDataRowADictionary(DataRow row)
        {
            var dict = new Dictionary<string, object>();
            foreach (DataColumn column in row.Table.Columns)
            {
                dict[column.ColumnName] = row[column] == DBNull.Value ? null : row[column];
            }
            return dict;
        }
    }
}
