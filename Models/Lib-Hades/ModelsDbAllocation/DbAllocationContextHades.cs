using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HadesLibrary.ModelsDbAllocation;

public partial class DbAllocationContextHades : DbContext
{
    public DbAllocationContextHades()
    {
    }

    public DbAllocationContextHades(DbContextOptions<DbAllocationContextHades> options)
        : base(options)
    {
    }

    public virtual DbSet<Accione> Acciones { get; set; }

    public virtual DbSet<AdoNetDestination> AdoNetDestinations { get; set; }

    public virtual DbSet<Agent> Agents { get; set; }

    public virtual DbSet<AsigProducto6> AsigProducto6s { get; set; }

    public virtual DbSet<AsigProducto6Tel> AsigProducto6Tels { get; set; }

    public virtual DbSet<AsignacionBanamexHistorico> AsignacionBanamexHistoricos { get; set; }

    public virtual DbSet<BaseG> BaseGs { get; set; }

    public virtual DbSet<BaseRojo> BaseRojos { get; set; }

    public virtual DbSet<BaseRojos2> BaseRojos2s { get; set; }

    public virtual DbSet<BitacoraBaseRojo> BitacoraBaseRojos { get; set; }

    public virtual DbSet<BitacoraBaseRojos2> BitacoraBaseRojos2s { get; set; }

    public virtual DbSet<BitacoraRegresosFinal> BitacoraRegresosFinals { get; set; }

    public virtual DbSet<BitacoraSolicitud> BitacoraSolicituds { get; set; }

    public virtual DbSet<CamposAdicionale> CamposAdicionales { get; set; }

    public virtual DbSet<CamposAsig> CamposAsigs { get; set; }

    public virtual DbSet<CamposCondicionado> CamposCondicionados { get; set; }

    public virtual DbSet<CamposTxt> CamposTxts { get; set; }

    public virtual DbSet<CamposTxtRep> CamposTxtReps { get; set; }

    public virtual DbSet<CargasAlCliente> CargasAlClientes { get; set; }

    public virtual DbSet<Cartera> Carteras { get; set; }

    public virtual DbSet<Cartera1> Carteras1 { get; set; }

    public virtual DbSet<CarterasBackup> CarterasBackups { get; set; }

    public virtual DbSet<CatalogoEtapa> CatalogoEtapas { get; set; }

    public virtual DbSet<Catalogocpnuevo> Catalogocpnuevos { get; set; }

    public virtual DbSet<ConteoAsignacion> ConteoAsignacions { get; set; }

    public virtual DbSet<Correccion> Correccions { get; set; }

    public virtual DbSet<CuentasAcción> CuentasAccións { get; set; }

    public virtual DbSet<CuentasQueja> CuentasQuejas { get; set; }

    public virtual DbSet<CódigosPostale> CódigosPostales { get; set; }

    public virtual DbSet<Ejecucione> Ejecuciones { get; set; }

    public virtual DbSet<Eliminacausa> Eliminacausas { get; set; }

    public virtual DbSet<EncuestaCliente> EncuestaClientes { get; set; }

    public virtual DbSet<FechasAsignaciónOficial> FechasAsignaciónOficials { get; set; }

    public virtual DbSet<GestionesRegresoPrueba> GestionesRegresoPruebas { get; set; }

    public virtual DbSet<GestionesRegresoPrueba2> GestionesRegresoPrueba2s { get; set; }

    public virtual DbSet<GestionesRegresoPrueba7> GestionesRegresoPrueba7s { get; set; }

    public virtual DbSet<GestionesRegresoPruebaGdl> GestionesRegresoPruebaGdls { get; set; }

    public virtual DbSet<GestionesRegresoPruebaMbm> GestionesRegresoPruebaMbms { get; set; }

    public virtual DbSet<GestionesRegresoPruebaPaso> GestionesRegresoPruebaPasos { get; set; }

    public virtual DbSet<GestionesRegresoPruebaSumary> GestionesRegresoPruebaSumaries { get; set; }

    public virtual DbSet<HsbcCifrasControlAsigTot> HsbcCifrasControlAsigTots { get; set; }

    public virtual DbSet<HsbcCifrasControlClass> HsbcCifrasControlClasses { get; set; }

    public virtual DbSet<HsbcCifrasControlKronerTdc> HsbcCifrasControlKronerTdcs { get; set; }

    public virtual DbSet<HsbcCifrasControlOrg> HsbcCifrasControlOrgs { get; set; }

    public virtual DbSet<HsbcPagosVencidum> HsbcPagosVencida { get; set; }

    public virtual DbSet<IftTeléfono> IftTeléfonos { get; set; }

    public virtual DbSet<IntensidadCrp> IntensidadCrps { get; set; }

    public virtual DbSet<Job> Jobs { get; set; }

    public virtual DbSet<Layout> Layouts { get; set; }

    public virtual DbSet<LogArchivo> LogArchivos { get; set; }

    public virtual DbSet<LogAsignación> LogAsignacións { get; set; }

    public virtual DbSet<LogIngreso> LogIngresos { get; set; }

    public virtual DbSet<LogProceso> LogProcesos { get; set; }

    public virtual DbSet<LogProceso1> LogProcesos1 { get; set; }

    public virtual DbSet<MulticuentasContacto> MulticuentasContactos { get; set; }

    public virtual DbSet<MulticuentasPortafolio> MulticuentasPortafolios { get; set; }

    public virtual DbSet<PagosBmxBanamex35450> PagosBmxBanamex35450s { get; set; }

    public virtual DbSet<PagosNegativo> PagosNegativos { get; set; }

    public virtual DbSet<ParaBorar> ParaBorars { get; set; }

    public virtual DbSet<PersonalBmx> PersonalBmxes { get; set; }

    public virtual DbSet<PersonalVigenteBanamex> PersonalVigenteBanamexes { get; set; }

    public virtual DbSet<Proceso> Procesos { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Rem2459320241130Cl03122024> Rem2459320241130Cl03122024s { get; set; }

    public virtual DbSet<Remesa> Remesas { get; set; }

    public virtual DbSet<TblIntensidad> TblIntensidads { get; set; }

    public virtual DbSet<TblIntensidadBit> TblIntensidadBits { get; set; }

    public virtual DbSet<TblRellenoIn> TblRellenoIns { get; set; }

    public virtual DbSet<TeléfonosAllocation> TeléfonosAllocations { get; set; }

    public virtual DbSet<TeléfonosAllocationBackup> TeléfonosAllocationBackups { get; set; }

    public virtual DbSet<TestBaseRojo> TestBaseRojos { get; set; }

    public virtual DbSet<TiposCampo> TiposCampos { get; set; }

    public virtual DbSet<Tmpeliminar> Tmpeliminars { get; set; }

    public virtual DbSet<Tra2010> Tra2010s { get; set; }

    public virtual DbSet<Tra2015> Tra2015s { get; set; }

    public virtual DbSet<Validadife> Validadives { get; set; }

    public virtual DbSet<Validat> Validats { get; set; }

    public virtual DbSet<ValoresOcj> ValoresOcjs { get; set; }

    public virtual DbSet<VgralRojo> VgralRojos { get; set; }

    public virtual DbSet<ViewRandom> ViewRandoms { get; set; }

    public virtual DbSet<VistaGestionesRegresoPrueba2> VistaGestionesRegresoPrueba2s { get; set; }

    public virtual DbSet<VrojosElimina> VrojosEliminas { get; set; }

    public virtual DbSet<VtelElimina> VtelEliminas { get; set; }

    public virtual DbSet<VtelGralAsig> VtelGralAsigs { get; set; }

    public virtual DbSet<VtelGralRojo> VtelGralRojos { get; set; }

    public virtual DbSet<VwCarterasProducto> VwCarterasProductos { get; set; }

    public virtual DbSet<VwDatosNuevo> VwDatosNuevos { get; set; }

    public virtual DbSet<VwEjecucionesDetalle> VwEjecucionesDetalles { get; set; }

    public virtual DbSet<VwLogAsignación> VwLogAsignacións { get; set; }

    public virtual DbSet<VwNegociacione> VwNegociaciones { get; set; }

    public virtual DbSet<VwProductosFechaInicial> VwProductosFechaInicials { get; set; }

    public virtual DbSet<VwTelefonosAsigReporte> VwTelefonosAsigReportes { get; set; }

    public virtual DbSet<_2459320100103> _2459320100103s { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=192.168.7.7; database=dbAllocation; uid=login_Allocation_Admin; pwd=Cannondale2015?; encrypt=true;trustservercertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
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

        modelBuilder.Entity<Agent>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("agents");

            entity.Property(e => e.Active)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("ACTIVE");
            entity.Property(e => e.Ban).HasColumnName("BAN");
            entity.Property(e => e.Cartera)
                .HasMaxLength(70)
                .IsUnicode(false)
                .HasColumnName("cartera");
            entity.Property(e => e.Changed)
                .HasColumnType("datetime")
                .HasColumnName("CHANGED");
            entity.Property(e => e.ClaveCjc)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("ClaveCJC");
            entity.Property(e => e.ClaveRh).HasColumnName("ClaveRH");
            entity.Property(e => e.Clavesucursal)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("clavesucursal");
            entity.Property(e => e.Clavetelefonica).HasColumnName("clavetelefonica");
            entity.Property(e => e.Contrasena).HasMaxLength(50);
            entity.Property(e => e.Coordinador)
                .HasMaxLength(128)
                .IsUnicode(false)
                .HasColumnName("COORDINADOR");
            entity.Property(e => e.Created)
                .HasColumnType("datetime")
                .HasColumnName("CREATED");
            entity.Property(e => e.Grupo)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("GRUPO");
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Idproducto).HasColumnName("idproducto");
            entity.Property(e => e.Ingreso)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("ingreso");
            entity.Property(e => e.IpCoord)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.LlamadasCc).HasColumnName("LlamadasCC");
            entity.Property(e => e.LlamadasSc).HasColumnName("LlamadasSC");
            entity.Property(e => e.Login)
                .HasMaxLength(64)
                .IsUnicode(false)
                .HasColumnName("LOGIN");
            entity.Property(e => e.Meta).HasColumnName("META");
            entity.Property(e => e.Name)
                .HasMaxLength(64)
                .IsUnicode(false)
                .HasColumnName("NAME");
            entity.Property(e => e.Password)
                .HasMaxLength(64)
                .IsUnicode(false)
                .HasColumnName("PASSWORD");
            entity.Property(e => e.Passwordold)
                .HasMaxLength(64)
                .IsUnicode(false)
                .HasColumnName("PASSWORDOld");
            entity.Property(e => e.Puesto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.RefShift).HasColumnName("REF_SHIFT");
            entity.Property(e => e.State).HasColumnName("STATE");
            entity.Property(e => e.Station)
                .HasMaxLength(128)
                .IsUnicode(false)
                .HasColumnName("STATION");
            entity.Property(e => e.Turno)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Userblk)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("USERBLK");
        });

        modelBuilder.Entity<AsigProducto6>(entity =>
        {
            entity.HasKey(e => e.IdCuenta).HasName("PK__ASIG_Pro__BBC6DF32047B3A90");

            entity.ToTable("ASIG_Producto_6", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Act)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.BanderadePromesa)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CalifScore)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("calif score");
            entity.Property(e => e.CalificacionRiesgoOnusOffus)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CalleNumero)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Calle_numero");
            entity.Property(e => e.Carteo)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Ciudad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CodigoPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Codigo_postal");
            entity.Property(e => e.CollIndicator)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Colonia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Comisiones)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Compras)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DiaCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Dia_corte");
            entity.Property(e => e.DiasWo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DiasWO");
            entity.Property(e => e.EstadoAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EstadoFuncional)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EstatusdePromesa)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EstatusdelaNegociación)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Etiquetadeasignacion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha_asignacion");
            entity.Property(e => e.FechaProceso)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaQueja)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha_ultimo_pago");
            entity.Property(e => e.FechaWriteOff)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha_write_off");
            entity.Property(e => e.FechadecambiodeEstatus)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.GastosCobranza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Gastos_cobranza");
            entity.Property(e => e.GastosPorAdministrativo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Gastosdeliquidacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("gastosdeliquidacion");
            entity.Property(e => e.IdAcuerdo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Id_agencia");
            entity.Property(e => e.ImpuestosIva)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ImpuestosIVA");
            entity.Property(e => e.Interesdegastosdecobranza)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.InteresesMoratorioTardio)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.InteresesMoratoriosSobreTasa)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.InteresesOrdinarios)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IvaInteresMoratorio)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IvaInteresesOrdinario)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Ivadeliquidacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ivadeliquidacion");
            entity.Property(e => e.Locacion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.MarcacampañaespecialSegmentacion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.MatrizsecuenciaOnusOffus)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.MesesVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Meses_vencidos");
            entity.Property(e => e.MesesenLibro)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.MinimoPagar)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Minimo_pagar");
            entity.Property(e => e.MontoSobregiro)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Monto_sobregiro");
            entity.Property(e => e.NombreCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Nombre_cliente");
            entity.Property(e => e.NombreCyber)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Nota)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NumeroClienteBmx)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Numero_cliente_bmx");
            entity.Property(e => e.Onusoffus)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Portafolio)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PromesasRotas)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.QualityCollid)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Queja)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Recomendacioninferida)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("recomendacioninferida");
            entity.Property(e => e.Recomendación)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.RegionAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Rfc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.SaldoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo_actual");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo_vencido");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Seguro)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SituacionCuentaBanco)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Situacion_cuenta_banco");
            entity.Property(e => e.Subact)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.TarifaAnualesIva)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Tarifaxsobregiro)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.TasaOnusOffusPaymentPlan)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.TasaOnusOffusSettlement)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono1)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono10)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono1Particular)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Telefono1_particular");
            entity.Property(e => e.Telefono2)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono2Oficina)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Telefono2_oficina");
            entity.Property(e => e.Telefono3)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono4)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono5)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono6)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono7)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono8)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono9)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Timezone)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("timezone");
            entity.Property(e => e.Tipo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<AsigProducto6Tel>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ASIG_Producto_6_TELS", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<AsignacionBanamexHistorico>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Asignacion_Banamex_HISTORICO");

            entity.HasIndex(e => e.NumeroCuenta, "Asignacion_Banamex_HISTORICO_Cuenta");

            entity.Property(e => e.Act)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.BanderadePromesa)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.CalificacionRiesgoOnusOffus)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.CalleNumero)
                .HasMaxLength(80)
                .IsUnicode(false)
                .HasColumnName("Calle_numero");
            entity.Property(e => e.Ciudad)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.CodigoHorarioZona)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("Codigo_horario_zona");
            entity.Property(e => e.CodigoPostal)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Codigo_postal");
            entity.Property(e => e.CollIndicator)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.Colonia)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.Comisiones)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Compras)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Correo)
                .HasMaxLength(60)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.DiaCorte)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("Dia_corte");
            entity.Property(e => e.DiasWo)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("DiasWO");
            entity.Property(e => e.Estado)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.EstadoAsignacion)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.EstadoFuncional)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.EstatusdePromesa)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.EstatusdelaNegociación)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Etiquetadeasignacion)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.ExtensionTelefono2)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("Extension_telefono2");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Fecha_asignacion");
            entity.Property(e => e.FechaInicioCredito)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Fecha_inicio_CREDITO");
            entity.Property(e => e.FechaProceso).HasColumnType("datetime");
            entity.Property(e => e.FechaUltimoCargo)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Fecha_ultimo_pago");
            entity.Property(e => e.FechaVencimientoRemesa)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Fecha_vencimiento_remesa");
            entity.Property(e => e.FechaWriteOff)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("Fecha_write_off");
            entity.Property(e => e.FechadecambiodeEstatus)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.Forberance)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.GastosCobranza)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("Gastos_cobranza");
            entity.Property(e => e.GastosPorAdministrativo)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Gastosdeliquidacion)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("gastosdeliquidacion");
            entity.Property(e => e.IdAcuerdo)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.IdAgencia)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Id_agencia");
            entity.Property(e => e.IdgpoControl)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("IDGpoControl");
            entity.Property(e => e.ImpuestosIva)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("ImpuestosIVA");
            entity.Property(e => e.Interesdegastosdecobranza)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.InteresesMoratorioTardio)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.InteresesMoratorios)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("Intereses_moratorios");
            entity.Property(e => e.InteresesMoratoriosSobreTasa)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.InteresesNormal)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("Intereses_Normal");
            entity.Property(e => e.InteresesOrdinarios)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.IvaInteresMonatorio)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.IvaInteresesOrdinario)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Ivadeliquidacion)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("ivadeliquidacion");
            entity.Property(e => e.Locacion)
                .HasMaxLength(7)
                .IsUnicode(false);
            entity.Property(e => e.MarcacampañaespecialSegmentacion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.MatrizsecuenciaOnusOffus)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MesesVencidos)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("Meses_vencidos");
            entity.Property(e => e.MesesenLibro)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.MinimoPagar)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("Minimo_pagar");
            entity.Property(e => e.MontoSobregiro)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("Monto_sobregiro");
            entity.Property(e => e.NombreCliente)
                .HasMaxLength(80)
                .IsUnicode(false)
                .HasColumnName("Nombre_cliente");
            entity.Property(e => e.NombreClienteRemesa)
                .HasMaxLength(80)
                .IsUnicode(false)
                .HasColumnName("Nombre_cliente_remesa");
            entity.Property(e => e.NumeroBin)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("Numero_bin");
            entity.Property(e => e.NumeroClienteBmx)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("Numero_cliente_bmx");
            entity.Property(e => e.NumeroCuenta)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("Numero_cuenta");
            entity.Property(e => e.Onusoffus)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Portafolio)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.ProgramaOcc)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("Programa_OCC");
            entity.Property(e => e.PromesasRotas)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Quality)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.QualityCollid)
                .HasMaxLength(41)
                .IsUnicode(false);
            entity.Property(e => e.QualityFinal)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.QualityRiesgoOnusOffus)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.QuialityRecovery)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Recomendacion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Recomendacioninferida)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("recomendacioninferida");
            entity.Property(e => e.RegionAsignacion)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Rfc)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.SaldoActual)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("Saldo_actual");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("Saldo_vencido");
            entity.Property(e => e.Score)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.ScoreFinal)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.ScoreOcc)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("Score_OCC");
            entity.Property(e => e.SegmentoCobranzaNivelMorosidadCuenta)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("Segmento_cobranza_nivel_morosidad_cuenta");
            entity.Property(e => e.Seguro)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.SituacionCuentaBanco)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("Situacion_cuenta_banco");
            entity.Property(e => e.Subact)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.TarifaAnualesIva)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Tarifaxsobregiro)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TasaOnusOffusPaymentPlan)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.TasaOnusOffusSettlement)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Telefono1)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Telefono10)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Telefono1Particular)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("Telefono1_particular");
            entity.Property(e => e.Telefono2)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Telefono2Oficina)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("Telefono2_oficina");
            entity.Property(e => e.Telefono3)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Telefono4)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Telefono5)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Telefono6)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Telefono7)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Telefono8)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Telefono9)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.TelefonoCelular)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("Telefono_celular");
            entity.Property(e => e.Timezone)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("timezone");
            entity.Property(e => e.TriadScore)
                .HasMaxLength(3)
                .IsUnicode(false);
        });

        modelBuilder.Entity<BaseG>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("baseG");

            entity.Property(e => e.Aplica).HasMaxLength(255);
            entity.Property(e => e.Archivo)
                .HasMaxLength(255)
                .HasColumnName("ARCHIVO");
            entity.Property(e => e.Cacr)
                .HasMaxLength(255)
                .HasColumnName("CACR");
            entity.Property(e => e.Dispositivo)
                .HasMaxLength(255)
                .HasColumnName("DISPOSITIVO");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("FECHA");
            entity.Property(e => e.Hora)
                .HasColumnType("datetime")
                .HasColumnName("HORA");
            entity.Property(e => e.IdAgencia).HasColumnName("ID_AGENCIA");
            entity.Property(e => e.Inventario)
                .HasMaxLength(255)
                .HasColumnName("INVENTARIO");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .HasColumnName("NOMBRE");
            entity.Property(e => e.NumeroDeCuenta)
                .HasMaxLength(255)
                .HasColumnName("NUMERO DE CUENTA");
            entity.Property(e => e.Renombrar).HasColumnName("renombrar");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .HasColumnName("SEGMENTO");
            entity.Property(e => e.Telefonico)
                .HasMaxLength(255)
                .HasColumnName("TELEFONICO ");
        });

        modelBuilder.Entity<BaseRojo>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Cliente)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaBaseRojo)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<BaseRojos2>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("BaseRojos2");

            entity.Property(e => e.Cliente)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaBaseRojo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<BitacoraBaseRojo>(entity =>
        {
            entity.HasNoKey();

            entity.HasIndex(e => e.FechaProceso, "ClusteredIndex-20190531-130830").IsClustered();

            entity.HasIndex(e => e.Idcuenta, "NonClusteredIndex-20190531-130513");

            entity.HasIndex(e => e.NumeroClienteBmx, "NonClusteredIndex-20190531-130726");

            entity.HasIndex(e => e.Telefono, "NonClusteredIndex-20190531-130756");

            entity.Property(e => e.Cliente)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaBaseRojo)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.FechaProceso)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(26)
                .IsUnicode(false)
                .HasColumnName("idcuenta");
            entity.Property(e => e.NumeroClienteBmx)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("Numero_cliente_bmx");
            entity.Property(e => e.Telefono)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.TelefonoAsignacion)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.TelefonoColumna)
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        modelBuilder.Entity<BitacoraBaseRojos2>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("BitacoraBaseRojos2");

            entity.Property(e => e.Cliente)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaBaseRojo)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.FechaProceso)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(26)
                .IsUnicode(false)
                .HasColumnName("idcuenta");
            entity.Property(e => e.NumeroClienteBmx)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("Numero_cliente_bmx");
            entity.Property(e => e.Telefono)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.TelefonoAsignacion)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.TelefonoColumna)
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        modelBuilder.Entity<BitacoraRegresosFinal>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("BitacoraRegresosFinal");

            entity.Property(e => e.Accion)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("ACCION");
            entity.Property(e => e.Agente)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("AGENTE");
            entity.Property(e => e.Comentario)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("COMENTARIO");
            entity.Property(e => e.Cuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("CUENTA");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("FECHA");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("LADA");
            entity.Property(e => e.Origen)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Resultado)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("RESULTADO");
            entity.Property(e => e.Telefono)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("TELEFONO");
        });

        modelBuilder.Entity<BitacoraSolicitud>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("BitacoraSolicitud");

            entity.Property(e => e.Fecha)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.Numerodecuenta)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("segmento");
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
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
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
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");

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

        modelBuilder.Entity<CamposTxtRep>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("CamposTxtREP");

            entity.Property(e => e.Campo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Descripción)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IdCampo)
                .ValueGeneratedOnAdd()
                .HasColumnName("idCampo");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.Proceso)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.TipoDato)
                .HasMaxLength(20)
                .IsUnicode(false);
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
            entity.HasKey(e => e.NumeroControl)
                .IsClustered(false)
                .HasFillFactor(100);

            entity.ToTable("Cartera");

            entity.Property(e => e.NumeroControl)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.AcumuladoPagos).HasColumnType("decimal(12, 2)");
            entity.Property(e => e.AcumuladoPagosDolares).HasColumnType("decimal(12, 2)");
            entity.Property(e => e.AdCar0)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.AdCar1)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.AdCar2)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.AdCar3)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.AdCar4)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.AdCar5)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.AdCar6)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.AdCar7)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.AdCar8)
                .HasMaxLength(120)
                .IsUnicode(false);
            entity.Property(e => e.AdCar9)
                .HasMaxLength(120)
                .IsUnicode(false);
            entity.Property(e => e.AdNum0).HasColumnType("decimal(13, 2)");
            entity.Property(e => e.AdNum1).HasColumnType("decimal(13, 2)");
            entity.Property(e => e.AdNum2).HasColumnType("decimal(13, 2)");
            entity.Property(e => e.AdNum3).HasColumnType("decimal(13, 2)");
            entity.Property(e => e.AdNum4).HasColumnType("decimal(13, 2)");
            entity.Property(e => e.AdNum5).HasColumnType("decimal(13, 2)");
            entity.Property(e => e.AdNum6).HasColumnType("decimal(13, 2)");
            entity.Property(e => e.AdNum7).HasColumnType("decimal(13, 2)");
            entity.Property(e => e.AdNum8).HasColumnType("decimal(13, 2)");
            entity.Property(e => e.AdNum9).HasColumnType("decimal(13, 2)");
            entity.Property(e => e.Base)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.ClaveCliente)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.ClaveContacto)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.ClaveDeAsignacion)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.ClaveDeSucursal)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.ClaveDeZona)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.ClaveUltimoGestDom)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.ClaveUltimoGestTel)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.CodigoPostalPart)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.CodigoPostalTrab)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.DirCalleNumero)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.DirColonia)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.DirDelMun)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.DirTrabajoCalleNumero)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.DirTrabajoColonia)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.DirTrabajoEstado)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Estilo)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.Estrategia).HasColumnType("text");
            entity.Property(e => e.Extension)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.FechaActMov).HasColumnType("datetime");
            entity.Property(e => e.FechaActOper).HasColumnType("datetime");
            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaApertura).HasColumnType("datetime");
            entity.Property(e => e.FechaAsigArchivo).HasColumnType("datetime");
            entity.Property(e => e.FechaAsigCliente).HasColumnType("datetime");
            entity.Property(e => e.FechaCancel).HasColumnType("datetime");
            entity.Property(e => e.FechaCastigo).HasColumnType("datetime");
            entity.Property(e => e.FechaCorte).HasColumnType("datetime");
            entity.Property(e => e.FechaDeIngresoAcjc)
                .HasColumnType("datetime")
                .HasColumnName("FechaDeIngresoACJC");
            entity.Property(e => e.FechaDevolucion).HasColumnType("datetime");
            entity.Property(e => e.FechaReasig).HasColumnType("datetime");
            entity.Property(e => e.FechaRevision).HasColumnType("datetime");
            entity.Property(e => e.FechaSegGestDom).HasColumnType("datetime");
            entity.Property(e => e.FechaSegGestTel).HasColumnType("datetime");
            entity.Property(e => e.FechaUltimaGestDom).HasColumnType("datetime");
            entity.Property(e => e.FechaUltimaGestTel).HasColumnType("datetime");
            entity.Property(e => e.Gestor)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.GrupoAnterior)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.GrupoDeTrabajo)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.GrupoGestoresIdGrupoGestores)
                .HasColumnType("numeric(10, 0)")
                .HasColumnName("GrupoGestores_idGrupoGestores");
            entity.Property(e => e.HoraSegGestTel)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.HoraSeguimGestDom)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.InteresesFacturados).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.InteresesNoFacturados).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.LlamadasCcontacto)
                .HasColumnType("numeric(10, 0)")
                .HasColumnName("LlamadasCContacto");
            entity.Property(e => e.LlamadasScontacto)
                .HasColumnType("numeric(10, 0)")
                .HasColumnName("LlamadasSContacto");
            entity.Property(e => e.Llave1)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Llave2)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Llave3)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.NombreDeudor)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.NombreEmpresa)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.Nota)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.NumPagosVencidos).HasColumnType("numeric(10, 0)");
            entity.Property(e => e.NumRegistrosDatosNuevos).HasColumnType("numeric(10, 0)");
            entity.Property(e => e.NumeroAvales).HasColumnType("numeric(10, 0)");
            entity.Property(e => e.NumeroDeCuenta)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.NumeroDeEstado).HasColumnType("numeric(10, 0)");
            entity.Property(e => e.Puesto)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.Referencia)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Remesa).HasColumnType("numeric(10, 0)");
            entity.Property(e => e.SaldoAcobrar)
                .HasColumnType("decimal(12, 2)")
                .HasColumnName("SaldoACobrar");
            entity.Property(e => e.SaldoAcobrarDolares)
                .HasColumnType("decimal(12, 2)")
                .HasColumnName("SaldoACobrarDolares");
            entity.Property(e => e.SaldoActualDolares).HasColumnType("decimal(12, 2)");
            entity.Property(e => e.SaldoActualPesos).HasColumnType("decimal(12, 2)");
            entity.Property(e => e.SaldoInicial).HasColumnType("decimal(13, 2)");
            entity.Property(e => e.SaldoInicialDolares).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.SaldoVencido).HasColumnType("decimal(13, 2)");
            entity.Property(e => e.SaldoVencidoDolares).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.StatusCuenta)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.StatusEquivCliente)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.StatusUltimaGestDom)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.StatusUltimaGestTel)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.TelAd1)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TelAd2)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TelAd3)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TelParticular)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.TelTrabajo)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.TipoDeCredito)
                .HasMaxLength(6)
                .IsUnicode(false);
            entity.Property(e => e.Val)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.VisitasCcontacto)
                .HasColumnType("numeric(10, 0)")
                .HasColumnName("VisitasCContacto");
            entity.Property(e => e.VisitasScontacto)
                .HasColumnType("numeric(10, 0)")
                .HasColumnName("VisitasSContacto");
        });

        modelBuilder.Entity<Cartera1>(entity =>
        {
            entity.HasKey(e => e.IdCartera).HasName("PK_Carteras_2");

            entity.ToTable("Carteras");

            entity.Property(e => e.IdCartera)
                .ValueGeneratedNever()
                .HasColumnName("idCartera");
            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.Cartera)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CarterasBackup>(entity =>
        {
            entity.HasKey(e => e.IdCartera).HasName("PK_Carteras");

            entity.ToTable("Carteras_Backup");

            entity.Property(e => e.IdCartera)
                .ValueGeneratedNever()
                .HasColumnName("idCartera");
            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.Cartera)
                .HasMaxLength(100)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
        });

        modelBuilder.Entity<CatalogoEtapa>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Catalogo_Etapa");

            entity.Property(e => e.Etapa)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Portafolio)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Catalogocpnuevo>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("CATALOGOCPNUEVO");

            entity.Property(e => e.CaYCr)
                .HasMaxLength(5)
                .HasColumnName("CA_Y_CR");
            entity.Property(e => e.CodigoAccion)
                .HasMaxLength(3)
                .HasColumnName("Codigo_Accion");
            entity.Property(e => e.CodigoResultado)
                .HasMaxLength(3)
                .HasColumnName("Codigo_Resultado");
            entity.Property(e => e.Conexión).HasMaxLength(2);
            entity.Property(e => e.Contacto).HasMaxLength(2);
            entity.Property(e => e.Mensaje).HasMaxLength(2);
            entity.Property(e => e.Parciales)
                .HasMaxLength(2)
                .HasColumnName("PARCIALES");
            entity.Property(e => e.RelacionCausasDeNoPago)
                .HasMaxLength(25)
                .HasColumnName("Relacion_causas_de_no_pago");
            entity.Property(e => e.Rmt)
                .HasMaxLength(2)
                .HasColumnName("RMT");
            entity.Property(e => e.TipoDeGestion)
                .HasMaxLength(20)
                .HasColumnName("Tipo_de_gestion");
        });

        modelBuilder.Entity<ConteoAsignacion>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ConteoAsignacion");

            entity.Property(e => e.CantidadCuentas)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Cantidad_Cuentas");
            entity.Property(e => e.FechaAsignacion).HasColumnName("Fecha_Asignacion");
            entity.Property(e => e.IdAgencia).HasColumnName("ID_Agencia");
            entity.Property(e => e.RazonSocial)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Razon_social");
            entity.Property(e => e.Segmento)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Total).HasColumnType("money");
        });

        modelBuilder.Entity<Correccion>(entity =>
        {
            entity.HasKey(e => e.Numerodecuenta);

            entity.ToTable("Correccion");

            entity.Property(e => e.Numerodecuenta)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("numerodecuenta");
            entity.Property(e => e.Num).HasColumnName("num");
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

        modelBuilder.Entity<Eliminacausa>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("eliminacausas");

            entity.Property(e => e.IdPregunta).HasColumnName("idPregunta");
            entity.Property(e => e.IdRespuesta).HasColumnName("idRespuesta");
            entity.Property(e => e.IdSiguientePregunta).HasColumnName("idSiguientePregunta");
            entity.Property(e => e.IdValor).HasColumnName("idValor");
            entity.Property(e => e.Respuesta).HasMaxLength(50);
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

        modelBuilder.Entity<GestionesRegresoPrueba>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Gestiones_Regreso_prueba");

            entity.HasIndex(e => new { e.FechaEnvio, e.Numerodecuenta }, "IDX_Gestiones_Regreso_prueba_FechaEnvio")
                .IsDescending(true, false)
                .IsClustered();

            entity.Property(e => e.Cj)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("CJ");
            entity.Property(e => e.Clavegesttel)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.Cliente)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.CodigoAccionResultado)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_accion_resultado");
            entity.Property(e => e.CodigoCarta)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_Carta");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.Constante)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.FechaEnvio).HasColumnType("datetime");
            entity.Property(e => e.FechaHoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Fecha_hora_actividad");
            entity.Property(e => e.Grupo)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.HoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Hora_actividad");
            entity.Property(e => e.IdAgencia)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Id_agencia");
            entity.Property(e => e.IdGestion)
                .ValueGeneratedOnAdd()
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("Id_Gestion");
            entity.Property(e => e.NumeroControl)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.NumeroSecuencia)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("Numero_secuencia");
            entity.Property(e => e.Numerodecuenta)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Principal).HasColumnType("numeric(18, 0)");
            entity.Property(e => e.Tel).HasMaxLength(200);
            entity.Property(e => e.TipoDeCredito)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.TipoGestion)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<GestionesRegresoPrueba2>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Gestiones_Regreso_prueba2");

            entity.HasIndex(e => e.FechaEnvio, "IDX_Gestiones_Regreso_prueba2_FechaEnvio")
                .IsDescending()
                .IsClustered()
                .HasFillFactor(80);

            entity.HasIndex(e => e.Numerodecuenta, "IDX_Gestiones_Regreso_prueba2_Numerodecuenta").HasFillFactor(80);

            entity.Property(e => e.Cj)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("CJ");
            entity.Property(e => e.Clavegesttel)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.Cliente)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.CodigoAccionResultado)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_accion_resultado");
            entity.Property(e => e.CodigoCarta)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_Carta");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.Constante)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.FechaEnvio).HasColumnType("datetime");
            entity.Property(e => e.FechaHoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Fecha_hora_actividad");
            entity.Property(e => e.Grupo)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.HoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Hora_actividad");
            entity.Property(e => e.IdAgencia)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Id_agencia");
            entity.Property(e => e.IdGestion)
                .ValueGeneratedOnAdd()
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("Id_Gestion");
            entity.Property(e => e.NumeroControl)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.NumeroSecuencia)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("Numero_secuencia");
            entity.Property(e => e.Numerodecuenta)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Principal).HasColumnType("numeric(18, 0)");
            entity.Property(e => e.Tel).HasMaxLength(200);
            entity.Property(e => e.TipoDeCredito)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.TipoGestion)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<GestionesRegresoPrueba7>(entity =>
        {
            entity.HasKey(e => e.IdGestion);

            entity.ToTable("Gestiones_Regreso_prueba7");

            entity.Property(e => e.IdGestion)
                .ValueGeneratedOnAdd()
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("Id_Gestion");
            entity.Property(e => e.Cj)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("CJ");
            entity.Property(e => e.Clavegesttel)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.Cliente)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.CodigoAccionResultado)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_accion_resultado");
            entity.Property(e => e.CodigoCarta)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_Carta");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.Constante)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.FechaEnvio).HasColumnType("datetime");
            entity.Property(e => e.FechaHoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Fecha_hora_actividad");
            entity.Property(e => e.Grupo)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.HoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Hora_actividad");
            entity.Property(e => e.IdAgencia)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Id_agencia");
            entity.Property(e => e.NumeroControl)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.NumeroSecuencia)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("Numero_secuencia");
            entity.Property(e => e.Numerodecuenta)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Principal).HasColumnType("numeric(18, 0)");
            entity.Property(e => e.Tel).HasMaxLength(200);
            entity.Property(e => e.TipoDeCredito)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.TipoGestion)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<GestionesRegresoPruebaGdl>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Gestiones_Regreso_pruebaGDL");

            entity.Property(e => e.Cj)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("CJ");
            entity.Property(e => e.Clavegesttel)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.Cliente)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.CodigoAccionResultado)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_accion_resultado");
            entity.Property(e => e.CodigoCarta)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_Carta");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.Constante)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.FechaEnvio).HasColumnType("datetime");
            entity.Property(e => e.FechaHoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Fecha_hora_actividad");
            entity.Property(e => e.Grupo)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.HoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Hora_actividad");
            entity.Property(e => e.IdAgencia)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Id_agencia");
            entity.Property(e => e.IdGestion)
                .ValueGeneratedOnAdd()
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("Id_Gestion");
            entity.Property(e => e.NumeroControl)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.NumeroSecuencia)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("Numero_secuencia");
            entity.Property(e => e.Numerodecuenta)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Principal).HasColumnType("numeric(18, 0)");
            entity.Property(e => e.Tel).HasMaxLength(200);
            entity.Property(e => e.TipoDeCredito)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.TipoGestion)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<GestionesRegresoPruebaMbm>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Gestiones_Regreso_prueba_MBM");

            entity.Property(e => e.Cj)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("CJ");
            entity.Property(e => e.Clavegesttel)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.Cliente)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.CodigoAccionResultado)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_accion_resultado");
            entity.Property(e => e.CodigoCarta)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_Carta");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.Constante)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.FechaEnvio).HasColumnType("datetime");
            entity.Property(e => e.FechaHoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Fecha_hora_actividad");
            entity.Property(e => e.Grupo)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.HoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Hora_actividad");
            entity.Property(e => e.IdAgencia)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Id_agencia");
            entity.Property(e => e.IdGestion)
                .ValueGeneratedOnAdd()
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("Id_Gestion");
            entity.Property(e => e.NumeroControl)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.NumeroSecuencia)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("Numero_secuencia");
            entity.Property(e => e.Numerodecuenta)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Principal).HasColumnType("numeric(18, 0)");
            entity.Property(e => e.Tel).HasMaxLength(200);
            entity.Property(e => e.TipoDeCredito)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.TipoGestion)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<GestionesRegresoPruebaPaso>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Gestiones_Regreso_prueba_Paso");

            entity.Property(e => e.Cj)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("CJ");
            entity.Property(e => e.Clavegesttel)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.Cliente)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.CodigoAccionResultado)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_accion_resultado");
            entity.Property(e => e.CodigoCarta)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_Carta");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.Constante)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.FechaEnvio).HasColumnType("datetime");
            entity.Property(e => e.FechaHoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Fecha_hora_actividad");
            entity.Property(e => e.Grupo)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.HoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Hora_actividad");
            entity.Property(e => e.IdAgencia)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Id_agencia");
            entity.Property(e => e.IdGestion)
                .ValueGeneratedOnAdd()
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("Id_Gestion");
            entity.Property(e => e.NumeroControl)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.NumeroSecuencia)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("Numero_secuencia");
            entity.Property(e => e.Numerodecuenta)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Principal).HasColumnType("numeric(18, 0)");
            entity.Property(e => e.Tel).HasMaxLength(200);
            entity.Property(e => e.TipoDeCredito)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.TipoGestion)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<GestionesRegresoPruebaSumary>(entity =>
        {
            entity.HasKey(e => e.IdGestion).HasName("PK_Gestiones_Regreso_prueba_summary");

            entity.ToTable("Gestiones_Regreso_prueba_sumary");

            entity.Property(e => e.IdGestion)
                .ValueGeneratedOnAdd()
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("Id_Gestion");
            entity.Property(e => e.Cj)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("CJ");
            entity.Property(e => e.Clavegesttel)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.Cliente)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.CodigoAccionResultado)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_accion_resultado");
            entity.Property(e => e.CodigoCarta)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_Carta");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.Constante)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.FechaEnvio).HasColumnType("datetime");
            entity.Property(e => e.FechaHoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Fecha_hora_actividad");
            entity.Property(e => e.Grupo)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.HoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Hora_actividad");
            entity.Property(e => e.IdAgencia)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Id_agencia");
            entity.Property(e => e.NumeroControl)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.NumeroSecuencia)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("Numero_secuencia");
            entity.Property(e => e.Numerodecuenta)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Principal).HasColumnType("numeric(18, 0)");
            entity.Property(e => e.Tel)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("tel");
            entity.Property(e => e.TipoDeCredito)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.TipoGestion)
                .HasMaxLength(10)
                .IsUnicode(false);
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

        modelBuilder.Entity<IntensidadCrp>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("intensidad_CRP");

            entity.Property(e => e.Ca)
                .HasMaxLength(255)
                .HasColumnName("CA");
            entity.Property(e => e.Cr)
                .HasMaxLength(255)
                .HasColumnName("CR");
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.NumeroDeCuenta).HasMaxLength(255);
            entity.Property(e => e.Texto).HasMaxLength(255);
            entity.Property(e => e.TipoDeCredito).HasMaxLength(255);
            entity.Property(e => e.TipoGestion)
                .HasMaxLength(255)
                .HasColumnName("TIpoGestion");
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
            entity
                .HasNoKey()
                .ToTable("LogProceso");

            entity.Property(e => e.Archivo)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Computadora)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Dominio)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Error)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FechaHora).HasColumnType("datetime");
            entity.Property(e => e.IdEjecutivoInsert).HasColumnName("IdEjecutivo_Insert");
            entity.Property(e => e.IdLogProceso)
                .ValueGeneratedOnAdd()
                .HasColumnName("idLogProceso");
            entity.Property(e => e.Insertados).HasColumnName("insertados");
            entity.Property(e => e.Proceso).HasMaxLength(50);
            entity.Property(e => e.Usuario)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<LogProceso1>(entity =>
        {
            entity.HasKey(e => e.IdLogProceso).IsClustered(false);

            entity.ToTable("LogProcesos");

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

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.LogProceso1s)
                .HasForeignKey(d => d.IdProducto)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_LogProcesos_Procesos");
        });

        modelBuilder.Entity<MulticuentasContacto>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("MulticuentasContacto");

            entity.Property(e => e.Contacto)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("CONTACTO");
            entity.Property(e => e.FechaEnvio).HasColumnType("datetime");
            entity.Property(e => e.Numerodecuenta)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("NUMERODECUENTA");
        });

        modelBuilder.Entity<MulticuentasPortafolio>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("MulticuentasPortafolio");

            entity.Property(e => e.FechaEnvio).HasColumnType("datetime");
            entity.Property(e => e.Numerodecuenta)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("NUMERODECUENTA");
            entity.Property(e => e.Portafolio)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("PORTAFOLIO");
        });

        modelBuilder.Entity<PagosBmxBanamex35450>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PagosBMX_Banamex_35450 ", "Temp");

            entity.Property(e => e.Cuenta).HasMaxLength(50);
            entity.Property(e => e.FechaPago).HasMaxLength(50);
            entity.Property(e => e.FechaRecepcion).HasMaxLength(50);
            entity.Property(e => e.FechaRecepcion2).HasMaxLength(50);
            entity.Property(e => e.FechaWo).HasMaxLength(50);
            entity.Property(e => e.IdAgencia).HasMaxLength(50);
            entity.Property(e => e.MontoPago).HasMaxLength(50);
            entity.Property(e => e.Mv)
                .HasMaxLength(50)
                .HasColumnName("MV");
            entity.Property(e => e.Segmento).HasMaxLength(50);
        });

        modelBuilder.Entity<PagosNegativo>(entity =>
        {
            entity.HasKey(e => new { e.FechaPago, e.IdCartera, e.IdCuenta, e.MontoPago });

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("idCuenta");
            entity.Property(e => e.MontoPago).HasColumnType("money");
        });

        modelBuilder.Entity<ParaBorar>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Para_Borar");

            entity.Property(e => e.Column0)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Column 0");
        });

        modelBuilder.Entity<PersonalBmx>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("personal_bmx");

            entity.Property(e => e.Cartera)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CARTERA");
            entity.Property(e => e.Clavegesttel)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("clavegesttel");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NOMBRE");
            entity.Property(e => e.Numero).HasColumnName("numero");
            entity.Property(e => e.Puesto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PUESTO");
            entity.Property(e => e.Turno)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TURNO");
        });

        modelBuilder.Entity<PersonalVigenteBanamex>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PersonalVigenteBanamex");

            entity.Property(e => e.Cartera)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CARTERA");
            entity.Property(e => e.Clavegesttel)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("clavegesttel");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NOMBRE");
            entity.Property(e => e.Puesto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PUESTO");
            entity.Property(e => e.Turno)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TURNO");
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

        modelBuilder.Entity<Rem2459320241130Cl03122024>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Rem24593_20241130_CL03122024");

            entity.Property(e => e.Datos)
                .HasMaxLength(4000)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Remesa>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Remesa");

            entity.Property(e => e.Texto)
                .HasMaxLength(8000)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TblIntensidad>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tbl_Intensidad");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Intensidad).HasColumnName("intensidad");
            entity.Property(e => e.Tipo).HasMaxLength(6);
        });

        modelBuilder.Entity<TblIntensidadBit>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tbl_IntensidadBit");

            entity.Property(e => e.Cartas).HasColumnName("cartas");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Intensidad).HasColumnName("intensidad");
            entity.Property(e => e.Mv).HasColumnName("mv");
            entity.Property(e => e.PeriodoC)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("periodoC");
            entity.Property(e => e.PeriodoE)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("periodoE");
            entity.Property(e => e.PeriodoMv)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("periodoMV");
            entity.Property(e => e.PeriodoSk)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("periodoSK");
            entity.Property(e => e.PeriodoSm)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("periodoSM");
            entity.Property(e => e.PeriodoT)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("periodoT");
            entity.Property(e => e.PeriodoV)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("periodoV");
            entity.Property(e => e.Skip).HasColumnName("skip");
            entity.Property(e => e.Sms).HasColumnName("sms");
            entity.Property(e => e.Tipo).HasMaxLength(6);
            entity.Property(e => e.Visita).HasColumnName("visita");
        });

        modelBuilder.Entity<TblRellenoIn>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TblRellenoIn");

            entity.Property(e => e.Car)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("CAR");
            entity.Property(e => e.IdTipo).HasColumnName("id_tipo");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("tipo");
        });

        modelBuilder.Entity<TeléfonosAllocation>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.NúmeroTelefónico }).HasName("PK_TeléfonosAllocation_2");

            entity.ToTable("TeléfonosAllocation", tb => tb.HasTrigger("tr_InsertaTeléfonosCollection_2"));

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
                .HasConstraintName("FK_TeléfonosAllocation_Carteras_2");
        });

        modelBuilder.Entity<TeléfonosAllocationBackup>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.NúmeroTelefónico }).HasName("PK_TeléfonosAllocation");

            entity.ToTable("TeléfonosAllocation_Backup", tb => tb.HasTrigger("tr_InsertaTeléfonosCollection"));

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

            entity.HasOne(d => d.IdCarteraNavigation).WithMany(p => p.TeléfonosAllocationBackups)
                .HasForeignKey(d => d.IdCartera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeléfonosAllocation_Carteras");
        });

        modelBuilder.Entity<TestBaseRojo>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("test_BaseRojos");

            entity.Property(e => e.Agencia)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.ComprasYDisposiciones).HasColumnName("Compras_y_Disposiciones");
            entity.Property(e => e.Cuenta)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Familia)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.NumCliente)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Num_Cliente");
            entity.Property(e => e.Segmento)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .IsUnicode(false);
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

        modelBuilder.Entity<Tmpeliminar>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tmpeliminar");

            entity.Property(e => e.Ca)
                .HasMaxLength(255)
                .HasColumnName("CA");
            entity.Property(e => e.Clavegesttel).HasMaxLength(255);
            entity.Property(e => e.Cr)
                .HasMaxLength(255)
                .HasColumnName("CR");
            entity.Property(e => e.Fecha).HasMaxLength(255);
            entity.Property(e => e.NumeroControl).HasMaxLength(255);
            entity.Property(e => e.NumeroDeCuenta).HasMaxLength(255);
            entity.Property(e => e.Telefono).HasMaxLength(255);
            entity.Property(e => e.Texto).HasMaxLength(255);
            entity.Property(e => e.TipoDeCredito).HasMaxLength(255);
            entity.Property(e => e.TipoGestion)
                .HasMaxLength(255)
                .HasColumnName("TIpoGestion");
        });

        modelBuilder.Entity<Tra2010>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tra_2010");

            entity.Property(e => e.Column1)
                .HasMaxLength(200)
                .HasColumnName("column1");
        });

        modelBuilder.Entity<Tra2015>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tra_2015");

            entity.Property(e => e.Column1).HasColumnName("column1");
        });

        modelBuilder.Entity<Validadife>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("validadife");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.NumeroDeCuenta)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.TelefonoEnF5)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Validat>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("validat");

            entity.Property(e => e.Estado)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdEjecutivoClasificación).HasColumnName("idEjecutivoClasificación");
            entity.Property(e => e.IdOrigen).HasColumnName("idOrigen");
            entity.Property(e => e.IdTelefonía).HasColumnName("idTelefonía");
            entity.Property(e => e.Municipio)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SegHorarioContacto).HasPrecision(0);
        });

        modelBuilder.Entity<ValoresOcj>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("valoresOCJ");

            entity.Property(e => e.Cacr)
                .HasMaxLength(6)
                .HasColumnName("CACR");
            entity.Property(e => e.Catalogo).HasMaxLength(20);
            entity.Property(e => e.Clavedecontacto)
                .HasMaxLength(5)
                .HasColumnName("clavedecontacto");
            entity.Property(e => e.Detalle).HasMaxLength(300);
            entity.Property(e => e.IdValor).HasColumnName("idValor");
            entity.Property(e => e.Idsituacion)
                .HasMaxLength(5)
                .HasColumnName("idsituacion");
            entity.Property(e => e.Inbound)
                .HasMaxLength(6)
                .HasColumnName("inbound");
            entity.Property(e => e.Inbound1).HasMaxLength(255);
            entity.Property(e => e.NombreId).HasMaxLength(20);
            entity.Property(e => e.Plantilla).HasMaxLength(500);
            entity.Property(e => e.PlantillaInbound)
                .HasMaxLength(500)
                .HasColumnName("Plantilla_inbound");
            entity.Property(e => e.Valor).HasMaxLength(60);
        });

        modelBuilder.Entity<VgralRojo>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("VGralRojos");

            entity.Property(e => e.Cliente)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaBaseRojo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Gral)
                .HasMaxLength(35)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<ViewRandom>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("view_Random");
        });

        modelBuilder.Entity<VistaGestionesRegresoPrueba2>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("Vista_Gestiones_Regreso_prueba2");

            entity.Property(e => e.Cj)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("CJ");
            entity.Property(e => e.Clavegesttel)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.Cliente)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.CodigoAccionResultado)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_accion_resultado");
            entity.Property(e => e.CodigoCarta)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("Codigo_Carta");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.Constante)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.FechaEnvio).HasColumnType("datetime");
            entity.Property(e => e.FechaHoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Fecha_hora_actividad");
            entity.Property(e => e.Grupo)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.HoraActividad)
                .HasColumnType("datetime")
                .HasColumnName("Hora_actividad");
            entity.Property(e => e.IdAgencia)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Id_agencia");
            entity.Property(e => e.IdGestion)
                .ValueGeneratedOnAdd()
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("Id_Gestion");
            entity.Property(e => e.NumeroControl)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.NumeroSecuencia)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("Numero_secuencia");
            entity.Property(e => e.Numerodecuenta)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Principal).HasColumnType("numeric(18, 0)");
            entity.Property(e => e.Tel).HasMaxLength(200);
            entity.Property(e => e.TipoDeCredito)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.TipoGestion)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<VrojosElimina>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("VRojosElimina");

            entity.Property(e => e.Idcuenta)
                .HasMaxLength(26)
                .IsUnicode(false)
                .HasColumnName("idcuenta");
        });

        modelBuilder.Entity<VtelElimina>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("VTelElimina");

            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
        });

        modelBuilder.Entity<VtelGralAsig>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("VTelGralAsig");

            entity.Property(e => e.Gral)
                .HasMaxLength(35)
                .IsUnicode(false);
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
            entity.Property(e => e.NumeroClienteBmx)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("Numero_cliente_bmx");
            entity.Property(e => e.Telefono)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.TelefonoColumna)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<VtelGralRojo>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("VTelGralRojos");

            entity.Property(e => e.Gral)
                .HasMaxLength(35)
                .IsUnicode(false);
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
            entity.Property(e => e.NúmeroCliente)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.TelefonoColumna)
                .HasMaxLength(10)
                .IsUnicode(false);
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
                .IsUnicode(false);
        });

        modelBuilder.Entity<VwDatosNuevo>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_DatosNuevos");

            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.Escenario)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.T1)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.T10)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.T2)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.T3)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.T4)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.T5)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.T6)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.T7)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.T8)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.T9)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Valor)
                .HasMaxLength(100)
                .IsUnicode(false);
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
                .IsUnicode(false);
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
                .IsUnicode(false);
            entity.Property(e => e.Término)
                .HasMaxLength(13)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<VwNegociacione>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_Negociaciones");

            entity.Property(e => e.Duración).HasPrecision(0);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCausaNoPago).HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdHerramienta).HasColumnName("idHerramienta");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.MontoPago).HasColumnType("money");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
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
                .IsUnicode(false);
        });

        modelBuilder.Entity<VwTelefonosAsigReporte>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_TelefonosAsigReporte");

            entity.Property(e => e.Fecha)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.NumeroCuenta)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("Numero_cuenta");
            entity.Property(e => e.T)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<_2459320100103>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("24593_20100103");

            entity.Property(e => e.Column1)
                .HasMaxLength(200)
                .HasColumnName("column1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
