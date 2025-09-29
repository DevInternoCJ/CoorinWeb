using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.AuditoriaDTOs;
using Loki.DTOs.EncargadosDTOs;
using Loki.Mark.Auditoria.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Loki.Mark.Auditoria.DAOs
{
    public class AuditoriaDao : IAuditoriaDao
    {
        public AuditoriaDao(CustomDbContextFactory dbContFactory)
        {
            _dbContFactory = dbContFactory;
            _daoBase = new DaoBase();
        }

        public async Task<IEnumerable<AuditoriaDetalleDto>> ObtenerPaginadoAsync(AuditoriaFilterDto parametros, string servidor)
        {
            int skip = (parametros.PageNumber - 1) * parametros.PageSize;

            var sql = @"
                        SELECT *
                        FROM (
                            SELECT *,
                                   ROW_NUMBER() OVER (ORDER BY idCuenta) AS RowNum
                            FROM dbHistory..fn_Auditoría_Detalle(@iCartera, @iProducto, @Desde, @Hasta)
                        ) AS Paged
                        WHERE RowNum > @Skip AND RowNum <= (@Skip + @Take)";

            var param = new
            {
                parametros.IdCartera,
                parametros.IdProducto,
                parametros.Desde,
                parametros.Hasta,
                Skip = skip,
                Take = parametros.PageSize
            };

            using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "History");

            return await sqlConnection.QueryAsync<AuditoriaDetalleDto>(sql, param);
        }

        public async Task<int> ContarTotalAsync(AuditoriaFilterDto parametros, string servidor)
        {
            const string tipoBase = "Collection";
            using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);
            var sql = @"SELECT COUNT(*) FROM dbHistory..fn_Auditoría_Detalle(@iCartera, @iProducto, @Desde, @Hasta)";



            return await sqlConnection.ExecuteScalarAsync<int>(sql, parametros);
        }

        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;



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
