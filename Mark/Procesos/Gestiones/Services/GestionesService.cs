using CoorinWeb.Loki.Global;
using Dapper;
using Loki.Mark.Procesos.Gestiones.Interfaces;
using System.Data;

namespace Loki.Mark.Procesos.Gestiones.Services
{
    public class GestionesService: IGestionesService
    {
        private readonly CustomDbContextFactory _dbContFactory;

        public GestionesService(IServiceProvider serviceProvider)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);

        }
        #region editarComentario
        public async Task<List<object>> buscaComentarios(string servidor, int idCartera, string cuenta)
        {
            using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "Collection");

            string sql = @"
            SELECT  
                C.idCuenta AS Cuenta,
                Car.Cartera AS Cartera,
                C.Fecha_Insert AS Fecha,
                C.Segundo_Insert AS Hora,
                C.Comentario,
                E.NombreEjecutivo,
                C.idEjecutivo AS ClaveEjecutivo
            FROM dbo.Comentarios C 
            INNER JOIN dbo.Carteras Car ON Car.idCartera = C.idCartera 
            INNER JOIN dbo.Ejecutivos E ON E.idEjecutivo = C.idEjecutivo 
            WHERE C.idCartera = @idCartera 
            AND C.idCuenta = @cuenta";

            var parameters = new { idCartera, cuenta };

            if (sqlConnection.State != ConnectionState.Open)
                await sqlConnection.OpenAsync();

            var resultados = await sqlConnection.QueryAsync(sql, parameters);

            if (resultados == null || !resultados.Any())
            {
                return new List<object>();
            }

            return resultados.ToList();
        }
        #endregion



        #region consultaGestiones
        public async Task<List<object>> buscaGestiones(string servidor, int idCartera, DateTime fechaInicial, DateTime fechaFinal)
        {
            using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "Collection");

            string sql = @"
            WAITFOR DELAY '00:00:00'; 
            SELECT * FROM dbComplemento.dbo.fn_Gestiones(@idCartera, @FechaInicial, @FechaFinal)";

            var parameters = new
            {
                idCartera,
                FechaInicial = fechaInicial,
                FechaFinal = fechaFinal
            };

            if (sqlConnection.State != ConnectionState.Open)
                await sqlConnection.OpenAsync();

            var resultados = await sqlConnection.QueryAsync(sql, parameters);

            if (resultados == null || !resultados.Any())
            {
                return new List<object>();
            }

            return resultados.ToList();
        }
        #endregion
    }
}
