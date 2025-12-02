using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Loki.ModelsDbAllocationMictlan;

public partial class DbAllocationContextMictlan : DbContext
{
    public DbAllocationContextMictlan()
    {
    }

    public DbAllocationContextMictlan(DbContextOptions<DbAllocationContextMictlan> options)
        : base(options)
    {
    }

    public virtual DbSet<Accione> Acciones { get; set; }

    public virtual DbSet<AcumProducto12632442> AcumProducto12632442s { get; set; }

    public virtual DbSet<AcumProducto13332440> AcumProducto13332440s { get; set; }

    public virtual DbSet<AcumProducto13332441> AcumProducto13332441s { get; set; }

    public virtual DbSet<AsigProducto127> AsigProducto127s { get; set; }

    public virtual DbSet<Bus> Buses { get; set; }

    public virtual DbSet<CamposAdicionale> CamposAdicionales { get; set; }

    public virtual DbSet<CamposAsig> CamposAsigs { get; set; }

    public virtual DbSet<CamposCondicionado> CamposCondicionados { get; set; }

    public virtual DbSet<CamposTxt> CamposTxts { get; set; }

    public virtual DbSet<CargasAlCliente> CargasAlClientes { get; set; }

    public virtual DbSet<Cartera> Carteras { get; set; }

    public virtual DbSet<CatalogoNuevoF> CatalogoNuevoFs { get; set; }

    public virtual DbSet<Chist> Chists { get; set; }

    public virtual DbSet<CodificacionesActualiza> CodificacionesActualizas { get; set; }

    public virtual DbSet<Collect> Collects { get; set; }

    public virtual DbSet<CuentaCh> CuentaChes { get; set; }

    public virtual DbSet<CuentasAcción> CuentasAccións { get; set; }

    public virtual DbSet<CuentasCierre> CuentasCierres { get; set; }

    public virtual DbSet<CuentasQueja> CuentasQuejas { get; set; }

    public virtual DbSet<CuentasQuejaHistorial> CuentasQuejaHistorials { get; set; }

    public virtual DbSet<Cuentascambium> Cuentascambia { get; set; }

    public virtual DbSet<CódigosPostal> CódigosPostals { get; set; }

    public virtual DbSet<CódigosPostale> CódigosPostales { get; set; }

    public virtual DbSet<Ejecucione> Ejecuciones { get; set; }

    public virtual DbSet<EvitarRetiro> EvitarRetiros { get; set; }

    public virtual DbSet<Extr4172813> Extr4172813s { get; set; }

    public virtual DbSet<FaltantesSantander> FaltantesSantanders { get; set; }

    public virtual DbSet<FechasAsignaciónOficial> FechasAsignaciónOficials { get; set; }

    public virtual DbSet<GestDiaria> GestDiarias { get; set; }

    public virtual DbSet<GestDiaria1> GestDiarias1 { get; set; }

    public virtual DbSet<GestSantum> GestSanta { get; set; }

    public virtual DbSet<Gestest> Gestests { get; set; }

    public virtual DbSet<GestionesDomiciliaria> GestionesDomiciliarias { get; set; }

    public virtual DbSet<GestionesSantum> GestionesSanta { get; set; }

    public virtual DbSet<IftTeléfono> IftTeléfonos { get; set; }

    public virtual DbSet<Job> Jobs { get; set; }

    public virtual DbSet<Layout> Layouts { get; set; }

    public virtual DbSet<ListaN> ListaNs { get; set; }

    public virtual DbSet<Listum> Lista { get; set; }

    public virtual DbSet<LogArchivo> LogArchivos { get; set; }

    public virtual DbSet<LogAsignación> LogAsignacións { get; set; }

    public virtual DbSet<LogIngreso> LogIngresos { get; set; }

    public virtual DbSet<LogProceso> LogProcesos { get; set; }

    public virtual DbSet<Mail4172808Pivot> Mail4172808Pivots { get; set; }

    public virtual DbSet<Masivo> Masivos { get; set; }

    public virtual DbSet<Negociacionessantum> Negociacionessanta { get; set; }

    public virtual DbSet<Negociacionesval> Negociacionesvals { get; set; }

    public virtual DbSet<Pago4172810> Pago4172810s { get; set; }

    public virtual DbSet<Pago4172811> Pago4172811s { get; set; }

    public virtual DbSet<PagosNegativo> PagosNegativos { get; set; }

    public virtual DbSet<Pagva> Pagvas { get; set; }

    public virtual DbSet<PlAmex> PlAmexes { get; set; }

    public virtual DbSet<Proceso> Procesos { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Respa> Respas { get; set; }

    public virtual DbSet<Respald> Respalds { get; set; }

    public virtual DbSet<RespaldoCod> RespaldoCods { get; set; }

    public virtual DbSet<Telc14145015> Telc14145015s { get; set; }

    public virtual DbSet<Telc4172807> Telc4172807s { get; set; }

    public virtual DbSet<Telc4172807Clase> Telc4172807Clases { get; set; }

    public virtual DbSet<TelefonosCambio> TelefonosCambios { get; set; }

    public virtual DbSet<TelefonosCambioFecha> TelefonosCambioFechas { get; set; }

    public virtual DbSet<Telefonosfecha> Telefonosfechas { get; set; }

    public virtual DbSet<Telefonosfecsant> Telefonosfecsants { get; set; }

    public virtual DbSet<Telefonosfecsantum> Telefonosfecsanta { get; set; }

    public virtual DbSet<TeléfonosAllocation> TeléfonosAllocations { get; set; }

    public virtual DbSet<TeléfonosAllocation2> TeléfonosAllocation2s { get; set; }

    public virtual DbSet<TeléfonosComplemento> TeléfonosComplementos { get; set; }

    public virtual DbSet<TiposCampo> TiposCampos { get; set; }

    public virtual DbSet<ValoresEquivalencium> ValoresEquivalencia { get; set; }

    public virtual DbSet<VwCarterasProducto> VwCarterasProductos { get; set; }

    public virtual DbSet<VwEjecucionesDetalle> VwEjecucionesDetalles { get; set; }

    public virtual DbSet<VwLogAsignación> VwLogAsignacións { get; set; }

    public virtual DbSet<VwProductosFechaInicial> VwProductosFechaInicials { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=192.168.7.197;database=dbAllocation;uid=login_ejecutor;pwd=3j3123/*-;encrypt=true;trustservercertificate=true");

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

        modelBuilder.Entity<AcumProducto12632442>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_126_32442", "Temp");

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.Bhscor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BHSCOR");
            entity.Property(e => e.Bonificacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Bp)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("BP");
            entity.Property(e => e.Bttc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("BTTC");
            entity.Property(e => e.Buc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUC");
            entity.Property(e => e.CP)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("C_P");
            entity.Property(e => e.CalifScore)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CALIF SCORE");
            entity.Property(e => e.Clasif)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLASIF");
            entity.Property(e => e.CodAccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_ACCION");
            entity.Property(e => e.CodResultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_RESULTADO");
            entity.Property(e => e.CodigoBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CODIGO_BLOQUEO");
            entity.Property(e => e.ComisionPTardio)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Comision_P_Tardio");
            entity.Property(e => e.Consecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CONSECUTIVO");
            entity.Property(e => e.CorteGestionable)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Corte_Gestionable");
            entity.Property(e => e.CtaTrascodificada)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CTA_TRASCODIFICADA");
            entity.Property(e => e.DiaCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIA_CORTE");
            entity.Property(e => e.DiaRpc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DIA RPC");
            entity.Property(e => e.DiasAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION");
            entity.Property(e => e.DiasMorosos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MOROSOS");
            entity.Property(e => e.Digital)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DIGITAL");
            entity.Property(e => e.Día01)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Día07)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ejecutivo");
            entity.Property(e => e.Especial)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ESPECIAL");
            entity.Property(e => e.FecUltGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULT_GESTION");
            entity.Property(e => e.FechaAltaRefin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ALTA_REFIN");
            entity.Property(e => e.FechaAperturaCta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CTA");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ASIGNACION");
            entity.Property(e => e.FechaCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CASTIGO");
            entity.Property(e => e.FechaCodBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_COD_BLOQUEO");
            entity.Property(e => e.FechaDesasignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_DESASIGNACION");
            entity.Property(e => e.FechaProxVencimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_PROX_VENCIMIENTO");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ULTIMO_PAGO");
            entity.Property(e => e.Fijar)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FormaDeTrabajo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Forma de trabajo");
            entity.Property(e => e.GrupoEconomico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("GRUPO_ECONOMICO");
            entity.Property(e => e.HoraRpc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("HORA RPC");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.IdPay)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ID_PAY");
            entity.Property(e => e.Interpelar)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("INTERPELAR");
            entity.Property(e => e.IrreConsumoQuita)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Lada1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA1");
            entity.Property(e => e.Lada2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA2");
            entity.Property(e => e.Lada3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA3");
            entity.Property(e => e.Mensualidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MENSUALIDAD");
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_AGENCIA");
            entity.Property(e => e.MontoMoroso)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_MOROSO");
            entity.Property(e => e.MontoUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMO_PAGO");
            entity.Property(e => e.NombreCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NOMBRE_CLIENTE");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("OBSERVACIONES");
            entity.Property(e => e.OrigenRefin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ORIGEN_REFIN");
            entity.Property(e => e.PagoMinimo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAGO_MINIMO");
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAGOS_VENCIDOS");
            entity.Property(e => e.Pb)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PB");
            entity.Property(e => e.Pgad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.PlazoPactado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PLAZO_PACTADO");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.PrioridadBanco)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Prioridad_ banco");
            entity.Property(e => e.PrioridadBanco1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Prioridad_banco");
            entity.Property(e => e.Priorirad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("probabilidad");
            entity.Property(e => e.Pv1mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV_1MES_ATRAS");
            entity.Property(e => e.Pv2mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV_2MES_ATRAS");
            entity.Property(e => e.Pv3mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV_3MES_ATRAS");
            entity.Property(e => e.Pv4mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV_4MES_ATRAS");
            entity.Property(e => e.Pv5mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV_5MES_ATRAS");
            entity.Property(e => e.Pv6mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV_6MES_ATRAS");
            entity.Property(e => e.Quitam)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("quitam");
            entity.Property(e => e.Refuerzo)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Rfc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.SaldoVencido120Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_120_DIAS");
            entity.Property(e => e.SaldoVencido30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_30_DIAS");
            entity.Property(e => e.SaldoVencido60Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_60_DIAS");
            entity.Property(e => e.SaldoVencido90Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_90_DIAS");
            entity.Property(e => e.StatusCli)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS_CLI");
            entity.Property(e => e.StatusCumplimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS_CUMPLIMIENTO");
            entity.Property(e => e.StockPgad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("stock_pgad");
            entity.Property(e => e.Tasa)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TASA");
            entity.Property(e => e.Tel1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL1");
            entity.Property(e => e.Tel2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL2");
            entity.Property(e => e.Tel3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL3");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TOTAL_DEUDOR");
            entity.Property(e => e.Trascodificada)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TRASCODIFICADA");
            entity.Property(e => e.UltimoSaldoMesAnterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ULTIMO_SALDO_MES_ANTERIOR");
        });

        modelBuilder.Entity<AcumProducto13332440>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_133_32440", "Temp");

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.Bhscor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BHSCOR");
            entity.Property(e => e.Bonificacion)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("bonificacion");
            entity.Property(e => e.Bp)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("BP");
            entity.Property(e => e.Bttc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("bttc");
            entity.Property(e => e.Buc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUC");
            entity.Property(e => e.CP)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("C_P");
            entity.Property(e => e.Clasif)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLASIF");
            entity.Property(e => e.CodAccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_ACCION");
            entity.Property(e => e.CodResultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_RESULTADO");
            entity.Property(e => e.CodigoBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CODIGO_BLOQUEO");
            entity.Property(e => e.Consecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CONSECUTIVO");
            entity.Property(e => e.CtaTrascodificada)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CTA_TRASCODIFICADA");
            entity.Property(e => e.CuentaEje)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Cuenta_Eje");
            entity.Property(e => e.DiaCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIA_CORTE");
            entity.Property(e => e.DiaRpc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("dia rpc");
            entity.Property(e => e.DiasAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION");
            entity.Property(e => e.DiasMorosos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MOROSOS");
            entity.Property(e => e.Digital1pv)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DIGITAL1PV");
            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Especial)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ESPECIAL");
            entity.Property(e => e.FecUltGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULT_GESTION");
            entity.Property(e => e.FechaAltaRefin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ALTA_REFIN");
            entity.Property(e => e.FechaAperturaCta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CTA");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ASIGNACION");
            entity.Property(e => e.FechaCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CASTIGO");
            entity.Property(e => e.FechaCodBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_COD_BLOQUEO");
            entity.Property(e => e.FechaDesasignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_DESASIGNACION");
            entity.Property(e => e.FechaProxVencimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_PROX_VENCIMIENTO");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ULTIMO_PAGO");
            entity.Property(e => e.Fijar)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.GrupoEconomico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("GRUPO_ECONOMICO");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.Interpelar)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("INTERPELAR");
            entity.Property(e => e.IrreConsumoQuita)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Lada1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA1");
            entity.Property(e => e.Lada2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA2");
            entity.Property(e => e.Lada3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA3");
            entity.Property(e => e.Mensualidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MENSUALIDAD");
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_AGENCIA");
            entity.Property(e => e.MontoMoroso)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_MOROSO");
            entity.Property(e => e.MontoUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMO_PAGO");
            entity.Property(e => e.NoCuentaRel)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("no_cuenta rel");
            entity.Property(e => e.NombreCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NOMBRE_CLIENTE");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("OBSERVACIONES");
            entity.Property(e => e.OrigenRefin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ORIGEN_REFIN");
            entity.Property(e => e.PagoMinimo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAGO_MINIMO");
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAGOS_VENCIDOS");
            entity.Property(e => e.Pgad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("pgad");
            entity.Property(e => e.PlazoPactado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PLAZO_PACTADO");
            entity.Property(e => e.PorcQuita)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PORC_QUITA");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("prioridad");
            entity.Property(e => e.PrioridadBanco)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Prioridad_banco");
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PROBABILIDAD");
            entity.Property(e => e.Pv1mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV_1MES_ATRAS");
            entity.Property(e => e.Pv2mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV_2MES_ATRAS");
            entity.Property(e => e.Pv3mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV_3MES_ATRAS");
            entity.Property(e => e.Pv4mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV_4MES_ATRAS");
            entity.Property(e => e.Pv5mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV_5MES_ATRAS");
            entity.Property(e => e.Pv6mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV_6MES_ATRAS");
            entity.Property(e => e.Quita)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Quita1pv)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("QUITA_1PV");
            entity.Property(e => e.Quitam)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("quitam");
            entity.Property(e => e.Rfc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.SaldoVencido120Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_120_DIAS");
            entity.Property(e => e.SaldoVencido30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_30_DIAS");
            entity.Property(e => e.SaldoVencido60Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_60_DIAS");
            entity.Property(e => e.SaldoVencido90Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_90_DIAS");
            entity.Property(e => e.Selfservice)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("SELFSERVICE");
            entity.Property(e => e.StatusCli)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS_CLI");
            entity.Property(e => e.StatusCumplimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS_CUMPLIMIENTO");
            entity.Property(e => e.StockPgad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("STOCK_PGAD");
            entity.Property(e => e.Tasa)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TASA");
            entity.Property(e => e.Tel1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL1");
            entity.Property(e => e.Tel2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL2");
            entity.Property(e => e.Tel3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL3");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TOTAL_DEUDOR");
            entity.Property(e => e.TotalDeudorPosicion)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("total_deudor_posicion");
            entity.Property(e => e.Trascodificada)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TRASCODIFICADA");
            entity.Property(e => e.UltimoSaldoMesAnterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ULTIMO_SALDO_MES_ANTERIOR");
        });

        modelBuilder.Entity<AcumProducto13332441>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_133_32441", "Temp");

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.AgenciaPrevia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_PREVIA");
            entity.Property(e => e.Bonificacion)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("bonificacion");
            entity.Property(e => e.Bp)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("BP");
            entity.Property(e => e.Bttc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("bttc");
            entity.Property(e => e.Buc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUC");
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CALLE_NO_CLIENTE");
            entity.Property(e => e.CiudadCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CIUDAD_CLIENTE");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_POSTAL");
            entity.Property(e => e.CodigoBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CODIGO_BLOQUEO");
            entity.Property(e => e.ColoniaCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COLONIA_CLIENTE");
            entity.Property(e => e.Consecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CONSECUTIVO");
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CORREO");
            entity.Property(e => e.CtaTrascodificada)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CTA_TRASCODIFICADA");
            entity.Property(e => e.CuentaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CUENTA_CHEQUES");
            entity.Property(e => e.CuentaEje)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Cuenta_Eje");
            entity.Property(e => e.DescProducto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DESC_PRODUCTO");
            entity.Property(e => e.DiaCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIA_CORTE");
            entity.Property(e => e.DiaRpc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("dia rpc");
            entity.Property(e => e.DiasAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_AGENCIA");
            entity.Property(e => e.DiasFaltantes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_FALTANTES");
            entity.Property(e => e.Digital1pv)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DIGITAL1PV");
            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Especial)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ESPECIAL");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTADO");
            entity.Property(e => e.FecCodigoBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_CODIGO_BLOQUEO");
            entity.Property(e => e.FecRefAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_REF_AGENCIA");
            entity.Property(e => e.FecRefAgenciaPrevia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_REF_AGENCIA_PREVIA");
            entity.Property(e => e.FecUltimaCompra)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULTIMA_COMPRA");
            entity.Property(e => e.FecUltimaDisposicion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULTIMA_DISPOSICION");
            entity.Property(e => e.FechaAperturaCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CUENTA");
            entity.Property(e => e.FechaCambioSegmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CAMBIO_SEGMENTO");
            entity.Property(e => e.FechaLimitePago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_LIMITE_PAGO");
            entity.Property(e => e.Fijar)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.Interpelar)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("INTERPELAR");
            entity.Property(e => e.IrreConsumoQuita)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Lada1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_1");
            entity.Property(e => e.Lada2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_2");
            entity.Property(e => e.Lada3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_3");
            entity.Property(e => e.LimiteCredito)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LIMITE_CREDITO");
            entity.Property(e => e.MontoAsignadoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ASIGNADO_AGENCIA");
            entity.Property(e => e.MontoAsignadoAgenciaPrev)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ASIGNADO_AGENCIA_PREV");
            entity.Property(e => e.MontoMoroso)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_MOROSO");
            entity.Property(e => e.MontoUltimaCompra)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMA_COMPRA");
            entity.Property(e => e.MontoUltimaDisposicion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMA_DISPOSICION");
            entity.Property(e => e.NoCuentaRel)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("no_cuenta rel");
            entity.Property(e => e.NombreCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NOMBRE_CLIENTE");
            entity.Property(e => e.PagoMinimo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAGO_MINIMO");
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAGOS_VENCIDOS");
            entity.Property(e => e.Pgad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("pgad");
            entity.Property(e => e.PorcQuita)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PORC_QUITA");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("prioridad");
            entity.Property(e => e.PrioridadBanco)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Prioridad_banco");
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PROBABILIDAD");
            entity.Property(e => e.Quita)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Quita1pv)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("QUITA_1PV");
            entity.Property(e => e.Quitam)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("quitam");
            entity.Property(e => e.Rfc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.SaldoVencido120Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_120_DIAS");
            entity.Property(e => e.SaldoVencido30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_30_DIAS");
            entity.Property(e => e.SaldoVencido60Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_60_DIAS");
            entity.Property(e => e.SaldoVencido90Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_90_DIAS");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_ACTUAL");
            entity.Property(e => e.SegmentoPosterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_POSTERIOR");
            entity.Property(e => e.Selfservice)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("SELFSERVICE");
            entity.Property(e => e.Stacteca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STACTECA");
            entity.Property(e => e.StockPgad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("STOCK_PGAD");
            entity.Property(e => e.Tel1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_1");
            entity.Property(e => e.Tel2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_2");
            entity.Property(e => e.Tel3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_3");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TOTAL_DEUDOR");
            entity.Property(e => e.TotalDeudorPosicion)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("total_deudor_posicion");
        });

        modelBuilder.Entity<AsigProducto127>(entity =>
        {
            entity.HasKey(e => e.IdCuenta).HasName("PK__ASIG_Pro__BBC6DF32F88321B8");

            entity.ToTable("ASIG_Producto_127", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.BloqueoAuto)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Bloqueo_Auto");
            entity.Property(e => e.Bonificacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Bp)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Buc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUC");
            entity.Property(e => e.CP)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("C_P");
            entity.Property(e => e.CapitalVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CAPITAL_VENCIDO");
            entity.Property(e => e.ClabeInterbancaria)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CLABE INTERBANCARIA");
            entity.Property(e => e.ClabeInterbancaria1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CLABE_INTERBANCARIA");
            entity.Property(e => e.Clasif)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLASIF");
            entity.Property(e => e.ClaveProducto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLAVE_PRODUCTO");
            entity.Property(e => e.CodAccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_ACCION");
            entity.Property(e => e.CodResultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_RESULTADO");
            entity.Property(e => e.Color)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ComisionesPendientes)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Comisiones_Pendientes");
            entity.Property(e => e.Consecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CONSECUTIVO");
            entity.Property(e => e.CorteAuto)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Corte_Auto");
            entity.Property(e => e.CtaTrascodificada)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CTA_TRASCODIFICADA");
            entity.Property(e => e.CuentaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CUENTA_CHEQUES");
            entity.Property(e => e.DiaRpc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DIA RPC");
            entity.Property(e => e.DiasAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_AGENCIA");
            entity.Property(e => e.DiasAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MORA");
            entity.Property(e => e.Digital)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DIGITAL");
            entity.Property(e => e.Edad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ejecutivo");
            entity.Property(e => e.Especial)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ESPECIAL");
            entity.Property(e => e.FecUltGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULT_GESTION");
            entity.Property(e => e.FechaAperturaCta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CTA");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ASIGNACION");
            entity.Property(e => e.FechaCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CASTIGO");
            entity.Property(e => e.FechaDesasignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_DESASIGNACION");
            entity.Property(e => e.FechaProximoVencimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_PROXIMO_VENCIMIENTO");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ULTIMO_PAGO");
            entity.Property(e => e.Fecstaca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECSTACA");
            entity.Property(e => e.Fijar)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FormaDeTrabajo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Forma de trabajo");
            entity.Property(e => e.HoraRpc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("HORA RPC");
            entity.Property(e => e.InteresNoExigiblesP)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("INTERES_NO_EXIGIBLES_P");
            entity.Property(e => e.InteresesMoratorios)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("INTERESES_MORATORIOS");
            entity.Property(e => e.InteresesOrdinarios)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("INTERESES_ORDINARIOS");
            entity.Property(e => e.Interpelar)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("interpelar");
            entity.Property(e => e.IrreConsumoQuita)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IvaInteresNoExigibleP)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("IVA_INTERES_NO_EXIGIBLE_P");
            entity.Property(e => e.IvaInteresesMoratorios)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("IVA_INTERESES_MORATORIOS");
            entity.Property(e => e.IvaInteresesOrdinarios)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("IVA_INTERESES_ORDINARIOS");
            entity.Property(e => e.Linea)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MUltMenven)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("M_ULT_MENVEN");
            entity.Property(e => e.Marca)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MensualidadAproxPreventiva)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Mensualidad_ Aprox_Preventiva");
            entity.Property(e => e.Modelo)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Monto1pv)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Monto_1PV");
            entity.Property(e => e.Monto2pv)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Monto_2PV");
            entity.Property(e => e.Monto3pv)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Monto_3PV");
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_AGENCIA");
            entity.Property(e => e.MontoUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMO_PAGO");
            entity.Property(e => e.NombreCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NOMBRE_CLIENTE");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("OBSERVACIONES");
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAGOS_VENCIDOS");
            entity.Property(e => e.Pgad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Prioridad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("prioridad");
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PROBABILIDAD");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PRODUCTO");
            entity.Property(e => e.ProgramaEspecial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PROGRAMA_ESPECIAL");
            entity.Property(e => e.PvAsignación)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PV_asignación");
            entity.Property(e => e.PvFinal)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PV_FINAL");
            entity.Property(e => e.QuitaA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Quita_A");
            entity.Property(e => e.Quitam)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("quitam");
            entity.Property(e => e.Region)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("REGION");
            entity.Property(e => e.Rfc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.SaldoInsoluto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_INSOLUTO");
            entity.Property(e => e.SaldoMes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_MES");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO");
            entity.Property(e => e.SaldoVencido120Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_120_DIAS");
            entity.Property(e => e.SaldoVencido30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_30_DIAS");
            entity.Property(e => e.SaldoVencido60Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_60_DIAS");
            entity.Property(e => e.SaldoVencido90Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO_90_DIAS");
            entity.Property(e => e.Stacteca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STACTECA");
            entity.Property(e => e.StatusCli)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS_CLI");
            entity.Property(e => e.StockPgad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("stock_pgad");
            entity.Property(e => e.TipoFacturacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TIPO_FACTURACION");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TOTAL_DEUDOR");
            entity.Property(e => e.Trascodificada)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TRASCODIFICADA");
        });

        modelBuilder.Entity<Bus>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Bus");

            entity.Property(e => e.DatoBuscado)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
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

        modelBuilder.Entity<CatalogoNuevoF>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("CatalogoNuevoF");

            entity.Property(e => e.CodigoAccion)
                .HasMaxLength(255)
                .HasColumnName("Codigo_accion");
            entity.Property(e => e.CodigoResultado)
                .HasMaxLength(255)
                .HasColumnName("Codigo_resultado");
            entity.Property(e => e.Descripcion).HasMaxLength(255);
            entity.Property(e => e.IdCodigos).HasColumnName("Id_codigos");
            entity.Property(e => e.Interpretacion).HasMaxLength(255);
            entity.Property(e => e.Plantilla1)
                .HasMaxLength(255)
                .HasColumnName("PLANTILLA_1");
            entity.Property(e => e.StatusBanco)
                .HasMaxLength(255)
                .HasColumnName("Status_banco");
        });

        modelBuilder.Entity<Chist>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("chist");

            entity.Property(e => e.Cambio).HasColumnName("cambio");
            entity.Property(e => e.Desdech).HasColumnName("desdech");
            entity.Property(e => e.Hastach).HasColumnName("hastach");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<CodificacionesActualiza>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("CodificacionesActualiza_");

            entity.Property(e => e.Codificacion)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.NombreTablaProducto)
                .HasMaxLength(18)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Collect>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("collects");

            entity.Property(e => e.FechaInsert).HasColumnName("fecha_insert");
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("mensaje");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("segundo_insert");
        });

        modelBuilder.Entity<CuentaCh>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("CuentaCh");

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.Saldo).HasColumnType("money");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<CuentasAcción>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta })
                .IsClustered(false)
                .HasFillFactor(70);

            entity.ToTable("CuentasAcción");

            entity.HasIndex(e => new { e.IdProducto, e.IdAcción, e.IdCartera, e.IdCuenta }, "IX_CuentasAcción_ProductoAcción")
                .IsUnique()
                .IsClustered();

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

        modelBuilder.Entity<CuentasCierre>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("CuentasCierre");

            entity.Property(e => e.Activa).HasColumnName("activa");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Idcartera).HasColumnName("idcartera");
            entity.Property(e => e.Idsituación).HasColumnName("idsituación");
            entity.Property(e => e.VálidoDesdeCh).HasColumnName("_VálidoDesdeCH");
            entity.Property(e => e.VálidoDesdeCiclo).HasColumnName("_VálidoDesdeCiclo");
            entity.Property(e => e.VálidoHastaCh).HasColumnName("_VálidoHastaCH");
            entity.Property(e => e.VálidoHastaCiclo).HasColumnName("_VálidoHastaCiclo");
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

        modelBuilder.Entity<Cuentascambium>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("cuentascambia");

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("IDCUENTA");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<CódigosPostal>(entity =>
        {
            entity.ToTable("CódigosPostal");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CCp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c_CP");
            entity.Property(e => e.CCveCiudad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c_cve_ciudad");
            entity.Property(e => e.CEstado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c_estado");
            entity.Property(e => e.CMnpio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c_mnpio");
            entity.Property(e => e.COficina)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c_oficina");
            entity.Property(e => e.CTipoAsenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c_tipo_asenta");
            entity.Property(e => e.DAsenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("d_asenta");
            entity.Property(e => e.DCiudad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("d_ciudad");
            entity.Property(e => e.DCodigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("d_codigo");
            entity.Property(e => e.DCp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("d_CP");
            entity.Property(e => e.DEstado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("d_estado");
            entity.Property(e => e.DMnpio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("D_mnpio");
            entity.Property(e => e.DTipoAsenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("d_tipo_asenta");
            entity.Property(e => e.DZona)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("d_zona");
            entity.Property(e => e.IdAsentaCpcons)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("id_asenta_cpcons");
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

        modelBuilder.Entity<EvitarRetiro>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EvitarRetiro", "Santander");

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Segmento)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Extr4172813>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_4_172813", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<FaltantesSantander>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Faltantes Santander");

            entity.Property(e => e.FaltantesSantander1).HasColumnName("Faltantes santander");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCuenta).HasColumnName("idCuenta");
            entity.Property(e => e.SegundoInsert).HasColumnName("Segundo_Insert");
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

        modelBuilder.Entity<GestDiaria>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Acercamiento)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_actual");
            entity.Property(e => e.Buc)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("buc");
            entity.Property(e => e.CausaNoPago)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CodigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Comentario)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Contacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Credito)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Dias_mora");
            entity.Property(e => e.Duracion).HasPrecision(0);
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha_asignacion");
            entity.Property(e => e.Hora).HasPrecision(0);
            entity.Property(e => e.Modo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nivel)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nombreejecutivo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Parentesco)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("probabilidad");
            entity.Property(e => e.Productoorigen)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("productoorigen");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo_vencido");
            entity.Property(e => e.Segmento)
                .HasMaxLength(13)
                .IsUnicode(false);
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Segmento_actual");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SituaciónCuenta)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Supervisor)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_deudor");
            entity.Property(e => e.Usuario)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
        });

        modelBuilder.Entity<GestDiaria1>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("GestDiarias_");

            entity.Property(e => e.Acercamiento)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_actual");
            entity.Property(e => e.Buc)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("buc");
            entity.Property(e => e.CausaNoPago)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CodigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Comentario)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Contacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Credito)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Dias_mora");
            entity.Property(e => e.Duracion).HasPrecision(0);
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha_asignacion");
            entity.Property(e => e.Hora).HasPrecision(0);
            entity.Property(e => e.Modo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nivel)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nombreejecutivo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Parentesco)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("probabilidad");
            entity.Property(e => e.Productoorigen)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("productoorigen");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo_vencido");
            entity.Property(e => e.Segmento)
                .HasMaxLength(13)
                .IsUnicode(false);
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Segmento_actual");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SituaciónCuenta)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Supervisor)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_deudor");
            entity.Property(e => e.Usuario)
                .HasMaxLength(5)
                .IsUnicode(false);
        });

        modelBuilder.Entity<GestSantum>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Comentario).IsUnicode(false);
            entity.Property(e => e.Duración).HasPrecision(0);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.Hh)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("HH");
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCausaNoPago).HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdModo).HasColumnName("idModo");
            entity.Property(e => e.IdParentesco).HasColumnName("idParentesco");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.IdSucursal).HasColumnName("idSucursal");
            entity.Property(e => e.IdValidador).HasColumnName("idValidador");
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.TiempoEnCuenta).HasPrecision(0);
            entity.Property(e => e.Unico).HasColumnName("unico");
        });

        modelBuilder.Entity<Gestest>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("gestest");

            entity.Property(e => e.Acercamiento)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_actual");
            entity.Property(e => e.Buc)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("buc");
            entity.Property(e => e.CausaNoPago)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CodigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Comentario)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Contacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Credito)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Dias_mora");
            entity.Property(e => e.Duracion).HasPrecision(0);
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha_asignacion");
            entity.Property(e => e.Hora).HasPrecision(0);
            entity.Property(e => e.Modo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nivel)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nombreejecutivo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Parentesco)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("probabilidad");
            entity.Property(e => e.Productoorigen)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("productoorigen");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo_vencido");
            entity.Property(e => e.Segmento)
                .HasMaxLength(13)
                .IsUnicode(false);
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Segmento_actual");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SituaciónCuenta)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Supervisor)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_deudor");
            entity.Property(e => e.Usuario)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
        });

        modelBuilder.Entity<GestionesDomiciliaria>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.AutoMapeo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.AutoMarca)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.AutoModelo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.AutoPlacas)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CalleHorizontalNorte)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CalleHorizontalSur)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CalleVerticalEste)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CalleVerticalOeste)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ColorFachada)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ColorHerrería)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ColorPuerta)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Comentario).IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.FechaVisita).HasColumnName("Fecha_Visita");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCausaNoPago).HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdDomicilio).HasColumnName("idDomicilio");
            entity.Property(e => e.IdEconómico).HasColumnName("idEconómico");
            entity.Property(e => e.IdEjecutivoCaptura).HasColumnName("idEjecutivo_Captura");
            entity.Property(e => e.IdEjecutivoVisita).HasColumnName("idEjecutivo_Visita");
            entity.Property(e => e.IdHabitación).HasColumnName("idHabitación");
            entity.Property(e => e.IdHerramienta).HasColumnName("idHerramienta");
            entity.Property(e => e.IdParentesco).HasColumnName("idParentesco");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.IdSucursal).HasColumnName("idSucursal");
            entity.Property(e => e.IdVivienda).HasColumnName("idVivienda");
            entity.Property(e => e.MontoNegociación).HasColumnType("money");
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombrePropietario)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.SegundoVisita)
                .HasPrecision(0)
                .HasColumnName("Segundo_Visita");
        });

        modelBuilder.Entity<GestionesSantum>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Comentario).IsUnicode(false);
            entity.Property(e => e.Duración).HasPrecision(0);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCausaNoPago).HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdModo).HasColumnName("idModo");
            entity.Property(e => e.IdParentesco).HasColumnName("idParentesco");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.IdSucursal).HasColumnName("idSucursal");
            entity.Property(e => e.IdValidador).HasColumnName("idValidador");
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.TiempoEnCuenta).HasPrecision(0);
        });

        modelBuilder.Entity<IftTeléfono>(entity =>
        {
            entity.HasKey(e => e.NúmeroTelefónico);

            entity.ToTable("IFT_Teléfonos");

            entity.Property(e => e.NúmeroTelefónico).ValueGeneratedNever();
            entity.Property(e => e.Estado)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("fecha_insert");
            entity.Property(e => e.Modalidad)
                .HasMaxLength(4)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Municipio)
                .HasMaxLength(50)
                .IsUnicode(false);
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

        modelBuilder.Entity<ListaN>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ListaN");

            entity.Property(e => e.FolioRedeco).HasColumnName("FolioREDECO");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEjecutivoInsert).HasColumnName("idEjecutivo_Insert");
            entity.Property(e => e.Solicitante)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Listum>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.FolioRedeco).HasColumnName("FolioREDECO");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEjecutivoInsert).HasColumnName("idEjecutivo_Insert");
            entity.Property(e => e.Solicitante)
                .HasMaxLength(50)
                .IsUnicode(false);
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

        modelBuilder.Entity<Mail4172808Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_4_172808_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Masivo>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MASIVO");

            entity.Property(e => e.Cuenta)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Fecha)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Negociacionessantum>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("negociacionessanta");

            entity.Property(e => e.CorreoElectrónico)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdEjecutivoValidador).HasColumnName("idEjecutivoValidador");
            entity.Property(e => e.IdEstado).HasColumnName("idEstado");
            entity.Property(e => e.IdHerramienta).HasColumnName("idHerramienta");
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.MontoPagado).HasColumnType("money");
            entity.Property(e => e.SaldoNegociación).HasColumnType("money");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
        });

        modelBuilder.Entity<Negociacionesval>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("negociacionesval");

            entity.Property(e => e.CorreoElectrónico)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdEjecutivoValidador).HasColumnName("idEjecutivoValidador");
            entity.Property(e => e.IdEstado).HasColumnName("idEstado");
            entity.Property(e => e.IdHerramienta).HasColumnName("idHerramienta");
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.MontoPagado).HasColumnType("money");
            entity.Property(e => e.SaldoNegociación).HasColumnType("money");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
        });

        modelBuilder.Entity<Pago4172810>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PAGO_4_172810", "Temp");

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

        modelBuilder.Entity<Pago4172811>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PAGO_4_172811", "Temp");

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

        modelBuilder.Entity<Pagva>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("pagva");

            entity.Property(e => e.Dupl).HasColumnName("dupl");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdPago)
                .ValueGeneratedOnAdd()
                .HasColumnName("idPago");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
            entity.Property(e => e.MontoPago).HasColumnType("money");
            entity.Property(e => e.Referencia)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Segmentación)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PlAmex>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PlAmex");

            entity.Property(e => e.Asignacion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Corte)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Cuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Estabilización)
                .HasMaxLength(11)
                .IsUnicode(false);
            entity.Property(e => e.EstadoNegociación)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.HerramientaOfrecida)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Initialbalance)
                .HasColumnType("money")
                .HasColumnName("initialbalance");
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.MontoPago).HasColumnType("money");
            entity.Property(e => e.MontoPlazo).HasColumnType("money");
            entity.Property(e => e.MínimoMásAtrasado)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Mínimo más atrasado");
            entity.Property(e => e.Placement)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.RecoveredCode)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoNegociación).HasColumnType("money");
            entity.Property(e => e.Usuario)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e._120)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("120");
            entity.Property(e => e._150)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("150");
            entity.Property(e => e._180)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("180");
            entity.Property(e => e._30)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("30");
            entity.Property(e => e._60)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("60");
            entity.Property(e => e._90)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("90");
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
            entity.Property(e => e.Desactivación).HasDefaultValue(3f);
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

        modelBuilder.Entity<Respa>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("RESPA");

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

        modelBuilder.Entity<Respald>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("RESPALD");

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

        modelBuilder.Entity<RespaldoCod>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("RespaldoCod");

            entity.Property(e => e.Codificacion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CurrentAgencyId)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Desarrollo)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.Entity)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FieldName)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Hash)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.IdCodificación).ValueGeneratedOnAdd();
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.LoanProductcode)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("Loan_productcode");
            entity.Property(e => e.TreatmentProgram)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("treatmentProgram");
            entity.Property(e => e.TreatmentValue)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Telc14145015>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELC_14_145015");

            entity.Property(e => e.Calificacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Clase)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Extension)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Telc4172807>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELC_4_172807", "Temp");

            entity.Property(e => e.Calificacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Clase)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Extension)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Ranking)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Teléfono)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Telc4172807Clase>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELC_4_172807_Clase", "Temp");

            entity.Property(e => e.Calificacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.CampoAsig)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.Extension)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.NúmeroCliente)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Ranking)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TelefonosCambio>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TelefonosCambio");

            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.Buc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUC");
            entity.Property(e => e.Buctel)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUCTEL");
            entity.Property(e => e.Cuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cuenta");
            entity.Property(e => e.Estado)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Ext)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EXT");
            entity.Property(e => e.FechaAsignaciónTel)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha Asignación Tel#");
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
            entity.Property(e => e.Lada)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA");
            entity.Property(e => e.Municipio)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SegHorarioContacto).HasPrecision(0);
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS");
            entity.Property(e => e.Tel)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL");
            entity.Property(e => e.Tipo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<TelefonosCambioFecha>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TelefonosCambioFecha");

            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.Buc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUC");
            entity.Property(e => e.Buctel)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUCTEL");
            entity.Property(e => e.Cuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cuenta");
            entity.Property(e => e.Estado)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Ext)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EXT");
            entity.Property(e => e.FechaAsignaciónTel)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha Asignación Tel#");
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
            entity.Property(e => e.Lada)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA");
            entity.Property(e => e.Municipio)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SegHorarioContacto).HasPrecision(0);
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS");
            entity.Property(e => e.Tel)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL");
            entity.Property(e => e.Tipo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<Telefonosfecha>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Telefonosfecha");

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

        modelBuilder.Entity<Telefonosfecsant>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Telefonosfecsant");

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

        modelBuilder.Entity<Telefonosfecsantum>(entity =>
        {
            entity.HasNoKey();

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
            entity.Property(e => e.Estado)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Extensión).IsSparse();
            entity.Property(e => e.FechaInsert)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdOrígen).HasColumnName("idOrígen");
            entity.Property(e => e.IdTelefonía).HasColumnName("idTelefonía");
            entity.Property(e => e.Municipio)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.IdCarteraNavigation).WithMany(p => p.TeléfonosAllocations)
                .HasForeignKey(d => d.IdCartera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeléfonosAllocation_Carteras");
        });

        modelBuilder.Entity<TeléfonosAllocation2>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.NúmeroTelefónico });

            entity.ToTable("TeléfonosAllocation2", tb => tb.HasTrigger("tr_InsertaTeléfonosCollection2"));

            entity.HasIndex(e => e.FechaInsert, "IX_TeléfonosAllocation2").IsDescending();

            entity.HasIndex(e => new { e.FechaInsert, e.NúmeroTelefónico }, "IX_TeléfonosAllocation_Fecha_Insert2").IsDescending(true, false);

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("idCuenta");
            entity.Property(e => e.Estado)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Extensión).IsSparse();
            entity.Property(e => e.FechaInsert)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdOrígen).HasColumnName("idOrígen");
            entity.Property(e => e.IdTelefonía).HasColumnName("idTelefonía");
            entity.Property(e => e.Municipio)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.IdCarteraNavigation).WithMany(p => p.TeléfonosAllocation2s)
                .HasForeignKey(d => d.IdCartera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TeléfonosAllocation_Carteras2");
        });

        modelBuilder.Entity<TeléfonosComplemento>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.Númerotelefónico }).HasName("PK_TeléfonosComplemento_1");

            entity.ToTable("TeléfonosComplemento");

            entity.HasIndex(e => e.FechaInsert, "IX_TeléfonosComplemento").IsDescending();

            entity.HasIndex(e => new { e.FechaInsert, e.Númerotelefónico }, "IX_TeléfonosComplemento_Fecha_Insert").IsDescending(true, false);

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
            entity.Property(e => e.Ranking)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(50)
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

        modelBuilder.Entity<ValoresEquivalencium>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ValoresEquivalencia", "Plata");

            entity.HasIndex(e => new { e.Orden, e.IdValor, e.Ponderacion }, "ClusteredIndex-20231012-135342").IsClustered();

            entity.Property(e => e.Contacto)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Detalle)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdSituación)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("idSituación");
            entity.Property(e => e.IdValor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("idValor");
            entity.Property(e => e.Orden)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Ponderacion)
                .HasMaxLength(255)
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
