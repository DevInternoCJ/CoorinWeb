//Globales
using CoorinWeb.Loki.Mark.Auth.Interfaces;
using Loki.ModelsDbCollectionThor;
using Loki.ModelsDbMemoryThor;
using Loki.ModelsDbAllocationThor;
using Loki.ModelsDbHistoryThor;

//This file is part of Asura
using Loki.ModelsDbCollectionAsura;
using Loki.ModelsDbAllocationAsura;
using Loki.ModelsDbHistoryAsura;
using Loki.ModelsDbMemoryAsura;
using Loki.ModelsBBVA_VGP;

// This file is part of Cronoss
using Loki.DbAllocation.ModelsCronoss;
using Loki.DbCollection.ModelsCronoss;
using Loki.DbHistory.ModelsCronoss;
using Loki.DbMemory.ModelsCronoss;

// This file is part of Gaia
using GaiaLibrary.ModelsDbMemory;
using GaiaLibrary.ModelsDbHistory;
using GaiaLibrary.ModelsDbCollection;
using GaiaLibrary.ModelsDbAllocation;
//This file is part Mictlan
using Loki.ModelsDbAllocationMictlan;
using Loki.ModelsDbHistoryMictlan;
using Loki.ModelsDbMemoryMictlan;

//This file is part of Hades
using HadesLibrary.ModelsDbAllocation;
using HadesLibrary.ModelsDbCollection;
using HadesLibrary.ModelsDbHistory;
using HadesLibrary.ModelsDbMemory;

// This file is part of Izalith
using Izalith.ModelsdbAllocation;
using Izalith.ModelsdbCollection;
using Izalith.ModelsdbHistory;
using Izalith.ModelsdbMemory;

//using CoorinWeb.DTOs.AuthDTOs;
using CoorinWeb.Loki.DTOs.AuthDTOs;

//Dependencias
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Threading.Tasks;
using System.Collections.Generic;
using CoorinWeb.Loki.Global;
using CoorinWeb.DTOs.AuthDTOs;
using Loki.Global;

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

			var dbContext = _dbContFactory.GetDbContext(request.Servidor, tipoBase);
			Console.WriteLine($"🔌 Conectando al servidor: {request.Servidor} ({tipoBase})");

			var nombreSp1 = "[1.2.EstableceContraseña]";

			return await _daoBase.ExecuteStoredProcedure(
				dbContext,
				nombreSp1,
				new SqlParameter("@Usuario", request.Usuario ?? (object)DBNull.Value),
				new SqlParameter("@NuevaContraseña", request.NuevaContra ?? (object)DBNull.Value),
				new SqlParameter("@Contraseña", request.Contra ?? (object)DBNull.Value)
			);
		}


	}
}
