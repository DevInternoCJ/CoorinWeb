using CoorinWeb.Loki.Global;
using Dapper;
using Loki.Mark.Procesos.Procesos.Interfaces;
using Microsoft.Identity.Client;
using System.Data;

namespace Loki.Mark.Procesos.Procesos.Services
{
    public class SupervisorService: ISupervisor
    {
        private readonly CustomDbContextFactory _dbContFactory;

        public SupervisorService(IServiceProvider serviceProvider)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);

        }

        public async Task<List<object>> obtieneSupervisores(string servidor, int idCartera)
        {
            using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "Collection");

            string sql = @"
        SELECT  
            Cast(0 as Bit) Asignar,
            E.idEjecutivo,
            E.Usuario,
            E.NombreEjecutivo,
            M.Segmento
        FROM dbo.Ejecutivos E 
        LEFT JOIN dbo.MetasEjecutivo M ON M.idEjecutivo = E.idEjecutivo 
        WHERE E.idCartera = @idCartera 
            AND E.Jerarquía >= 1 
            AND E.idÁrea = 1204";

            var parameters = new { idCartera };

            if (sqlConnection.State != ConnectionState.Open)
                await sqlConnection.OpenAsync();

            var resultados = await sqlConnection.QueryAsync<dynamic>(sql, parameters);
            return resultados.Cast<object>().ToList();
        }


       
    }
}
