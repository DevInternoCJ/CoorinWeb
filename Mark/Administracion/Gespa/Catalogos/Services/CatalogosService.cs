using CoorinWeb.Loki.Global;
using Loki.DTOs.SesionesDTOs;
using Loki.Global;
using Loki.Mark.Administracion.Gespa.Catalogos.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Linq.Dynamic.Core;
using static CoorinWeb.Loki.Global.EntityTypeHelper;

namespace Loki.Mark.Administracion.Gespa.Catalogos.Services
{
	public class CatalogosService : ICatalogosService

	{
		private readonly CustomDbContextFactory _dbContFactory;


		public CatalogosService(IServiceProvider serviceProvider)
		{
			_dbContFactory = new CustomDbContextFactory(serviceProvider);

		}

		public async Task<List<object>> GetAllCatalogos(string servidor)
		{
			var context = _dbContFactory.GetDbContext(servidor, "Collection");

			var campos = new List<string>
			{
				"idCatálogo AS idCatalogo",
				"catálogo1 AS Catálogo",
				"descripciónCatálogo AS Descrpición",
			};

			var catalogos = await GetFullEntityTable(context, "Catálogo", campos);

			return catalogos;
		}


		public async Task<List<object>> GetAllValoresCatalogos(string servidor)
		{
			var contextCollection = _dbContFactory.GetDbContext(servidor, "Collection");

			// Campos requeridos de los valores de catálogo.
			var campos = new List<string>
			{
				"idValor",
				"idCatálogo",
				"Valor",
				"Detalle",
			};

			// Ejecutar la consulta mediente filtros para
			return await GetFullEntityTable(contextCollection, "ValoresCatálogo", campos);

		}




	}
}
