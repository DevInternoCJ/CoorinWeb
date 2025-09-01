using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore.Internal;


// This file is part of Thor
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
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;


namespace CoorinWeb.Loki.Global
{
    public class CustomDbContextFactory : IDbContextFactory
	{
		private readonly IServiceProvider _serviceProvider;
		private readonly IConfiguration _configuration;

		public CustomDbContextFactory(IServiceProvider serviceProvider)
		{
			_serviceProvider = serviceProvider;
			_configuration = serviceProvider.GetRequiredService<IConfiguration>();
		}

		public DbContext GetDbContext(string servidor, string tipoBase)
		{
			var key = $"{servidor}_{tipoBase}".ToLower();

			return key switch
			{
				"thor_memory" => _serviceProvider.GetRequiredService<DbMemoryContextThor>(),
				"thor_collection" => _serviceProvider.GetRequiredService<DbCollectionContextThor>(),
				"thor_history" => _serviceProvider.GetRequiredService<DbHistoryContextThor>(),
				"thor_allocation" => _serviceProvider.GetRequiredService<DbAllocationContextThor>(),

				"asura_memory" => _serviceProvider.GetRequiredService<DbMemoryContextAsura>(),
				"asura_collection" => _serviceProvider.GetRequiredService<DbCollectionContextAsura>(),
				"asura_history" => _serviceProvider.GetRequiredService<DbHistoryContextAsura>(),
				"asura_allocation" => _serviceProvider.GetRequiredService<DbAllocationContextAsura>(),

				"cronoss_memory" => _serviceProvider.GetRequiredService<DbMemoryContextCronoss>(),
				"cronoss_collection" => _serviceProvider.GetRequiredService<DbCollectionContextCronoss>(),
				"cronoss_history" => _serviceProvider.GetRequiredService<DbHistoryContextCronoss>(),
				"cronoss_allocation" => _serviceProvider.GetRequiredService<DbAllocationContextCronoss>(),

				"gaia_memory" => _serviceProvider.GetRequiredService<DbMemoryContextGaia>(),
				"gaia_collection" => _serviceProvider.GetRequiredService<DbCollectionContextGaia>(),
				"gaia_history" => _serviceProvider.GetRequiredService<DbHistoryContextGaia>(),
				"gaia_allocation" => _serviceProvider.GetRequiredService<DbAllocationContextGaia>(),

				"hades_memory" => _serviceProvider.GetRequiredService<DbMemoryContextHades>(),
				"hades_collection" => _serviceProvider.GetRequiredService<DbCollectionContextHades>(),
				"hades_history" => _serviceProvider.GetRequiredService<DbHistoryContextHades>(),
				"hades_allocation" => _serviceProvider.GetRequiredService<DbAllocationContextHades>(),


				"izalith_memory" => _serviceProvider.GetRequiredService<DbMemoryContextIzalith>(),
				"izalith_collection" => _serviceProvider.GetRequiredService<DbCollectionContextIzalith>(),
				"izalith_history" => _serviceProvider.GetRequiredService<DbHistoryContextIzalith>(),
				"izalith_allocation" => _serviceProvider.GetRequiredService<DbAllocationContextIzalith>(),

				"mictlantecuhtli_memory" => _serviceProvider.GetRequiredService<DbMemoryContextMictlan>(),
				"mictlantecuhtli_history" => _serviceProvider.GetRequiredService<DbHistoryContextMictlan>(),
				"mictlantecuhtli_allocation" => _serviceProvider.GetRequiredService<DbAllocationContextMictlan>(),

				_ => throw new ArgumentException($"Servidor o tipo de base de datos no reconocido: {servidor} - {tipoBase}")
			};
		}

		public SqlConnection GetSqlConnection(string servidor, string tipoBase)
		{
			if (string.IsNullOrWhiteSpace(servidor) || string.IsNullOrWhiteSpace(tipoBase))
				throw new ArgumentException("Servidor y tipoBase son obligatorios.");

			string clave = $"{servidor}_{tipoBase}";
			string? connectionString = _configuration.GetConnectionString(clave);

			if (string.IsNullOrEmpty(connectionString))
				throw new InvalidOperationException($"No se encontró una cadena de conexión para la clave '{clave}' en appsettings.json.");

			return new SqlConnection(connectionString);
		}
	}
}