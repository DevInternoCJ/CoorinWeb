using CoorinWeb.Loki.Global;
using Dapper;
using Loki.Mark.Procesos.Procesos.Interfaces;
using Microsoft.Identity.Client;
using System.Data;

namespace Loki.Mark.Procesos.Procesos.Services
{
    public class SupervisorService: ISupervisorService
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

        public async Task<List<object>> obtieneCuentas(string servidor, int idCartera, DateTime fechaDesde, DateTime fechaHasta)
        {
            using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "Collection");

            string sql = @"
            SELECT  
                C.idCuenta AS Cuenta,
                C.NombreDeudor AS Nombre,
                CONCAT(Car.Abreviación, C.Expediente) AS Expediente,
                V.Valor AS Situación,
                C.Saldo AS Monto,
                E.NombreEjecutivo AS Supervisor,
                Com.Comentario,
                R.Realizado
            FROM Revisiones R 
            LEFT JOIN Comentarios Com ON Com.idCartera = R.idCartera
                                    AND Com.idCuenta = R.idCuenta
                                    AND Com.Fecha_Insert = R.Fecha
                                    AND Com.idEjecutivo = R.idEjecutivo 
            INNER JOIN Cuentas C ON R.idCuenta = C.idCuenta AND R.idCartera = C.idCartera 
            INNER JOIN ValoresCatálogo V ON V.idValor = C.idSituación 
            INNER JOIN Carteras Car ON Car.idCartera = R.idCartera 
            INNER JOIN Ejecutivos E ON E.idEjecutivo = R.idEjecutivo
            WHERE R.idCartera = @idCartera 
                AND R.Fecha BETWEEN @fechaDesde AND @fechaHasta";

            var parameters = new
            {
                idCartera,
                fechaDesde,
                fechaHasta
            };

            if (sqlConnection.State != ConnectionState.Open)
                await sqlConnection.OpenAsync();

            var resultados = await sqlConnection.QueryAsync(sql, parameters);
            return resultados.ToList();
        }

    }
}
