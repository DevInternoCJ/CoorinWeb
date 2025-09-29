using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Loki.AsuraLibrary.ModelsAllocation;

public partial class DbAllocationContextAsura : DbContext
{
    public DbAllocationContextAsura()
    {
    }

    public DbAllocationContextAsura(DbContextOptions<DbAllocationContextAsura> options)
        : base(options)
    {
    }

    public virtual DbSet<Accione> Acciones { get; set; }

    public virtual DbSet<AdoNetDestination> AdoNetDestinations { get; set; }

    public virtual DbSet<AsigProducto17> AsigProducto17s { get; set; }

    public virtual DbSet<AsigProducto22> AsigProducto22s { get; set; }

    public virtual DbSet<AsigProducto22Int> AsigProducto22Ints { get; set; }

    public virtual DbSet<Banbajio200> Banbajio200s { get; set; }

    public virtual DbSet<Banbajio200Comentario> Banbajio200Comentarios { get; set; }

    public virtual DbSet<Basenu> Basenus { get; set; }

    public virtual DbSet<Basetelnu> Basetelnus { get; set; }

    public virtual DbSet<CamposAdicionale> CamposAdicionales { get; set; }

    public virtual DbSet<CamposAsig> CamposAsigs { get; set; }

    public virtual DbSet<CamposCondicionado> CamposCondicionados { get; set; }

    public virtual DbSet<CamposTxt> CamposTxts { get; set; }

    public virtual DbSet<CargasAlCliente> CargasAlClientes { get; set; }

    public virtual DbSet<Cartera> Carteras { get; set; }

    public virtual DbSet<Cfcredit> Cfcredits { get; set; }

    public virtual DbSet<Cfllamadas120> Cfllamadas120s { get; set; }

    public virtual DbSet<CorreosNu> CorreosNus { get; set; }

    public virtual DbSet<CuentasAcción> CuentasAccións { get; set; }

    public virtual DbSet<CuentasEspeciale> CuentasEspeciales { get; set; }

    public virtual DbSet<CuentasQueja> CuentasQuejas { get; set; }

    public virtual DbSet<CuentasQuejaHistorial> CuentasQuejaHistorials { get; set; }

    public virtual DbSet<CódigosPostale> CódigosPostales { get; set; }

    public virtual DbSet<Doms8203703> Doms8203703s { get; set; }

    public virtual DbSet<Doms8203708> Doms8203708s { get; set; }

    public virtual DbSet<Doms8203712> Doms8203712s { get; set; }

    public virtual DbSet<Doms8203719> Doms8203719s { get; set; }

    public virtual DbSet<Ejecucione> Ejecuciones { get; set; }

    public virtual DbSet<EncuestaCliente> EncuestaClientes { get; set; }

    public virtual DbSet<EquivalenciasAtt> EquivalenciasAtts { get; set; }

    public virtual DbSet<EquivalenciasAttAct> EquivalenciasAttActs { get; set; }

    public virtual DbSet<EquivalenciasViciDialEst> EquivalenciasViciDialEsts { get; set; }

    public virtual DbSet<FechasAsignaciónOficial> FechasAsignaciónOficials { get; set; }

    public virtual DbSet<GestionesHsbcatcTdc> GestionesHsbcatcTdcs { get; set; }

    public virtual DbSet<HistoricoCuenta> HistoricoCuentas { get; set; }

    public virtual DbSet<Hsbc600> Hsbc600s { get; set; }

    public virtual DbSet<HsbcCifrasControlAsigTot> HsbcCifrasControlAsigTots { get; set; }

    public virtual DbSet<HsbcCifrasControlClass> HsbcCifrasControlClasses { get; set; }

    public virtual DbSet<HsbcCifrasControlKronerTdc> HsbcCifrasControlKronerTdcs { get; set; }

    public virtual DbSet<HsbcCifrasControlOrg> HsbcCifrasControlOrgs { get; set; }

    public virtual DbSet<HsbcPagosVencidum> HsbcPagosVencida { get; set; }

    public virtual DbSet<HsbcTelefonosCyber> HsbcTelefonosCybers { get; set; }

    public virtual DbSet<IftTeléfono> IftTeléfonos { get; set; }

    public virtual DbSet<IntentosNu> IntentosNus { get; set; }

    public virtual DbSet<Job> Jobs { get; set; }

    public virtual DbSet<Layout> Layouts { get; set; }

    public virtual DbSet<LogArchivo> LogArchivos { get; set; }

    public virtual DbSet<LogAsignación> LogAsignacións { get; set; }

    public virtual DbSet<LogIngreso> LogIngresos { get; set; }

    public virtual DbSet<LogProceso> LogProcesos { get; set; }

    public virtual DbSet<PadresHijo> PadresHijos { get; set; }

    public virtual DbSet<Pago28203711> Pago28203711s { get; set; }

    public virtual DbSet<Pago33203700> Pago33203700s { get; set; }

    public virtual DbSet<Pago57203701> Pago57203701s { get; set; }

    public virtual DbSet<Pago70> Pago70s { get; set; }

    public virtual DbSet<Pago7203715> Pago7203715s { get; set; }

    public virtual DbSet<Pago8203707> Pago8203707s { get; set; }

    public virtual DbSet<PagosAtt> PagosAtts { get; set; }

    public virtual DbSet<PagosNegativo> PagosNegativos { get; set; }

    public virtual DbSet<Proceso> Procesos { get; set; }

    public virtual DbSet<Productividad> Productividads { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<PruebaBanorte> PruebaBanortes { get; set; }

    public virtual DbSet<RegresosCurrent> RegresosCurrents { get; set; }

    public virtual DbSet<RelacionDomiciliosHsbc> RelacionDomiciliosHsbcs { get; set; }

    public virtual DbSet<RespaldoMacro> RespaldoMacros { get; set; }

    public virtual DbSet<RespaldoPyme> RespaldoPymes { get; set; }

    public virtual DbSet<Tels57203698> Tels57203698s { get; set; }

    public virtual DbSet<Tels7203694> Tels7203694s { get; set; }

    public virtual DbSet<Tels74203695> Tels74203695s { get; set; }

    public virtual DbSet<Tels8203705> Tels8203705s { get; set; }

    public virtual DbSet<Tels8203710> Tels8203710s { get; set; }

    public virtual DbSet<Tels8203713> Tels8203713s { get; set; }

    public virtual DbSet<Tels8203720> Tels8203720s { get; set; }

    public virtual DbSet<TeléfonosAllocation> TeléfonosAllocations { get; set; }

    public virtual DbSet<TeléfonosComplemento> TeléfonosComplementos { get; set; }

    public virtual DbSet<TempMacrovencidum> TempMacrovencida { get; set; }

    public virtual DbSet<TempPagosCastigoval> TempPagosCastigovals { get; set; }

    public virtual DbSet<TiposCampo> TiposCampos { get; set; }

    public virtual DbSet<UsuariosCyber> UsuariosCybers { get; set; }

    public virtual DbSet<Vici> Vicis { get; set; }

    public virtual DbSet<Vici2> Vici2s { get; set; }

    public virtual DbSet<Vicito> Vicitos { get; set; }

    public virtual DbSet<Vicitotal> Vicitotals { get; set; }

    public virtual DbSet<Vicivacio> Vicivacios { get; set; }

    public virtual DbSet<ViewRandom> ViewRandoms { get; set; }

    public virtual DbSet<VwCarterasProducto> VwCarterasProductos { get; set; }

    public virtual DbSet<VwEjecucionesDetalle> VwEjecucionesDetalles { get; set; }

    public virtual DbSet<VwLogAsignación> VwLogAsignacións { get; set; }

    public virtual DbSet<VwProductosFechaInicial> VwProductosFechaInicials { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=192.168.7.123; database=dbAllocation; uid=login_ejecutor; pwd=3j3123/*-; encrypt=true;trustservercertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Modern_Spanish_CI_AI");

        modelBuilder.Entity<Accione>(entity =>
        {
            entity.HasKey(e => e.IdAcción);

            entity.Property(e => e.IdAcción).HasColumnName("idAcción");
            entity.Property(e => e.Acción)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Detalle)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<AdoNetDestination>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ADO NET Destination");

            entity.Property(e => e.Confirmado).HasMaxLength(255);
            entity.Property(e => e.IdCartera)
                .HasMaxLength(255)
                .HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(255)
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdOrigen)
                .HasMaxLength(255)
                .HasColumnName("idOrigen");
            entity.Property(e => e.IdTelefonía)
                .HasMaxLength(255)
                .HasColumnName("idTelefonía");
            entity.Property(e => e.NúmeroTelefónico).HasMaxLength(255);
        });

        modelBuilder.Entity<AsigProducto17>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ASIG_Producto_17", "Temp");

            entity.Property(e => e.AgenciaDeCobranzaAyer)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA DE COBRANZA AYER");
            entity.Property(e => e.AgenciaDeCobranzaHoy)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA DE COBRANZA HOY");
            entity.Property(e => e.Behaviour)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BEHAVIOUR");
            entity.Property(e => e.C)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Carpeta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CARPETA");
            entity.Property(e => e.CarpetaAnterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CARPETA ANTERIOR");
            entity.Property(e => e.CarpetaAyer)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CARPETA AYER");
            entity.Property(e => e.CarpetaHoy)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CARPETA HOY");
            entity.Property(e => e.Cliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLIENTE");
            entity.Property(e => e.CuentaPorCobrar)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CUENTA POR COBRAR");
            entity.Property(e => e.DiasDeAtraso)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS DE ATRASO");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTADO");
            entity.Property(e => e.Etiqueta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ETIQUETA");
            entity.Property(e => e.FacturaMasAntigua)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FACTURA MAS ANTIGUA");
            entity.Property(e => e.FechaDeAlta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA DE ALTA");
            entity.Property(e => e.FechaDeAsignacionAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA DE ASIGNACION AGENCIA");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NOMBRE");
            entity.Property(e => e.Risk)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RISK");
            entity.Property(e => e.SaldoCarteraVencida)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO CARTERA VENCIDA");
        });

        modelBuilder.Entity<AsigProducto22>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ASIG_Producto_22", "Temp");

            entity.Property(e => e.CallDate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("call_date");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("status");
        });

        modelBuilder.Entity<AsigProducto22Int>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ASIG_Producto_22_INT", "Temp");

            entity.Property(e => e.Address1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address1");
            entity.Property(e => e.Address2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address2");
            entity.Property(e => e.Address3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address3");
            entity.Property(e => e.AltPhone)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("alt_phone");
            entity.Property(e => e.CalledCount)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("called_count");
            entity.Property(e => e.CalledSinceLastReset)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("called_since_last_reset");
            entity.Property(e => e.City)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("city");
            entity.Property(e => e.Comments)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comments");
            entity.Property(e => e.CountryCode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("country_code");
            entity.Property(e => e.DateOfBirth)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("date_of_birth");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.EntryDate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("entry_date");
            entity.Property(e => e.EntryListId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("entry_list_id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("first_name");
            entity.Property(e => e.Gender)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("gender");
            entity.Property(e => e.GmtOffsetNow)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("gmt_offset_now");
            entity.Property(e => e.LastLocalCallTime)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("last_local_call_time");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("last_name");
            entity.Property(e => e.LeadId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lead_id");
            entity.Property(e => e.ListId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("list_id");
            entity.Property(e => e.MiddleInitial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("middle_initial");
            entity.Property(e => e.ModifyDate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("modify_date");
            entity.Property(e => e.Owner)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("owner");
            entity.Property(e => e.PhoneCode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("phone_code");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.PostalCode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("postal_code");
            entity.Property(e => e.Province)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("province");
            entity.Property(e => e.Rank)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("rank");
            entity.Property(e => e.SecurityPhrase)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("security_phrase");
            entity.Property(e => e.SourceId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("source_id");
            entity.Property(e => e.State)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("state");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("title");
            entity.Property(e => e.User)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("user");
            entity.Property(e => e.VendorLeadCode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("vendor_lead_code");
        });

        modelBuilder.Entity<Banbajio200>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Banbajio_200");

            entity.Property(e => e.Cacr)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("CACR");
            entity.Property(e => e.Comentario).IsUnicode(false);
            entity.Property(e => e.Credito)
                .HasMaxLength(286)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("CREDITO");
            entity.Property(e => e.Detalle)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Extensión)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.FechaGest)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("Fecha_Gest");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.Grupo)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdModo).HasColumnName("idModo");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.SegundoGest)
                .HasPrecision(0)
                .HasColumnName("Segundo_Gest");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(26)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
        });

        modelBuilder.Entity<Banbajio200Comentario>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Banbajio_200_Comentarios");

            entity.Property(e => e.Cacr)
                .HasMaxLength(257)
                .IsUnicode(false)
                .HasColumnName("CACR");
            entity.Property(e => e.Comentario)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.Credito)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CREDITO");
            entity.Property(e => e.Extensión)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.FechaGest)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("Fecha_Gest");
            entity.Property(e => e.FechaInsert)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha_Insert");
            entity.Property(e => e.Grupo)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdAcercamiento)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("idAcercamiento");
            entity.Property(e => e.IdCartera)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("idCartera");
            entity.Property(e => e.IdClase)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("idClase");
            entity.Property(e => e.IdContacto)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("idContacto");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdModo)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("idModo");
            entity.Property(e => e.IdSituación)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("idSituación");
            entity.Property(e => e.Lada)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
        });

        modelBuilder.Entity<Basenu>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("BASENU");

            entity.Property(e => e.AccountId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("account__id");
            entity.Property(e => e.BillCloseDate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bill__close_date");
            entity.Property(e => e.BillEffectiveDueDate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bill__effective_due_date");
            entity.Property(e => e.CreditCardAccountLimitRangeMax)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("credit_card_account__limit_range_max");
            entity.Property(e => e.Cuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cuenta");
            entity.Property(e => e.CustomerBillingAddressPostcode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("customer__billing_address_postcode");
            entity.Property(e => e.CustomerBirth)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("customer_birth");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("customer__id");
            entity.Property(e => e.CustomerName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("customer__name");
            entity.Property(e => e.CustomerPreferredName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("customer__preferred_name");
            entity.Property(e => e.Date)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("date");
            entity.Property(e => e.DaysLateAtDate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("days_late_at_date");
            entity.Property(e => e.DelinquencyPeriodStart)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("delinquency_period_start");
            entity.Property(e => e.DiscountAvailable)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("discount_available");
            entity.Property(e => e.EntryProduct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("entry_product");
            entity.Property(e => e.FinalAmount)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("final_amount");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("idcuenta");
            entity.Property(e => e.LateBucket)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("late_bucket");
            entity.Property(e => e.LateFee)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("late_fee");
            entity.Property(e => e.LateInterest)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("late_interest");
            entity.Property(e => e.MinPaymentAmount)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("min_payment_amount");
            entity.Property(e => e.MostRecentPaymentAmount)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("most_recent_payment_amount");
            entity.Property(e => e.MostRecentPaymentAt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("most_recent_payment_at");
            entity.Property(e => e.RevolvingInterest)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("revolving_interest");
            entity.Property(e => e.Segments)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segments");
            entity.Property(e => e.TotalBillAmount)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_bill_amount");
            entity.Property(e => e.TotalLateBalance)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_late_balance");
            entity.Property(e => e.YearlyLateInterestRate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("yearly_late_interest_rate");
            entity.Property(e => e.YearlyRevolvingInterestRate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("yearly_revolving_interest_rate");
        });

        modelBuilder.Entity<Basetelnu>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("BASETELNU");

            entity.Property(e => e.Confirmado)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Cuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CUENTA");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Extensión)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaClasificación)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha_Insert");
            entity.Property(e => e.HusoHorario)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdCartera)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("idCartera");
            entity.Property(e => e.IdClase)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("idClase");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEjecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.IdEjecutivoClasificación)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("idEjecutivoClasificación");
            entity.Property(e => e.IdOrigen)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("idOrigen");
            entity.Property(e => e.IdTelefonía)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("idTelefonía");
            entity.Property(e => e.Municipio)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroTelefónico)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ProporcionóTitular)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegHorarioContacto)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CamposAdicionale>(entity =>
        {
            entity.HasKey(e => e.IdProducto);

            entity.Property(e => e.IdProducto)
                .ValueGeneratedNever()
                .HasColumnName("idProducto");
            entity.Property(e => e.CampoCorreo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CampoNombre)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CampoRfc)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("CampoRFC");
            entity.Property(e => e.CampoTeléfono)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.IdParentesco).HasColumnName("idParentesco");

            entity.HasOne(d => d.IdProductoNavigation).WithOne(p => p.CamposAdicionale)
                .HasForeignKey<CamposAdicionale>(d => d.IdProducto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CamposAdicionales_Productos");
        });

        modelBuilder.Entity<CamposAsig>(entity =>
        {
            entity.HasKey(e => e.IdCampoAsig);

            entity.ToTable("CamposAsig", tb => tb.HasComment("Campos que contienen el layout de la asignación de cada producto del cliente."));

            entity.HasIndex(e => new { e.IdProducto, e.Campo }, "UK_NombreCampo").IsUnique();

            entity.Property(e => e.IdCampoAsig).HasColumnName("idCampoAsig");
            entity.Property(e => e.Campo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CuentasActualización).HasDefaultValue(true);
            entity.Property(e => e.CuentasNuevas).HasDefaultValue(true);
            entity.Property(e => e.FechaCampo).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.IdTipoCampo).HasColumnName("idTipoCampo");
            entity.Property(e => e.TipoDeDato).HasComment("0 varchar, 1 real, 2 date");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.CamposAsigs)
                .HasForeignKey(d => d.IdProducto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CamposAsig_Productos");

            entity.HasOne(d => d.IdTipoCampoNavigation).WithMany(p => p.CamposAsigs)
                .HasForeignKey(d => d.IdTipoCampo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CamposAsig_TiposCampo");
        });

        modelBuilder.Entity<CamposCondicionado>(entity =>
        {
            entity.HasKey(e => e.IdCampoCondicionado)
                .HasName("PK_CamposCalculados")
                .IsClustered(false);

            entity.HasIndex(e => e.IdProducto, "IX_CamposCalculados").IsClustered();

            entity.Property(e => e.IdCampoCondicionado).HasColumnName("idCampoCondicionado");
            entity.Property(e => e.Condición).IsUnicode(false);
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.NombreCampo)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.CamposCondicionados)
                .HasForeignKey(d => d.IdProducto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CamposCondicionados_Productos");
        });

        modelBuilder.Entity<CamposTxt>(entity =>
        {
            entity.HasKey(e => e.IdCampo).IsClustered(false);

            entity.ToTable("CamposTxt");

            entity.HasIndex(e => new { e.IdProducto, e.Proceso, e.Inicio }, "IX_CamposTxt").IsClustered();

            entity.Property(e => e.IdCampo).HasColumnName("idCampo");
            entity.Property(e => e.Campo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Descripción)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.Proceso)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.TipoDato)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.IdCarteraNavigation).WithMany(p => p.CamposTxts)
                .HasForeignKey(d => d.IdCartera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CamposTxt_Carteras");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.CamposTxts)
                .HasForeignKey(d => d.IdProducto)
                .HasConstraintName("FK_CamposTxt_Productos");
        });

        modelBuilder.Entity<CargasAlCliente>(entity =>
        {
            entity.HasKey(e => e.IdCargaAlCliente).HasName("PK_CargaCliente");

            entity.ToTable("CargasAlCliente");

            entity.Property(e => e.IdCargaAlCliente).HasColumnName("idCargaAlCliente");
            entity.Property(e => e.BaseDatos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Descripción)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Esquema)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaHoraInsert)
                .HasColumnType("datetime")
                .HasColumnName("FechaHora_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.NombreCarga)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Store)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Cartera>(entity =>
        {
            entity.HasKey(e => e.IdCartera);

            entity.Property(e => e.IdCartera)
                .ValueGeneratedNever()
                .HasColumnName("idCartera");
            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.Cartera1)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Cartera");
        });

        modelBuilder.Entity<Cfcredit>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("CFCREDIT");

            entity.Property(e => e.Comentario)
                .IsUnicode(false)
                .HasColumnName("comentario");
            entity.Property(e => e.Contacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Idcontacto).HasColumnName("idcontacto");
            entity.Property(e => e.Montonegociado).HasColumnType("money");
            entity.Property(e => e.Nombre)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Cfllamadas120>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("CFLlamadas120");

            entity.Property(e => e.Busqueda)
                .HasMaxLength(121)
                .IsUnicode(false);
            entity.Property(e => e.Contrato)
                .HasMaxLength(8)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Csc)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("CSC");
            entity.Property(e => e.Domicilio)
                .HasMaxLength(429)
                .IsUnicode(false);
            entity.Property(e => e.Estado)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.MontoNegociado)
                .HasMaxLength(56)
                .IsUnicode(false);
            entity.Property(e => e.Negociacion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.NombreDeudor)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Periferia)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ResumenDeGestiones).HasColumnName("Resumen de Gestiones");
            entity.Property(e => e.Texto).HasMaxLength(156);
            entity.Property(e => e.TipoDeCartera)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TIPO DE CARTERA");
            entity.Property(e => e.TotalAccionamientos).HasColumnName("Total Accionamientos");
            entity.Property(e => e.TotalAccionamientosReales).HasColumnName("Total Accionamientos Reales");
            entity.Property(e => e.TotalGestiones).HasColumnName("Total Gestiones");
            entity.Property(e => e.TotalGestionesReales).HasColumnName("Total Gestiones Reales");
            entity.Property(e => e._1).HasColumnName("1");
            entity.Property(e => e._10).HasColumnName("10");
            entity.Property(e => e._11).HasColumnName("11");
            entity.Property(e => e._12).HasColumnName("12");
            entity.Property(e => e._13).HasColumnName("13");
            entity.Property(e => e._14).HasColumnName("14");
            entity.Property(e => e._15).HasColumnName("15");
            entity.Property(e => e._16).HasColumnName("16");
            entity.Property(e => e._17).HasColumnName("17");
            entity.Property(e => e._18).HasColumnName("18");
            entity.Property(e => e._19).HasColumnName("19");
            entity.Property(e => e._2).HasColumnName("2");
            entity.Property(e => e._20).HasColumnName("20");
            entity.Property(e => e._21).HasColumnName("21");
            entity.Property(e => e._22).HasColumnName("22");
            entity.Property(e => e._23).HasColumnName("23");
            entity.Property(e => e._24).HasColumnName("24");
            entity.Property(e => e._25).HasColumnName("25");
            entity.Property(e => e._26).HasColumnName("26");
            entity.Property(e => e._27).HasColumnName("27");
            entity.Property(e => e._28).HasColumnName("28");
            entity.Property(e => e._29).HasColumnName("29");
            entity.Property(e => e._3).HasColumnName("3");
            entity.Property(e => e._30).HasColumnName("30");
            entity.Property(e => e._31).HasColumnName("31");
            entity.Property(e => e._4).HasColumnName("4");
            entity.Property(e => e._5).HasColumnName("5");
            entity.Property(e => e._6).HasColumnName("6");
            entity.Property(e => e._7).HasColumnName("7");
            entity.Property(e => e._8).HasColumnName("8");
            entity.Property(e => e._9).HasColumnName("9");
        });

        modelBuilder.Entity<CorreosNu>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("CorreosNU");

            entity.Property(e => e.CorreoEjecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Correo Ejecutivo");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.FechaUpdate).HasColumnName("Fecha_Update");
            entity.Property(e => e.NombreDeEjecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Nombre de Ejecutivo");
            entity.Property(e => e.NúmeroDeEmpleado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Número de Empleado");
            entity.Property(e => e.Usuario)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CuentasAcción>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta })
                .IsClustered(false)
                .HasFillFactor(70);

            entity.ToTable("CuentasAcción");

            entity.Property(e => e.IdCartera)
                .HasComment("")
                .HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .HasComment("El número de cuenta con el cual se relacionará con la tabla de asignación.")
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdAcción)
                .HasDefaultValue((byte)1)
                .HasComment("0 desactivar, 1 activar, 2 nueva. ")
                .HasColumnName("idAcción");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");

            entity.HasOne(d => d.IdAcciónNavigation).WithMany(p => p.CuentasAccións)
                .HasForeignKey(d => d.IdAcción)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CuentasAcción_Acciones");
        });

        modelBuilder.Entity<CuentasEspeciale>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta });

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");

            entity.HasOne(d => d.IdCarteraNavigation).WithMany(p => p.CuentasEspeciales)
                .HasForeignKey(d => d.IdCartera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CuentasEspeciales_Carteras");
        });

        modelBuilder.Entity<CuentasQueja>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta });

            entity.ToTable("CuentasQueja");

            entity.HasIndex(e => e.FechaCuentaQueja, "IX_CuentasQueja_Fecha");

            entity.HasIndex(e => e.FolioRedeco, "IX_CuentasQueja_Folio").IsDescending();

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.FechaCuentaQueja).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.FolioRedeco).HasColumnName("FolioREDECO");
            entity.Property(e => e.Solicitante)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdCarteraNavigation).WithMany(p => p.CuentasQuejas)
                .HasForeignKey(d => d.IdCartera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CuentasQueja_Carteras");
        });

        modelBuilder.Entity<CuentasQuejaHistorial>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta }).HasName("PK_CuentasQuejaH");

            entity.ToTable("CuentasQuejaHistorial");

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.FechaCuentaQueja).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.FolioRedeco).HasColumnName("FolioREDECO");
            entity.Property(e => e.Solicitante)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdCarteraNavigation).WithMany(p => p.CuentasQuejaHistorials)
                .HasForeignKey(d => d.IdCartera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CuentasQueja_CarterasH");
        });

        modelBuilder.Entity<CódigosPostale>(entity =>
        {
            entity.HasKey(e => e.IdCódigoPostal).IsClustered(false);

            entity.HasIndex(e => e.CódigoPostal, "IX_CódigosPostales").IsClustered();

            entity.Property(e => e.IdCódigoPostal).HasColumnName("idCódigoPostal");
            entity.Property(e => e.Asentamiento)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Colonia)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CódigoPostal)
                .HasMaxLength(5)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Estancia)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Municipio)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Periferia)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Sucursal)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Zona)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Doms8203703>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DOMS_8_203703", "Temp");

            entity.Property(e => e.Calle)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Colonia)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Cp)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CP");
            entity.Property(e => e.Estado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Municipio)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.NumExt)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.NumInt)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Doms8203708>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DOMS_8_203708", "Temp");

            entity.Property(e => e.Calle)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Colonia)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Cp)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CP");
            entity.Property(e => e.Estado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Municipio)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.NumExt)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.NumInt)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Doms8203712>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DOMS_8_203712", "Temp");

            entity.Property(e => e.Calle)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Colonia)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Cp)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CP");
            entity.Property(e => e.Estado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Municipio)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.NumExt)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.NumInt)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Doms8203719>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DOMS_8_203719", "Temp");

            entity.Property(e => e.Calle)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Colonia)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Cp)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CP");
            entity.Property(e => e.Estado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Municipio)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.NumExt)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.NumInt)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Ejecucione>(entity =>
        {
            entity.HasKey(e => e.IdEjecución);

            entity.HasIndex(e => e.IdEjecución, "IX_Ejecuciones").HasFilter("([FechaEjecInicio] IS NULL)");

            entity.HasIndex(e => e.FechaEjecInicio, "IX_Ejecuciones_Fecha").HasFilter("(([idJob] IN ((2), (3))) AND [Mensaje] IS NULL)");

            entity.Property(e => e.IdEjecución).HasColumnName("idEjecución");
            entity.Property(e => e.FechaEjecFin).HasColumnType("datetime");
            entity.Property(e => e.FechaEjecInicio).HasColumnType("datetime");
            entity.Property(e => e.IdJob).HasColumnName("idJob");
            entity.Property(e => e.IdLogProceso).HasColumnName("idLogProceso");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(4000)
                .IsUnicode(false);

            entity.HasOne(d => d.IdJobNavigation).WithMany(p => p.Ejecuciones)
                .HasForeignKey(d => d.IdJob)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Ejecuciones_Jobs");

            entity.HasOne(d => d.IdLogProcesoNavigation).WithMany(p => p.Ejecuciones)
                .HasForeignKey(d => d.IdLogProceso)
                .HasConstraintName("FK_Ejecuciones_LogProcesos");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.Ejecuciones)
                .HasForeignKey(d => d.IdProducto)
                .HasConstraintName("FK_Ejecuciones_Productos");
        });

        modelBuilder.Entity<EncuestaCliente>(entity =>
        {
            entity.HasKey(e => new { e.IdCuenta, e.IdCartera, e.FechaInsert, e.SegundoInsert, e.IdEjecutivo }).HasFillFactor(90);

            entity.ToTable("EncuestaCliente");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Detalle2)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Detalle5)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Detalle7)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<EquivalenciasAtt>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EquivalenciasATT");

            entity.Property(e => e.Status)
                .HasMaxLength(6)
                .IsFixedLength()
                .HasColumnName("STATUS");
            entity.Property(e => e.StatusVicidial)
                .HasMaxLength(30)
                .IsFixedLength()
                .HasColumnName("STATUS_VICIDIAL");
            entity.Property(e => e.SubdivisionAtt)
                .HasMaxLength(30)
                .IsFixedLength()
                .HasColumnName("SUBDIVISION_ATT");
        });

        modelBuilder.Entity<EquivalenciasAttAct>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EquivalenciasATT_ACT");

            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS");
            entity.Property(e => e.StatusVicidial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS_VICIDIAL");
            entity.Property(e => e.SubdivisionAtt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SUBDIVISION_ATT");
        });

        modelBuilder.Entity<EquivalenciasViciDialEst>(entity =>
        {
            entity.HasKey(e => e.StatusViciDial);

            entity.ToTable("Equivalencias_ViciDialEst");

            entity.Property(e => e.StatusViciDial)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Status_ViciDial");
            entity.Property(e => e.IdValor).HasColumnName("idValor");
            entity.Property(e => e.Tipo)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<FechasAsignaciónOficial>(entity =>
        {
            entity.HasKey(e => new { e.IdProducto, e.FechaVálidoDesde });

            entity.ToTable("FechasAsignaciónOficial");

            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.IdLogProceso).HasColumnName("idLogProceso");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.FechasAsignaciónOficials)
                .HasForeignKey(d => d.IdProducto)
                .HasConstraintName("FK_FechasAsignaciónOficial_Productos");
        });

        modelBuilder.Entity<GestionesHsbcatcTdc>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Gestiones_HSBCATC_TDC");

            entity.Property(e => e.Contacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Duración).HasPrecision(0);
            entity.Property(e => e.Expediente)
                .HasMaxLength(24)
                .IsUnicode(false);
            entity.Property(e => e.Hora).HasPrecision(0);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Identificador)
                .HasMaxLength(26)
                .IsUnicode(false)
                .HasColumnName("identificador");
            entity.Property(e => e.Modo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nivel)
                .HasMaxLength(54)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Situación)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SituaciónCuenta)
                .HasMaxLength(53)
                .IsUnicode(false);
            entity.Property(e => e.TiempoEnCuenta).HasPrecision(0);
            entity.Property(e => e.Usuario)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.ÚltimaGestión).HasColumnName("Última gestión");
        });

        modelBuilder.Entity<HistoricoCuenta>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdProducto, e.IdCuenta, e.Fecha, e.IdAccion });

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Hsbc600>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("HSBC_600");

            entity.Property(e => e.BillingCrédito)
                .HasMaxLength(255)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("Billing/Crédito");
            entity.Property(e => e.FechaInsert).HasColumnName("fecha_insert");
            entity.Property(e => e.FechaReporte)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Fecha_Reporte");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.Org)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("org");
            entity.Property(e => e.Registrsos)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("segundo_insert");
        });

        modelBuilder.Entity<HsbcCifrasControlAsigTot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("HSBC_CifrasControl_AsigTot");

            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.InteresOrdinarioKrn)
                .HasColumnType("money")
                .HasColumnName("Interes Ordinario Krn");
            entity.Property(e => e.MontoPrincipalKrn)
                .HasColumnType("money")
                .HasColumnName("Monto Principal Krn");
            entity.Property(e => e.MoratoriosKrn)
                .HasColumnType("money")
                .HasColumnName("Moratorios Krn");
            entity.Property(e => e.OtrosExigiblesKrn)
                .HasColumnType("money")
                .HasColumnName("Otros Exigibles Krn");
            entity.Property(e => e.PagoMinimoTdc)
                .HasColumnType("money")
                .HasColumnName("pago minimo tdc");
            entity.Property(e => e.SaldoAlCorteTdc)
                .HasColumnType("money")
                .HasColumnName("Saldo al Corte TDC");
            entity.Property(e => e.SaldoAlDía)
                .HasColumnType("money")
                .HasColumnName("Saldo al día");
            entity.Property(e => e.SaldoContableMonedaOrigen)
                .HasColumnType("money")
                .HasColumnName("Saldo Contable Moneda Origen");
            entity.Property(e => e.SaldoVencidoKrnSaldoVigenteTdc)
                .HasColumnType("money")
                .HasColumnName("Saldo Vencido Krn /Saldo Vigente TDC");
            entity.Property(e => e.SaldoVencidoTdc)
                .HasColumnType("money")
                .HasColumnName("Saldo Vencido TDC");
            entity.Property(e => e.SaldoVigenteKrn)
                .HasColumnType("money")
                .HasColumnName("Saldo Vigente Krn");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Tipo)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.TipoCartera)
                .HasMaxLength(7)
                .IsUnicode(false);
            entity.Property(e => e.TotalAdeudoKrn)
                .HasColumnType("money")
                .HasColumnName("Total Adeudo Krn");
        });

        modelBuilder.Entity<HsbcCifrasControlClass>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("HSBC_CifrasControl_CLASS");

            entity.Property(e => e.Casos).HasColumnName("CASOS");
            entity.Property(e => e.Class)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLASS");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.Portafolio)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("PORTAFOLIO");
            entity.Property(e => e.Saldo)
                .HasColumnType("money")
                .HasColumnName("SALDO");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
        });

        modelBuilder.Entity<HsbcCifrasControlKronerTdc>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("HSBC_CifrasControl_KronerTDC");

            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.Portafolio)
                .HasMaxLength(14)
                .IsUnicode(false);
            entity.Property(e => e.SaldoDía)
                .HasColumnType("money")
                .HasColumnName("Saldo_Día");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
        });

        modelBuilder.Entity<HsbcCifrasControlOrg>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("HSBC_CifrasControl_ORG");

            entity.Property(e => e.Casos).HasColumnName("CASOS");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.Org)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ORG");
            entity.Property(e => e.Producto)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("PRODUCTO");
            entity.Property(e => e.Saldo)
                .HasColumnType("money")
                .HasColumnName("SALDO");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Tipo)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<HsbcPagosVencidum>(entity =>
        {
            entity.HasKey(e => new { e.Credito, e.FechaAsignacion, e.FechaPago });

            entity.ToTable("HSBC_PagosVencida");

            entity.HasIndex(e => e.FechaPago, "IX_PagosVencida").IsDescending();

            entity.Property(e => e.Credito)
                .HasMaxLength(19)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("credito");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(8)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("fecha_asignacion");
            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Classification)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("classification");
            entity.Property(e => e.Cy)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cy");
            entity.Property(e => e.EfectivoRecuperadoAcum)
                .HasColumnType("money")
                .HasColumnName("efectivo_recuperado_acum");
            entity.Property(e => e.EfectivoRecuperadoDia)
                .HasColumnType("money")
                .HasColumnName("efectivo_recuperado_dia");
            entity.Property(e => e.EfectivoRecuperadoVal)
                .HasColumnType("money")
                .HasColumnName("Efectivo_recuperado_val");
            entity.Property(e => e.FechaProceso)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Org)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Portafolio)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PvFin).HasColumnName("Pv_fin");
            entity.Property(e => e.PvIni).HasColumnName("Pv_ini");
            entity.Property(e => e.SaldoContableInicial)
                .HasColumnType("money")
                .HasColumnName("saldo_contable_inicial");
            entity.Property(e => e.SetOff)
                .HasColumnType("money")
                .HasColumnName("Set_Off");
        });

        modelBuilder.Entity<HsbcTelefonosCyber>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("HSBC_TelefonosCyber");

            entity.Property(e => e.Altfec)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Cis)
                .HasMaxLength(15)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Desrelacion)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Nombre)
                .HasMaxLength(40)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Relacion)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Rpcfec)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Telefono)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
        });

        modelBuilder.Entity<IftTeléfono>(entity =>
        {
            entity.HasKey(e => e.NúmeroTelefónico);

            entity.ToTable("IFT_Teléfonos");

            entity.Property(e => e.NúmeroTelefónico).ValueGeneratedNever();
            entity.Property(e => e.Estado)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.Modalidad)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Municipio)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<IntentosNu>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Intentos_NU");

            entity.Property(e => e.AltDial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("alt_dial");
            entity.Property(e => e.CallDate).HasColumnName("call_date");
            entity.Property(e => e.CalledCount)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("called_count");
            entity.Property(e => e.CampaignId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("campaign_id");
            entity.Property(e => e.Comments)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comments");
            entity.Property(e => e.EndEpoch)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("end_epoch");
            entity.Property(e => e.LeadId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lead_id");
            entity.Property(e => e.LengthInSec)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("length_in_sec");
            entity.Property(e => e.ListId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("list_id");
            entity.Property(e => e.PhoneCode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("phone_code");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.Processed)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("processed");
            entity.Property(e => e.SegundoInsert)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.StartEpoch)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("start_epoch");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.TermReason)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("term_reason");
            entity.Property(e => e.Uniqueid)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("uniqueid");
            entity.Property(e => e.User)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("user");
            entity.Property(e => e.UserGroup)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("user_group");
        });

        modelBuilder.Entity<Job>(entity =>
        {
            entity.HasKey(e => e.IdJob);

            entity.Property(e => e.IdJob).HasColumnName("idJob");
            entity.Property(e => e.Descripción)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.Job1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Job");
            entity.Property(e => e.StoreProcedure)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Layout>(entity =>
        {
            entity.HasKey(e => e.IdLayout).IsClustered(false);

            entity.HasIndex(e => new { e.IdCartera, e.IdProceso }, "IX_Layouts").IsClustered();

            entity.Property(e => e.IdLayout).HasColumnName("idLayout");
            entity.Property(e => e.Campo0)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo1)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo10)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo11)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo12)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo13)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo14)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo15)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo2)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo3)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo4)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo5)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo6)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo7)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo8)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Campo9)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FechaLayout).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdProceso).HasColumnName("idProceso");
            entity.Property(e => e.Layout1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Layout");
        });

        modelBuilder.Entity<LogArchivo>(entity =>
        {
            entity.HasKey(e => e.IdLogArchivo);

            entity.Property(e => e.IdLogArchivo).HasColumnName("idLogArchivo");
            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.NombreArchivo)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ValicaciónConteoRegistros).HasColumnName("Valicación_ConteoRegistros");
            entity.Property(e => e.ValidaciónFormatos).HasColumnName("Validación_Formatos");
            entity.Property(e => e.ValidaciónInformaciónCrítica).HasColumnName("Validación_InformaciónCrítica");
            entity.Property(e => e.ValidaciónLayout).HasColumnName("Validación_Layout");

            entity.HasOne(d => d.IdLogAsignaciónNavigation).WithMany(p => p.LogArchivos)
                .HasForeignKey(d => d.IdLogAsignación)
                .HasConstraintName("FK_LogArchivos_LogAsignación");
        });

        modelBuilder.Entity<LogAsignación>(entity =>
        {
            entity.HasKey(e => e.IdLogAsignación)
                .HasName("PK_LogsAsignación")
                .IsClustered(false);

            entity.ToTable("LogAsignación");

            entity.HasIndex(e => new { e.IdProducto, e.FechaLogInicio }, "IX_LogAsignacion_Producto")
                .IsDescending(false, true)
                .IsClustered();

            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.Computadora)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Directorio)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.Dominio)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Duración).HasPrecision(0);
            entity.Property(e => e.Error)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.FechaLogFin)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.FechaLogInicio).HasColumnType("datetime");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.NúmeroArchivos).HasDefaultValue((byte)1);
            entity.Property(e => e.Proceso)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.LogAsignacións)
                .HasForeignKey(d => d.IdProducto)
                .HasConstraintName("FK_LogProcesos_Productos");
        });

        modelBuilder.Entity<LogIngreso>(entity =>
        {
            entity.HasKey(e => e.IdLogIngreso);

            entity.ToTable("LogIngreso");

            entity.Property(e => e.IdLogIngreso).HasColumnName("idLogIngreso");
            entity.Property(e => e.Computadora)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Dominio)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.Ip)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("IP");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.SegundoSalida)
                .HasPrecision(0)
                .HasColumnName("Segundo_Salida");
            entity.Property(e => e.UsuarioWindows)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<LogProceso>(entity =>
        {
            entity.HasKey(e => e.IdLogProceso).IsClustered(false);

            entity.HasIndex(e => new { e.IdCartera, e.IdProceso, e.FechaLogInicio }, "IX_LogProcesos")
                .IsDescending(false, false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.IdCartera, e.FechaLogInicio }, "IX_TeléfonosInsertados").HasFilter("([idProceso]=(4) AND [Insertados] IS NULL AND [FechaLogFin] IS NULL)");

            entity.Property(e => e.IdLogProceso).HasColumnName("idLogProceso");
            entity.Property(e => e.Archivo)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.Computadora)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Dominio)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Duración).HasPrecision(0);
            entity.Property(e => e.Error).IsUnicode(false);
            entity.Property(e => e.FechaLogFin).HasColumnType("datetime");
            entity.Property(e => e.FechaLogInicio)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdProceso).HasColumnName("idProceso");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.Usuario)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.LogProcesos)
                .HasForeignKey(d => d.IdProducto)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_LogProcesos_Procesos");
        });

        modelBuilder.Entity<PadresHijo>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Padres_Hijos");

            entity.Property(e => e.Casos).HasColumnName("CASOS");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.Org)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ORG");
            entity.Property(e => e.Producto)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("PRODUCTO");
            entity.Property(e => e.Saldo)
                .HasColumnType("money")
                .HasColumnName("SALDO");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Tipo)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<Pago28203711>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PAGO_28_203711", "Temp");

            entity.Property(e => e.Fecha)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Monto)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Referencia)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Segmentación)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Pago33203700>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PAGO_33_203700", "Temp");

            entity.Property(e => e.Fecha)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Monto)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Referencia)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Segmentación)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Pago57203701>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PAGO_57_203701", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Monto)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Referencia)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Segmentación)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Pago70>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PAGO_7_0", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Pago7203715>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PAGO_7_203715", "Temp");

            entity.Property(e => e.Fecha)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Monto)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Referencia)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Segmentación)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Pago8203707>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PAGO_8_203707", "Temp");

            entity.Property(e => e.Fecha)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Monto)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Referencia)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Segmentación)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PagosAtt>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Pagos_ATT");

            entity.Property(e => e.Bucket)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUCKET");
            entity.Property(e => e.Cartera)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.Cuenta)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SumaPago).HasColumnType("money");
        });

        modelBuilder.Entity<PagosNegativo>(entity =>
        {
            entity.HasKey(e => new { e.FechaPago, e.IdCartera, e.IdCuenta, e.MontoPago });

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.MontoPago).HasColumnType("money");
        });

        modelBuilder.Entity<Proceso>(entity =>
        {
            entity.HasKey(e => e.IdProceso);

            entity.Property(e => e.IdProceso)
                .ValueGeneratedNever()
                .HasColumnName("idProceso");
            entity.Property(e => e.Campo0)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValue("idCuenta");
            entity.Property(e => e.Campo1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo10)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo11)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo12)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo13)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo14)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo15)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo2)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo3)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo4)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo5)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo6)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo7)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo8)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Campo9)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaProceso).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.NombreTabla)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Proceso1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Proceso");
            entity.Property(e => e.StoreProcedure)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Productividad>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("productividad");

            entity.Property(e => e.Cartera)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.DuraciónChats).HasPrecision(0);
            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Encargado)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Entre1y3min).HasColumnName("entre1y3min");
            entity.Property(e => e.HoraIngresoSistema).HasPrecision(0);
            entity.Property(e => e.HoraPrimerGestión).HasPrecision(0);
            entity.Property(e => e.HoraSalidaSistema).HasPrecision(0);
            entity.Property(e => e.HoraÚltimaGestión).HasPrecision(0);
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.Mayor3min).HasColumnName("mayor3min");
            entity.Property(e => e.Menor1min).HasColumnName("menor1min");
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.MontoNegociadoChat).HasColumnType("money");
            entity.Property(e => e.NombreEjecutivo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreEncargado)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SaldoAsolucionar)
                .HasColumnType("money")
                .HasColumnName("SaldoASolucionar");
            entity.Property(e => e.SaldoAsolucionarChat)
                .HasColumnType("money")
                .HasColumnName("SaldoASolucionarChat");
            entity.Property(e => e.Sucursal)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.TiempoBaño).HasPrecision(0);
            entity.Property(e => e.TiempoCalidad).HasPrecision(0);
            entity.Property(e => e.TiempoComida).HasPrecision(0);
            entity.Property(e => e.TiempoConConocidos).HasPrecision(0);
            entity.Property(e => e.TiempoConDesconocidos).HasPrecision(0);
            entity.Property(e => e.TiempoConTitulares).HasPrecision(0);
            entity.Property(e => e.TiempoCurso).HasPrecision(0);
            entity.Property(e => e.TiempoEnBúsqueda).HasPrecision(0);
            entity.Property(e => e.TiempoEnCuenta).HasPrecision(0);
            entity.Property(e => e.TiempoEnCuentasChat).HasPrecision(0);
            entity.Property(e => e.TiempoFallaTécnica).HasPrecision(0);
            entity.Property(e => e.TiempoPermiso).HasPrecision(0);
            entity.Property(e => e.TiempoSinContacto).HasPrecision(0);
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.IdProducto);

            entity.ToTable(tb => tb.HasComment("Producto de cada cliente que se diferencía por el layout del archivo de asignación."));

            entity.Property(e => e.IdProducto)
                .ValueGeneratedNever()
                .HasColumnName("idProducto");
            entity.Property(e => e.CampoÚnicoCuenta)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CampoÚnicoNombre)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CampoÚnicoNúmeroCliente)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CampoÚnicoPagosVencidos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CampoÚnicoRfc)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("CampoÚnicoRFC");
            entity.Property(e => e.CampoÚnicoSaldo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Cuadre).HasDefaultValue(true);
            entity.Property(e => e.Desactivación).HasDefaultValue(0.3f);
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.NombresArchivosInválidos)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.NombresArchivosVálidos)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.Producto1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("Producto");
            entity.Property(e => e.SituaciónReactivación)
                .HasDefaultValue(true)
                .HasComment("En caso de ser 1 se cambiará la situación a Reactivación cuando se reactiven las cuentas.");
            entity.Property(e => e.WhereEliminar)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.HasOne(d => d.IdCarteraNavigation).WithMany(p => p.Productos)
                .HasForeignKey(d => d.IdCartera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Productos_Carteras");
        });

        modelBuilder.Entity<PruebaBanorte>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Prueba_Banorte");

            entity.Property(e => e.Cacr)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("CACR");
            entity.Property(e => e.Comentario).IsUnicode(false);
            entity.Property(e => e.FechaGest)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("Fecha_Gest");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.Grupo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
        });

        modelBuilder.Entity<RegresosCurrent>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Regresos_Current");

            entity.Property(e => e.Cuenta)
                .HasMaxLength(30)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Estatus)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.FechaLlamada)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("Fecha_Llamada");
            entity.Property(e => e.FechaPtp)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("Fecha_PTP");
            entity.Property(e => e.FechaReporte)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Fecha_Reporte");
            entity.Property(e => e.HoraLlamada)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("Hora_Llamada");
            entity.Property(e => e.Idllamada)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("IDLlamada");
            entity.Property(e => e.MesPdr)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("Mes_PDR");
            entity.Property(e => e.Seguimiento)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.TelContacto)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("Tel_Contacto");
            entity.Property(e => e.TipoPdr)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("Tipo_PDR");
        });

        modelBuilder.Entity<RelacionDomiciliosHsbc>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("RelacionDomiciliosHSBC");

            entity.Property(e => e.Calle)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.ColoniaLocalidad)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CódigoPostal)
                .HasMaxLength(5)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.DelegaciónMunicipio)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Estado)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.FechaHoraInformación)
                .HasColumnType("smalldatetime")
                .HasColumnName("FechaHora_Información");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdCódigoPostal).HasColumnName("idCódigoPostal");
            entity.Property(e => e.IdDomicilio)
                .ValueGeneratedOnAdd()
                .HasColumnName("idDomicilio");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdEjecutivoInformación).HasColumnName("idEjecutivoInformación");
            entity.Property(e => e.IdInformación).HasColumnName("idInformación");
            entity.Property(e => e.IdLogProceso).HasColumnName("idLogProceso");
            entity.Property(e => e.IdOrígen).HasColumnName("idOrígen");
            entity.Property(e => e.NúmeroExterior)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroInterior)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<RespaldoMacro>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("RespaldoMacro");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("idCuenta");
            entity.Property(e => e.PvInicial)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("PV Inicial");
            entity.Property(e => e.SaldoInicial).HasColumnType("money");
        });

        modelBuilder.Entity<RespaldoPyme>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("RespaldoPyme");

            entity.Property(e => e.AplicaCampaña)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("aplica campaña");
            entity.Property(e => e.BucketInicoDeMes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket inico de mes");
            entity.Property(e => e.CapitalCampaña)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("capital campaña");
            entity.Property(e => e.Cliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cliente");
            entity.Property(e => e.CodigoLinea)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("codigo linea");
            entity.Property(e => e.ConceptoAConsiderar)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("concepto a considerar");
            entity.Property(e => e.Cyber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cyber");
            entity.Property(e => e.Despacho)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("despacho");
            entity.Property(e => e.Fecha)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha");
            entity.Property(e => e.FechaDeContrato)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha de contrato");
            entity.Property(e => e.FechaVencimientoLínea)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha vencimiento línea");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
            entity.Property(e => e.ImpteOrig)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impte-orig");
            entity.Property(e => e.JurídicoAdministrativo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("jurídico / administrativo");
            entity.Property(e => e.MontoExigPagoPesos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto-exig-pago-pesos");
            entity.Property(e => e.MontoLiqLínea)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto liq# línea");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.QuitaCampaña)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("% quita campaña");
            entity.Property(e => e.Representante)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("representante");
            entity.Property(e => e.Revolvente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("revolvente");
            entity.Property(e => e.Rfc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("rfc");
            entity.Property(e => e.SaldoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo actual");
            entity.Property(e => e.SaldoDeAplicaciónACastigos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo de aplicación a castigos");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo vencido");
            entity.Property(e => e.TipoNegocio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tipo-negocio");
            entity.Property(e => e.VencimientoContrato)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("vencimiento contrato");
        });

        modelBuilder.Entity<Tels57203698>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_57_203698", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Tel1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel10)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel11)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel12)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel13)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel14)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel2)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel3)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel4)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel5)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel6)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel7)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel8)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel9)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Tels7203694>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_7_203694", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Tel1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel10)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel2)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel3)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel4)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel5)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel6)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel7)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel8)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel9)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Tels74203695>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_74_203695", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Tel1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel2)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Tels8203705>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_8_203705", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Tel1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel2)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel3)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Tels8203710>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_8_203710", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Tel1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel2)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel3)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Tels8203713>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_8_203713", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Tel1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel2)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel3)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Tels8203720>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_8_203720", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Tel1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel2)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tel3)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TeléfonosAllocation>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.NúmeroTelefónico });

            entity.ToTable("TeléfonosAllocation", tb => tb.HasTrigger("tr_InsertaTeléfonosCollection"));

            entity.HasIndex(e => e.FechaInsert, "IX_TeléfonosAllocation").IsDescending();

            entity.HasIndex(e => new { e.FechaInsert, e.NúmeroTelefónico }, "IX_TeléfonosAllocation_Fecha_Insert").IsDescending(true, false);

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.NúmeroTelefónico).HasComment("Número telefónico a 10 dígitos");
            entity.Property(e => e.Extensión).IsSparse();
            entity.Property(e => e.FechaInsert)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdOrígen).HasColumnName("idOrígen");
            entity.Property(e => e.IdTelefonía).HasColumnName("idTelefonía");

            entity.HasOne(d => d.IdCarteraNavigation).WithMany(p => p.TeléfonosAllocations)
                .HasForeignKey(d => d.IdCartera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeléfonosAllocation_Carteras");
        });

        modelBuilder.Entity<TeléfonosComplemento>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.Númerotelefónico }).HasName("PK_TeléfonosComplemento_1");

            entity.ToTable("TeléfonosComplemento");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Calificacion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.NúmeroCliente)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TempMacrovencidum>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdProducto, e.IdCuenta, e.Fecha });

            entity.ToTable("Temp_Macrovencida");

            entity.HasIndex(e => e.Fecha, "IX_MacroVencida_Fecha").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("idCuenta");
            entity.Property(e => e.PvInicial)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("PV Inicial");
            entity.Property(e => e.SaldoInicial).HasColumnType("money");
        });

        modelBuilder.Entity<TempPagosCastigoval>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Temp_PagosCastigoval");

            entity.Property(e => e.Cepa)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Column1)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Column2)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Cuenta)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EfecRecupAcum)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Efec_recup_acum");
            entity.Property(e => e.EfecRecupDia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Efec_recup_dia");
            entity.Property(e => e.F16)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FecAsigini)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fec_asigini");
            entity.Property(e => e.FecProceso)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_proceso");
            entity.Property(e => e.Modalidad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NomAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Nom_agencia");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.SdoAsign)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sdo_asign");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.SetOff)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Set_Off");
            entity.Property(e => e.SubProdName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SUB_PROD_NAME");
        });

        modelBuilder.Entity<TiposCampo>(entity =>
        {
            entity.HasKey(e => e.IdTipoCampo);

            entity.ToTable("TiposCampo");

            entity.Property(e => e.IdTipoCampo).HasColumnName("idTipoCampo");
            entity.Property(e => e.Descripción)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.IdJob).HasColumnName("idJob");
            entity.Property(e => e.TipoCampo)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdJobNavigation).WithMany(p => p.TiposCampos)
                .HasForeignKey(d => d.IdJob)
                .HasConstraintName("FK_TiposCampo_Jobs");
        });

        modelBuilder.Entity<UsuariosCyber>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("UsuariosCyber");

            entity.Property(e => e.Activo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UsuarioCyber)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UsuarioEj)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Vici>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("vici");

            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("phone_number");
            entity.Property(e => e.Tipo)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Vici2>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Vici2");

            entity.Property(e => e.CampaignId)
                .HasMaxLength(8)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("campaign_id");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("phone_number");
            entity.Property(e => e.Servidor)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Vicito>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("vicito");

            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("phone_number");
            entity.Property(e => e.Tipo)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Vicitotal>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("vicitotal");

            entity.Property(e => e.CampaignId)
                .HasMaxLength(8)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("campaign_id");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("phone_number");
            entity.Property(e => e.Servidor)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Vicivacio>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("vicivacio");

            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("phone_number");
            entity.Property(e => e.Status)
                .HasMaxLength(6)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("STATUS");
            entity.Property(e => e.Tipo)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<ViewRandom>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("view_random");
        });

        modelBuilder.Entity<VwCarterasProducto>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_CarterasProductos");

            entity.Property(e => e.Abreviación)
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Cartera)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.NombresArchivosInválidos)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.NombresArchivosVálidos)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.Producto)
                .HasMaxLength(50)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
        });

        modelBuilder.Entity<VwEjecucionesDetalle>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_EjecucionesDetalle");

            entity.Property(e => e.Cartera)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Comienzo)
                .HasMaxLength(13)
                .IsUnicode(false);
            entity.Property(e => e.Duración)
                .HasMaxLength(13)
                .IsUnicode(false);
            entity.Property(e => e.Fecha)
                .HasMaxLength(13)
                .IsUnicode(false);
            entity.Property(e => e.IdEjecución).HasColumnName("idEjecución");
            entity.Property(e => e.IdLogProceso).HasColumnName("idLogProceso");
            entity.Property(e => e.Job)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Mensaje)
                .HasMaxLength(4000)
                .IsUnicode(false);
            entity.Property(e => e.Producto)
                .HasMaxLength(50)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
        });

        modelBuilder.Entity<VwLogAsignación>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_LogAsignación");

            entity.Property(e => e.Cartera)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Comienzo)
                .HasMaxLength(13)
                .IsUnicode(false);
            entity.Property(e => e.Computadora)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Dominio)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Duración)
                .HasMaxLength(13)
                .IsUnicode(false);
            entity.Property(e => e.Fecha)
                .HasMaxLength(13)
                .IsUnicode(false);
            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.Proceso)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Producto)
                .HasMaxLength(50)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.Término)
                .HasMaxLength(13)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<VwProductosFechaInicial>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_ProductosFechaInicial");

            entity.Property(e => e.FechaInicial)
                .HasMaxLength(13)
                .IsUnicode(false);
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.Producto)
                .HasMaxLength(50)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
