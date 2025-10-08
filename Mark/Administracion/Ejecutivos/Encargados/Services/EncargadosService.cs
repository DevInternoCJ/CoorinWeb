using CoorinWeb.Loki.Global;
using Loki.DTOs.EncargadosDTOs;
using Loki.DTOs.ScriptsDTOs;
using Loki.DTOs.SesionesDTOs;
using Loki.Global;
using Loki.Mark.Administracion.Ejecutivos.Encargados.DAOs;
using Loki.Mark.Administracion.Ejecutivos.Encargados.Interfaces;
using Microsoft.Data.SqlClient;
using static CoorinWeb.Loki.Global.EntityTypeHelper;

namespace Loki.Mark.Administracion.Ejecutivos.Encargados.Services
{
	public class EncargadosService : IEncargadosService
	{
		private readonly CustomDbContextFactory _dbContFactory;
		private readonly EncargadosDao _encargadosDao;

		public EncargadosService(IServiceProvider serviceProvider)
		{
			_dbContFactory = new CustomDbContextFactory(serviceProvider);
			_encargadosDao = new EncargadosDao(_dbContFactory);

		}

		public async Task<List<object>> GetAllEncargados(string servidor)
		{
			var context = _dbContFactory.GetDbContext(servidor, "Collection");

			// Campos requeridos de los encargados.
			var campos = new List<string>
			{
				"NombreEjecutivo",
				"idEjecutivo",
				"idCartera",
				"idProducto"
			};

			// Filtros y candados.
			var filtrosEncargados = new List<DynamicFilter>
			{
				new() { Campo = "Jerarquía", Operador = ">", Valor = 0 },
				new() { Campo = "idÁrea", Operador = "==", Valor = 1204 },
				new() { Campo = "idEncargado", Operador = "!=", Valor = 1 }
			};

			var encargados = await FetchEntityTableWithFilters(context, "Ejecutivo", filtrosEncargados, campos);
			return encargados;
		}

		public async Task<List<EjecutivoConJerarquia>> JerarquiaEjecutivosPropios(string servidor, int idEjecutivo)
		{
			// Obtener conexión directa a la base "Collection"
			using var connection = _dbContFactory.GetSqlConnection(servidor, "Collection");

			// Obtener lista plana de ejecutivos
			var ejecutivosPlano = await ClasesCoorinMethods.ObtieneEjecutivosPropios(connection, idEjecutivo);

			// Mapear a objetos nuevos asegurando que la lista de subordinados esté inicializada
			var listaEjecutivos = ejecutivosPlano.Select(e => new EjecutivoConJerarquia
			{
				IdEjecutivo = e.IdEjecutivo,
				NombreEjecutivo = e.NombreEjecutivo,
				Usuario = e.Usuario,
				IdEncargado = e.IdEncargado,
				Jerarquía= e.Jerarquía,
				Bloqueado = e.Bloqueado,
				SesionAbierta = false, // si no vas a calcular sesiones
				Subordinados = []
			}).ToList();

			// Crear diccionario para acceso rápido por ID
			var dictEjecutivos = listaEjecutivos.ToDictionary(e => e.IdEjecutivo, e => e);

			// Lista final que contendrá los ejecutivos raíz (sin encargado)
			var jerarquia = new List<EjecutivoConJerarquia>();

			foreach (var ej in listaEjecutivos)
			{
				if (ej.IdEncargado.HasValue && dictEjecutivos.TryGetValue(ej.IdEncargado.Value, out var encargado))
				{
					encargado.Subordinados.Add(ej);
				}
				else
				{
					// Raíz de la jerarquía
					jerarquia.Add(ej);
				}
			}

			return jerarquia;
		}

		public async Task<List<ResultadoAsignacionDto>> CambiarEncargado(string servidor, List<CambiaEncargadoDto> cambiaEncargado)
		{
			var resultados = new List<ResultadoAsignacionDto>();

			foreach (var cambio in cambiaEncargado)
			{
				try
				{
					var result = await _encargadosDao.CambiaEncargadoEjecutivo(servidor, cambio);

					bool exito = result != null;

					resultados.Add(new ResultadoAsignacionDto
					{
						IdEjecutivo = cambio.IdEjecutivo,
						Exito = exito,
						Mensaje = exito ? "Asignación exitosa." : "La operación no devolvió un resultado."
					});
				}
				catch (Exception ex)
				{

					resultados.Add(new ResultadoAsignacionDto
					{
						IdEjecutivo = cambio.IdEjecutivo,
						Exito = false,
						Mensaje = $"Error en la base de datos: {ex.Message}" // Devolvemos un mensaje útil
					});
				}
			}

			return resultados;
		}
	}

}