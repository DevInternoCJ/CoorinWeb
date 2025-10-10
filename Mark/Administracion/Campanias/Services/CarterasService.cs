using System.Collections;
using System.Data;
using System.Globalization;
using System.Text;
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
        private readonly ILogger<CarterasService> _logger;
        private readonly DaoBase _daoBase;
        private readonly ICampaniasDao _campaniasDao;
        private readonly ICarterasDAOs _carterasDao;

        public CarterasService(IServiceProvider serviceProvider, DaoBase daoBase, ICampaniasDao campaniasDao, ICarterasDAOs carterasDao, ILogger<CarterasService> logger)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = daoBase;
            _campaniasDao = campaniasDao;
            _carterasDao = carterasDao;
            _logger = logger;
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
            if (archivo == null || archivo.Length == 0)
                throw new InvalidOperationException("No se proporcionó archivo o está vacío");

            var ext = Path.GetExtension(archivo.FileName).ToLower();
            if (ext != ".xlsx" && ext != ".xls")
                throw new InvalidOperationException("Solo se permiten archivos Excel (.xlsx, .xls)");

            // Crear tabla temporal
            await _carterasDao.CreaTablaFilasTemp(idCampania, servidor);

            // Leer Excel a DataTable
            var dt = LeerExcelADataTable(archivo);

            var colsEsperadas = new[] { "idCuenta", "Usuario", "NúmeroTelefónico" };

            _logger.LogInformation("Columnas leídas del Excel: {Excel}", string.Join(", ", dt.Columns.Cast<DataColumn>().Select(c => c.ColumnName)));

    
            var colsExcel = dt.Columns.Cast<DataColumn>().Select(c => NormalizarColumna(c.ColumnName)).ToList();


            foreach (var col in colsEsperadas)
            {
                if (!colsExcel.Contains(NormalizarColumna(col)))
                    _logger.LogError("No se encontró la columna esperada: {ColumnaEsperada}", col);
            }

            foreach (var col in colsEsperadas)
            {
                if (!colsExcel.Contains(NormalizarColumna(col)))
                    throw new InvalidOperationException($"El archivo Excel no contiene la columna requerida: {col}");
            }

            // Bulk insert
            await RealizarBulkInsert(dt, servidor, idCampania, colsEsperadas);

            // Cargar filas desde tabla temporal
            var filasCargadasResult = await _carterasDao.CargaFilas(idCampania, idCartera ?? 0, servidor);


            int filasCargadasInt = 0;

            if (filasCargadasResult is IEnumerable<Dictionary<string, object>> list && list.Any())
            {
                var firstRow = list.First();
                if (firstRow.ContainsKey("FilasCargadas") && firstRow["FilasCargadas"] != null)
                    filasCargadasInt = Convert.ToInt32(firstRow["FilasCargadas"]);
            }

            return new ResultadoCarga
            {
                FilasCargadas = filasCargadasInt,
                TotalRegistros = dt.Rows.Count
            };

        }

        // Leer Excel a DataTable desde IFormFile
        private DataTable LeerExcelADataTable(IFormFile archivo)
        {
            using var stream = new MemoryStream();
            archivo.CopyTo(stream);
            using var workbook = new XLWorkbook(stream);
            var ws = workbook.Worksheet(1);
            var dt = new DataTable();

            // Encabezados
            foreach (var c in ws.FirstRow().CellsUsed())
                dt.Columns.Add(c.Value.ToString().Trim());

            // Filas
            foreach (var r in ws.RowsUsed().Skip(1))
            {
                var dr = dt.NewRow();
                for (int i = 0; i < dt.Columns.Count; i++)
                    dr[i] = r.Cell(i + 1).Value.ToString() ?? "";
                dt.Rows.Add(dr);
            }
            return dt;
        }


        private async Task RealizarBulkInsert(DataTable dt, string servidor, int idCampania, string[] columnasDestino)
        {
            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");
            var conn = dbContext.Database.GetDbConnection();
            if (conn.State != ConnectionState.Open) await conn.OpenAsync();

            try
            {
                using var bulk = new SqlBulkCopy((SqlConnection)conn)
                {
                    DestinationTableName = $"AMS.FilasTemp_{idCampania}",
                    BulkCopyTimeout = 1800,
                    BatchSize = 1000
                };

                foreach (DataColumn col in dt.Columns)
                {
                    var match = columnasDestino.FirstOrDefault(c => NormalizarColumna(c) == NormalizarColumna(col.ColumnName));
                    if (match != null)
                        bulk.ColumnMappings.Add(col.ColumnName, match);
                    else
                        _logger.LogWarning("Columna Excel '{ColumnaExcel}' no tiene mapeo en tabla destino", col.ColumnName);
                }

                _logger.LogInformation("Columnas destino: {Destino}", string.Join(", ", columnasDestino));
                await bulk.WriteToServerAsync(dt);
                _logger.LogInformation("Bulk insert completado para AMS.FilasTemp_{IdCampania}", idCampania);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error durante BulkInsert: {Mensaje}", ex.Message);
                throw;
            }
            finally
            {
                if (conn.State == ConnectionState.Open) await conn.CloseAsync();
            }
        }

        private string NormalizarColumna(string columna)
        {
            if (string.IsNullOrWhiteSpace(columna)) return string.Empty;
            var normalized = columna.Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder();
            foreach (var c in normalized)
                if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                    sb.Append(c);
            return sb.ToString().Replace(" ", "").ToLower();
        }


    }
}

