using Loki.DTOs.ScriptsDTOs;
using CoorinWeb.Loki.Global;
using Microsoft.Data.SqlClient;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.Mark.Administracion.Gespa.Scripts.Interfaces;


namespace Loki.Mark.Administracion.Gespa.Scripts.DAOs
{
	public class ScriptsDAO : IScriptsDAO
	{
		private readonly CustomDbContextFactory _dbContFactory;
		private readonly DaoBase _daoBase;


		public ScriptsDAO(CustomDbContextFactory dbContFactory, DaoBase daoBase)
		{
			this._dbContFactory = dbContFactory;
			_daoBase = daoBase;
		}

		public async Task<int> InsertScript(string servidor, guardarScriptsDTO request, int idProducto, int idEjecutivo)
		{
			// Validaciones básicas: Asegúrate de que los IDs y el nombre/script no estén vacíos.
			if (idProducto <= 0)
			{
				throw new ArgumentException("El IdProducto debe ser un valor válido.", nameof(idProducto));
			}
			if (idEjecutivo <= 0)
			{
				throw new ArgumentException("El IdEjecutivo debe ser un valor válido.", nameof(idEjecutivo));
			}
			if (string.IsNullOrWhiteSpace(request.Nombre) || string.IsNullOrWhiteSpace(request.Script1))
			{
				throw new ArgumentException("El nombre y el script no pueden estar vacíos.");
			}

			const string tipoBase = "Collection";
			// Obtiene la conexión SQL. Asegúrate de que _dbContFactory.GetSqlConnection la abra.
			using (var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase))
			{
				// El nuevo query para insertar el script
				var sqlQuery = "INSERT INTO dbCollection..Scripts (idProducto, Nombre, Descripción, Script, Fecha_Insert, idEjecutivo_Insert) " +
							   "VALUES(@idProducto, @Nombre, @Descripcion, @Script, GETDATE(), @idEjecutivo); " +
							   "SELECT SCOPE_IDENTITY();"; // Usamos SCOPE_IDENTITY() para obtener el ID recién insertado.

				var parameters = new SqlParameter[]
				{
			new SqlParameter("@idProducto", idProducto),
			new SqlParameter("@Nombre", request.Nombre ?? (object)DBNull.Value),
			new SqlParameter("@Descripcion", request.Descripción ?? (object)DBNull.Value),
			new SqlParameter("@Script", request.Script1 ?? (object)DBNull.Value),
			new SqlParameter("@idEjecutivo", idEjecutivo)
				};

				// ExecuteScalarAsync se usa para obtener el valor de la primera columna de la primera fila,
				// que en este caso será el ID recién insertado.
				var newId = await _daoBase.ExecuteScalarAsync<int>(
					sqlConnection,
					sqlQuery,
					parameters
				);

				return newId; // Retorna el ID del script recién insertado.
			}
		}

		public async Task<int> UpdateScript(string servidor, actualizarScriptDTO request)
		{
			// 1. Validaciones básicas (opcional pero recomendado)
			if (request.IdScript <= 0)
			{
				throw new ArgumentException("El IdScript debe ser un valor válido para actualizar.", nameof(request.IdScript));
			}

			const string tipoBase = "Collection";
			// Obtiene la conexión SQL. Asegúrate de que _dbContFactory.GetSqlConnection la abra.
			using (var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase))
			{
				var sqlQuery = "UPDATE dbCollection..Scripts SET Script = @Script, Nombre = @Nombre, Descripción = @Descripción WHERE idScript = @idScript";
				var parameters = new SqlParameter[]
				{
				new SqlParameter("@Script", request.Script1 ?? (object)DBNull.Value),
				new SqlParameter("@Nombre", request.Nombre ?? (object)DBNull.Value),
				new SqlParameter("@Descripción", request.Descripción ?? (object)DBNull.Value),
                new SqlParameter("@idScript", request.IdScript)
				};
				var rowsAffected = await _daoBase.ExecuteNonQueryAsync(
				sqlConnection,
				sqlQuery,
				parameters
				);

				return rowsAffected;
			}
		}


	}

}
