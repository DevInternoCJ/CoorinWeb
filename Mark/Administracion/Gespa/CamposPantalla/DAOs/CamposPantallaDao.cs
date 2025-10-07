using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.DTOs.CamposPantallaDTOs;
using Loki.DTOs.EncargadosDTOs;
using Loki.Mark.Administracion.Gespa.CamposPantalla.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Loki.Mark.Administracion.Gespa.CamposPantalla.DAOs
{
	public class CamposPantallaDao : ICamposPantallaDao
	{
		private readonly CustomDbContextFactory _dbContFactory;
		private readonly DaoBase _daoBase;

		public CamposPantallaDao(CustomDbContextFactory dbContFactory)
		{
			_dbContFactory = dbContFactory;
			_daoBase = new DaoBase();
		}

		public async Task<dynamic?> CambiaEncargadoEjecutivo(string servidor, CambiaEncargadoDto request)
		{
			const string tipoBase = "Collection";
			var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

			var nombreSp = "[dbo].[6.9.CambiaEncargadoEjecutivo]";

			return await _daoBase.ExecuteStoredProcedure(
						sqlConnection,
						nombreSp,
				new SqlParameter("@idEncargado", request.IdEncargado),
				new SqlParameter("@idEjecutivo", request.IdEjecutivo),
				new SqlParameter("@idCartera", request.IdCartera),
				new SqlParameter("@idProducto", request.IdProducto)
			);

		}

		public async Task<int?> ObtenerObjectIdTablaAsync(string servidor, string nombreTabla)
		{
			var context = _dbContFactory.GetDbContext(servidor, "Collection");

			using var command = context.Database.GetDbConnection().CreateCommand();

			command.CommandText = @"
			SELECT object_id 
			FROM sys.objects 
			WHERE name = @nombreTabla AND type IN ('U')";

			var parametro = command.CreateParameter();
			parametro.ParameterName = "@nombreTabla";
			parametro.Value = nombreTabla;
			command.Parameters.Add(parametro);

			if (command.Connection.State != System.Data.ConnectionState.Open)
				await command.Connection.OpenAsync();

			var resultado = await command.ExecuteScalarAsync();

			return resultado != null && resultado != DBNull.Value ? Convert.ToInt32(resultado) : null;
		}


		/// <summary>
		/// Guarda un único campo de pantalla usando una transacción existente.
		/// </summary>
		public async Task<bool> GuardaCampoPantalla(CampoPantallaDto dto, SqlConnection connection, SqlTransaction transaction)
		{
			string sqlQuery;

			if (!dto.Editar)
			{
				sqlQuery = @"
                    INSERT INTO dbCollection..CamposPantalla (idEjecutivo, Fecha_Update, idProducto, Posición, AliasCampo, NombreCampo, idFormatoCampo, Resaltado)
                    VALUES (@IdEjecutivo, GETDATE(), @idProducto, @Posicion, @Alias, @NombreCampo, @FormatoCampo, @Resaltado)";
			}
			else
			{
				sqlQuery = @"
                    UPDATE dbCollection..CamposPantalla SET
                    idEjecutivo = @IdEjecutivo, Fecha_Update = GETDATE(), AliasCampo = @Alias,
                    NombreCampo = @NombreCampo, idFormatoCampo = @FormatoCampo, Resaltado = @Resaltado
                    WHERE idProducto = @idProducto AND Posición = @Posicion";
			}

			// Ya no se usa la conexión del factory, sino la que viene por parámetro.
			// Se pasa también la transacción al método de ejecución.
			var rowsAffected = await _daoBase.ExecuteNonQueryAsync(
				connection,
				sqlQuery,
				transaction, // Pasar la transacción aquí
				new SqlParameter("@idEjecutivo", dto.IdEjecutivo),
				new SqlParameter("@idProducto", dto.IdProducto),
				new SqlParameter("@Posicion", dto.Posicion),
				new SqlParameter("@Alias", dto.Alias ?? (object)DBNull.Value),
				new SqlParameter("@NombreCampo", dto.NombreCampo ?? (object)DBNull.Value),
				new SqlParameter("@FormatoCampo", dto.FormatoCampo),
				new SqlParameter("@Resaltado", dto.Resaltado)
			);

			return rowsAffected > 0;
		}



	}
}