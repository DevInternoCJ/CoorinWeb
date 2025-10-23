using Microsoft.Data.SqlClient;
using System.Data;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth;
using Loki.Mark.Administracion.Gespa.Frases.Interfaces;
using Loki.DTOs.FrasesDTOs;
using static CoorinWeb.Loki.Global.EntityTypeHelper;

namespace Loki.Mark.Administracion.Gespa.Frases.DAOs
{
	public class FrasesDao : IFrases
	{
		private readonly CustomDbContextFactory _dbContFactory;
		public FrasesDao(CustomDbContextFactory dbContFactory)
		{
			_dbContFactory = dbContFactory ?? throw new ArgumentNullException(nameof(dbContFactory));
		}


        public async Task<bool> GuardaFrasesAsync(FrasesDTO pFrases, string servidor)
        {
            if (string.IsNullOrEmpty(pFrases.TextoFrase))
                throw new ArgumentException("Introduce una frase por favor. La frase no puede estar vacía.");

            const string tipoBase = "Collection";

            if (servidor?.Contains('_') == true)
                throw new ArgumentException($"Servidor '{servidor}' inválido.");

            using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);
            await sqlConnection.OpenAsync();

            string sqlCommand = "EXEC [dbo].[GuardaFrasesMotivacionales] @idEjecutivo, @idCartera, @idProducto, @Texto";
            using var cmd = new SqlCommand(sqlCommand, sqlConnection);

            cmd.Parameters.Add("@idEjecutivo", SqlDbType.Int).Value = pFrases.IdEjecutivo ?? (object)DBNull.Value;
            cmd.Parameters.Add("@idCartera", SqlDbType.Int).Value = pFrases.IdCartera ?? (object)DBNull.Value;
            cmd.Parameters.Add("@idProducto", SqlDbType.Int).Value = pFrases.IdProducto ?? (object)DBNull.Value;
            cmd.Parameters.Add("@Texto", SqlDbType.NVarChar).Value = pFrases.TextoFrase ?? (object)DBNull.Value;

            int rowsAffected = await cmd.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }


        public async Task<int> ActivarFrase(string servidor, int idRegistro, bool activo)
        {
            var contextCollection = _dbContFactory.GetDbContext(servidor, "Collection");

            var entityType = EntityTypeHelper.GetModelTypeByContext(contextCollection, "FrasesMotivacion");

            var filtros = new List<DynamicFilter>
            {
                new DynamicFilter
                {
                    Campo = "IdRegistro", 
                    Operador = "=",
                    Valor = idRegistro
                }
            };
                    var camposActualizados = new Dictionary<string, object?>
            {
                { "FraseActiva", activo }
            };

            return await EntityTypeHelper.UpdateMultipleEntitiesAsync(
                contextCollection,
                entityType,
                filtros,
                camposActualizados
            );
        }
    }
}
