using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.DTOs.SesionesDTOs;
using Loki.Global;
using Loki.Mark.Administracion.Ejecutivos.Sesiones.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Linq.Dynamic.Core;
using static CoorinWeb.Loki.Global.EntityTypeHelper;

namespace Loki.Mark.Administracion.Ejecutivos.Sesiones.Services
{
	public class SesionesService : ISesionesService

	{
		private readonly CustomDbContextFactory _dbContFactory;
		private readonly DaoBase _daoBaseSesiones;


		public SesionesService(IServiceProvider serviceProvider)
		{
			_dbContFactory = new CustomDbContextFactory(serviceProvider);
			_daoBaseSesiones = new DaoBase();

		}

		/// <summary>
		/// Carga los ejecutivos relacionados a un determinado idEjecutivo (propios y no descendientes),
		/// incluyendo su información de sesión (si está abierta) y construye una jerarquía basada en sus encargados.
		/// </summary>
		/// <param name="servidor">Nombre del servidor para obtener los contextos de Collection y Memory.</param>
		/// <param name="idEjecutivo">ID del ejecutivo base desde donde partir para obtener ejecutivos relacionados.</param>
		/// <returns>Una lista jerarquizada de objetos tipo EjecutivoConJerarquia, devuelta como List&lt;object&gt;.</returns>
		public async Task<List<object>> CargaSesionesEjecutivos(string servidor, int idEjecutivo)
		{
			// Obtener contextos de base de datos para "Collection" y "Memory"
			var contextCollection = _dbContFactory.GetDbContext(servidor, "Collection");
			var contextMemory = _dbContFactory.GetDbContext(servidor, "Memory");

			// Obtener conexión directa a la base "Collection"
			using var connection = _dbContFactory.GetSqlConnection(servidor, "Collection");

			// Obtener los IDs de ejecutivos asociados al idEjecutivo (puede incluir subordinados)
			var idsEjecutivos = await ClasesCoorinMethods.GetIdEjecutivosPropiosAsync(connection, idEjecutivo, soloDescendientes: false);

			// Filtros para recuperar datos de ejecutivos desde la tabla "Ejecutivo"
			var filtros = new List<DynamicFilter>
			{
				new()
				{
					Campo = "idEjecutivo",
					Operador = "IN",
					Valor = idsEjecutivos
				}
			};

			// Campos requeridos para cada ejecutivo
			var campos = new List<string>
			{
				"idEjecutivo",
				"NombreEjecutivo",
				"Usuario",
				"idEncargado",
				"Bloqueado",
				"false as SesionAbierta" // Campo auxiliar inicializado en falso
			};

			// Ejecutar la consulta y obtener la lista de ejecutivos como objetos dinámicos
			var ejecutivos = (await FetchEntityTableWithFilters(contextCollection, "Ejecutivo", filtros, campos)).Cast<dynamic>().ToList();

			// Filtros para buscar sesiones abiertas (sin SegundoSalida)
			var filtrosSesiones = new List<DynamicFilter>
			{
				new()
				{
					Campo = "idEjecutivo",
					Operador = "IN",
					Valor = idsEjecutivos
				},
				new()
				{
					Campo = "SegundoSalida",
					Operador = "==",
					Valor = null
				}
			};

			// Campos necesarios de la tabla de sesiones
			var camposSesiones = new List<string>
			{
				"idEjecutivo"
			};

			// Obtener las sesiones abiertas desde "Memory"
			var sesionesAbiertas = await FetchEntityTableWithFilters(contextMemory, "Sesione", filtrosSesiones, camposSesiones);

			// 1. Extraer los IDs de ejecutivos con sesión abierta
			var idsConSesionAbierta = sesionesAbiertas
				.Select(s =>
				{
					var prop = s.GetType().GetProperty("IdEjecutivo");
					return (int)(prop?.GetValue(s) ?? 0);
				})
				.ToHashSet();

			// 2. Mapear los ejecutivos a objetos fuertemente tipados y marcar si tienen sesión abierta
			var listaEjecutivos = ejecutivos
				.Select(e => new EjecutivoConJerarquia
				{
					IdEjecutivo = e.IdEjecutivo,
					NombreEjecutivo = e.NombreEjecutivo,
					Usuario = e.Usuario,
					IdEncargado = e.IdEncargado,
					Bloqueado = e.Bloqueado,
					SesionAbierta = idsConSesionAbierta.Contains(e.IdEjecutivo)
				})
				.ToList();

			// 3. Crear un diccionario para búsqueda rápida por ID
			var dictEjecutivos = listaEjecutivos.ToDictionary(e => e.IdEjecutivo, e => e);

			// 4. Construir jerarquía de ejecutivos basada en IdEncargado
			var ejecutivosJerarquicos = new List<EjecutivoConJerarquia>();

			foreach (var ej in listaEjecutivos)
			{
				if (ej.IdEncargado.HasValue && dictEjecutivos.TryGetValue(ej.IdEncargado.Value, out var encargado))
				{
					encargado.Subordinados.Add(ej);
				}
				else
				{
					// Raíz de la jerarquía (sin encargado)
					ejecutivosJerarquicos.Add(ej);
				}
			}

			// 5. Devolver la jerarquía como lista de objetos
			return ejecutivosJerarquicos.Cast<object>().ToList();
		}


		/// <summary>
		/// Resetea la contraseña de un usuario llamando a un procedimiento almacenado.
		/// </summary>
		/// <param name="usuario">El nombre de usuario (a cuatro letras) cuya contraseña se reseteará.</param>
		/// <param name="servidor">El nombre del servidor donde se encuentra la base de datos.</param>
		/// <returns>Un valor booleano que indica si la operación fue exitosa.</returns>
		public async Task<bool> ResetearContraseniaAsync(string usuario, string servidor)
		{
			using var connection = _dbContFactory.GetSqlConnection(servidor, "Collection");

			var param = new SqlParameter("@usuario", SqlDbType.VarChar) { Value = usuario };

			var result = await _daoBaseSesiones.ExecuteStoredProcedure(connection, "1.3.ReseteaContraseña", param);

			return result != null;
		}


		/// <summary>
		/// Cierra una sesión de un ejecutivo, actualizando el campo 'SegundoSalida' y 'Activo'.
		/// </summary>
		/// <param name="idEjecutivo">El id del ejecutivo (número de empleado) cuya sesión se cerrará.</param>
		/// <param name="servidor">El nombre del servidor donde se encuentra la base de datos.</param>
		/// <returns>Un valor booleano que indica si la operación fue exitosa (se actualizaron registros).</returns>
		public async Task<bool> CerrarSesionAsync(int idEjecutivo, string servidor)
		{
			// Obtener el DbContext dinámicamente
			using var dbContext = _dbContFactory.GetDbContext(servidor, "memory");
			var sesionesModel = GetModelTypeByContext(dbContext, "Sesione");

			// Filtros: sesiones abiertas del ejecutivo
			var filtros = new List<DynamicFilter>
			{
				new() { Campo = "IdEjecutivo", Operador = "=", Valor = idEjecutivo },
			};

			var actualizaciones = new Dictionary<string, object?>
			{
				{"SegundoSalida", DateTime.Now },
				{ "Activo", false },
			};

			// Llamar al método de actualización
			int afectados = await UpdateMultipleEntitiesAsync(
				dbContext,
				sesionesModel,
				filtros,
				actualizaciones
			);

			return afectados > 0;
		}


		/// <summary>
		/// Quita el bloqueo de un ejecutivo, actualizando el campo 'Bloqueado' a false.
		/// </summary>
		/// <param name="idEjecutivo">El identificador del ejecutivo al que se le quitará el bloqueo.</param>
		/// <param name="servidor">El nombre del servidor donde se encuentra la base de datos.</param>
		/// <returns>Un valor booleano que indica si la operación fue exitosa (se actualizaron registros).</returns>
		public async Task<bool> QuitarBloqueoAsync(int idEjecutivo, string servidor)
		{
			// Obtener el DbContext dinámicamente (asumiendo que "Ejecutivos" está en el contexto "Collection")
			using var dbContext = _dbContFactory.GetDbContext(servidor, "collection");

			// Obtener el tipo de la entidad 'Ejecutivos' dinámicamente
			var ejecutivosModel = GetModelTypeByContext(dbContext, "Ejecutivo");

			var filtros = new List<DynamicFilter>
			{
				new()
				{
					Campo = "IdEjecutivo",
					Operador = "=",
					Valor = idEjecutivo
				}
			};

			var camposActualizados = new Dictionary<string, object?>
			{
				["Bloqueado"] = false,
			};

			var cambios = await UpdateMultipleEntitiesAsync(
				dbContext,
				ejecutivosModel,
				filtros,
				camposActualizados
			);

			return cambios > 0; // No se encontró el ejecutivo con el id especificado
		}



		// Versiones con Dapper.

		//public async Task<bool> CerrarSesionAsync(int idEjecutivo, string servidor)
		//{
		//	using var connection = _dbContFactory.GetSqlConnection(servidor, "Memory");

		//	string query = "UPDATE dbMemory.PS.Sesiones SET Segundo_Salida = GETDATE() WHERE idEjecutivo = @idEjecutivo";

		//	var result = await connection.ExecuteAsync(query, new { idEjecutivo });

		//	return result > 0;
		//}

		//public async Task<bool> QuitarBloqueoAsync(int idEjecutivo, string servidor)
		//{
		//	using var connection = _dbContFactory.GetSqlConnection(servidor, "Collection");

		//	string query = "UPDATE Ejecutivos SET Bloqueado = 0 WHERE idEjecutivo = @idEjecutivo";

		//	var result = await connection.ExecuteAsync(query, new { idEjecutivo });

		//	return result > 0;
		//}


	}
}
