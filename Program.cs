using CoorinWeb.Loki.Global;
// Utilizables
using CoorinWeb.Loki.Mark.Auth.DAOs;
using CoorinWeb.Loki.Mark.Auth.DAOs.AuthDAOs;
using CoorinWeb.Loki.Mark.Auth.Interfaces;
using GaiaLibrary.ModelsDbAllocation;
using GaiaLibrary.ModelsDbCollection;
using GaiaLibrary.ModelsDbHistory;
// This file is part of Gaia
using GaiaLibrary.ModelsDbMemory;
// This file is part of Hades
using HadesLibrary.ModelsDbAllocation;
using HadesLibrary.ModelsDbCollection;
using HadesLibrary.ModelsDbHistory;
using HadesLibrary.ModelsDbMemory;
using Loki.AlbazLibrary;
using Loki.AsuraLibrary.ModelsAllocation;
// This file is part of Asura
using Loki.AsuraLibrary.ModelsBBVA_VGP;
using Loki.AsuraLibrary.ModelsCollection;
using Loki.AsuraLibrary.ModelsHistory;
using Loki.AsuraLibrary.ModelsMemory;
// This file is part of Cronoss
using Loki.DbAllocation.ModelsCronoss;
using Loki.DbCollection.ModelsCronoss;
using Loki.DbHistory.ModelsCronoss;
using Loki.DbMemory.ModelsCronoss;
using Loki.EncryptorDecryptor;
using Loki.Global;
using Loki.Global.DAOs;
using Loki.Mark.Administracion.Campanias.DAOs;
using Loki.Mark.Administracion.Campanias.Interfaces;
using Loki.Mark.Administracion.Carteras.DAOs;
using Loki.Mark.Administracion.Carteras.Interfaces;
using Loki.Mark.Administracion.Carteras.Services;
//using Loki.Mark.Administracion.Campanias.Services;
using Loki.Mark.Administracion.Consulta.Arrepentimientos.Interfaces;
using Loki.Mark.Administracion.Ejecutivos.Encargados.Interfaces;
using Loki.Mark.Administracion.Ejecutivos.Encargados.Services;
using Loki.Mark.Administracion.Ejecutivos.Metas.DAOs;
using Loki.Mark.Administracion.Ejecutivos.Metas.Interfaces;
using Loki.Mark.Administracion.Ejecutivos.Metas.Services;
using Loki.Mark.Administracion.Ejecutivos.Sesiones.Interfaces;
using Loki.Mark.Administracion.Ejecutivos.Sesiones.Services;
using Loki.Mark.Administracion.Ejecutivos.Validadores.DAOs;
using Loki.Mark.Administracion.Ejecutivos.Validadores.Interfaces;
using Loki.Mark.Administracion.Ejecutivos.Validadores.Services;
using Loki.Mark.Administracion.Gespa.CamposPantalla.DAOs;
using Loki.Mark.Administracion.Gespa.CamposPantalla.Interfaces;
using Loki.Mark.Administracion.Gespa.CamposPantalla.Services;
using Loki.Mark.Administracion.Gespa.Catalogos.Interfaces;
using Loki.Mark.Administracion.Gespa.Catalogos.Services;
using Loki.Mark.Administracion.Gespa.Frases.Interfaces;
using Loki.Mark.Administracion.Gespa.Frases.Services;
using Loki.Mark.Administracion.Gespa.Scripts.Interfaces;
using Loki.Mark.Administracion.Gespa.Scripts.Services;
using Loki.Mark.Captura.Visitas.DAOs;
using Loki.Mark.Captura.Visitas.Services;
using Loki.Mark.Consulta.Arrepentimientos.Services;
using Loki.Mark.Consulta.Cuenta.Interfaces;
using Loki.Mark.Consulta.Cuenta.Services;
using Loki.Mark.Consulta.Generales.DAOs;
using Loki.Mark.Consulta.Generales.Interfaces;
using Loki.Mark.Consulta.Generales.Services;
using Loki.Mark.Consulta.Historico.DAOs;
using Loki.Mark.Consulta.Historico.Interfaces;
using Loki.Mark.Consulta.Historico.Services;
using Loki.Mark.Consulta.Informacion.Busquedas.DAOs;
using Loki.Mark.Consulta.Informacion.Busquedas.Interfaces;
using Loki.Mark.Consulta.Informacion.Busquedas.Services;
using Loki.Mark.Consulta.Informacion.Comentarios.DAOs;
using Loki.Mark.Consulta.Informacion.Comentarios.Services;
using Loki.Mark.Consulta.Informacion.Correos.DAOs;
using Loki.Mark.Consulta.Informacion.Correos.Interfaces;
using Loki.Mark.Consulta.Informacion.Correos.Services;
using Loki.Mark.Consulta.Informacion.DatosErroneos.DAOs;
using Loki.Mark.Consulta.Informacion.DatosErroneos.Interfaces;
using Loki.Mark.Consulta.Informacion.DatosErroneos.Services;
using Loki.Mark.Consulta.Informacion.Domicilios.DAOs;
using Loki.Mark.Consulta.Informacion.Domicilios.Interfaces;
using Loki.Mark.Consulta.Informacion.Domicilios.Services;
using Loki.Mark.Consulta.Informacion.Ofrecimientos.DAOs;
using Loki.Mark.Consulta.Informacion.Ofrecimientos.Services;
using Loki.Mark.Consulta.Informacion.Pagos.DAOs;
using Loki.Mark.Consulta.Informacion.Pagos.Interfaces;
using Loki.Mark.Consulta.Informacion.Pagos.Services;
using Loki.Mark.Consulta.Informacion.PagosReportados.DAOs;
using Loki.Mark.Consulta.Informacion.PagosReportados.Interfaces;
using Loki.Mark.Consulta.Informacion.PagosReportados.Services;
using Loki.Mark.Consulta.ListaNegra.DAOs;
using Loki.Mark.Consulta.ListaNegra.Interfaces;
using Loki.Mark.Consulta.ListaNegra.Services;
using Loki.Mark.Consulta.PlantillasCorreo.DAOs;
//using Loki.Mark.Consulta.Historico.DAOs;
using Loki.Mark.Consulta.PlantillasCorreo.Interfaces;
using Loki.Mark.Consulta.PlantillasCorreo.Services;
using Loki.Mark.Consulta.Productividad.Interfaces;
using Loki.Mark.Consulta.Productividad.Services;
using Loki.Mark.Procesos.Accionamientos.Carteo.DAOs;
using Loki.Mark.Procesos.Accionamientos.Carteo.Interfaces;
using Loki.Mark.Procesos.Accionamientos.Carteo.Services;
using Loki.Mark.Procesos.Accionamientos.Informe.DAOs;
using Loki.Mark.Procesos.Accionamientos.Informe.Interfaces;
using Loki.Mark.Procesos.Accionamientos.Informe.Services;
using Loki.Mark.Procesos.Gespa.Arrepentimientos.DAOs;
using Loki.Mark.Procesos.Gespa.Arrepentimientos.Interfaces;
using Loki.Mark.Procesos.Gespa.Bloqueo_cuentas.DAOs;
using Loki.Mark.Procesos.Gespa.Bloqueo_cuentas.Interfaces;
using Loki.Mark.Procesos.Gespa.Cargo_en_linea.DAOs;
using Loki.Mark.Procesos.Gespa.Cargo_en_linea.Interfaces;
using Loki.Mark.Procesos.Gespa.Comentarios.DAOs;
using Loki.Mark.Procesos.Gespa.Comentarios.Interfaces;
using Loki.Mark.Procesos.Gespa.Definicion.DAOs;
using Loki.Mark.Procesos.Gespa.Definicion.Interfaces;
using Loki.Mark.Procesos.Gespa.Estados_de_cuenta.DAOs;
using Loki.Mark.Procesos.Gespa.Estados_de_cuenta.Interfaces;
using Loki.Mark.Procesos.Gestiones.DAOs;
using Loki.Mark.Procesos.Gestiones.Interfaces;
using Loki.Mark.Procesos.Gestiones.Services;
using Loki.Mark.Procesos.Metas.DAOs;
using Loki.Mark.Procesos.Metas.Interfaces;
using Loki.Mark.Procesos.Metas.Services;
using Loki.Mark.Procesos.Procesos.DAOs;
using Loki.Mark.Procesos.Procesos.Interfaces;
using Loki.Mark.Procesos.Procesos.Services;
using Loki.Mark.Procesos.Visitas.Carga.DAOs;
using Loki.Mark.Procesos.Visitas.Carga.Services;
using Loki.Mark.Procesos.Visitas.Consulta.DAOs;
using Loki.Mark.Procesos.Visitas.Consulta.Services;
using Loki.Mark.Reportes.Cliente.DAOs;
using Loki.Mark.Reportes.Cliente.Services;
using Loki.Mark.Reportes.DiaDelEjecutivo.DAOs;
using Loki.Mark.Reportes.DiaDelEjecutivo.Interfaces;
using Loki.Mark.Reportes.Ejecutivos.DAOs;
using Loki.Mark.Reportes.Ejecutivos.Services;
using Loki.Mark.Reportes.Productividad.DAOs;
using Loki.Middleware;
// This file is part Mictlan
using Loki.ModelsDbAllocationMictlan;
using Loki.ModelsDbHistoryMictlan;
using Loki.ModelsDbMemoryMictlan;
// This file is NOT part of Orochi (it actually is, but we're poking fun at non-english-speaking fellas xd).
using Loki.OrochiLibrary.Allocation;
using Loki.OrochiLibrary.Collection;
using Loki.OrochiLibrary.History;
using Loki.OrochiLibrary.Memory;
// This file is part of Thor
using Loki.ThorLibrary.ModelsAllocation;
using Loki.ThorLibrary.ModelsCollection;
using Loki.ThorLibrary.ModelsHistory;
using Loki.ThorLibrary.ModelsMemory;
// This file is part of


using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Scalar.AspNetCore;
using Serilog;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection;
using System.Text;
using System.Text.Json;
using BusquedasService = Loki.Mark.Consulta.Cuenta.Services.BusquedasService;
using CatalogosService = Loki.Mark.Administracion.Gespa.Catalogos.Services.CatalogosService;
using MetasDao = Loki.Mark.Administracion.Ejecutivos.Metas.DAOs.MetasDao;
using MetasService = Loki.Mark.Administracion.Ejecutivos.Metas.Services.MetasService;




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

    options.ExampleFilters();

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

    //filtros para ordenar la API
    options.DocumentFilter<TagOrderDocumentFilter>(new List<string>
{
    "Auth",

    // Grupo: Administración
     "Administración - campanias",
    "Administración - Campañas",
    "Administración - Carteras",
    "Administración - InfoEjecutivo",
    "Administración - Encargados",
    "Administración - Metas",
    "Administración - Sesiones",
    "Administración - Validadores",
    "Administración - CamposPantalla",
    "Administración - Catalogos",
    "Administración - Frases",
    "Administración - Scripts",

    // Grupo: Consulta
    "Consulta - Arrepentimientos",
    "Consulta - Busqueda",
    "Consulta - Catalogo",
    "Consulta - Reportes",
    "Consulta - Generales",
    "Consulta - Historico",
    "Consulta - BusquedaInfo",
    "Consulta - Comentarios",
    "Consulta - Correos",
    "Consulta - DatosErroneos",
    "Consulta - Domicilios",
    "Consulta - Ofrecimientos",
    "Consulta - Pagos",
    "Consulta - PagosReportados",
    "Consulta - ListaNegra",
    "Consulta - PlantillasCorreo",
    "Consulta - Productividad",

    // Grupo: Procesos
    "Procesos - CapturaVisitas",
    "Procesos - ArrepentimientosGespa",
    "Procesos - BloqueoCuentasGespa",
    "Procesos - CargoEnLineaGespa",
    "Procesos - Comentarios",
    "Procesos - DefinicionGespaBusca",
    "Procesos - EstadosDeCuentaGespa",
    "Procesos - Gestiones",
    "Procesos - Metas",
    "Procesos - Supervisores",

    // Grupo: Reportes
    "Reportes - ReportesCliente",
    "Reportes - DiaDelEjecutivo",
    "Reportes - ReporteEjecutivos",
    "Reportes - ProductividadInfo",

    "Auditoria"
});
});

#region Contextos
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

// Orochi
builder.Services.AddDbContext<DbAllocationContextOrochi>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Orochi_Allocation")));
builder.Services.AddDbContext<DbCollectionContextOrochi>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Orochi_Collection")));
builder.Services.AddDbContext<DbHistoryContextOrochi>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Orochi_History")));
builder.Services.AddDbContext<DbMemoryContextOrochi>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Orochi_Memory")));

// Albaz
builder.Services.AddDbContext<DbCollectionContextAlbaz>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Albaz_Collection")));
builder.Services.AddDbContext<DbAllocationContextAlbaz>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Albaz_Allocation")));
builder.Services.AddDbContext<DbHistoryContextAlbaz>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Albaz_History")));
builder.Services.AddDbContext<DbMemoryContextAlbaz>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Albaz_Memory")));
#endregion

// ===== Servicios personalizados =====
#region Global
builder.Services.AddScoped<DaoBase>();
builder.Services.AddScoped<AuthDAOs>();
builder.Services.AddScoped<IDbContextFactory, CustomDbContextFactory>();
builder.Services.AddScoped<IAuthInterfaces, AuthDAOs>();
builder.Services.AddScoped<CustomDbContextFactory>();
builder.Services.AddScoped<IQueryGeneratorService, QueryGeneratorService>();
builder.Services.AddScoped<IConsultaConfigDAO, ConsultaConfigDAO>();
#endregion

#region Administración

#region Carteras
builder.Services.AddScoped<ICampaniasService, CampaniasService>();
builder.Services.AddScoped<ICampaniasDao, Campanias>();
builder.Services.AddScoped<ICarterasService, CarterasService>();
builder.Services.AddScoped<ICarterasDAOs, CarterasDao>();
#endregion

#region Ejecutivos
builder.Services.AddScoped<EjecutivoDao>();
builder.Services.AddScoped<IInfoEjecutivoDao, InfoEjecutivoDao>();
//validadores
builder.Services.AddScoped<IValidadoresDAOs, ValidadoresDao>();
builder.Services.AddScoped<IValidadoresService, ValidadoresServices>();
//metas
builder.Services.AddScoped<Loki.Mark.Administracion.Ejecutivos.Metas.Interfaces.IMetasService, MetasService>();
builder.Services.AddScoped<IMetasDAOs, MetasDao>();
//encargados
builder.Services.AddScoped<IEncargadosService, EncargadosService>();
//sesiones
builder.Services.AddScoped<ISesionesService, SesionesService>();
#endregion

#region Gespa
//campos pantalla
builder.Services.AddScoped<CamposPantallaDao>();
builder.Services.AddScoped<ICamposPantallaService, CamposPantallaService>();
//scripts
builder.Services.AddScoped<IScriptsDAO, Loki.Mark.Administracion.Gespa.Scripts.DAOs.ScriptsDAO>();
builder.Services.AddScoped<IScriptService, ScriptService>();
//plantillas correo
builder.Services.AddScoped<IPlantillasCorreoService, PlantillasCorreoService>();
builder.Services.AddScoped<IPlantillasCorreoDao, PlantillasCorreoDao>();
//frases
builder.Services.AddScoped<IFrases, Loki.Mark.Administracion.Gespa.Frases.DAOs.FrasesDao>();
builder.Services.AddScoped<IFrasesService, FrasesServices>();

#endregion

#endregion

#region Consulta
//cuentas
builder.Services.AddScoped<IBusqueda, BusquedasService>();
builder.Services.AddScoped<ICatalogosService, CatalogosService>();
builder.Services.AddScoped<ICatalogosServiceRe, Loki.Mark.Consulta.Cuenta.Services.CatalogosService>();
builder.Services.AddScoped<Loki.Mark.Consulta.Cuenta.Interfaces.ICatalogosServiceRe,
                   Loki.Mark.Consulta.Cuenta.Services.CatalogosService>();
builder.Services.AddScoped<ICatalogosService, CatalogosService>();
//generales
builder.Services.AddScoped<IGeneralesService, GeneralesServices>();
builder.Services.AddScoped<IGeneralesDao, GeneralesDao>();
#region Información

builder.Services.AddScoped<IPagosService, PagosService>();
builder.Services.AddScoped<IPagosDAO, PagosDAO>();

builder.Services.AddScoped<IPagosReportadosService, PagosReportadosService>();
builder.Services.AddScoped<IPagosReportadosDAO, PagosReportadosDAO>();

builder.Services.AddScoped<IDatosErroneosService, DatosErroneosService>();
builder.Services.AddScoped<IDatosErroneosDAO, DatosErroneosDAO>();

builder.Services.AddScoped<IDomiciliosService, DomiciliosService>();
builder.Services.AddScoped<IDomiciliosDAO, DomiciliosDAO>();

builder.Services.AddScoped<ICorreosService, CorreosService>();
builder.Services.AddScoped<ICorreosDAO, CorreosDAO>();

builder.Services.AddScoped<IBusquedasInfoService, Loki.Mark.Consulta.Informacion.Busquedas.Services.BusquedasInfoService>();
builder.Services.AddScoped<IBusquedasInfoDAO, BusquedasInfoDAO>();

builder.Services.AddScoped<IOfrecimientosService, OfrecimientosService>();
builder.Services.AddScoped<IOfrecimientosDAO, OfrecimientosDAO>();

builder.Services.AddScoped<IComentariosInfoService, ComentariosInfoService>();
builder.Services.AddScoped<IComentariosInfoDAO, ComentariosInfoDAO>();

#endregion

#region Historico
builder.Services.AddScoped<IHistoricoService, HistoricoService>();
builder.Services.AddScoped<IHistoricoDao, HistoricoDao>();
builder.Services.AddScoped<IHistoricoService, HistoricoService>();
#endregion

//productividad
builder.Services.AddScoped<IProductividadService, ProductividadService>();
builder.Services.AddScoped<IProductividadService, ProductividadService>();

#region Lista Negra
builder.Services.AddScoped<IListaNegraDao, ListaNegraDao>();
builder.Services.AddScoped<IListaNegraService, ListaNegraService>();
#endregion

#region Arrepentimientos
builder.Services.AddScoped<IArrepentimientosService, ArrepentimientosService>();
builder.Services.AddScoped<IArrepentimientosService, ArrepentimientosService>();
#endregion

#endregion

#region Procesos

#region Gespa
builder.Services.AddScoped<IComentariosGespaDAOs, ComentariosGespaDAOs>();//padrino
builder.Services.AddScoped<IDefinicionGespaBuscaDAOs, DefinicionGespaBusquedaDAOs>();//padrino
builder.Services.AddScoped<IArrepentimientosGespaDAOs, ArrepentimientosGespaBusquedaDAOs>();//padrino
builder.Services.AddScoped<IBloqueoCuentasGespaDAOs, BloqueoCuentasGespaDAOs>();//padrino
builder.Services.AddScoped<ICargoEnLineaGespaDAOs, CargoEnLineaGespaDAOs>();//padrino
builder.Services.AddScoped<IEstadosDeCuentaGespaDAOs, EstadosDeCuentaGespaDAOs>();//padrino
builder.Services.AddScoped<IDiaDelEjecutivoDAOs, DiaDelEjecutivoDAOs>();//padrino
#endregion

#region Visitas
builder.Services.AddScoped<IConsultaVisitasService, ConsultaVisitasService>();
builder.Services.AddScoped<IConsultaVisitasDAO, ConsultaVisitasDAO>();

builder.Services.AddScoped<ICapturaVisitasService, CapturaVisitasService>();
builder.Services.AddScoped<ICapturaVisitasDAO, CapturaVisitasDAO>();

builder.Services.AddScoped<ICargaVisitasService, CargaVisitasService>();
builder.Services.AddScoped<ICargaVisitasDAO, CargaVisitasDAO>();

#endregion
//supervidor
builder.Services.AddScoped<ISupervisorService, SupervisorService>();
builder.Services.AddScoped<ISupervisorDao, SupervisorDao>();
//gestiones
builder.Services.AddScoped<IGestionesService, GestionesService>();
builder.Services.AddScoped<IGestionesDao, GestionesDao>();
//metas
builder.Services.AddScoped<Loki.Mark.Procesos.Metas.Interfaces.IMetasService, Loki.Mark.Procesos.Metas.Services.MetasService>();
builder.Services.AddScoped<Loki.Mark.Procesos.Metas.Interfaces.IMetasDao, Loki.Mark.Procesos.Metas.DAOs.MetasDao>();
#endregion

#region Accionamientos
//Procesos -> Accionamientos -> Informe
builder.Services.AddScoped<IInformeService, InformeService>();
builder.Services.AddScoped<IInformeDAO, InformeDAO>();

builder.Services.AddScoped<ICarteoService, CarteoService>();
builder.Services.AddScoped<ICarteoDAO, CarteoDAO>();
#endregion


#region Reportes

builder.Services.AddScoped<IReportesClienteService, ReportesClienteService>();
builder.Services.AddScoped<IReportesClienteDAO, ReportesClienteDAO>();

builder.Services.AddScoped<IProductividadService, ProductividadService>();
builder.Services.AddScoped<IProductividadInfoDAO, ProductividadInfoDAO>();

builder.Services.AddScoped<IReporteEjecutivosService, ReporteEjecutivosService>();
builder.Services.AddScoped<IReporteEjecutivosDAO, ReporteEjecutivosDAO>();

#endregion


#region Ejemplos de Swagger

builder.Services.AddSwaggerExamplesFromAssemblies(Assembly.GetEntryAssembly());

#endregion

// En Program.cs, cambia a:
builder.Services.AddSingleton<Loki.Global.ExcelGeneratorService>();
builder.Services.AddScoped<AccionamientosQueryHelper>();

// Configuración de JSON para que distinga entre mayúsculas y minúsculas
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = false;
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });



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
