using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Loki.ThorLibrary.ModelsAllocation;

public partial class DbAllocationContextThor : DbContext
{
    public DbAllocationContextThor()
    {
    }

    public DbAllocationContextThor(DbContextOptions<DbAllocationContextThor> options)
        : base(options)
    {
    }

    public virtual DbSet<Accione> Acciones { get; set; }

    public virtual DbSet<AcumProducto135813> AcumProducto135813s { get; set; }

    public virtual DbSet<AsigProducto22> AsigProducto22s { get; set; }

    public virtual DbSet<AsigProducto69> AsigProducto69s { get; set; }

    public virtual DbSet<Bus> Buses { get; set; }

    public virtual DbSet<CamposAdicionale> CamposAdicionales { get; set; }

    public virtual DbSet<CamposAsig> CamposAsigs { get; set; }

    public virtual DbSet<CamposCondicionado> CamposCondicionados { get; set; }

    public virtual DbSet<CamposTxt> CamposTxts { get; set; }

    public virtual DbSet<CargasAlCliente> CargasAlClientes { get; set; }

    public virtual DbSet<Cartera> Carteras { get; set; }

    public virtual DbSet<CatalogoNuevoF> CatalogoNuevoFs { get; set; }

    public virtual DbSet<CodificacionesActualiza> CodificacionesActualizas { get; set; }

    public virtual DbSet<Collect> Collects { get; set; }

    public virtual DbSet<CorreosNu> CorreosNus { get; set; }

    public virtual DbSet<CuentasAcción> CuentasAccións { get; set; }

    public virtual DbSet<CuentasQueja> CuentasQuejas { get; set; }

    public virtual DbSet<CuentasQuejaHistorial> CuentasQuejaHistorials { get; set; }

    public virtual DbSet<CódigosPostal> CódigosPostals { get; set; }

    public virtual DbSet<CódigosPostale> CódigosPostales { get; set; }

    public virtual DbSet<Doms1186329> Doms1186329s { get; set; }

    public virtual DbSet<Ejecucione> Ejecuciones { get; set; }

    public virtual DbSet<EjecutivosSkip> EjecutivosSkips { get; set; }

    public virtual DbSet<Extr11> Extr11s { get; set; }

    public virtual DbSet<Extr1186291> Extr1186291s { get; set; }

    public virtual DbSet<Extr1186292> Extr1186292s { get; set; }

    public virtual DbSet<Extr1186301> Extr1186301s { get; set; }

    public virtual DbSet<Extr1186302> Extr1186302s { get; set; }

    public virtual DbSet<Extr1186303> Extr1186303s { get; set; }

    public virtual DbSet<Extr1186304> Extr1186304s { get; set; }

    public virtual DbSet<Extr1186305> Extr1186305s { get; set; }

    public virtual DbSet<Extr1186306> Extr1186306s { get; set; }

    public virtual DbSet<Extr1186307> Extr1186307s { get; set; }

    public virtual DbSet<Extr1186309> Extr1186309s { get; set; }

    public virtual DbSet<Extr1186322> Extr1186322s { get; set; }

    public virtual DbSet<Extr1186323> Extr1186323s { get; set; }

    public virtual DbSet<Extr1186328> Extr1186328s { get; set; }

    public virtual DbSet<Faltum> Falta { get; set; }

    public virtual DbSet<FechasAsignaciónOficial> FechasAsignaciónOficials { get; set; }

    public virtual DbSet<GessA> GessAs { get; set; }

    public virtual DbSet<GestCon> GestCons { get; set; }

    public virtual DbSet<GestDiaria> GestDiarias { get; set; }

    public virtual DbSet<GestionesDomiciliaria> GestionesDomiciliarias { get; set; }

    public virtual DbSet<IftTeléfono> IftTeléfonos { get; set; }

    public virtual DbSet<InsertaSkipFaltante> InsertaSkipFaltantes { get; set; }

    public virtual DbSet<Job> Jobs { get; set; }

    public virtual DbSet<Layout> Layouts { get; set; }

    public virtual DbSet<ListaN> ListaNs { get; set; }

    public virtual DbSet<Listum> Lista { get; set; }

    public virtual DbSet<LogArchivo> LogArchivos { get; set; }

    public virtual DbSet<LogAsignación> LogAsignacións { get; set; }

    public virtual DbSet<LogIngreso> LogIngresos { get; set; }

    public virtual DbSet<LogProceso> LogProcesos { get; set; }

    public virtual DbSet<Mail1186290Pivot> Mail1186290Pivots { get; set; }

    public virtual DbSet<Mail1186295Pivot> Mail1186295Pivots { get; set; }

    public virtual DbSet<Mail1186308Pivot> Mail1186308Pivots { get; set; }

    public virtual DbSet<Mail1186312> Mail1186312s { get; set; }

    public virtual DbSet<Mail1186316Pivot> Mail1186316Pivots { get; set; }

    public virtual DbSet<Mail1186325Pivot> Mail1186325Pivots { get; set; }

    public virtual DbSet<Mail1186326Pivot> Mail1186326Pivots { get; set; }

    public virtual DbSet<Negociacionesval> Negociacionesvals { get; set; }

    public virtual DbSet<Pago1186300> Pago1186300s { get; set; }

    public virtual DbSet<Pago1186321> Pago1186321s { get; set; }

    public virtual DbSet<Pago1Plmt186300> Pago1Plmt186300s { get; set; }

    public virtual DbSet<PagosNegativo> PagosNegativos { get; set; }

    public virtual DbSet<PlAmex> PlAmexes { get; set; }

    public virtual DbSet<Proceso> Procesos { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Tels1186296Pivot> Tels1186296Pivots { get; set; }

    public virtual DbSet<Tels1186297Pivot> Tels1186297Pivots { get; set; }

    public virtual DbSet<Tels1186311Pivot> Tels1186311Pivots { get; set; }

    public virtual DbSet<Tels1186315Pivot> Tels1186315Pivots { get; set; }

    public virtual DbSet<TeléfonosAllocation> TeléfonosAllocations { get; set; }

    public virtual DbSet<TeléfonosComplemento> TeléfonosComplementos { get; set; }

    public virtual DbSet<TiposCampo> TiposCampos { get; set; }

    public virtual DbSet<ValInfoAmex> ValInfoAmexes { get; set; }

    public virtual DbSet<ValidaTelefono> ValidaTelefonos { get; set; }

    public virtual DbSet<ValidaTelefonos2> ValidaTelefonos2s { get; set; }

    public virtual DbSet<VwCarterasProducto> VwCarterasProductos { get; set; }

    public virtual DbSet<VwEjecucionesDetalle> VwEjecucionesDetalles { get; set; }

    public virtual DbSet<VwLogAsignación> VwLogAsignacións { get; set; }

    public virtual DbSet<VwProductosFechaInicial> VwProductosFechaInicials { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=192.168.7.128; database=dbAllocation; uid=login_ejecutor; pwd=3j3123/*-; encrypt=true;trustservercertificate=true");

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

        modelBuilder.Entity<AcumProducto135813>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_1_35813", "Temp");

            entity.Property(e => e.AcCompleted)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("AC Completed");
            entity.Property(e => e.AcManual)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("AC MANUAL");
            entity.Property(e => e.Acaccept)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ACAccept");
            entity.Property(e => e.Accompleted)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ACCompleted");
            entity.Property(e => e.Acdecline)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ACDecline");
            entity.Property(e => e.Aceligibility)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("aceligibility");
            entity.Property(e => e.Acenrolled)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ACEnrolled");
            entity.Property(e => e.Acoffer)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ACOffer");
            entity.Property(e => e.Adl1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ADL1");
            entity.Property(e => e.Age)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("age");
            entity.Property(e => e.Amount)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Amount ");
            entity.Property(e => e.AmountDue180Days)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("amountDue180Days");
            entity.Property(e => e.AnniversaryDate)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Asignacion)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.BalanceG)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Balance G*");
            entity.Property(e => e.BatchDate)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.BatchdateMigracion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.BirthDate)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.BloqueoHerramienta)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.BloqueoSettlements)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.C120)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.C150)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.CalifScore)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CALIF SCORE");
            entity.Property(e => e.Calle)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CalleB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Calle B");
            entity.Property(e => e.Campo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CAMPO");
            entity.Property(e => e.CancellationDate)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Cbo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CBO");
            entity.Property(e => e.ChargeAgeCode)
                .HasColumnType("money")
                .HasColumnName("chargeAgeCode");
            entity.Property(e => e.Cobrabilidad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.CodificaciónAcorn)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ColoniaB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Colonia B");
            entity.Property(e => e.ColoniaLocalidad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ComplementoCorporate)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Conjurnet)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.CreditBalance)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Cur)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("CUR");
            entity.Property(e => e.Current)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.CurrentAgencyId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CurrentBalance)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.CurrentBalanceAcorn).HasColumnType("money");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CustomerID");
            entity.Property(e => e.CycleCut).HasColumnName("cycleCut");
            entity.Property(e => e.CódigoPostal)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.CódigoPostalB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Código Postal B");
            entity.Property(e => e.DateLastPaymentOa)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("DateLastPaymentOA");
            entity.Property(e => e.DateWoCancelled)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("date WO/Cancelled");
            entity.Property(e => e.DelegaciónMunicipio)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.DelegaciónOMunicipioB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Delegación o Municipio B");
            entity.Property(e => e.Edad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.EdadDeMora)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Edad de Mora");
            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("EJECUTIVO");
            entity.Property(e => e.EmployersAddress)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.EmployersName)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.EnrolladoSettlement)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.EnvioCartaSifPif)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.EstadoB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Estado B");
            entity.Property(e => e.FechaAcciona)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FechaAdl)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Fecha_ADL");
            entity.Property(e => e.FechaAjusteCh)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("FechaAjusteCH");
            entity.Property(e => e.FechaCorteLc)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("FechaCorteLC");
            entity.Property(e => e.FechaMinimomasatrasado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FechaSkip)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Fechaasigcliente)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("fechaasigcliente");
            entity.Property(e => e.Fecharecall)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("fecharecall");
            entity.Property(e => e.Gestiones)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("gestiones");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.InitialBalance)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Intereses)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Inv)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("INV");
            entity.Property(e => e.LastDatePayment)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Last Date Payment");
            entity.Property(e => e.LastPaymentDate)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.LastPaymentOa)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("LastPaymentOA");
            entity.Property(e => e.Legal)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("legal");
            entity.Property(e => e.LendingAgeCode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lendingAgeCode");
            entity.Property(e => e.LendingPayToCurrentScore)
                .HasColumnType("money")
                .HasColumnName("lendingPayToCurrentScore");
            entity.Property(e => e.Liquidated)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.LoanProductCode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Loan_ProductCode");
            entity.Property(e => e.Marcaciones)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MarketRecoveryScore).HasColumnName("marketRecoveryScore");
            entity.Property(e => e.MaxGest)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MinGest)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Minimos)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MontlyIncome)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Monto)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MontoAjuste)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Multideudor)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MínimoMásAtrasado)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Mínimo más atrasado");
            entity.Property(e => e.N90)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(511)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroCliente)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.OasisAccept)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.OasisDecline)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.OasisOffer)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Oasiseligibility)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("oasiseligibility");
            entity.Property(e => e.Oferta)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("OFERTA");
            entity.Property(e => e.OtherOa)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("OtherOA");
            entity.Property(e => e.PagoRequerido)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Pago requerido");
            entity.Property(e => e.Placementlevelcode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("placementlevelcode");
            entity.Property(e => e.Ppaccept)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PPAccept");
            entity.Property(e => e.Ppaeligibility)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("ppaeligibility");
            entity.Property(e => e.Ppaoffer)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PPAOffer");
            entity.Property(e => e.Prorroga).HasColumnType("money");
            entity.Property(e => e.Reactivación)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ReceiptDate)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.RecoveredCode)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Referencia)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("REFERENCIA");
            entity.Property(e => e.ReinstAccept)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ReinstOffer)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Reinsteligibility)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("reinsteligibility");
            entity.Property(e => e.Remanente)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Rfc)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.S60)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.SaldoNegociado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Saldoback)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Settlaccept)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("SETTLAccept");
            entity.Property(e => e.Settldecline)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("SETTLDecline");
            entity.Property(e => e.SettlementAccepted)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.SettlementFinished)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Settloffer)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("SETTLOffer");
            entity.Property(e => e.T30)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Testapr)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("TESTAPR");
            entity.Property(e => e.TipoAdl)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("TIPO_ADL");
            entity.Property(e => e.TodaySkip)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Today Skip");
            entity.Property(e => e.ToolsBuro)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.TotalPayments)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.UltimoInteres)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Ultimo interes");
            entity.Property(e => e.UltimoPagoEnCuenta)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Ultimo pago en cuenta");
            entity.Property(e => e.Unb)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("UNB");
            entity.Property(e => e.Valfecha)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Validacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Waiver)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Wo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("WO?");
            entity.Property(e => e.WriteOffDate)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("writeOffDate");
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
            entity.Property(e => e._210)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("210");
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

        modelBuilder.Entity<AsigProducto22>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ASIG_Producto_22", "Temp");

            entity.Property(e => e.Comentario)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Contacto)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Duración)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Extensión)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Fecha)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Hora)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdEjecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Modo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NombreEjecutivo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroTelefónico)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<AsigProducto69>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ASIG_Producto_69_");

            entity.Property(e => e.Cuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cuenta");
            entity.Property(e => e.Cuentaok)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaDeValidacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha de validacion");
            entity.Property(e => e.FechaEnvio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha Envio");
            entity.Property(e => e.Product)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(255)
                .IsUnicode(false);
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

        modelBuilder.Entity<CorreosNu>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("CorreosNU");

            entity.Property(e => e.CorreoEjecutivo)
                .HasMaxLength(60)
                .IsUnicode(false)
                .HasColumnName("Correo Ejecutivo");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.FechaUpdate).HasColumnName("fecha_update");
            entity.Property(e => e.NombreDeEjecutivo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Nombre de Ejecutivo");
            entity.Property(e => e.NúmeroDeEmpleado).HasColumnName("Número de Empleado");
            entity.Property(e => e.Usuario)
                .HasMaxLength(4)
                .IsUnicode(false);
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

        modelBuilder.Entity<Doms1186329>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DOMS_1_186329", "Temp");

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

        modelBuilder.Entity<EjecutivosSkip>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EjecutivosSkip");

            entity.Property(e => e.Conteo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdEjecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("idEjecutivo");
        });

        modelBuilder.Entity<Extr11>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_1", "Temp");

            entity.Property(e => e.Acoffer).HasColumnName("ACOffer");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Extr1186291>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_186291", "Temp");

            entity.Property(e => e.Acaccept)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ACAccept");
            entity.Property(e => e.Acoffer)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ACOffer");
            entity.Property(e => e.BalanceG)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Balance G*");
            entity.Property(e => e.EnrolladoSettlement)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Liquidated)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.OasisAccept)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.OasisDecline)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.OasisOffer)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SettlementAccepted)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SettlementFinished)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Extr1186292>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_186292", "Temp");

            entity.Property(e => e.DateWoCancelled)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("date WO/Cancelled");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Extr1186301>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_186301", "Temp");

            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ejecutivo");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Inv)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("inv");
        });

        modelBuilder.Entity<Extr1186302>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_186302", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Settloffer)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SETTLOffer");
        });

        modelBuilder.Entity<Extr1186303>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_186303", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Ppaoffer)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PPAOffer");
        });

        modelBuilder.Entity<Extr1186304>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_186304", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Ppaccept)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PPAccept");
        });

        modelBuilder.Entity<Extr1186305>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_186305", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Liquidated)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Extr1186306>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_186306", "Temp");

            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ejecutivo");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Inv)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("inv");
        });

        modelBuilder.Entity<Extr1186307>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_186307", "Temp");

            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ejecutivo");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Inv)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("inv");
        });

        modelBuilder.Entity<Extr1186309>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_186309", "Temp");

            entity.Property(e => e.Acaccept)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ACAccept");
            entity.Property(e => e.Acoffer)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ACOffer");
            entity.Property(e => e.BalanceG)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Balance G*");
            entity.Property(e => e.EnrolladoSettlement)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Liquidated)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.OasisAccept)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.OasisDecline)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.OasisOffer)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SettlementAccepted)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SettlementFinished)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Extr1186322>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_186322", "Temp");

            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Inv)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("INV");
        });

        modelBuilder.Entity<Extr1186323>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_186323", "Temp");

            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EJECUTIVO");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Extr1186328>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EXTR_1_186328", "Temp");

            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ejecutivo");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Inv)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("inv");
        });

        modelBuilder.Entity<Faltum>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("FALTA");

            entity.Property(e => e.Dif)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Fecha)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA");
            entity.Property(e => e.Gap)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.GestAmexJulDicFechaGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("GestAmex Jul-Dic_FechaGestion");
            entity.Property(e => e.GestAmexJulDicHoraGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("GestAmex Jul-Dic_HoraGestion");
            entity.Property(e => e.GestAmexJulDicIdCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("GestAmex Jul-Dic_idCuenta");
            entity.Property(e => e.GestAmexJulDicNumerotelefonico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("GestAmex Jul-Dic_numerotelefonico");
            entity.Property(e => e.Horaok)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("HORAOK");
            entity.Property(e => e.Horaseg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("HORASEG");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.RpcNegFechaGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RPC + Neg_FechaGestion");
            entity.Property(e => e.RpcNegHoraGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RPC + Neg_HoraGestion");
            entity.Property(e => e.RpcNegIdCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RPC + Neg_idCuenta");
            entity.Property(e => e.Tel)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL");
            entity.Property(e => e.Test)
                .HasMaxLength(255)
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

        modelBuilder.Entity<GessA>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("GessA");

            entity.Property(e => e.Cuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Numerotelefonico)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("numerotelefonico");
        });

        modelBuilder.Entity<GestCon>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("GestCon");

            entity.Property(e => e.Batchdate)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("batchdate");
            entity.Property(e => e.Currentagencyid)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("fecha_insert");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Númerotelefónico).HasColumnName("númerotelefónico");
            entity.Property(e => e.Valor)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("valor");
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
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("productoorigen");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo_vencido");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
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

        modelBuilder.Entity<InsertaSkipFaltante>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("InsertaSkip_Faltante");

            entity.Property(e => e.Confirmado)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.DatoBuscado)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.Encontrado)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdDato)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("idDato");
            entity.Property(e => e.IdEjecutivo)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.IdFuente)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("idFuente");
            entity.Property(e => e.NúmeroTeléfonosEncontrados)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasMaxLength(17)
                .IsUnicode(false)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Skip)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.TiempoEnCuenta)
                .HasMaxLength(8)
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

        modelBuilder.Entity<Mail1186290Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_1_186290_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Mail1186295Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_1_186295_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Mail1186308Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_1_186308_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Mail1186312>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Mail_1_186312", "Temp");

            entity.Property(e => e.Correo)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Mail1186316Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_1_186316_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Mail1186325Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_1_186325_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Mail1186326Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_1_186326_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
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

        modelBuilder.Entity<Pago1186300>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Pago_1_186300", "Temp");

            entity.Property(e => e.Fecha)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Monto)
                .HasColumnType("money")
                .HasColumnName("MONTO");
            entity.Property(e => e.Segmentacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmentacion");
        });

        modelBuilder.Entity<Pago1186321>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Pago_1_186321", "Temp");

            entity.Property(e => e.Fecha)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(150)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Monto).HasColumnName("MONTO");
            entity.Property(e => e.Segmentacion)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("segmentacion");
        });

        modelBuilder.Entity<Pago1Plmt186300>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Pago_1_plmt186300", "Temp");

            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_insert");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.IdPago).HasColumnName("idPago");
            entity.Property(e => e.Montopago).HasColumnType("money");
            entity.Property(e => e.Referencia)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.SegPagos)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.SegTemp)
                .HasMaxLength(30)
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

        modelBuilder.Entity<Tels1186296Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_1_186296_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
        });

        modelBuilder.Entity<Tels1186297Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_1_186297_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
        });

        modelBuilder.Entity<Tels1186311Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_1_186311_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
        });

        modelBuilder.Entity<Tels1186315Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_1_186315_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
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

        modelBuilder.Entity<ValInfoAmex>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ValInfoAmex");

            entity.Property(e => e.AgencyId)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("AgencyID");
            entity.Property(e => e.BalanceG)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.Batchdate)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.Calle)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.Ciudad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.Colonia)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.Cp)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("CP");
            entity.Property(e => e.Cuenta)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.CurrentBalanceG)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.Estado)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.Expediente)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.FechaActivación)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("Fecha_Activación");
            entity.Property(e => e.FechaLlegada)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("Fecha_Llegada");
            entity.Property(e => e.FechaRetiro)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("Fecha_Retiro");
            entity.Property(e => e.Municipio)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.Nombre)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.Placement)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.Producto)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.UltimaGestión)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.ÚltimoComentario)
                .HasMaxLength(250)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
        });

        modelBuilder.Entity<ValidaTelefono>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.FechaInsert).HasColumnName("fecha_insert");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
            entity.Property(e => e.Idorigen).HasColumnName("idorigen");
            entity.Property(e => e.Númerocliente)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("númerocliente");
            entity.Property(e => e.Origen)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("origen");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("teléfono");
        });

        modelBuilder.Entity<ValidaTelefonos2>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ValidaTelefonos2");

            entity.Property(e => e.Buc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("buc");
            entity.Property(e => e.FechaInsert).HasColumnName("fecha_insert");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
            entity.Property(e => e.Idorigen).HasColumnName("idorigen");
            entity.Property(e => e.Númerocliente)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("númerocliente");
            entity.Property(e => e.Origen)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("origen");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("teléfono");
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
