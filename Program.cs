using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

// This file is part of Thor
using Loki.ThorLibrary.ModelsAllocation;
using Loki.ThorLibrary.ModelsCollection;
using Loki.ThorLibrary.ModelsHistory;
using Loki.ThorLibrary.ModelsMemory;

// This file is part of Asura
using Loki.AsuraLibrary.ModelsBBVA_VGP;
using Loki.AsuraLibrary.ModelsAllocation;
using Loki.AsuraLibrary.ModelsCollection;
using Loki.AsuraLibrary.ModelsHistory;
using Loki.AsuraLibrary.ModelsMemory;

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

// This file is part Mictlan
using Loki.ModelsDbAllocationMictlan;
using Loki.ModelsDbHistoryMictlan;
using Loki.ModelsDbMemoryMictlan;

// This file is part of Hades
using HadesLibrary.ModelsDbAllocation;
using HadesLibrary.ModelsDbCollection;
using HadesLibrary.ModelsDbHistory;
using HadesLibrary.ModelsDbMemory;

// This file is part of Izalith
using Izalith.ModelsdbAllocation;
using Izalith.ModelsdbCollection;
using Izalith.ModelsdbHistory;
using Izalith.ModelsdbMemory;

using Loki.AlbazLibrary;


// Utilizables
using CoorinWeb.Loki.Mark.Auth.DAOs;
using CoorinWeb.Loki.Mark.Auth.Interfaces;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs.AuthDAOs;
using Scalar.AspNetCore;
using Loki.Global;
using Loki.Mark.Administracion.Campanias.DAOs;
using Loki.Mark.Administracion.Campanias.Interfaces;
using Loki.Mark.Administracion.Carteras.Services;
using Loki.Mark.Administracion.Ejecutivos.Sesiones.Interfaces;
using Loki.Mark.Administracion.Ejecutivos.Sesiones.Services;
using Loki.Mark.Administracion.Gespa.Catalogos.Services;
using Loki.Mark.Administracion.Gespa.Catalogos.Interfaces;
using Loki.Mark.Administracion.Ejecutivos.Encargados.Interfaces;
using Loki.Mark.Administracion.Ejecutivos.Encargados.Services;
using Loki.Middleware;
using Loki.EncryptorDecryptor;
using Serilog;
using Microsoft.AspNetCore.ResponseCompression;
using Loki.Mark.Administracion.Ejecutivos.Validadores.DAOs;
using Loki.Mark.Administracion.Ejecutivos.Validadores.Interfaces;
using Loki.Mark.Administracion.Ejecutivos.Validadores.Services;
using Loki.Mark.Administracion.Ejecutivos.Metas.DAOs;
using Loki.Mark.Administracion.Ejecutivos.Metas.Interfaces;
using Loki.Mark.Administracion.Ejecutivos.Metas.Services;
using Loki.Mark.Consulta.ListaNegra.DAOs;
using Loki.Mark.Consulta.ListaNegra.Interfaces;
using Loki.Mark.Consulta.ListaNegra.Services;
using Loki.Mark.Consulta.Histórico.Interfaces;
using Loki.Mark.Consulta.Histórico.Services;
//using Loki.Mark.Consulta.Histórico.DAOs;
using Loki.Mark.Consulta.PlantillasCorreo.Interfaces;
using Loki.Mark.Consulta.PlantillasCorreo.Services;
using Loki.Mark.Consulta.PlantillasCorreo.DAOs;
//using Loki.Mark.Administracion.Campanias.Services;
using Loki.Mark.Administracion.Consulta.Arrepentimientos.Interfaces;
using Loki.Mark.Consulta.Arrepentimientos.Services;
using Loki.Mark.Consulta.Productividad.Services;
using Loki.Mark.Consulta.Productividad.Interfaces;
using Loki.Mark.Consulta.Histórico.DAOs;
using Loki.Mark.Administracion.Carteras.Interfaces;
using Loki.Mark.Administracion.Carteras.DAOs;
using Loki.Mark.Administracion.Gespa.CamposPantalla.Interfaces;
using Loki.Mark.Administracion.Gespa.CamposPantalla.Services;
using Loki.Mark.Administracion.Gespa.CamposPantalla.DAOs;
using Loki.Mark.Consulta.Cuenta.Interfaces;
using Loki.Mark.Consulta.Cuenta.DAOs;
using Loki.Mark.Consulta.Cuenta.Services;
using CatalogosService = Loki.Mark.Administracion.Gespa.Catalogos.Services.CatalogosService;



Log.Logger = new LoggerConfiguration()
	.WriteTo.Console() // Log to the console
	.WriteTo.File("Logs/Lokita.txt", rollingInterval: RollingInterval.Hour) // Log to a file
	.Enrich.FromLogContext() // Adds contextual information to logs
	.Enrich.WithMachineName()
	.Enrich.WithEnvironmentUserName()
	.MinimumLevel.Information() // Set the minimum logging level
	.CreateLogger();

var builder = WebApplication.CreateBuilder(args);

// ===== Configuraciones adicionales de JWT =====
var additionalIssuers = builder.Configuration.GetSection("JwtSettings:AdditionalIssuers").Exists()
	? builder.Configuration.GetSection("JwtSettings:AdditionalIssuers").Get<string[]>() ?? []
	: [];

var additionalAudiences = builder.Configuration.GetSection("JwtSettings:AdditionalAudiences").Exists()
	? builder.Configuration.GetSection("JwtSettings:AdditionalAudiences").Get<string[]>() ?? []
	: [];

// ===== Configurar CORS =====
builder.Services.AddCors(options =>
{
	options.AddPolicy("PermitirTodo",
		policy => policy.AllowAnyOrigin()
						.AllowAnyMethod()
						.AllowAnyHeader());
});

// ===== Agregar Controllers =====
builder.Services.AddControllers();

// ===== Configurar Autenticación JWT =====
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = false,
		ValidateAudience = false,
		ValidateLifetime = true,
		ValidateIssuerSigningKey = true,
		ValidIssuers = new[] { builder.Configuration["JwtSettings:Issuer"] }.Concat(additionalIssuers),
		ValidAudiences = new[] { builder.Configuration["JwtSettings:Audience"] }.Concat(additionalAudiences),
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"]))
	};
});

// ===== Configurar Swagger con JWT Bearer =====
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
	options.SwaggerDoc("v1", new OpenApiInfo { Title = "Loki(ta) API", Version = "v1" });

	options.EnableAnnotations(); // <-- Perú es clave.🏳️‍🌈

	options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
	{
		Name = "Authorization",
		Type = SecuritySchemeType.Http,
		Scheme = "Bearer",
		BearerFormat = "JWT",
		In = ParameterLocation.Header,
		Description = "Ingrese el token en el formato: Bearer {su_token}"
	});

	options.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			new OpenApiSecurityScheme
			{
				Reference = new OpenApiReference
				{
					Type = ReferenceType.SecurityScheme,
					Id = "Bearer"
				}
			},
			Array.Empty<string>()
		}
	});
});

// ===== Agregar Contextos de Bases de Datos =====
// Thor
builder.Services.AddDbContext<DbMemoryContextThor>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Thor_Memory")));
builder.Services.AddDbContext<DbCollectionContextThor>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Thor_Collection")));
builder.Services.AddDbContext<DbHistoryContextThor>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Thor_History")));
builder.Services.AddDbContext<DbAllocationContextThor>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Thor_Allocation")));

// Asura
builder.Services.AddDbContext<DbCollectionContextAsura>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Asura_Collection")));
builder.Services.AddDbContext<DbAllocationContextAsura>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Asura_Allocation")));
builder.Services.AddDbContext<DbHistoryContextAsura>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Asura_History")));
builder.Services.AddDbContext<DbMemoryContextAsura>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Asura_Memory")));
builder.Services.AddDbContext<BbvaVgpContext>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Asura_BBVA_VGP")));

// Cronoss
builder.Services.AddDbContext<DbAllocationContextCronoss>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Cronoss_Allocation")));
builder.Services.AddDbContext<DbCollectionContextCronoss>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Cronoss_Collection")));
builder.Services.AddDbContext<DbHistoryContextCronoss>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Cronoss_History")));
builder.Services.AddDbContext<DbMemoryContextCronoss>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Cronoss_Memory")));

// Mictlan
builder.Services.AddDbContext<DbAllocationContextMictlan>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Mictlantecuhtli_Allocation")));
builder.Services.AddDbContext<DbHistoryContextMictlan>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Mictlantecuhtli_History")));
builder.Services.AddDbContext<DbMemoryContextMictlan>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Mictlantecuhtli_Memory")));

// Gaia
builder.Services.AddDbContext<DbAllocationContextGaia>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Gaia_Allocation")));
builder.Services.AddDbContext<DbCollectionContextGaia>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Gaia_Collection")));
builder.Services.AddDbContext<DbHistoryContextGaia>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Gaia_History")));
builder.Services.AddDbContext<DbMemoryContextGaia>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Gaia_Memory")));

// Hades
builder.Services.AddDbContext<DbAllocationContextHades>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Hades_Allocation")));
builder.Services.AddDbContext<DbCollectionContextHades>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Hades_Collection")));
builder.Services.AddDbContext<DbHistoryContextHades>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Hades_History")));
builder.Services.AddDbContext<DbMemoryContextHades>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Hades_Memory")));

// Izalith
builder.Services.AddDbContext<DbCollectionContextIzalith>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Izalith_Collection")));
builder.Services.AddDbContext<DbAllocationContextIzalith>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Izalith_Allocation")));
builder.Services.AddDbContext<DbHistoryContextIzalith>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Izalith_History")));
builder.Services.AddDbContext<DbMemoryContextIzalith>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Izalith_Memory")));

// Albaz
builder.Services.AddDbContext<DbCollectionContextAlbaz>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Albaz_Collection")));
builder.Services.AddDbContext<DbAllocationContextAlbaz>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Albaz_Allocation")));
builder.Services.AddDbContext<DbHistoryContextAlbaz>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Albaz_History")));
builder.Services.AddDbContext<DbMemoryContextAlbaz>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Albaz_Memory")));


// ===== Servicios personalizados =====
builder.Services.AddScoped<CoorinWeb.Loki.Mark.Auth.DAOs.DaoBase>();
builder.Services.AddScoped<AuthDAOs>();
builder.Services.AddScoped<IDbContextFactory, CustomDbContextFactory>();
builder.Services.AddScoped<IAuthInterfaces,
	AuthDAOs>();
builder.Services.AddScoped<IArrepentimientosService, ArrepentimientosService>();
builder.Services.AddScoped<IProductividadService, ProductividadService>();
builder.Services.AddScoped<ICampaniasService, CampaniasService>();
builder.Services.AddScoped<ICampaniasDao, Campanias>();
builder.Services.AddScoped<ICarterasService, CarterasService>();
builder.Services.AddScoped<ICarterasDAOs, CarterasDao>();
builder.Services.AddScoped<ISesionesService, SesionesService>();
builder.Services.AddScoped<ICatalogosService, CatalogosService>();
builder.Services.AddScoped<IEncargadosService, EncargadosService>();
builder.Services.AddScoped<IValidadoresDAOs, ValidadoresDao>();
builder.Services.AddScoped<IValidadoresService, ValidadoresServices>();
builder.Services.AddScoped<IMetasService, MetasService>();
builder.Services.AddScoped<IMetasDAOs, MetasDao>();
builder.Services.AddScoped<IListaNegraDao, ListaNegraDao>();
builder.Services.AddScoped<IInfoEjecutivoDao, InfoEjecutivoDao>();
builder.Services.AddScoped<IListaNegraService, ListaNegraService>();
builder.Services.AddScoped<IArrepentimientosService, ArrepentimientosService>();
builder.Services.AddScoped<IProductividadService, ProductividadService>();
builder.Services.AddScoped<CamposPantallaDao>();
builder.Services.AddScoped<ICamposPantallaService, CamposPantallaService>();
builder.Services.AddScoped<IHistoricoService, HistoricoService>();
builder.Services.AddScoped<CustomDbContextFactory>();



builder.Services.AddScoped<TuAplicacion.Services.ReporteGeneradorService>();
builder.Services.AddScoped<IHistoricoService, HistoricoService>();
builder.Services.AddScoped<IHistoricoDao, HistoricoDao>();
builder.Services.AddScoped<IPlantillasCorreoService, PlantillasCorreoService>();
builder.Services.AddScoped<IPlantillasCorreoDao, PlantillasCorreoDao>();
builder.Services.AddScoped<IBusqueda, BusquedasService>();
builder.Services.AddScoped<EjecutivoDao>();
// En Program.cs, cambia a:
builder.Services.AddSingleton<Loki.Global.ExcelGeneratorService>();
// ===== Registro de servicio para compresión de archivos =====
builder.Services.AddResponseCompression(options =>
{
	options.EnableForHttps = true;
	options.Providers.Add<GzipCompressionProvider>();
});
builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
	options.Level = System.IO.Compression.CompressionLevel.Fastest; // O Optimal
});


// Registro del servicio de encriptación/desencriptación.
builder.Services.AddSingleton(provider => new RSAServices(builder.Configuration));

// ===== App =====
var app = builder.Build();

// Middleware
app.UseSwagger(options =>
{
	options.RouteTemplate = "/openapi/{documentName}.json";
});

app.MapScalarApiReference(options =>
{
	options
		.WithPreferredScheme("Bearer")
		.WithTitle("Loki(ta)API")
		//.WithTheme(ScalarTheme.Mars)
		.WithTheme(ScalarTheme.BluePlanet)
		//.WithTheme(ScalarTheme.DeepSpace)
		.WithDarkMode(true)
		.WithSidebar(true);
});

app.UseHttpsRedirection();
app.UseCors("PermitirTodo");
app.UseResponseCompression();

app.UseAuthentication();
app.UseAuthorization();

app.UseRequestLogger(); // Agrega esta línea aquí (o en una posición temprana)
app.UseGlobalErrorHandler();
//app.UseEncryption();
app.MapControllers();

// Endpoint base opcional
//app.MapGet("/", () => "Ohai, Loki API.");

await app.RunAsync();
//versión estable.
