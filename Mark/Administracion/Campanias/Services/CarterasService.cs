using System.Data;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.CampaniasDTOs;
using Loki.Mark.Administracion.Campanias.Interfaces;
using Loki.Mark.Administracion.Carteras.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
namespace Loki.Mark.Administracion.Carteras.Services
{
    public class CarterasService : ICarterasService
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;
        private readonly ICampaniasDao _campaniasDao;

        public CarterasService(IServiceProvider serviceProvider, DaoBase daoBase, ICampaniasDao campaniasDao)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = daoBase;
            _campaniasDao = campaniasDao;
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

            var restantesDict = new Dictionary<int, int>();
            if (restantesList != null)
            {
                foreach (var item in restantesList)
                {
                    var dict = item as IDictionary<string, object>;
                    if (dict != null && dict.ContainsKey("idCampaña") && dict.ContainsKey("restantes"))
                    {
                        int idCampaña = Convert.ToInt32(dict["idCampaña"]);
                        int restantes = Convert.ToInt32(dict["restantes"]);
                        restantesDict[idCampaña] = restantes;
                    }
                }
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
                        string[] posiblesColumnas = { "NúmeroCuentas", "NumeroCuentas", "Cuentas", "TotalCuentas" };

                        foreach (var columna in posiblesColumnas)
                        {
                            if (dict.ContainsKey(columna))
                            {
                                dCuentas = Convert.ToDouble(dict[columna]);
                                break;
                            }
                        }

                        double dRestantes = restantesDict.GetValueOrDefault(idCampaña);

                        if (dCuentas == 0 && dRestantes > 0)
                        {
                            dCuentas = dRestantes;
                        }

                        // Calcular avance
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

        //public async Task<IEnumerable<dynamic>?> top100filas(int idcampaña, string servidor)
        //{
        //    using var conn = _dbContFactory.GetSqlConnection(servidor, "memory");
        //    await conn.OpenAsync();
        //    const string storedprocedurename = "[ams].[top100filas]";
        //    return await conn.QueryAsync(
        //        storedprocedurename,
        //        param: new { idcampaña = idcampaña },
        //        commandType: System.Data.CommandType.StoredProcedure
        //    );
        //}

        public async Task<List<Dictionary<string, object>>> Top100Filas(int idCampaña, string servidor)
        {
            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");
            var connection = dbContext.Database.GetDbConnection();
            using var command = connection.CreateCommand();
            command.CommandText = "[AMS].[Top100Filas]";
            command.CommandType = CommandType.StoredProcedure;
            // Agrega el parámetro
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
                new { idCampaña } // Pasar el parámetro al stored procedure
            );

            return result;
        }
    }
}
