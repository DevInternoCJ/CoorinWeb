using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.DTOs.EncargadosDTOs;
using Loki.DTOs.ScriptsDTOs;
using Loki.Mark.Administracion.Ejecutivos.Encargados.Interfaces;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Administracion.Ejecutivos.Encargados.DAOs
{
    public class EncargadosDao : IEncargadosDao
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;

        public EncargadosDao(CustomDbContextFactory dbContFactory)
        {
            _dbContFactory = dbContFactory;
            _daoBase = new DaoBase();
        }

        public async Task<dynamic?> CambiaEncargadoEjecutivo(string servidor, CambiaEncargadoDto request)
        {
            const string tipoBase = "Collection";
            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            var nombreSp = "[dbCollection].[dbo].[1.6.CambiaEncargadoEjecutivo]";

            return await _daoBase.ExecuteStoredProcedure(
                        sqlConnection,
                        nombreSp,
                new SqlParameter("@idEncargado", request.IdEncargado),
                new SqlParameter("@idEjecutivo", request.IdEjecutivo),
                new SqlParameter("@idCartera", request.IdCartera),
                new SqlParameter("@idProducto", request.IdProducto)
            );

        }

    }
}