using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.DTOs.GeneralesDTOs;
using Loki.Global;
using Loki.Mark.Consulta.Generales.Interfaces;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Consulta.Generales.Services
{
    public class GeneralesServices: IGenerales
    {
        private readonly IDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;
        private readonly EjecutivoDao _ejecutivoDao;
        private readonly ExcelGeneratorService _excelGeneratorService; 
        private readonly AccionamientosQueryHelper _accionamientosQueryHelper;
        public GeneralesServices(IDbContextFactory dbContFactory, DaoBase daoBase, EjecutivoDao ejecutivoDao, ExcelGeneratorService excelGeneratorService, AccionamientosQueryHelper accionamientosQueryHelper)
        {
            _dbContFactory = dbContFactory;
            _daoBase = daoBase;
            _ejecutivoDao = ejecutivoDao;
            _excelGeneratorService = excelGeneratorService;
            this._accionamientosQueryHelper = accionamientosQueryHelper;
        }

        public async Task<List<HerramientaDTO>> CargaHerramienta(int idCartera, string servidor)
        {
            var lista = new List<HerramientaDTO>();

            using (var connection = _dbContFactory.GetSqlConnection(servidor, "collection"))
            {
                await connection.OpenAsync();

                string query = @"
            SELECT H.idHerramienta, P.Producto + ' ' + H.Nombre AS Herramienta
            FROM dbCollection..Herramientas H (NOLOCK)
            INNER JOIN dbCollection..Productos P (NOLOCK) ON P.idProducto = H.idProducto
            WHERE P.idCartera = @IdCartera";

                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@IdCartera", idCartera);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            lista.Add(new HerramientaDTO
                            {
                                IdHerramienta = reader.GetInt16(reader.GetOrdinal("idHerramienta")),
                                Herramienta = reader["Herramienta"] as string
                            });
                        }
                    }
                }
            }

            return lista;
        }

        public async Task<List<string>> CargaMunicipios(int idCartera, string servidor)
        {
            var municipios = new List<string>();

            using (var connection = _dbContFactory.GetSqlConnection(servidor, "collection"))
            {
                await connection.OpenAsync();

                string query = @"
            SELECT municipio
            FROM telefonos t
            INNER JOIN cuentas c ON t.idcartera = c.idcartera AND c.idcuenta = t.idcuenta
            WHERE c.idcartera = @IdCartera AND c.cuentaactiva = 1
            GROUP BY municipio";

                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@IdCartera", idCartera);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            municipios.Add(reader["municipio"] as string);
                        }
                    }
                }
            }

            return municipios;
        }

    }
}
