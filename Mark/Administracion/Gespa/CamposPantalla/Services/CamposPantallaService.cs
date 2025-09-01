using CoorinWeb.Loki.Global;
using Loki.DTOs.CamposPantallaDTOs;
using Loki.Mark.Administracion.Ejecutivos.Encargados.DAOs;
using Loki.Mark.Administracion.Ejecutivos.Encargados.Interfaces;
using Loki.Mark.Administracion.Gespa.CamposPantalla.DAOs;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using static CoorinWeb.Loki.Global.EntityTypeHelper;

namespace Loki.Mark.Administracion.Gespa.CamposPantalla.Services
{
	public class CamposPantallaService
	{
		private readonly CustomDbContextFactory _dbContFactory;
		private readonly CamposPantallaDao _camposPantallaDao;

		public CamposPantallaService(IServiceProvider serviceProvider)
		{
			_dbContFactory = new CustomDbContextFactory(serviceProvider);
			_camposPantallaDao = new CamposPantallaDao(_dbContFactory);

		}

		/// <summary>
		/// Verifica si existe la tabla dinámica Producto_{idProducto} en el servidor especificado.
		/// </summary>
		/// <param name="servidor">Nombre del servidor.</param>
		/// <param name="idProducto">ID del producto asociado a la tabla dinámica.</param>
		/// <returns>Object ID de la tabla si existe, de lo contrario null.</returns>
		public async Task<int?> ObtenerObjectIdProductoAsync(string servidor, int idProducto)
		{
			string nombreTabla = $"Producto_{idProducto}";
			return await _camposPantallaDao.ObtenerObjectIdTablaAsync(servidor, nombreTabla);
		}

		/// <summary>
		/// Obtiene los campos de pantalla configurados para un producto específico.
		/// </summary>
		/// <param name="servidor">Nombre del servidor.</param>
		/// <param name="idProducto">ID del producto.</param>
		/// <returns>Lista de objetos con los campos de pantalla configurados.</returns>
		public async Task<List<object>> GetCamposPantalla(string servidor, int idProducto)
		{
			var context = _dbContFactory.GetDbContext(servidor, "Collection");

			var campos = new List<string>
			{
				"Posición",
				"AliasCampo",
				"NombreCampo",
				"idFormatoCampo",
				"Resaltado"
			};

			var filtrosEncargados = new List<DynamicFilter>
			{
				new() { Campo = "idProducto", Operador = "=", Valor = idProducto },
			};

			var encargados = await FetchEntityTableWithFilters(context, "Ejecutivo", filtrosEncargados, campos);
			return encargados;
		}

		/// <summary>
		/// Simula una consulta TABLESAMPLE sobre una tabla dinámica Producto_{idProducto}.
		/// </summary>
		/// <param name="servidor">Servidor donde se encuentra la base de datos.</param>
		/// <param name="idProducto">ID del producto (usado en el nombre de la tabla).</param>
		/// <param name="porcentaje">Porcentaje de registros a seleccionar (ej. 70).</param>
		/// <param name="maximo">Número máximo de registros a devolver.</param>
		/// <returns>Lista de registros aleatorios de la tabla dinámica.</returns>
		public async Task<List<object>> GridProductoTableSample(
			string servidor,
			int idProducto,
			double porcentaje = 70,
			int? maximo = 5)
		{
			string nombreModelo = $"Producto_{idProducto}";
			var context = _dbContFactory.GetDbContext(servidor, "Collection");
			var tipoEntidad = GetModelTypeByContext(context, nombreModelo);

			var dbSet = context.GetType()
				.GetMethod("Set", Type.EmptyTypes)!
				.MakeGenericMethod(tipoEntidad)
				.Invoke(context, null) as IQueryable;

			var total = await CountAsyncDinamico(dbSet);

			var cantidad = (int)Math.Ceiling(total * (porcentaje / 100.0));
			if (maximo.HasValue && cantidad > maximo)
				cantidad = maximo.Value;

			var resultados = await dbSet
				.OrderBy("Guid.NewGuid()")
				.Take(cantidad)
				.ToDynamicListAsync();

			return resultados;
		}

		/// <summary>
		/// Realiza un conteo dinámico sobre un IQueryable sin conocer el tipo en tiempo de compilación.
		/// </summary>
		/// <param name="queryable">Consulta dinámica.</param>
		/// <returns>Total de elementos encontrados.</returns>
		public static async Task<int> CountAsyncDinamico(IQueryable queryable)
		{
			var method = typeof(EntityFrameworkQueryableExtensions)
				.GetMethods()
				.First(m => m.Name == "CountAsync" && m.GetParameters().Length == 2);

			var entityType = queryable.ElementType;
			var genericMethod = method.MakeGenericMethod(entityType);

			var task = (Task)genericMethod.Invoke(null, new object[] { queryable, CancellationToken.None })!;
			await task.ConfigureAwait(false);

			var resultProperty = task.GetType().GetProperty("Result");
			return (int)resultProperty!.GetValue(task)!;
		}

		public async Task<bool> InsertaActualizaCamposPantalla(string servidor, CampoPantallaRequest request)
		{
			foreach (var campo in request.Campos)
			{
				var dto = new CampoPantallaDto
				{
					IdEjecutivo = request.IdEjecutivo,
					IdProducto = request.IdProducto,
					Posicion = campo.Posicion,
					Alias = campo.Alias,
					NombreCampo = campo.NombreCampo,
					FormatoCampo = campo.FormatoCampo,
					Resaltado = campo.Resaltado,
					Editar = campo.Editar
				};

				var exito = await _camposPantallaDao.GuardaCampoPantalla(servidor, dto);
				if (!exito) return false;
			}

			return true;
		}





	}
}
