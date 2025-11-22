using CoorinWeb.Loki.Global;
using Dapper;
using Loki.Mark.Procesos.Gestiones.Interfaces;
using Microsoft.Data.SqlClient;
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

            var resultados = await sqlConnection.QueryAsync<object>(sql, parameters);
            return resultados?.ToList() ?? new List<object>();
        }
        #endregion



        #region consultaGestiones
        public async Task<List<object>> RealizaBusqueda(string servidor, int idCartera, DateTime fechaInicial,DateTime fechaFinal,int jerarquia,  int? idProducto = null )
        {
            // --- 1. Validación ---
            if (jerarquia < 1)
            {
                throw new UnauthorizedAccessException("Carece de permisos para consultar las gestiones.");
            }

            using var conn = _dbContFactory.GetSqlConnection(servidor, "Collection");
            await conn.OpenAsync();

            string query = "SELECT * FROM dbComplemento.dbo.fn_Gestiones(@idCartera, @FechaInicial, @FechaFinal)";

            using var cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@idCartera", idCartera);
            cmd.Parameters.AddWithValue("@FechaInicial", fechaInicial);
            cmd.Parameters.AddWithValue("@FechaFinal", fechaFinal);

            if (idProducto.HasValue)
            {
                // cmd.Parameters.AddWithValue("@idProducto", idProducto.Value);
            }

            using var reader = await cmd.ExecuteReaderAsync();
            var resultados = new List<object>();

            while (await reader.ReadAsync())
            {
                var row = new Dictionary<string, object>();
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    row[reader.GetName(i)] = reader.GetValue(i);
                }
                resultados.Add(row);
            }

            return resultados;
        }


        #endregion

        #region editar Gestiones
        public async Task<List<object>> buscarGestiones(string servidor, int idCartera, string idCuenta)
        {
            using var conn = _dbContFactory.GetSqlConnection(servidor, "Collection");

            var sql = @"
            SELECT G.Fecha, G.Hora, Contacto.Valor Contacto, Situación.Valor Situación, 
                   E.NombreEjecutivo Ejecutivo, G.Comentario 
            FROM (
                SELECT idCartera, idCuenta, Fecha_Insert Fecha, Segundo_Insert Hora, 
                       idEjecutivo, idContacto, idSituación, Comentario 
                FROM dbo.GestionesTelefónicas
                UNION ALL
                SELECT idCartera, idCuenta, Fecha_Insert Fecha, Segundo_Insert Hora, 
                       idEjecutivo, idContacto, idSituación, Comentario 
                FROM dbo.GestionesChat
            ) G
            INNER JOIN dbCollection..Ejecutivos E ON G.idEjecutivo = E.idEjecutivo
            LEFT JOIN dbCollection..ValoresCatálogo Contacto ON G.idContacto = Contacto.idValor
            LEFT JOIN dbCollection..ValoresCatálogo Situación ON G.idSituación = Situación.idValor
            WHERE G.idCartera = @idCartera AND G.idCuenta = @idCuenta";

            var parameters = new { idCartera, idCuenta };

            return (await conn.QueryAsync<object>(sql, parameters)).ToList();
        }


        #endregion
    }
}
