//Globales
using CoorinWeb.Loki.Mark.Auth.Interfaces;
using CoorinWeb.Loki.DTOs.AuthDTOs;

//Dependencias
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using CoorinWeb.Loki.Global;
using Loki.DTOs.AuthDTOs;

namespace CoorinWeb.Loki.Mark.Auth.DAOs.AuthDAOs
{
	public class AuthDAOs : IAuthInterfaces
	{

		private readonly DaoBase _daoBase;
		private readonly CustomDbContextFactory _dbContFactory;


		public AuthDAOs(IServiceProvider serviceProvider, DaoBase daoBase)
		{
			_dbContFactory = new CustomDbContextFactory(serviceProvider);
			_daoBase = daoBase;

		}

		public async Task<dynamic?> ValidateUser(AuthRequest request)
		{
			var tipoBase = "Memory";

			if (request.Servidor?.Contains('_') == true)
			{
				throw new ArgumentException("El parámetro 'Servidor' no debe contener guiones bajos. Debe ser solo el nombre del servidor, como 'thor'.");
			}

			//var dbContext = _dbContFactory.GetDbContext(request.Servidor, tipoBase);
			var sqlConnection = _dbContFactory.GetSqlConnection(request.Servidor, tipoBase);

			var nombreSp = "[dbMemory].[PS].[IniciaSesión]";

			return await _daoBase.ExecuteStoredProcedure(
				sqlConnection,
				nombreSp,
				new SqlParameter("@Usuario", request.Usuario ?? (object)DBNull.Value),
				new SqlParameter("@Contraseña", request.Contrasenia ?? (object)DBNull.Value),
				new SqlParameter("@Extensión", request.Extension ?? (object)DBNull.Value),
				new SqlParameter("@Bloquear", request.Bloqueo ?? (object)DBNull.Value),
				new SqlParameter("@Dominio", request.Dominio ?? (object)DBNull.Value),
				new SqlParameter("@Computadora", request.Computadora ?? (object)DBNull.Value),
				new SqlParameter("@UsuarioWindows", request.UsuarioWindows ?? (object)DBNull.Value),
				new SqlParameter("@IP", request.IP ?? (object)DBNull.Value),
				new SqlParameter("@Aplicación", request.Aplicacion ?? (object)DBNull.Value),
				new SqlParameter("@Versión", request.Version ?? (object)DBNull.Value)
			);
		}

		public async Task<dynamic?> ValidateUserRetry(AuthRequest request)
		{
			var tipoBase = "Collection";

			if (request.Servidor?.Contains('_') == true)
			{
				throw new ArgumentException("El parámetro 'Servidor' no debe contener guiones bajos. Debe ser solo el nombre del servidor, como 'thor'.");
			}

			var dbContext = _dbContFactory.GetDbContext(request.Servidor, tipoBase);
			Console.WriteLine($"🔌 Conectando al servidor: {request.Servidor} ({tipoBase})");

			var nombreSp1 = "[1.1.ValidaEjecutivo]";

			return await _daoBase.ExecuteStoredProcedure(
				dbContext,
				nombreSp1,
				new SqlParameter("@Usuario", request.Usuario ?? (object)DBNull.Value),
				new SqlParameter("@Contraseña", request.Contrasenia ?? (object)DBNull.Value),
				new SqlParameter("@Extensión", request.Extension ?? (object)DBNull.Value),
				new SqlParameter("@Bloquear", request.Bloqueo ?? (object)DBNull.Value),
				new SqlParameter("@Dominio", request.Dominio ?? (object)DBNull.Value),
				new SqlParameter("@Computadora", request.Computadora ?? (object)DBNull.Value),
				new SqlParameter("@UsuarioWindows", request.UsuarioWindows ?? (object)DBNull.Value),
				new SqlParameter("@IP", request.IP ?? (object)DBNull.Value)
			);
		}

		public async Task<dynamic?> ValidatePasswordEjecutivoAsync(ValidatePasswordEjecutivoRequest request)
		{
			var tipoBase = "Collection";

			if (request.Servidor?.Contains('_') == true)
			{
				throw new ArgumentException("El parámetro 'Servidor' no debe contener guiones bajos.");
			}

			var dbContext = _dbContFactory.GetDbContext(request.Servidor, tipoBase);

			return await _daoBase.ExecuteStoredProcedure(
				dbContext,
				"[dbMemory].[PS].[ValidaContraseñaEjecutivo]",
				new SqlParameter("@idEjecutivo", request.IdEjecutivo),
				new SqlParameter("@Contraseña", request.Contrasenia ?? (object)DBNull.Value)
			);
		}

		public async Task<int?> ValidateExistingSessionAsync(string servidor, int idEjecutivo)
		{
			const string tipoBase = "Collection";

			if (servidor?.Contains('_') == true)
			{
				throw new ArgumentException("El parámetro 'Servidor' no debe contener guiones bajos.");
			}

			var dbContext = _dbContFactory.GetDbContext(servidor, tipoBase);

			var query = @"
			SELECT
            CASE WHEN Segundo_Salida IS NULL THEN 1 ELSE 0 END
			FROM [dbMemory].[PS].[Sesiones]
			WHERE idEjecutivo = @idEjecutivo";

			var idParam = new SqlParameter("@idEjecutivo", idEjecutivo);

			var result = await dbContext.Database
				.SqlQueryRaw<int?>(query, idParam)
				.FirstOrDefaultAsync();

			return result;
		}

		public async Task<dynamic?> ResetPasswordAsync(string servidor, ReseteaContra request)
		{
			const string tipoBase = "collection";

			if (servidor?.Contains('_') == true)
			{
				throw new ArgumentException("El parámetro 'Servidor' no debe contener guiones bajos.");
			}

			var dbContext = _dbContFactory.GetDbContext(servidor, tipoBase);
			Console.WriteLine($"🔌 Conectando al servidor: {servidor} ({tipoBase})");

			var nombreSp1 = "[dbo].[1.2.EstableceContraseña]";

			return await _daoBase.ExecuteStoredProcedure(
				dbContext,
				nombreSp1,
				new SqlParameter("@Usuario", request.Usuario ?? (object)DBNull.Value),
				new SqlParameter("@NuevaContraseña", request.NuevaContra ?? (object)DBNull.Value),
				new SqlParameter("@Contraseña", request.Contra ?? (object)DBNull.Value)
			);
		}

        public async Task<bool> Logout(logout request, string servidor)
        {
            const string tipoBase = "Memory";

            var dbContext = _dbContFactory.GetDbContext(servidor, tipoBase);
            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            if (request.IdEjecutivo == null || request.IdLogIngreso == null)
            {
                throw new ArgumentException("Se requieren ambos parámetros: IdEjecutivo e IdLogIngreso");
            }
            var nombreSp = "dbMemory.PS.CierraSesión";

            try
            {
                var resultado = await _daoBase.ExecuteStoredProcedure(
                    dbContext,
                    nombreSp,
                    new SqlParameter("@idEjecutivo", request.IdEjecutivo),
                    new SqlParameter("@idLogIngreso", request.IdLogIngreso)
                );

                return true;
            }
            catch (SqlException ex)
            {

                if (ex.Message.Contains("expects parameter") || ex.Number == 201)
                {
                    throw new ArgumentException($"Error en parámetros del stored procedure: {ex.Message}");
                }
                throw;
            }
            finally
            {
                sqlConnection?.Close();
            }
        }

    }
}
