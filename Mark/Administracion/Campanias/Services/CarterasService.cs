using System.Collections;
using System.Data;
using ClosedXML.Excel;
using CoorinWeb.Loki.Common;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.CampaniasDTOs;
using Loki.Mark.Administracion.Campanias.Interfaces;
using Loki.Mark.Administracion.Carteras.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Configuration;
using static CoorinWeb.Loki.Global.AccionamientosQueryHelper;
namespace Loki.Mark.Administracion.Carteras.Services
{
    public class CarterasService : ICarterasService
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;
        private readonly ICampaniasDao _campaniasDao;
        private readonly ICarterasDAOs _carterasDao;

        public CarterasService(IServiceProvider serviceProvider, DaoBase daoBase, ICampaniasDao campaniasDao, ICarterasDAOs carterasDao)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = daoBase;
            _campaniasDao = campaniasDao;
            _carterasDao = carterasDao;
        }

        public async Task<List<object>> GetCarteras(string servidor, string tipobase)
        {
            var context = _dbContFactory.GetDbContext(servidor, tipobase);

            var resultados = await EntityTypeHelper.GetFullEntityTable(context, "VwCarterasActiva");

            return resultados;
        }

        public async Task<List<object>> GetCarterasProductos(string servidor, string tipobase)
        {
            var context = _dbContFactory.GetDbContext(servidor, tipobase);

            var resultados = await EntityTypeHelper.GetFullEntityTable(context, "VwCarterasProductos");

            return resultados;
        }
        public async Task<IEnumerable<dynamic>?> FilasRestantesPorCampaña(string servidor)
        {
            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");

            var connection = (SqlConnection)dbContext.Database.GetDbConnection();

            var result = await _daoBase.ExecuteStoredProcedureAsList(
                connection,
                "[AMS].[FilasRestantesPorCampaña]"
            );

            return result;
        }

        //Metodo para calcular el avance de la campaña
      public async Task<List<CampañaAvanceDTO>> GetAvanceCompletoCampañas(string servidor, int? idEncargado = null, short? idCartera = null, short? idProducto = null)
{
    var campañas = await _campaniasDao.GetCampañasEncargado(servidor, idEncargado, idCartera, idProducto);
    var restantesList = await FilasRestantesPorCampaña(servidor);


    // 1. Verificar campañas
    var idsCampañas = new List<int>();
    if (campañas != null)
    {
        foreach (var campaña in campañas)
        {
            var dict = campaña as IDictionary<string, object>;
            if (dict != null && dict.ContainsKey("idCampaña"))
            {
                int id = Convert.ToInt32(dict["idCampaña"]);
                idsCampañas.Add(id);
                Console.WriteLine($"Campaña encontrada: {id}");
            }
        }
    }

    // 2. Verificar restantes
    var restantesDict = new Dictionary<int, int>();
    if (restantesList != null)
    {
        foreach (var item in restantesList)
        {
            var dict = item as IDictionary<string, object>;
            if (dict != null && dict.ContainsKey("idCampaña") && dict.ContainsKey("Restantes"))
            {
                int idCampaña = Convert.ToInt32(dict["idCampaña"]);
                int restantes = Convert.ToInt32(dict["Restantes"]);
                restantesDict[idCampaña] = restantes;
                Console.WriteLine($"Restante encontrado: idCampaña={idCampaña}, restantes={restantes}");
            }
        }
    }

    foreach (var idCampaña in idsCampañas)
    {
        bool tieneRestantes = restantesDict.ContainsKey(idCampaña);
        int valorRestantes = restantesDict.GetValueOrDefault(idCampaña);
        Console.WriteLine($"Campaña {idCampaña}: TieneRestantes={tieneRestantes}, Valor={valorRestantes}");
    }

    var resultado = new List<CampañaAvanceDTO>();

    if (campañas != null)
    {
        foreach (var campaña in campañas)
        {
            var dict = campaña as IDictionary<string, object>;
            if (dict != null && dict.ContainsKey("idCampaña"))
            {
                int idCampaña = Convert.ToInt32(dict["idCampaña"]);
                
                double dCuentas = 0;
                if (dict.ContainsKey("NúmeroCuentas"))
                {
                    var valor = dict["NúmeroCuentas"];
                    dCuentas = valor != DBNull.Value ? Convert.ToDouble(valor) : 0;
                }

                double dRestantes = restantesDict.GetValueOrDefault(idCampaña);

                if (dRestantes >= dCuentas)
                {
                    dCuentas = dRestantes;
                }

                string avance = "";
                if (dCuentas > 0)
                {
                    double porcentaje = (dCuentas - dRestantes) / dCuentas * 100;
                    double procesadas = dCuentas - dRestantes;
                    avance = $"{porcentaje:N1} % - {procesadas:N0}";
                }

                resultado.Add(new CampañaAvanceDTO
                {
                    idCampaña = idCampaña,
                    NumeroCuentas = (int)dCuentas,
                    Restantes = (int)dRestantes,
                    Avance = avance
                });
            }
        }
    }

    foreach (var item in resultado)
    {

    }

    return resultado;
}        
        
    public async Task<dynamic?> CargaFilas(int idcampaña, int idcartera, string servidor)
        {
            var paramIdCampaña = new SqlParameter("@idCampaña", idcampaña.ToString());
            var paramIdCartera = new SqlParameter("@idCartera", idcartera.ToString());

            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");

            var result = await _daoBase.ExecuteStoredProcedure(
                dbContext,
                "[AMS].[CargaFilas]",
                paramIdCampaña,
                paramIdCartera
            );
            return result;
        }


        public async Task<List<Dictionary<string, object>>> Top100Filas(int idCampaña, string servidor)
        {
            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");
            var connection = dbContext.Database.GetDbConnection();
            using var command = connection.CreateCommand();
            command.CommandText = "[AMS].[Top100Filas]";
            command.CommandType = CommandType.StoredProcedure;

            var paramIdCampaña = new SqlParameter("@idCampaña", SqlDbType.Int)
            {
                Value = idCampaña
            };
            command.Parameters.Add(paramIdCampaña);
            if (connection.State != ConnectionState.Open)
               await connection.OpenAsync();
            var resultado = new List<Dictionary<string, object>>();

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                var fila = new Dictionary<string, object>();
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    fila[reader.GetName(i)] = reader.IsDBNull(i) ? null : reader.GetValue(i);
                }
                resultado.Add(fila);
            }
            return resultado;
        }

        public async Task<IEnumerable<dynamic>?> EjecutivoDeCampaña(int idCampaña, string servidor)
        {
            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");

            var connection = (SqlConnection)dbContext.Database.GetDbConnection();

            var result = await _daoBase.ExecuteStoredProcedureAsList(
                connection,
                "[AMS].[EjecutivosEnCampaña]",
                new { idCampaña } 
            );

            return result;
        }

        //carga filas desde consulta

        public async Task<ResultadoCarga> CargarFilasDesdeConsulta(
           string servidor, int idCampania, int? idConsulta,
           string? consultaGeneral, bool incluirUsuario, bool incluirTelefono, int idCartera)
        {
            try
            {
                await ConsultaGenerador.CargarDesdeBDAsync(_dbContFactory, servidor);

                dynamic? resultado;

                if (!string.IsNullOrEmpty(consultaGeneral))
                {
                    // Ejecuta consulta general directamente
                    resultado = await _carterasDao.CargaFilasConsulta(
                        idCampania, consultaGeneral, incluirUsuario, incluirTelefono, servidor);
                }
                else if (idConsulta.HasValue)
                {
                    // Obtener la consulta desde ConsultaGenerador
                    var consultaRow = ConsultaGenerador.ObtenerConsulta(idConsulta.Value);
                    if (consultaRow == null)
                        throw new Exception($"No se encontró la consulta con ID {idConsulta.Value}");

                    // Usar el método PreparaQueryBúsqueda para generar el query correctamente
                    var parametros = AccionamientosQueryHelper.Ejecutivo1.TablaParámetros;
                    var agrupar = AccionamientosQueryHelper.Ejecutivo1.TablaAgrupar;

                    parametros.Rows.Clear();
                    agrupar.Rows.Clear();

                    // Agregar parámetros básicos
                    parametros.Rows.Add("idCartera", "=", idCartera.ToString(), "AND", "int");

                    if (incluirUsuario)
                        agrupar.Rows.Add("Usuario", "Gestiones");
                    if (incluirTelefono)
                        agrupar.Rows.Add("Teléfono", "Teléfonos");

                    // Generar el query usando PreparaQueryBúsqueda
                    int idProducto = Convert.ToInt32(consultaRow["idProducto"]);
                    DateTime desde = DateTime.Today.AddMonths(-1); 

                    string query = ConsultaGenerador.PreparaQueryBúsqueda(
                        idProducto,
                        parametros,
                        agrupar,
                        Resultado.Cuentas,
                        desde,
                        idCartera
                    );

                    if (string.IsNullOrEmpty(query))
                        throw new Exception("No se pudo generar el query para la consulta");

                    resultado = await _carterasDao.CargaFilasConsulta(
                        idCampania, query, incluirUsuario, incluirTelefono, servidor);
                }
                else
                {
                    throw new ArgumentException("Se debe proporcionar IdConsulta o ConsultaGeneral");
                }

                return new ResultadoCarga
                {
                    FilasCargadas = Convert.ToInt32(resultado)
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al cargar consulta: {ex.Message}", ex);
            }
        }

        //carga filas desde archivo
        public async Task<ResultadoCarga> CargarFilasDesdeArchivo(string servidor, int idCampania, int? idCartera, IFormFile archivo)
        {
            try
            {
                // 1. Crear tabla temporal 
                await _carterasDao.CreaTablaFilasTemp(idCampania, servidor);

                // 2. Procesar archivo Excel y hacer bulk insert
                var totalRegistros = await ProcesarArchivoExcelYBulkInsert(archivo, servidor, idCampania);

                // 3. Cargar filas desde tabla temporal 
                var filasCargadas = await _carterasDao.CargaFilas(idCampania, idCartera ?? 0, servidor);

                return new ResultadoCarga
                {
                    FilasCargadas = Convert.ToInt32(filasCargadas),
                    TotalRegistros = totalRegistros
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error al cargar archivo: {ex.Message}", ex);
            }
        }

       

        public async Task<int> ProcesarArchivoExcelYBulkInsert(IFormFile archivo, string servidor, int idCampania)
        {
            // Validar tipo de archivo
            var extension = Path.GetExtension(archivo.FileName).ToLower();
            if (extension != ".xlsx" && extension != ".xls")
            {
                throw new InvalidOperationException("Solo se permiten archivos Excel (.xlsx, .xls)");
            }

            // Validar tamaño del archivo (máximo 50MB)
            if (archivo.Length > 50 * 1024 * 1024)
            {
                throw new InvalidOperationException("El archivo no puede ser mayor a 50MB");
            }

            using var stream = new MemoryStream();
            await archivo.CopyToAsync(stream);

            using var workbook = new XLWorkbook(stream);
            var worksheet = workbook.Worksheet(1); 

            // Leer datos del Excel
            var dataTable = LeerExcelADataTable(worksheet);

            // Validar que el archivo tenga datos
            if (dataTable.Rows.Count == 0)
            {
                throw new InvalidOperationException("El archivo Excel no contiene datos");
            }

            // Realizar bulk insert usando DbContext
            await RealizarBulkInsert(dataTable, servidor, idCampania);

            return dataTable.Rows.Count;
        }

        private DataTable LeerExcelADataTable(IXLWorksheet worksheet)
        {
            var dataTable = new DataTable();

            // Leer encabezados (primera fila)
            var headerRow = worksheet.FirstRow();
            bool hasHeaders = false;

            foreach (var cell in headerRow.CellsUsed())
            {
                var headerName = cell.Value.ToString();
                if (!string.IsNullOrWhiteSpace(headerName))
                {
                    dataTable.Columns.Add(headerName.Trim());
                    hasHeaders = true;
                }
            }

            // Si no hay encabezados válidos, usar nombres genéricos
            if (!hasHeaders)
            {
                for (int i = 0; i < headerRow.CellsUsed().Count(); i++)
                {
                    dataTable.Columns.Add($"Columna{i + 1}");
                }
            }

            // Leer datos (empezando desde la segunda fila)
            var dataRows = worksheet.RowsUsed().Skip(1);
            foreach (var row in dataRows)
            {
                var dataRow = dataTable.NewRow();
                for (int i = 0; i < dataTable.Columns.Count; i++)
                {
                    var cellValue = row.Cell(i + 1).Value;
                    dataRow[i] = cellValue.ToString();
                }
                dataTable.Rows.Add(dataRow);
            }

            return dataTable;
        }

        private async Task RealizarBulkInsert(DataTable dataTable, string servidor, int idCampania)
        {

            using var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");

            var connection = dbContext.Database.GetDbConnection();

            var shouldCloseConnection = connection.State != ConnectionState.Open;

            if (shouldCloseConnection)
            {
                await connection.OpenAsync();
            }

            try
            {
                using var bulkCopy = new SqlBulkCopy((SqlConnection)connection)
                {
                    DestinationTableName = $"AMS.FilasTemp_{idCampania}",
                    BulkCopyTimeout = 30 * 60, 
                    BatchSize = 1000 
                };

                foreach (DataColumn column in dataTable.Columns)
                {
                    bulkCopy.ColumnMappings.Add(column.ColumnName, column.ColumnName);
                }

                await bulkCopy.WriteToServerAsync(dataTable);
            }
            finally
            {
                if (shouldCloseConnection)
                {
                    await connection.CloseAsync();
                }
            }
        }
    
    }
}

