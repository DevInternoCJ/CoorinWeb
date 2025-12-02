using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Loki.ModelsDbHistoryMictlan;

public partial class DbHistoryContextMictlan : DbContext
{
    public DbHistoryContextMictlan()
    {
    }

    public DbHistoryContextMictlan(DbContextOptions<DbHistoryContextMictlan> options)
        : base(options)
    {
    }

    public virtual DbSet<Accionamiento> Accionamientos { get; set; }

    public virtual DbSet<ActlProducto1> ActlProducto1s { get; set; }

    public virtual DbSet<ActlProducto10> ActlProducto10s { get; set; }

    public virtual DbSet<ActlProducto101> ActlProducto101s { get; set; }

    public virtual DbSet<ActlProducto104> ActlProducto104s { get; set; }

    public virtual DbSet<ActlProducto105> ActlProducto105s { get; set; }

    public virtual DbSet<ActlProducto110> ActlProducto110s { get; set; }

    public virtual DbSet<ActlProducto117> ActlProducto117s { get; set; }

    public virtual DbSet<ActlProducto12> ActlProducto12s { get; set; }

    public virtual DbSet<ActlProducto120> ActlProducto120s { get; set; }

    public virtual DbSet<ActlProducto122> ActlProducto122s { get; set; }

    public virtual DbSet<ActlProducto125> ActlProducto125s { get; set; }

    public virtual DbSet<ActlProducto126> ActlProducto126s { get; set; }

    public virtual DbSet<ActlProducto127> ActlProducto127s { get; set; }

    public virtual DbSet<ActlProducto128> ActlProducto128s { get; set; }

    public virtual DbSet<ActlProducto13> ActlProducto13s { get; set; }

    public virtual DbSet<ActlProducto130> ActlProducto130s { get; set; }

    public virtual DbSet<ActlProducto131> ActlProducto131s { get; set; }

    public virtual DbSet<ActlProducto133> ActlProducto133s { get; set; }

    public virtual DbSet<ActlProducto14> ActlProducto14s { get; set; }

    public virtual DbSet<ActlProducto15> ActlProducto15s { get; set; }

    public virtual DbSet<ActlProducto16> ActlProducto16s { get; set; }

    public virtual DbSet<ActlProducto168> ActlProducto168s { get; set; }

    public virtual DbSet<ActlProducto17> ActlProducto17s { get; set; }

    public virtual DbSet<ActlProducto18> ActlProducto18s { get; set; }

    public virtual DbSet<ActlProducto19> ActlProducto19s { get; set; }

    public virtual DbSet<ActlProducto2> ActlProducto2s { get; set; }

    public virtual DbSet<ActlProducto20> ActlProducto20s { get; set; }

    public virtual DbSet<ActlProducto21> ActlProducto21s { get; set; }

    public virtual DbSet<ActlProducto22> ActlProducto22s { get; set; }

    public virtual DbSet<ActlProducto23> ActlProducto23s { get; set; }

    public virtual DbSet<ActlProducto25> ActlProducto25s { get; set; }

    public virtual DbSet<ActlProducto26> ActlProducto26s { get; set; }

    public virtual DbSet<ActlProducto28> ActlProducto28s { get; set; }

    public virtual DbSet<ActlProducto29> ActlProducto29s { get; set; }

    public virtual DbSet<ActlProducto3> ActlProducto3s { get; set; }

    public virtual DbSet<ActlProducto30> ActlProducto30s { get; set; }

    public virtual DbSet<ActlProducto31> ActlProducto31s { get; set; }

    public virtual DbSet<ActlProducto35> ActlProducto35s { get; set; }

    public virtual DbSet<ActlProducto37> ActlProducto37s { get; set; }

    public virtual DbSet<ActlProducto38> ActlProducto38s { get; set; }

    public virtual DbSet<ActlProducto39> ActlProducto39s { get; set; }

    public virtual DbSet<ActlProducto4> ActlProducto4s { get; set; }

    public virtual DbSet<ActlProducto40> ActlProducto40s { get; set; }

    public virtual DbSet<ActlProducto41> ActlProducto41s { get; set; }

    public virtual DbSet<ActlProducto42> ActlProducto42s { get; set; }

    public virtual DbSet<ActlProducto43> ActlProducto43s { get; set; }

    public virtual DbSet<ActlProducto44> ActlProducto44s { get; set; }

    public virtual DbSet<ActlProducto49> ActlProducto49s { get; set; }

    public virtual DbSet<ActlProducto5> ActlProducto5s { get; set; }

    public virtual DbSet<ActlProducto50> ActlProducto50s { get; set; }

    public virtual DbSet<ActlProducto51> ActlProducto51s { get; set; }

    public virtual DbSet<ActlProducto52> ActlProducto52s { get; set; }

    public virtual DbSet<ActlProducto53> ActlProducto53s { get; set; }

    public virtual DbSet<ActlProducto54> ActlProducto54s { get; set; }

    public virtual DbSet<ActlProducto55> ActlProducto55s { get; set; }

    public virtual DbSet<ActlProducto6> ActlProducto6s { get; set; }

    public virtual DbSet<ActlProducto61> ActlProducto61s { get; set; }

    public virtual DbSet<ActlProducto63> ActlProducto63s { get; set; }

    public virtual DbSet<ActlProducto67> ActlProducto67s { get; set; }

    public virtual DbSet<ActlProducto7> ActlProducto7s { get; set; }

    public virtual DbSet<ActlProducto72> ActlProducto72s { get; set; }

    public virtual DbSet<ActlProducto8> ActlProducto8s { get; set; }

    public virtual DbSet<ActlProducto81> ActlProducto81s { get; set; }

    public virtual DbSet<ActlProducto82> ActlProducto82s { get; set; }

    public virtual DbSet<ActlProducto83> ActlProducto83s { get; set; }

    public virtual DbSet<ActlProducto84> ActlProducto84s { get; set; }

    public virtual DbSet<ActlProducto85> ActlProducto85s { get; set; }

    public virtual DbSet<ActlProducto86> ActlProducto86s { get; set; }

    public virtual DbSet<ActlProducto87> ActlProducto87s { get; set; }

    public virtual DbSet<ActlProducto88> ActlProducto88s { get; set; }

    public virtual DbSet<ActlProducto89> ActlProducto89s { get; set; }

    public virtual DbSet<ActlProducto9> ActlProducto9s { get; set; }

    public virtual DbSet<ActlProducto90> ActlProducto90s { get; set; }

    public virtual DbSet<ActlProducto96> ActlProducto96s { get; set; }

    public virtual DbSet<AcumProducto1> AcumProducto1s { get; set; }

    public virtual DbSet<AcumProducto104> AcumProducto104s { get; set; }

    public virtual DbSet<AcumProducto122> AcumProducto122s { get; set; }

    public virtual DbSet<AcumProducto125> AcumProducto125s { get; set; }

    public virtual DbSet<AcumProducto126> AcumProducto126s { get; set; }

    public virtual DbSet<AcumProducto127> AcumProducto127s { get; set; }

    public virtual DbSet<AcumProducto128> AcumProducto128s { get; set; }

    public virtual DbSet<AcumProducto130> AcumProducto130s { get; set; }

    public virtual DbSet<AcumProducto131> AcumProducto131s { get; set; }

    public virtual DbSet<AcumProducto133> AcumProducto133s { get; set; }

    public virtual DbSet<AcumProducto35> AcumProducto35s { get; set; }

    public virtual DbSet<AcumProducto7> AcumProducto7s { get; set; }

    public virtual DbSet<AcumProducto8> AcumProducto8s { get; set; }

    public virtual DbSet<Adicionale> Adicionales { get; set; }

    public virtual DbSet<Asignación> Asignacións { get; set; }

    public virtual DbSet<Búsqueda> Búsquedas { get; set; }

    public virtual DbSet<CargosAtm> CargosAtms { get; set; }

    public virtual DbSet<Cartera> Carteras { get; set; }

    public virtual DbSet<Cartera31> Cartera31s { get; set; }

    public virtual DbSet<Cartera31Total> Cartera31Totals { get; set; }

    public virtual DbSet<Catálogo> Catálogos { get; set; }

    public virtual DbSet<Comentario> Comentarios { get; set; }

    public virtual DbSet<CompiladoDireccione> CompiladoDirecciones { get; set; }

    public virtual DbSet<CompiladoTeléfono> CompiladoTeléfonos { get; set; }

    public virtual DbSet<CorreosCuenta> CorreosCuentas { get; set; }

    public virtual DbSet<CorreosEnviado> CorreosEnviados { get; set; }

    public virtual DbSet<Cuenta> Cuentas { get; set; }

    public virtual DbSet<CuentasCiclo> CuentasCiclos { get; set; }

    public virtual DbSet<CuentasHistórico> CuentasHistóricos { get; set; }

    public virtual DbSet<DatosErróneo> DatosErróneos { get; set; }

    public virtual DbSet<DemográficosErróneo> DemográficosErróneos { get; set; }

    public virtual DbSet<Domicilio> Domicilios { get; set; }

    public virtual DbSet<DomiciliosHistórico> DomiciliosHistóricos { get; set; }

    public virtual DbSet<Ejecutivo> Ejecutivos { get; set; }

    public virtual DbSet<EncuentasPregunta> EncuentasPreguntas { get; set; }

    public virtual DbSet<EncuentasRespuesta> EncuentasRespuestas { get; set; }

    public virtual DbSet<EncuestaCliente> EncuestaClientes { get; set; }

    public virtual DbSet<Equivalencias200> Equivalencias200s { get; set; }

    public virtual DbSet<EquivalenciasViciDial> EquivalenciasViciDials { get; set; }

    public virtual DbSet<ErroresMigración> ErroresMigracións { get; set; }

    public virtual DbSet<Fallido> Fallidos { get; set; }

    public virtual DbSet<Fallido12> Fallido12s { get; set; }

    public virtual DbSet<FallidoAc> FallidoAcs { get; set; }

    public virtual DbSet<Fecha> Fechas { get; set; }

    public virtual DbSet<GestionesAuditoriaHist> GestionesAuditoriaHists { get; set; }

    public virtual DbSet<GestionesChat> GestionesChats { get; set; }

    public virtual DbSet<GestionesDomiciliaria> GestionesDomiciliarias { get; set; }

    public virtual DbSet<GestionesIssueAxp> GestionesIssueAxps { get; set; }

    public virtual DbSet<GestionesRespaldo> GestionesRespaldos { get; set; }

    public virtual DbSet<GestionesSistema> GestionesSistemas { get; set; }

    public virtual DbSet<GestionesSistemaHi> GestionesSistemaHis { get; set; }

    public virtual DbSet<GestionesTelefónica> GestionesTelefónicas { get; set; }

    public virtual DbSet<GrabacionesIntegración> GrabacionesIntegracións { get; set; }

    public virtual DbSet<GrabaciónNegociación> GrabaciónNegociacións { get; set; }

    public virtual DbSet<Herramienta> Herramientas { get; set; }

    public virtual DbSet<Hibrido> Hibridos { get; set; }

    public virtual DbSet<Hibrido12> Hibrido12s { get; set; }

    public virtual DbSet<HibridoAc> HibridoAcs { get; set; }

    public virtual DbSet<HibridoEsp> HibridoEsps { get; set; }

    public virtual DbSet<HibridoFaltante> HibridoFaltantes { get; set; }

    public virtual DbSet<HistoricoCuenta> HistoricoCuentas { get; set; }

    public virtual DbSet<InboundKpi> InboundKpis { get; set; }

    public virtual DbSet<IntentosViciDial> IntentosViciDials { get; set; }

    public virtual DbSet<LogIngreso> LogIngresos { get; set; }

    public virtual DbSet<MetasEjecutivo> MetasEjecutivos { get; set; }

    public virtual DbSet<Mod914> Mod914s { get; set; }

    public virtual DbSet<Negociacion> Negociacions { get; set; }

    public virtual DbSet<Negociacione> Negociaciones { get; set; }

    public virtual DbSet<NormalSiac> NormalSiacs { get; set; }

    public virtual DbSet<NormalSiacAe> NormalSiacAes { get; set; }

    public virtual DbSet<Ofrecimiento> Ofrecimientos { get; set; }

    public virtual DbSet<Pago> Pagos { get; set; }

    public virtual DbSet<PagosReportado> PagosReportados { get; set; }

    public virtual DbSet<Paquete> Paquetes { get; set; }

    public virtual DbSet<Pausa> Pausas { get; set; }

    public virtual DbSet<Plazo> Plazos { get; set; }

    public virtual DbSet<Productividad> Productividads { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Queja> Quejas { get; set; }

    public virtual DbSet<RelacionesCatálogo> RelacionesCatálogos { get; set; }

    public virtual DbSet<RndView> RndViews { get; set; }

    public virtual DbSet<SaldosConvenio> SaldosConvenios { get; set; }

    public virtual DbSet<SegmProducto1> SegmProducto1s { get; set; }

    public virtual DbSet<SegmProducto10> SegmProducto10s { get; set; }

    public virtual DbSet<SegmProducto101> SegmProducto101s { get; set; }

    public virtual DbSet<SegmProducto104> SegmProducto104s { get; set; }

    public virtual DbSet<SegmProducto105> SegmProducto105s { get; set; }

    public virtual DbSet<SegmProducto110> SegmProducto110s { get; set; }

    public virtual DbSet<SegmProducto117> SegmProducto117s { get; set; }

    public virtual DbSet<SegmProducto12> SegmProducto12s { get; set; }

    public virtual DbSet<SegmProducto120> SegmProducto120s { get; set; }

    public virtual DbSet<SegmProducto122> SegmProducto122s { get; set; }

    public virtual DbSet<SegmProducto125> SegmProducto125s { get; set; }

    public virtual DbSet<SegmProducto126> SegmProducto126s { get; set; }

    public virtual DbSet<SegmProducto127> SegmProducto127s { get; set; }

    public virtual DbSet<SegmProducto128> SegmProducto128s { get; set; }

    public virtual DbSet<SegmProducto13> SegmProducto13s { get; set; }

    public virtual DbSet<SegmProducto130> SegmProducto130s { get; set; }

    public virtual DbSet<SegmProducto131> SegmProducto131s { get; set; }

    public virtual DbSet<SegmProducto133> SegmProducto133s { get; set; }

    public virtual DbSet<SegmProducto14> SegmProducto14s { get; set; }

    public virtual DbSet<SegmProducto15> SegmProducto15s { get; set; }

    public virtual DbSet<SegmProducto16> SegmProducto16s { get; set; }

    public virtual DbSet<SegmProducto168> SegmProducto168s { get; set; }

    public virtual DbSet<SegmProducto17> SegmProducto17s { get; set; }

    public virtual DbSet<SegmProducto18> SegmProducto18s { get; set; }

    public virtual DbSet<SegmProducto19> SegmProducto19s { get; set; }

    public virtual DbSet<SegmProducto2> SegmProducto2s { get; set; }

    public virtual DbSet<SegmProducto20> SegmProducto20s { get; set; }

    public virtual DbSet<SegmProducto21> SegmProducto21s { get; set; }

    public virtual DbSet<SegmProducto22> SegmProducto22s { get; set; }

    public virtual DbSet<SegmProducto23> SegmProducto23s { get; set; }

    public virtual DbSet<SegmProducto25> SegmProducto25s { get; set; }

    public virtual DbSet<SegmProducto26> SegmProducto26s { get; set; }

    public virtual DbSet<SegmProducto28> SegmProducto28s { get; set; }

    public virtual DbSet<SegmProducto29> SegmProducto29s { get; set; }

    public virtual DbSet<SegmProducto3> SegmProducto3s { get; set; }

    public virtual DbSet<SegmProducto30> SegmProducto30s { get; set; }

    public virtual DbSet<SegmProducto31> SegmProducto31s { get; set; }

    public virtual DbSet<SegmProducto35> SegmProducto35s { get; set; }

    public virtual DbSet<SegmProducto37> SegmProducto37s { get; set; }

    public virtual DbSet<SegmProducto38> SegmProducto38s { get; set; }

    public virtual DbSet<SegmProducto39> SegmProducto39s { get; set; }

    public virtual DbSet<SegmProducto4> SegmProducto4s { get; set; }

    public virtual DbSet<SegmProducto40> SegmProducto40s { get; set; }

    public virtual DbSet<SegmProducto41> SegmProducto41s { get; set; }

    public virtual DbSet<SegmProducto42> SegmProducto42s { get; set; }

    public virtual DbSet<SegmProducto43> SegmProducto43s { get; set; }

    public virtual DbSet<SegmProducto44> SegmProducto44s { get; set; }

    public virtual DbSet<SegmProducto49> SegmProducto49s { get; set; }

    public virtual DbSet<SegmProducto5> SegmProducto5s { get; set; }

    public virtual DbSet<SegmProducto50> SegmProducto50s { get; set; }

    public virtual DbSet<SegmProducto51> SegmProducto51s { get; set; }

    public virtual DbSet<SegmProducto52> SegmProducto52s { get; set; }

    public virtual DbSet<SegmProducto53> SegmProducto53s { get; set; }

    public virtual DbSet<SegmProducto54> SegmProducto54s { get; set; }

    public virtual DbSet<SegmProducto55> SegmProducto55s { get; set; }

    public virtual DbSet<SegmProducto6> SegmProducto6s { get; set; }

    public virtual DbSet<SegmProducto61> SegmProducto61s { get; set; }

    public virtual DbSet<SegmProducto63> SegmProducto63s { get; set; }

    public virtual DbSet<SegmProducto67> SegmProducto67s { get; set; }

    public virtual DbSet<SegmProducto7> SegmProducto7s { get; set; }

    public virtual DbSet<SegmProducto72> SegmProducto72s { get; set; }

    public virtual DbSet<SegmProducto8> SegmProducto8s { get; set; }

    public virtual DbSet<SegmProducto81> SegmProducto81s { get; set; }

    public virtual DbSet<SegmProducto82> SegmProducto82s { get; set; }

    public virtual DbSet<SegmProducto83> SegmProducto83s { get; set; }

    public virtual DbSet<SegmProducto84> SegmProducto84s { get; set; }

    public virtual DbSet<SegmProducto85> SegmProducto85s { get; set; }

    public virtual DbSet<SegmProducto86> SegmProducto86s { get; set; }

    public virtual DbSet<SegmProducto87> SegmProducto87s { get; set; }

    public virtual DbSet<SegmProducto88> SegmProducto88s { get; set; }

    public virtual DbSet<SegmProducto89> SegmProducto89s { get; set; }

    public virtual DbSet<SegmProducto9> SegmProducto9s { get; set; }

    public virtual DbSet<SegmProducto90> SegmProducto90s { get; set; }

    public virtual DbSet<SegmProducto96> SegmProducto96s { get; set; }

    public virtual DbSet<SegmentaciónInternaReporte> SegmentaciónInternaReportes { get; set; }

    public virtual DbSet<Seguimiento> Seguimientos { get; set; }

    public virtual DbSet<Segundo> Segundos { get; set; }

    public virtual DbSet<SolicitudesBúsquedum> SolicitudesBúsqueda { get; set; }

    public virtual DbSet<SolicitudesEstadosDeCuentum> SolicitudesEstadosDeCuenta { get; set; }

    public virtual DbSet<TelefonosTn> TelefonosTns { get; set; }

    public virtual DbSet<TelefonosTnn> TelefonosTnns { get; set; }

    public virtual DbSet<Teléfono> Teléfonos { get; set; }

    public virtual DbSet<TeléfonosHistórico> TeléfonosHistóricos { get; set; }

    public virtual DbSet<Valhistduplicado> Valhistduplicados { get; set; }

    public virtual DbSet<ValoresCatálogo> ValoresCatálogos { get; set; }

    public virtual DbSet<VwAccionamiento> VwAccionamientos { get; set; }

    public virtual DbSet<VwAccionamiento1> VwAccionamientos1 { get; set; }

    public virtual DbSet<VwCuentasHistórico> VwCuentasHistóricos { get; set; }

    public virtual DbSet<VwGestionesDomiciliaria> VwGestionesDomiciliarias { get; set; }

    public virtual DbSet<VwGestionesEnNegociación> VwGestionesEnNegociacións { get; set; }

    public virtual DbSet<VwGestionesTelefónica> VwGestionesTelefónicas { get; set; }

    public virtual DbSet<VwGestionesTelefónicasX> VwGestionesTelefónicasXes { get; set; }

    public virtual DbSet<VwMaxContacto> VwMaxContactos { get; set; }

    public virtual DbSet<VwNegociacionesOfrecimiento> VwNegociacionesOfrecimientos { get; set; }

    public virtual DbSet<VwPagosAmex> VwPagosAmexes { get; set; }

    public virtual DbSet<VwÚltimoCiclo> VwÚltimoCiclos { get; set; }

    public virtual DbSet<_200Castigo> _200Castigos { get; set; }

    public virtual DbSet<_200Vencidum> _200Vencida { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=192.168.7.197;database=dbHistory;uid=login_ejecutor;pwd=3j3123/*-;encrypt=true;trustservercertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Modern_Spanish_CI_AI");

        modelBuilder.Entity<Accionamiento>(entity =>
        {
            entity.HasKey(e => new { e.FechaInsert, e.IdCartera, e.IdCuenta, e.SegundoInsert });

            entity.ToTable(tb => tb.HasComment("Detalle de cada accionamiento que se le realizó a la cuenta."));

            entity.HasIndex(e => new { e.IdCartera, e.FechaInsert, e.IdAcercamiento, e.IdCuenta }, "IX_Accionamientos_CarteraFechaAcercamiento").IsDescending(false, true, false, false);

            entity.HasIndex(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert }, "IX_Accionamientos_idCarteraCuenta").IsDescending(false, false, true);

            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.SegundoPaquete)
                .HasPrecision(0)
                .HasColumnName("Segundo_Paquete");

            entity.HasOne(d => d.Paquete).WithMany(p => p.Accionamientos)
                .HasForeignKey(d => new { d.FechaInsert, d.IdCartera, d.SegundoPaquete })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Accionamientos_Paquetes");
        });

        modelBuilder.Entity<ActlProducto1>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_1", "Y");

            entity.Property(e => e.Asignacion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Batchdate)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("batchdate");
            entity.Property(e => e.C120)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c120");
            entity.Property(e => e.C150)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c150");
            entity.Property(e => e.C180)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c180");
            entity.Property(e => e.CalifScore)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CALIF SCORE");
            entity.Property(e => e.CancellationDate)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CollectibilityCode)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Cur)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cur");
            entity.Property(e => e.CurrentAgencyId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CurrentBalanceAcorn)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CurrentBalanceG).HasColumnType("money");
            entity.Property(e => e.CycleCut)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cycleCut");
            entity.Property(e => e.DateWoCancelled)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("date WO/Cancelled");
            entity.Property(e => e.EnrolladoSettlement)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Estabilizacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FechaMinimomasatrasado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FechaRecepción)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaSkip)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Fechacastigo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Fechacortelc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fechacortelc");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Initialbalance)
                .HasColumnType("money")
                .HasColumnName("initialbalance");
            entity.Property(e => e.LastDatePayment)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Last Date Payment");
            entity.Property(e => e.Lastpaymentdate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lastpaymentdate");
            entity.Property(e => e.LendingPayToCurrrentScore)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lendingPayToCurrrentScore");
            entity.Property(e => e.LoanProductcode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("loan_productcode");
            entity.Property(e => e.MarketRecoveryScore)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("marketRecoveryScore");
            entity.Property(e => e.MetricScore)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Montlyincome)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("montlyincome");
            entity.Property(e => e.MínimoMasAtrasado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MínimoMásAtrasado)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Mínimo más atrasado");
            entity.Property(e => e.N90)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("n90");
            entity.Property(e => e.Placement)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.PlacementLevelCode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("placementLevelCode");
            entity.Property(e => e.Prorroga)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prorroga");
            entity.Property(e => e.Quid)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Receiptdate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("receiptdate");
            entity.Property(e => e.Recoveredcode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("recoveredcode");
            entity.Property(e => e.S60)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("s60");
            entity.Property(e => e.Saldovencido)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.StayDaysOa)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("StayDaysOA");
            entity.Property(e => e.T30)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("t30");
            entity.Property(e => e.Unb)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("UNB");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
            entity.Property(e => e.WriteOffDate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("writeOffDate");
        });

        modelBuilder.Entity<ActlProducto10>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_10", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_10")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_10_Válido").IsDescending();

            entity.Property(e => e.FecProxCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_prox_corte");
            entity.Property(e => e.FecProxVto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_prox_vto");
            entity.Property(e => e.FecUltPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_ult_pago");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.ImpUltPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("imp_ult_pago");
            entity.Property(e => e.InteresOrdinarioKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Interes Ordinario Krn");
            entity.Property(e => e.MesCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mes castigo");
            entity.Property(e => e.Modalidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("modalidad");
            entity.Property(e => e.MontoPrincipalKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Monto Principal Krn");
            entity.Property(e => e.Moratorios)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MORATORIOS");
            entity.Property(e => e.MoratoriosKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Moratorios Krn");
            entity.Property(e => e.NumPagosKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("num_pagos_krn");
            entity.Property(e => e.OtrosExigiblesKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Otros Exigibles Krn");
            entity.Property(e => e.SaldoAlDía)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al día");
            entity.Property(e => e.SaldoContableMonedaOrigen)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo contable moneda origen");
            entity.Property(e => e.SaldoVencidoKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo vencido krn");
            entity.Property(e => e.SaldoVigenteKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo vigente krn");
            entity.Property(e => e.Saldoinicial)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.StaUsgaap)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sta_usgaap");
            entity.Property(e => e.TotalAdeudoKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total adeudo krn");
            entity.Property(e => e.TvdoValor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tvdo_valor");
            entity.Property(e => e.TvigValor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tvig_valor");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto101>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_101", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_101")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_101_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto104>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_104", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_104")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered()
                .HasFillFactor(90);

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_104_Válido")
                .IsDescending()
                .HasFillFactor(90);

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto105>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_105", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_105")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_105_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto110>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_110", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_110")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_110_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto117>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_117", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_117")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_117_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto12>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_12", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_12")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_12_Válido").IsDescending();

            entity.Property(e => e.CarteraVencida)
                .HasColumnType("money")
                .HasColumnName("cartera vencida");
            entity.Property(e => e.FechaDeAlta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha de alta");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto120>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_120", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_120")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_120_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto122>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_122", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_122")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_122_Válido").IsDescending();

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_actual");
            entity.Property(e => e.CalifScore)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CALIF SCORE");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_postal");
            entity.Property(e => e.Descuento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DescuentoSecorse)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento_secorse");
            entity.Property(e => e.Especial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("especial");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_asignacion");
            entity.Property(e => e.FechaMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_mora");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_ultimo_pago");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.MontoEnMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_en_mora");
            entity.Property(e => e.MontoUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMO_PAGO");
            entity.Property(e => e.PagosVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pagos_vencido");
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ProductoOrigen)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoTotal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_total");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_VENCIDO");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Segmento_Actual");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto125>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_125", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_125")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_125_Válido").IsDescending();

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_actual");
            entity.Property(e => e.BaseDeDatos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("base de datos");
            entity.Property(e => e.CP)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c_p");
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("calle_no_cliente");
            entity.Property(e => e.CapitalVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("capital_vencido");
            entity.Property(e => e.CiudadCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CIUDAD_CLIENTE");
            entity.Property(e => e.Clasif)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("clasif");
            entity.Property(e => e.ClaveProducto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("clave_producto");
            entity.Property(e => e.CodAccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_accion");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_postal");
            entity.Property(e => e.CodResultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_resultado");
            entity.Property(e => e.ColoniaCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("colonia_cliente");
            entity.Property(e => e.ComentariosObservaciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comentarios /observaciones");
            entity.Property(e => e.Consecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("consecutivo");
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.Corte)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CorteColor)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CtaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CTA_CHEQUES");
            entity.Property(e => e.CuentaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cuenta_cheques");
            entity.Property(e => e.DescProducto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DESC_PRODUCTO");
            entity.Property(e => e.DiaRpc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIA RPC");
            entity.Property(e => e.DiasAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_agencia");
            entity.Property(e => e.DiasAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_asignacion");
            entity.Property(e => e.DiasAsignacionCyber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION_CYBER");
            entity.Property(e => e.DiasEnAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_EN_AGENCIA");
            entity.Property(e => e.DiasFaltantes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_FALTANTES");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_mora");
            entity.Property(e => e.DiasMorosos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MOROSOS");
            entity.Property(e => e.Digital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIGITAL");
            entity.Property(e => e.Direccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.Documentacion)
                .IsUnicode(false)
                .HasColumnName("documentacion");
            entity.Property(e => e.Documentos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DOCUMENTOS");
            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ejecutivo");
            entity.Property(e => e.Especial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("especial");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.Estatus)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estatus");
            entity.Property(e => e.EstatusCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTATUS_CLIENTE");
            entity.Property(e => e.Ext1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EXT_1");
            entity.Property(e => e.Ext2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EXT_2");
            entity.Property(e => e.FecPp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_PP");
            entity.Property(e => e.FecRefAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_REF_AGENCIA");
            entity.Property(e => e.FecUltGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_ult_gestion");
            entity.Property(e => e.FechaAperturaCta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_apertura_cta");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_asignacion");
            entity.Property(e => e.FechaCambioSegmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CAMBIO_SEGMENTO");
            entity.Property(e => e.FechaCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_castigo");
            entity.Property(e => e.FechaContratacionPoliza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_contratacion poliza");
            entity.Property(e => e.FechaDesasignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_desasignacion");
            entity.Property(e => e.FechaDesasignacionCyber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_DESASIGNACION_CYBER");
            entity.Property(e => e.FechaOcurrencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_ocurrencia");
            entity.Property(e => e.FechaProximoVencimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_proximo_vencimiento");
            entity.Property(e => e.FechaReporte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_reporte");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_ultimo_pago");
            entity.Property(e => e.Fecstaca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecstaca");
            entity.Property(e => e.Final)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FINAL");
            entity.Property(e => e.HoraRpc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("HORA RPC");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.InteresNoExigiblesP)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("interes_no_exigibles_p");
            entity.Property(e => e.InteresesMoratorios)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses_moratorios");
            entity.Property(e => e.InteresesOrdinarios)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses_ordinarios");
            entity.Property(e => e.IvaInteresNoExigibleP)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("iva_interes_no_exigible_p");
            entity.Property(e => e.IvaInteresesMoratorios)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("iva_intereses_moratorios");
            entity.Property(e => e.IvaInteresesOrdinarios)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("iva_intereses_ordinarios");
            entity.Property(e => e.Lada1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_1");
            entity.Property(e => e.Lada2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_2");
            entity.Property(e => e.Manomatico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("manomatico");
            entity.Property(e => e.Medio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("medio");
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_agencia");
            entity.Property(e => e.MontoUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_ultimo_pago");
            entity.Property(e => e.NombreCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre_cliente");
            entity.Property(e => e.NpvActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NPV_ACTUAL");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("observaciones");
            entity.Property(e => e.Operación)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("operación");
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pagos_vencidos");
            entity.Property(e => e.Pgad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pgad");
            entity.Property(e => e.Poliza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("poliza");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.ProgramaEspecial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("programa_especial");
            entity.Property(e => e.PromesaPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PROMESA_PAGO");
            entity.Property(e => e.Quitam)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("quitam");
            entity.Property(e => e.SaldoInsoluto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_insoluto");
            entity.Property(e => e.SaldoMes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_mes");
            entity.Property(e => e.SaldoTotal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_total");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido");
            entity.Property(e => e.SaldoVencido120Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_120_dias");
            entity.Property(e => e.SaldoVencido30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_30_dias");
            entity.Property(e => e.SaldoVencido60Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_60_dias");
            entity.Property(e => e.SaldoVencido90Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_90_dias");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_ACTUAL");
            entity.Property(e => e.SegmentoPosterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_POSTERIOR");
            entity.Property(e => e.Stacteca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("stacteca");
            entity.Property(e => e.StatusCli)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("status_cli");
            entity.Property(e => e.Tel1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_1");
            entity.Property(e => e.Tel2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_2");
            entity.Property(e => e.Telefono1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono1");
            entity.Property(e => e.Telefono2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono2");
            entity.Property(e => e.Telefono3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono3");
            entity.Property(e => e.Telefono4)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono4");
            entity.Property(e => e.TipoFacturacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tipo_facturacion");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_deudor");
            entity.Property(e => e.Trascodificada)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("trascodificada");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto126>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_126", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_126")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_126_Válido").IsDescending();

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_actual");
            entity.Property(e => e.AgenciaPrevia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_previa");
            entity.Property(e => e.Bhscor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BHSCOR");
            entity.Property(e => e.CP)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("C_P");
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("calle_no_cliente");
            entity.Property(e => e.CiudadCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ciudad_cliente");
            entity.Property(e => e.Clasif)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLASIF");
            entity.Property(e => e.CodAccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_ACCION");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_postal");
            entity.Property(e => e.CodResultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_RESULTADO");
            entity.Property(e => e.CodigoBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("codigo_bloqueo");
            entity.Property(e => e.ColoniaCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("colonia_cliente");
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.Corte)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CorteColor)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CuentaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cuenta_cheques");
            entity.Property(e => e.DescProducto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("desc_producto");
            entity.Property(e => e.DiaCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dia_corte");
            entity.Property(e => e.DiasAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_agencia");
            entity.Property(e => e.DiasAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION");
            entity.Property(e => e.DiasFaltantes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_faltantes");
            entity.Property(e => e.DiasMorosos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MOROSOS");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.FecCodigoBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_codigo_bloqueo");
            entity.Property(e => e.FecRefAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_ref_agencia");
            entity.Property(e => e.FecRefAgenciaPrevia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_ref_agencia_previa");
            entity.Property(e => e.FecUltGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULT_GESTION");
            entity.Property(e => e.FecUltimaCompra)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_ultima_compra");
            entity.Property(e => e.FecUltimaDisposicion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_ultima_disposicion");
            entity.Property(e => e.FechaAltaRefin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ALTA_REFIN");
            entity.Property(e => e.FechaAperturaCta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CTA");
            entity.Property(e => e.FechaAperturaCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_apertura_cuenta");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ASIGNACION");
            entity.Property(e => e.FechaCambioSegmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_cambio_segmento");
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
            entity.Property(e => e.FechaLimitePago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_limite_pago");
            entity.Property(e => e.FechaProxVencimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_PROX_VENCIMIENTO");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ULTIMO_PAGO");
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
            entity.Property(e => e.Lada1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lada_1");
            entity.Property(e => e.Lada11)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA1");
            entity.Property(e => e.Lada2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lada_2");
            entity.Property(e => e.Lada21)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA2");
            entity.Property(e => e.Lada3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lada_3");
            entity.Property(e => e.Lada31)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA3");
            entity.Property(e => e.LimiteCredito)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("limite_credito");
            entity.Property(e => e.Mensualidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MENSUALIDAD");
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_AGENCIA");
            entity.Property(e => e.MontoAsignadoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_asignado_agencia");
            entity.Property(e => e.MontoAsignadoAgenciaPrev)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_asignado_agencia_prev");
            entity.Property(e => e.MontoMoroso)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_moroso");
            entity.Property(e => e.MontoUltimaCompra)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_ultima_compra");
            entity.Property(e => e.MontoUltimaDisposicion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_ultima_disposicion");
            entity.Property(e => e.MontoUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMO_PAGO");
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
                .HasColumnName("pago_minimo");
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pagos_vencidos");
            entity.Property(e => e.Pgad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PlazoPactado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PLAZO_PACTADO");
            entity.Property(e => e.ProductoOrigen)
                .HasMaxLength(255)
                .IsUnicode(false);
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
            entity.Property(e => e.SaldoVencido120Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_120_dias");
            entity.Property(e => e.SaldoVencido30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_30_dias");
            entity.Property(e => e.SaldoVencido60Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_60_dias");
            entity.Property(e => e.SaldoVencido90Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_90_dias");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento_actual");
            entity.Property(e => e.SegmentoPosterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento_posterior");
            entity.Property(e => e.Stacteca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("stacteca");
            entity.Property(e => e.StatusCli)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS_CLI");
            entity.Property(e => e.StatusCumplimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS_CUMPLIMIENTO");
            entity.Property(e => e.Tasa)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TASA");
            entity.Property(e => e.Tel1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel_1");
            entity.Property(e => e.Tel11)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL1");
            entity.Property(e => e.Tel2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel_2");
            entity.Property(e => e.Tel21)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL2");
            entity.Property(e => e.Tel3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel_3");
            entity.Property(e => e.Tel31)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL3");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_deudor");
            entity.Property(e => e.Trascodificada)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TRASCODIFICADA");
            entity.Property(e => e.UltimoSaldoMesAnterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ULTIMO_SALDO_MES_ANTERIOR");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto127>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_127", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_127")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_127_Válido").IsDescending();

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_actual");
            entity.Property(e => e.CP)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("C_P");
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("calle_no_cliente");
            entity.Property(e => e.CapitalVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CAPITAL_VENCIDO");
            entity.Property(e => e.CiudadCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ciudad_cliente");
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
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_postal");
            entity.Property(e => e.CodResultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_RESULTADO");
            entity.Property(e => e.ColoniaCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("colonia_cliente");
            entity.Property(e => e.Consecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("consecutivo");
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.Corte)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CorteColor)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CtaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cta_cheques");
            entity.Property(e => e.CuentaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CUENTA_CHEQUES");
            entity.Property(e => e.DescProducto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("desc_producto");
            entity.Property(e => e.DiasAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_AGENCIA");
            entity.Property(e => e.DiasAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION");
            entity.Property(e => e.DiasAsignacionCyber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_asignacion_cyber");
            entity.Property(e => e.DiasEnAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_en_agencia");
            entity.Property(e => e.DiasFaltantes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_faltantes");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MORA");
            entity.Property(e => e.DiasMorosos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_morosos");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.EstatusCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estatus_cliente");
            entity.Property(e => e.Ext1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ext_1");
            entity.Property(e => e.Ext2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ext_2");
            entity.Property(e => e.FecRefAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_ref_agencia");
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
            entity.Property(e => e.FechaCambioSegmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_cambio_segmento");
            entity.Property(e => e.FechaCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_castigo");
            entity.Property(e => e.FechaDesasignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_DESASIGNACION");
            entity.Property(e => e.FechaDesasignacionCyber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_desasignacion_cyber");
            entity.Property(e => e.FechaProximoVencimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_proximo_vencimiento");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ULTIMO_PAGO");
            entity.Property(e => e.Fecstaca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECSTACA");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
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
            entity.Property(e => e.Lada1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lada_1");
            entity.Property(e => e.Lada2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lada_2");
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_AGENCIA");
            entity.Property(e => e.MontoUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMO_PAGO");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("OBSERVACIONES");
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pagos_vencidos");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PRODUCTO");
            entity.Property(e => e.ProductoOrigen)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ProgramaEspecial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("programa_especial");
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
                .HasColumnName("saldo_vencido");
            entity.Property(e => e.SaldoVencido120Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_120_dias");
            entity.Property(e => e.SaldoVencido30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_30_dias");
            entity.Property(e => e.SaldoVencido60Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_60_dias");
            entity.Property(e => e.SaldoVencido90Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_90_dias");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento_actual");
            entity.Property(e => e.SegmentoPosterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento_posterior");
            entity.Property(e => e.Segmentos)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Stacteca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STACTECA");
            entity.Property(e => e.StatusCli)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS_CLI");
            entity.Property(e => e.Tel1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel_1");
            entity.Property(e => e.Tel2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel_2");
            entity.Property(e => e.TipoFacturacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TIPO_FACTURACION");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_deudor");
            entity.Property(e => e.Trascodificada)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TRASCODIFICADA");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto128>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_128", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_128")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_128_Válido").IsDescending();

            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_actual");
            entity.Property(e => e.BaseDeDatos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("base de datos");
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("calle_no_cliente");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_postal");
            entity.Property(e => e.ColoniaCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("colonia_cliente");
            entity.Property(e => e.ComentariosObservaciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comentarios /observaciones");
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.CorteColor)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Direccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.Documentacion).IsUnicode(false);
            entity.Property(e => e.Documentos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("documentos");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.Estatus)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estatus");
            entity.Property(e => e.FecPp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_pp");
            entity.Property(e => e.FechaContratacionPoliza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_contratacion poliza");
            entity.Property(e => e.FechaOcurrencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_ocurrencia");
            entity.Property(e => e.FechaReporte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_reporte");
            entity.Property(e => e.Final)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("final");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Manomatico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("manomatico");
            entity.Property(e => e.Medio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("medio");
            entity.Property(e => e.NpvActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("npv_actual");
            entity.Property(e => e.Operación)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("operación");
            entity.Property(e => e.Poliza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("poliza");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.PromesaPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("promesa_pago");
            entity.Property(e => e.Rfc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("rfc");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Telefono1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono1");
            entity.Property(e => e.Telefono2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono2");
            entity.Property(e => e.Telefono3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono3");
            entity.Property(e => e.Telefono4)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono4");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_deudor");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto13>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_13", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_13")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_13_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto130>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_130", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_130")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_130_Válido").IsDescending();

            entity.Property(e => e.CorteColor)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Documentos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DOCUMENTOS");
            entity.Property(e => e.Estatus)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estatus");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.MensualidadesNoPagadas)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("# mensualidades no pagadas");
            entity.Property(e => e.PrimaMensualFacturada)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prima mensual facturada");
            entity.Property(e => e.PvAct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pv_act");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido");
            entity.Property(e => e.SumaAsegurada)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("suma asegurada");
            entity.Property(e => e.Telefono1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono1");
            entity.Property(e => e.Telefono2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono2");
            entity.Property(e => e.Telefono3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono3");
            entity.Property(e => e.Telefono4)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono4");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_deudor");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto131>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_131", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_131")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_131_Válido").IsDescending();

            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_actual");
            entity.Property(e => e.BaseDeDatos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("base de datos");
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("calle_no_cliente");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_postal");
            entity.Property(e => e.ColoniaCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("colonia_cliente");
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.CorteColor)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Direccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.Documentos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("documentos");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.Estatus)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estatus");
            entity.Property(e => e.FecPp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_pp");
            entity.Property(e => e.FechaContratacionPoliza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_contratacion poliza");
            entity.Property(e => e.FechaOcurrencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_ocurrencia");
            entity.Property(e => e.FechaReporte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_reporte");
            entity.Property(e => e.Final)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("final");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Manomatico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("manomatico");
            entity.Property(e => e.Medio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("medio");
            entity.Property(e => e.Municipio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("municipio");
            entity.Property(e => e.NpvActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("npv_actual");
            entity.Property(e => e.Operación)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("operación");
            entity.Property(e => e.Poliza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("poliza");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.PromesaPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("promesa_pago");
            entity.Property(e => e.Rfc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("rfc");
            entity.Property(e => e.Telefono1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono1");
            entity.Property(e => e.Telefono2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono2");
            entity.Property(e => e.Telefono3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono3");
            entity.Property(e => e.Telefono4)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono4");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_deudor");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto133>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_133", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_133")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_133_Válido").IsDescending();

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.Bhscor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bhscor");
            entity.Property(e => e.Bonificacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bonificacion");
            entity.Property(e => e.CP)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c_p");
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CALLE_NO_CLIENTE");
            entity.Property(e => e.CiudadCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CIUDAD_CLIENTE");
            entity.Property(e => e.Clasif)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("clasif");
            entity.Property(e => e.CodAccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_accion");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_POSTAL");
            entity.Property(e => e.CodResultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_resultado");
            entity.Property(e => e.CodigoBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("codigo_bloqueo");
            entity.Property(e => e.ColoniaCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COLONIA_CLIENTE");
            entity.Property(e => e.CorteColor)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CuentaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CUENTA_CHEQUES");
            entity.Property(e => e.DescProducto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DESC_PRODUCTO");
            entity.Property(e => e.DiaCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dia_corte");
            entity.Property(e => e.DiasAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_AGENCIA");
            entity.Property(e => e.DiasAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_asignacion");
            entity.Property(e => e.DiasMorosos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_morosos");
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
            entity.Property(e => e.FecUltGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_ult_gestion");
            entity.Property(e => e.FechaAltaRefin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_alta_refin");
            entity.Property(e => e.FechaAperturaCta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_apertura_cta");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_asignacion");
            entity.Property(e => e.FechaCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_castigo");
            entity.Property(e => e.FechaCodBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_cod_bloqueo");
            entity.Property(e => e.FechaDesasignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_desasignacion");
            entity.Property(e => e.FechaProxVencimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_prox_vencimiento");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_ultimo_pago");
            entity.Property(e => e.GrupoEconomico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("grupo_economico");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Lada1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lada1");
            entity.Property(e => e.Mensualidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mensualidad");
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_agencia");
            entity.Property(e => e.MontoMoroso)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_moroso");
            entity.Property(e => e.MontoUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_ultimo_pago");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("observaciones");
            entity.Property(e => e.OrigenRefin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("origen_refin");
            entity.Property(e => e.PagoMinimo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pago_minimo");
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pagos_vencidos");
            entity.Property(e => e.PlazoPactado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("plazo_pactado");
            entity.Property(e => e.ProductoOrigen)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Pv1mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pv_1mes_atras");
            entity.Property(e => e.Pv2mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pv_2mes_atras");
            entity.Property(e => e.Pv3mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pv_3mes_atras");
            entity.Property(e => e.Pv4mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pv_4mes_atras");
            entity.Property(e => e.Pv5mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pv_5mes_atras");
            entity.Property(e => e.Pv6mesAtras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pv_6mes_atras");
            entity.Property(e => e.SaldoVencido120Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_120_dias");
            entity.Property(e => e.SaldoVencido30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_30_dias");
            entity.Property(e => e.SaldoVencido60Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_60_dias");
            entity.Property(e => e.SaldoVencido90Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido_90_dias");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_ACTUAL");
            entity.Property(e => e.StatusCli)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("status_cli");
            entity.Property(e => e.StatusCumplimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("status_cumplimiento");
            entity.Property(e => e.Tasa)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tasa");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_deudor");
            entity.Property(e => e.UltimoSaldoMesAnterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ultimo_saldo_mes_anterior");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto14>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_14", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_14")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_14_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto15>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_15", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_15")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_15_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto16>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_16", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_16")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_16_Válido").IsDescending();

            entity.Property(e => e.Cxc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cxc");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Product)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("product");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto168>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_168", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_168")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_168_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto17>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_17", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_17")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_17_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Ordnerdat)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ordnerdat");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto18>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_18", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_18")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_18_Válido").IsDescending();

            entity.Property(e => e.Carpeta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("carpeta");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Riesgo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("riesgo");
            entity.Property(e => e.Saldo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto19>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_19", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_19")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_19_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto2>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_2", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_2")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_2_Válido").IsDescending();

            entity.Property(e => e.Bucket1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket1");
            entity.Property(e => e.Bucket2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket2");
            entity.Property(e => e.Bucket3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket3");
            entity.Property(e => e.Bucket4)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket4");
            entity.Property(e => e.Bucket5)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket5");
            entity.Property(e => e.Bucket6)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket6");
            entity.Property(e => e.Bucket7)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket7");
            entity.Property(e => e.CartAct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cart_act");
            entity.Property(e => e.CartIni)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cart_ini");
            entity.Property(e => e.CartIniCuadre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CART_INI_CUADRE");
            entity.Property(e => e.Comentario)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comentario");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Encargado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("encargado");
            entity.Property(e => e.Estatus)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estatus");
            entity.Property(e => e.Estrategia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estrategia");
            entity.Property(e => e.FUltPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("f_ult_pago");
            entity.Property(e => e.FecAsig)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_asig");
            entity.Property(e => e.FecAsigCuadre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ASIG_CUADRE");
            entity.Property(e => e.FechStatu)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECH_STATU");
            entity.Property(e => e.FechaLimAplicacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha lim# aplicacion");
            entity.Property(e => e.Fecstat)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecstat");
            entity.Property(e => e.Gest)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("gest");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.InCartera)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("in_cartera");
            entity.Property(e => e.InCarteraIni)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("IN_CARTERA_INI");
            entity.Property(e => e.MarcaAvan)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("marca_avan");
            entity.Property(e => e.MarcaCac)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("marca_cac");
            entity.Property(e => e.MarcaCs)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("marca_cs");
            entity.Property(e => e.MoraAplc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora_aplc");
            entity.Property(e => e.MoraAplcAct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MORA_APLC_ACT");
            entity.Property(e => e.MoraAplcCuadre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MORA_APLC_CUADRE");
            entity.Property(e => e.MoraContAct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MORA_CONT_ACT");
            entity.Property(e => e.MraAplcA)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mra_aplc_a");
            entity.Property(e => e.MraAplcI)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mra_aplc_i");
            entity.Property(e => e.MracontA)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mracont_a");
            entity.Property(e => e.MtoUlPag)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mto_ul_pag");
            entity.Property(e => e.MtoUlPg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MTO_UL_PG");
            entity.Property(e => e.PagFijo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pag_fijo");
            entity.Property(e => e.PagMin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pag_min");
            entity.Property(e => e.Pagllavvin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pagllavvin");
            entity.Property(e => e.PagoInicial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pago inicial");
            entity.Property(e => e.PagoLlave)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pago_llave");
            entity.Property(e => e.PerdPact)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("perd_pact");
            entity.Property(e => e.PerdonPactado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PERDON PACTADO");
            entity.Property(e => e.Porquita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("porquita");
            entity.Property(e => e.PorquitaCalculado)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Portaf)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("portaf");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prioridad");
            entity.Property(e => e.Resultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("resultado");
            entity.Property(e => e.SdcontA)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SDCONT_A");
            entity.Property(e => e.SdoAplcA)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sdo_aplc_a");
            entity.Property(e => e.SdoAplcI)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sdo_aplc_i");
            entity.Property(e => e.SdoContIni)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SDO_CONT_INI");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.Status1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("status1");
            entity.Property(e => e.Statusvinculacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("statusvinculacion");
            entity.Property(e => e.Vencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("vencido");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto20>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_20", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_20")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_20_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto21>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_21", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_21")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_21_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.PagoVencidoAntigüedad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pago_vencido/antigüedad");
            entity.Property(e => e.Pva)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pva");
            entity.Property(e => e.SaldoTotal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_total");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido");
            entity.Property(e => e.Sva)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sva");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto22>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_22", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_22")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_22_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto23>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_23", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_23")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_23_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Proyecto)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Saldo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo");
            entity.Property(e => e.SaldoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo actual");
            entity.Property(e => e.Unidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("unidad");
            entity.Property(e => e.Vin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("vin");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto25>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_25", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_25")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_25_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto26>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_26", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_26")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_26_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto28>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_28", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_28")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_28_Válido").IsDescending();

            entity.Property(e => e.CartAct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cart_act");
            entity.Property(e => e.Encargado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("encargado");
            entity.Property(e => e.Estrategia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estrategia");
            entity.Property(e => e.FUltPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("F_ULT_PAGO");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.MAplcAct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("m_aplc_act");
            entity.Property(e => e.MtoUlPg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MTO_UL_PG");
            entity.Property(e => e.Prestamo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prestamo");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prioridad");
            entity.Property(e => e.SdoAplcA)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sdo_aplc_a");
            entity.Property(e => e.SdoCorpA)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sdo_corp_a");
            entity.Property(e => e.SdoVen)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sdo_ven");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto29>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_29", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_29")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_29_Válido").IsDescending();

            entity.Property(e => e.BlkCode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("blk_code");
            entity.Property(e => e.Cy)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cy");
            entity.Property(e => e.FecAsigna)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec asigna");
            entity.Property(e => e.FecProxCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_prox_corte");
            entity.Property(e => e.FecUltPg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_ult_pg");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.ImpPagAnt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("imp pag ant ");
            entity.Property(e => e.MesCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mes castigo");
            entity.Property(e => e.PagMin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pag_min");
            entity.Property(e => e.PagoMinimoTdc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pago minimo tdc");
            entity.Property(e => e.Pv)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pv ");
            entity.Property(e => e.SaldoAlCorteTdc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al corte tdc");
            entity.Property(e => e.SaldoAlDía)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al día");
            entity.Property(e => e.SaldoAlDíaOContableKrnTdc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo al día o Contable Krn_TDC");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo Vencido");
            entity.Property(e => e.SaldoVencidoTdc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo vencido tdc");
            entity.Property(e => e.Saldoinicial)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.TotalAdeudo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_adeudo");
            entity.Property(e => e.TotalVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_vencido");
            entity.Property(e => e.TotalVigente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_vigente");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("type");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto3>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_3", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_3")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_3_Válido").IsDescending();

            entity.Property(e => e.Agnref)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGNREF");
            entity.Property(e => e.AsigXCc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("asig_x_cc_");
            entity.Property(e => e.Bucket1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket1");
            entity.Property(e => e.Bucket2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket2");
            entity.Property(e => e.Bucket3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket3");
            entity.Property(e => e.Bucket4)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket4");
            entity.Property(e => e.Bucket5)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket5");
            entity.Property(e => e.Bucket6)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket6");
            entity.Property(e => e.Bucket7)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket7");
            entity.Property(e => e.CartAct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cart_act");
            entity.Property(e => e.CartIni)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cart_ini");
            entity.Property(e => e.CartIniCuadre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CART_INI_CUADRE");
            entity.Property(e => e.Cuartil)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cuartil");
            entity.Property(e => e.Encargado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("encargado");
            entity.Property(e => e.Estrategia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estrategia");
            entity.Property(e => e.FUlCod).HasColumnName("f_ul_cod");
            entity.Property(e => e.FUlPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("f_ul_pago");
            entity.Property(e => e.FecAsigCuadre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ASIG_CUADRE");
            entity.Property(e => e.FechaCs)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_cs");
            entity.Property(e => e.FechaTerm)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_term");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.InCartera)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("in_cartera");
            entity.Property(e => e.MarcaAvan)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("marca_avan");
            entity.Property(e => e.MoraAplc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora_aplc");
            entity.Property(e => e.MoraAplcCuadre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MORA_APLC_CUADRE");
            entity.Property(e => e.MoraC)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora_c");
            entity.Property(e => e.MoraForz)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora_forz");
            entity.Property(e => e.Mracont)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MRACONT");
            entity.Property(e => e.MtoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mto_pago");
            entity.Property(e => e.PagFijo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pag_fijo");
            entity.Property(e => e.PagMin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pag_min");
            entity.Property(e => e.PagoLlave)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pago_llave");
            entity.Property(e => e.Peraplc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("peraplc");
            entity.Property(e => e.PgoKeyvin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PGO_KEYVIN");
            entity.Property(e => e.Porquita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("porquita");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prioridad");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.RecVdo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("REC_VDO");
            entity.Property(e => e.Resultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("resultado");
            entity.Property(e => e.SdoAplc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sdo_aplc");
            entity.Property(e => e.SdoAplcI)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sdo_aplc_i");
            entity.Property(e => e.SdoVen)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sdo_ven");
            entity.Property(e => e.SubProduc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sub_produc");
            entity.Property(e => e.Tel5)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel5");
            entity.Property(e => e.Tipo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tipo");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto30>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_30", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_30")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_30_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto31>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_31", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_31")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_31_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto35>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_35", "Y");

            entity.Property(e => e.Fechaasigcliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fechaasigcliente");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Saldoactualpesos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldoactualpesos");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto37>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_37", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_37")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_37_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto38>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_38", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_38")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_38_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto39>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_39", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_39")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_39_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto4>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_4", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_4")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_4_Válido").IsDescending();

            entity.Property(e => e.CartAct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cart_act");
            entity.Property(e => e.CartIni)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cart_ini");
            entity.Property(e => e.CartIniCuadre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cart_ini_cuadre");
            entity.Property(e => e.Encargado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("encargado");
            entity.Property(e => e.Estrategia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estrategia");
            entity.Property(e => e.FecAsigCuadre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_asig_cuadre");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.InCartera)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("in_cartera");
            entity.Property(e => e.MAplcAct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("M_APLC_ACT");
            entity.Property(e => e.MarcaAvan)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("marca_avan");
            entity.Property(e => e.MarcaCac)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("marca_cac");
            entity.Property(e => e.MoraAplcAct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora_aplc_act");
            entity.Property(e => e.MoraAplcCuadre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora_aplc_cuadre");
            entity.Property(e => e.Nafin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nafin");
            entity.Property(e => e.Porquita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("porquita");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prioridad");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.Resultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("resultado");
            entity.Property(e => e.SdoAplcA)
                .HasColumnType("money")
                .HasColumnName("sdo_aplc_a");
            entity.Property(e => e.SdoAplcI)
                .HasColumnType("money")
                .HasColumnName("sdo_aplc_i");
            entity.Property(e => e.SubProduc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sub_produc");
            entity.Property(e => e.SumRecAc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sum_rec_ac");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto40>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_40", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_40")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_40_Válido").IsDescending();

            entity.Property(e => e.BlkCode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("blk_code");
            entity.Property(e => e.Cy)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cy");
            entity.Property(e => e.FecAsigna)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec asigna");
            entity.Property(e => e.FecProxCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_prox_corte");
            entity.Property(e => e.FecUltPg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_ult_pg");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.ImpPagAnt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("imp pag ant");
            entity.Property(e => e.PagMin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pag_min");
            entity.Property(e => e.PagoMinimoTdc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pago minimo tdc");
            entity.Property(e => e.Pv)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pv");
            entity.Property(e => e.SaldoAlCorteTdc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al corte tdc");
            entity.Property(e => e.SaldoAlDía)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al día");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo Vencido");
            entity.Property(e => e.SaldoVencidoTdc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo vencido tdc");
            entity.Property(e => e.Saldoinicial)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.TotalAdeudo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_adeudo");
            entity.Property(e => e.TotalVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_vencido");
            entity.Property(e => e.TotalVigente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_vigente");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("type");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto41>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_41", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_41")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_41_Válido").IsDescending();

            entity.Property(e => e.FecProxCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_prox_corte");
            entity.Property(e => e.FecProxVto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_prox_vto");
            entity.Property(e => e.FecUltPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_ult_pago");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.ImpUltPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("imp_ult_pago");
            entity.Property(e => e.InteresOrdinarioKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("interes ordinario krn");
            entity.Property(e => e.Modalidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("modalidad");
            entity.Property(e => e.MontoPrincipalKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto principal krn");
            entity.Property(e => e.MoratoriosKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("moratorios krn");
            entity.Property(e => e.NumPagosKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("num_pagos_krn");
            entity.Property(e => e.OtrosExigiblesKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("otros exigibles krn");
            entity.Property(e => e.SaldoAlDía)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al día");
            entity.Property(e => e.SaldoContableMonedaOrigen)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo contable moneda origen");
            entity.Property(e => e.SaldoVencidoKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo vencido krn");
            entity.Property(e => e.SaldoVigenteKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo vigente krn");
            entity.Property(e => e.Saldoinicial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldoinicial");
            entity.Property(e => e.StaUsgaap)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sta_usgaap");
            entity.Property(e => e.TotalAdeudoKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total adeudo krn");
            entity.Property(e => e.TvdoValor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tvdo_valor");
            entity.Property(e => e.TvigValor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tvig_valor");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto42>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_42", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_42")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_42_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto43>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_43", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_43")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_43_Válido").IsDescending();

            entity.Property(e => e.AtrasoReal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("atraso_real");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_mora");
            entity.Property(e => e.Encargado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("encargado");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Importe)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("importe");
            entity.Property(e => e.InteresMoratorio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("interes_moratorio");
            entity.Property(e => e.InteresNormal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("interes_normal");
            entity.Property(e => e.IvaInteresMoratorio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("iva interes_moratorio");
            entity.Property(e => e.IvaInteresNormal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("iva interes_normal");
            entity.Property(e => e.Saldo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo");
            entity.Property(e => e.TotalAApagarParaRegularizar)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_a_apagar_para_regularizar");
            entity.Property(e => e.TotalParaLiquidar)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_para_liquidar");
            entity.Property(e => e.TotalParaLiquidarConHaberes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_para_liquidar_con_haberes");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto44>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_44", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_44")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_44_Válido").IsDescending();

            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_mora");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Importe)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("importe");
            entity.Property(e => e.InteresNormal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("interes_normal");
            entity.Property(e => e.Iva)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("iva");
            entity.Property(e => e.Pago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pago");
            entity.Property(e => e.PagoTotal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pago_total");
            entity.Property(e => e.RangoCartera)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("rango_cartera");
            entity.Property(e => e.RangoSemanal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("rango_semanal");
            entity.Property(e => e.Saldo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo");
            entity.Property(e => e.SaldoInsoluto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_insoluto");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto49>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_49", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_49")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_49_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto5>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_5", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_5")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_5_Válido").IsDescending();

            entity.Property(e => e.Bucket1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket1");
            entity.Property(e => e.Bucket2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket2");
            entity.Property(e => e.Bucket3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bucket3");
            entity.Property(e => e.CalleNum)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("calle_num");
            entity.Property(e => e.CartAct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cart_act");
            entity.Property(e => e.Ciclo)
                .HasColumnType("money")
                .HasColumnName("ciclo");
            entity.Property(e => e.Colonia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("colonia");
            entity.Property(e => e.Cp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cp");
            entity.Property(e => e.Encargado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("encargado");
            entity.Property(e => e.Estrategia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estrategia");
            entity.Property(e => e.FUltPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("f_ult_pago");
            entity.Property(e => e.FecAsig)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_asig");
            entity.Property(e => e.FechAper)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fech_aper");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.InCartera)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("in_cartera");
            entity.Property(e => e.LimCred)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lim_cred");
            entity.Property(e => e.MarcaAvan)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("marca_avan");
            entity.Property(e => e.PagMin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pag_min");
            entity.Property(e => e.Porquita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("porquita");
            entity.Property(e => e.Resultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("resultado");
            entity.Property(e => e.SdoAplcA)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sdo_aplc_a");
            entity.Property(e => e.SdoAplcI)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sdo_aplc_i");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto50>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_50", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_50")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_50_Válido").IsDescending();

            entity.Property(e => e.BlkCode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("blk_code");
            entity.Property(e => e.Cy)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cy");
            entity.Property(e => e.FecAsigna)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC ASIGNA");
            entity.Property(e => e.FecProxCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_prox_corte");
            entity.Property(e => e.FecUltPg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULT_PG");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.ImpPagAnt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("IMP PAG ANT");
            entity.Property(e => e.InteresOrdinarioKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Interes Ordinario Krn");
            entity.Property(e => e.MesCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mes castigo");
            entity.Property(e => e.MontoPrincipalKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Monto Principal Krn");
            entity.Property(e => e.MoratoriosKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Moratorios Krn");
            entity.Property(e => e.OtrosExigiblesKrn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Otros Exigibles Krn");
            entity.Property(e => e.PagMin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAG_MIN");
            entity.Property(e => e.PagoMinimoTdc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Pago minimo TDC");
            entity.Property(e => e.Pv)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV");
            entity.Property(e => e.SaldoAlCorteTdc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo al Corte TDC");
            entity.Property(e => e.SaldoAlDía)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo al día");
            entity.Property(e => e.SaldoContableMonedaOrigen)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo Contable Moneda Origen");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo Vencido");
            entity.Property(e => e.SaldoVencidoTdc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo Vencido TDC");
            entity.Property(e => e.Saldoinicial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldoinicial");
            entity.Property(e => e.TotalAdeudo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Total_Adeudo");
            entity.Property(e => e.TotalVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Total_Vencido");
            entity.Property(e => e.TotalVigente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Total_Vigente");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto51>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_51", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_51")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_51_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.MinimoIni)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("minimo_ini");
            entity.Property(e => e.MoraaplcI)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("moraaplc_i");
            entity.Property(e => e.MoracontI)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("moracont_i");
            entity.Property(e => e.Plazo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("plazo");
            entity.Property(e => e.SdocontI)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sdocont_i");
            entity.Property(e => e.VencidIni)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("vencid_ini");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto52>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_52", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_52")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_52_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto53>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_53", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_53")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_53_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto54>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_54", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_54")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_54_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto55>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_55", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_55")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_55_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto6>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_6", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_6")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_6_Válido").IsDescending();

            entity.Property(e => e.Comisiones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones");
            entity.Property(e => e.Compras)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("compras");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_ultimo_pago");
            entity.Property(e => e.Gastosdeliquidacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("gastosdeliquidacion");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Idacuerdo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("idacuerdo");
            entity.Property(e => e.Impuestosiva)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestosiva");
            entity.Property(e => e.Interesdegastosdecobranza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("interesdegastosdecobranza");
            entity.Property(e => e.Interesesmoratoriossobretasa)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("interesesmoratoriossobretasa");
            entity.Property(e => e.Interesesmoratoriotardio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("interesesmoratoriotardio");
            entity.Property(e => e.Interesesordinarios)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("interesesordinarios");
            entity.Property(e => e.Ivadeliquidacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ivadeliquidacion");
            entity.Property(e => e.Ivainteresesordinario)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ivainteresesordinario");
            entity.Property(e => e.Ivainteresmonatorio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ivainteresmonatorio");
            entity.Property(e => e.MinimoPagar)
                .HasColumnType("money")
                .HasColumnName("minimo_pagar");
            entity.Property(e => e.SaldoActual)
                .HasColumnType("money")
                .HasColumnName("saldo_actual");
            entity.Property(e => e.SaldoVencido)
                .HasColumnType("money")
                .HasColumnName("saldo_vencido");
            entity.Property(e => e.Seguro)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("seguro");
            entity.Property(e => e.SituacionCuentaBanco)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("situacion_cuenta_banco");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto61>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_61", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_61")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_61_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto63>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_63", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_63")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_63_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto67>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_67", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_67")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_67_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto7>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_7", "Y");

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_actual");
            entity.Property(e => e.AgenciaAnterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_anterior");
            entity.Property(e => e.Año)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CalifScore)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Calif Score");
            entity.Property(e => e.Clasif)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLASIF");
            entity.Property(e => e.Cnet1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CNet1");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_postal");
            entity.Property(e => e.CodigoBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("codigo_bloqueo");
            entity.Property(e => e.DescProducto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("desc_producto");
            entity.Property(e => e.Descuento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DiasMorosos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MOROSOS");
            entity.Property(e => e.Especial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESPECIAL");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("fecha_asignacion");
            entity.Property(e => e.FechaCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CASTIGO");
            entity.Property(e => e.FechaDesasignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_DESASIGNACION");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ULTIMO_PAGO");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("idCuenta");
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("MONTO_AGENCIA");
            entity.Property(e => e.MontoMoroso)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_moroso");
            entity.Property(e => e.MontoUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMO_PAGO");
            entity.Property(e => e.PagoEspecial)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PagoMinimo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PAGO_MINIMO");
            entity.Property(e => e.PagoPgad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pagos_vencidos");
            entity.Property(e => e.Pgad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ProductoOrigen)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.QuitaIrregular)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Quita_Irregular");
            entity.Property(e => e.Quitam)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("QUITAM");
            entity.Property(e => e.RangoEdad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Rango Edad");
            entity.Property(e => e.RangoEdad1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RangoEdad");
            entity.Property(e => e.RangoFechaPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Rango fecha pago");
            entity.Property(e => e.RangoSaldos)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento_actual");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_deudor");
            entity.Property(e => e.TotalDeudorPosicion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TOTAL_DEUDOR_POSICION");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto72>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_72", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_72")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_72_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto8>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_8", "Y");

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_actual");
            entity.Property(e => e.AgenciaAnterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_anterior");
            entity.Property(e => e.Año)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CalifScore)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Calif Score");
            entity.Property(e => e.Clasif)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLASIF");
            entity.Property(e => e.Cnet1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CNet1");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_postal");
            entity.Property(e => e.Descuento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MORA");
            entity.Property(e => e.DiasMorosos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MOROSOS");
            entity.Property(e => e.Especial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESPECIAL");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.EstatusCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTATUS_CLIENTE");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_asignacion");
            entity.Property(e => e.FechaCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CASTIGO");
            entity.Property(e => e.FechaDesasignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_DESASIGNACION");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ULTIMO_PAGO");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("idCuenta");
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_AGENCIA");
            entity.Property(e => e.MontoUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMO_PAGO");
            entity.Property(e => e.PagoEspecial)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PagoPgad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pagos_vencidos");
            entity.Property(e => e.Pgad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Plan1855)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PLAN_18_55");
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ProductoOrigen)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Quitam)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("QUITAM");
            entity.Property(e => e.RangoEdad)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.RangoFechaPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Rango fecha pago");
            entity.Property(e => e.RangoSaldos)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo_vencido");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento_actual");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_deudor");
            entity.Property(e => e.TotalDeudorPosicion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TOTAL_DEUDOR_POSICION");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto81>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_81", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_81")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_81_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto82>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_82", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_82")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_82_Válido").IsDescending();

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.Capital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("capital");
            entity.Property(e => e.Comisiones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones");
            entity.Property(e => e.ComisionesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones_morosidad");
            entity.Property(e => e.Condonacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion");
            entity.Property(e => e.Corte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("corte");
            entity.Property(e => e.Descuento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DescuentoAplicar12Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 12 meses");
            entity.Property(e => e.DescuentoAplicar24Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 24 meses");
            entity.Property(e => e.DescuentoAplicar30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 30 dias");
            entity.Property(e => e.DescuentoAplicar3Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 3 meses");
            entity.Property(e => e.DescuentoAplicar6Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 6 meses");
            entity.Property(e => e.DescuentoAplicarMayorA24YMenorA48Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar mayor a 24 y menor a 48 meses");
            entity.Property(e => e.DescuentoCp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DescuentoCP");
            entity.Property(e => e.DescuentoLp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DescuentoLP");
            entity.Property(e => e.DescuentoPt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DescuentoPT");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias mora");
            entity.Property(e => e.FecVctoCuota1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec#vcto cuota1");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Impuestos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos");
            entity.Property(e => e.ImpuestosMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos_morosidad");
            entity.Property(e => e.InformacionAl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("informacion al");
            entity.Property(e => e.Intereses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses");
            entity.Property(e => e.InteresesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses_morosidad");
            entity.Property(e => e.Mora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora");
            entity.Property(e => e.NombreSucursal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre sucursal");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.ProductoCj)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto cj");
            entity.Property(e => e.Quita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("quita");
            entity.Property(e => e.Reestructura)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura");
            entity.Property(e => e.SaldoAlCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al corte");
            entity.Property(e => e.SaldoCapital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo capital");
            entity.Property(e => e.SaldoDeuda)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo deuda");
            entity.Property(e => e.SaldoMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo mora");
            entity.Property(e => e.SaldoaNegociar)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoaNegociarCp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarCP");
            entity.Property(e => e.SaldoaNegociarLp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarLP");
            entity.Property(e => e.SaldoaNegociarPt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarPT");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.TelParticular)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel particular");
            entity.Property(e => e.TelefonoAdicional)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono adicional");
            entity.Property(e => e.TelefonoCobranza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono cobranza");
            entity.Property(e => e.TelefonoComRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 1");
            entity.Property(e => e.TelefonoComRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 2");
            entity.Property(e => e.TelefonoComRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 3");
            entity.Property(e => e.TelefonoOficina)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono oficina");
            entity.Property(e => e.TelefonoPartRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 1");
            entity.Property(e => e.TelefonoPartRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 2");
            entity.Property(e => e.TelefonoPartRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 3");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto83>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_83", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_83")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_83_Válido").IsDescending();

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.Capital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("capital");
            entity.Property(e => e.Comisiones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones");
            entity.Property(e => e.ComisionesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones_morosidad");
            entity.Property(e => e.Condonacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion");
            entity.Property(e => e.CondonacionNeg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion_neg");
            entity.Property(e => e.Corte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("corte");
            entity.Property(e => e.Descuento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DescuentoAplicar12Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 12 meses");
            entity.Property(e => e.DescuentoAplicar24Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 24 meses");
            entity.Property(e => e.DescuentoAplicar30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 30 dias");
            entity.Property(e => e.DescuentoAplicar3Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 3 meses");
            entity.Property(e => e.DescuentoAplicar6Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 6 meses");
            entity.Property(e => e.DescuentoAplicarMayorA24YMenorA48Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar mayor a 24 y menor a 48 meses");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias mora");
            entity.Property(e => e.FecVctoCuota1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec#vcto cuota1");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Impuestos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos");
            entity.Property(e => e.ImpuestosMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos_morosidad");
            entity.Property(e => e.InformacionAl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("informacion al");
            entity.Property(e => e.Intereses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses");
            entity.Property(e => e.InteresesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses_morosidad");
            entity.Property(e => e.Mora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.ProductoCj)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto cj");
            entity.Property(e => e.Quita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("quita");
            entity.Property(e => e.Reestructura)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura");
            entity.Property(e => e.ReestructuraNeg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura_neg");
            entity.Property(e => e.SaldoAlCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al corte");
            entity.Property(e => e.SaldoCapital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo capital");
            entity.Property(e => e.SaldoDeuda)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo deuda");
            entity.Property(e => e.SaldoMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo mora");
            entity.Property(e => e.SaldoaNegociar)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.Sucursal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sucursal");
            entity.Property(e => e.TelParticular)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel particular");
            entity.Property(e => e.TelefonoAdicional)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono adicional");
            entity.Property(e => e.TelefonoCobranza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono cobranza");
            entity.Property(e => e.TelefonoComRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 1");
            entity.Property(e => e.TelefonoComRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 2");
            entity.Property(e => e.TelefonoComRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 3");
            entity.Property(e => e.TelefonoOficina)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono oficina");
            entity.Property(e => e.TelefonoPartRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 1");
            entity.Property(e => e.TelefonoPartRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 2");
            entity.Property(e => e.TelefonoPartRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 3");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto84>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_84", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_84")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_84_Válido").IsDescending();

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.Capital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("capital");
            entity.Property(e => e.Comisiones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones");
            entity.Property(e => e.ComisionesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones_morosidad");
            entity.Property(e => e.Condonacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion");
            entity.Property(e => e.CondonacionNeg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion_neg");
            entity.Property(e => e.Corte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("corte");
            entity.Property(e => e.DescuentoAplicar12Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 12 meses");
            entity.Property(e => e.DescuentoAplicar24Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 24 meses");
            entity.Property(e => e.DescuentoAplicar30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 30 dias");
            entity.Property(e => e.DescuentoAplicar3Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 3 meses");
            entity.Property(e => e.DescuentoAplicar6Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 6 meses");
            entity.Property(e => e.DescuentoAplicarMayorA24YMenorA48Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar mayor a 24 y menor a 48 meses");
            entity.Property(e => e.DescuentoCp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DescuentoCP");
            entity.Property(e => e.DescuentoLp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DescuentoLP");
            entity.Property(e => e.DescuentoPt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DescuentoPT");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias mora");
            entity.Property(e => e.FecVctoCuota1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec#vcto cuota1");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Impuestos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos");
            entity.Property(e => e.ImpuestosMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos_morosidad");
            entity.Property(e => e.InformacionAl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("informacion al");
            entity.Property(e => e.Intereses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses");
            entity.Property(e => e.InteresesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses_morosidad");
            entity.Property(e => e.Mora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.ProductoCj)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto cj");
            entity.Property(e => e.Quita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("quita");
            entity.Property(e => e.Reestructura)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura");
            entity.Property(e => e.ReestructuraNeg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura_neg");
            entity.Property(e => e.SaldoAlCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al corte");
            entity.Property(e => e.SaldoCapital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo capital");
            entity.Property(e => e.SaldoDeuda)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo deuda");
            entity.Property(e => e.SaldoMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo mora");
            entity.Property(e => e.SaldoaNegociar12M)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoaNegociar30Días)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoaNegociar3M)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoaNegociarCp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarCP");
            entity.Property(e => e.SaldoaNegociarLp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarLP");
            entity.Property(e => e.SaldoaNegociarPt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarPT");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.Sucursal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sucursal");
            entity.Property(e => e.TelParticular)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel particular");
            entity.Property(e => e.TelefonoAdicional)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono adicional");
            entity.Property(e => e.TelefonoCobranza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono cobranza");
            entity.Property(e => e.TelefonoComRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 1");
            entity.Property(e => e.TelefonoComRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 2");
            entity.Property(e => e.TelefonoComRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 3");
            entity.Property(e => e.TelefonoOficina)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono oficina");
            entity.Property(e => e.TelefonoPartRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 1");
            entity.Property(e => e.TelefonoPartRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 2");
            entity.Property(e => e.TelefonoPartRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 3");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto85>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_85", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_85")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_85_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto86>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_86", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_86")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_86_Válido").IsDescending();

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.Capital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("capital");
            entity.Property(e => e.Comisiones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones");
            entity.Property(e => e.ComisionesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones_morosidad");
            entity.Property(e => e.Condonacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion");
            entity.Property(e => e.Corte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("corte");
            entity.Property(e => e.Descuento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DescuentoAplicar12Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 12 meses");
            entity.Property(e => e.DescuentoAplicar24Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 24 meses");
            entity.Property(e => e.DescuentoAplicar30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 30 dias");
            entity.Property(e => e.DescuentoAplicar3Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 3 meses");
            entity.Property(e => e.DescuentoAplicar6Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 6 meses");
            entity.Property(e => e.DescuentoAplicarMayorA24YMenorA48Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar mayor a 24 y menor a 48 meses");
            entity.Property(e => e.DescuentoCp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DescuentoCP");
            entity.Property(e => e.DescuentoLp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DescuentoLP");
            entity.Property(e => e.DescuentoPt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DescuentoPT");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias mora");
            entity.Property(e => e.FecVctoCuota1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec#vcto cuota1");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Impuestos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos");
            entity.Property(e => e.ImpuestosMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos_morosidad");
            entity.Property(e => e.InformacionAl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("informacion al");
            entity.Property(e => e.Intereses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses");
            entity.Property(e => e.InteresesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses_morosidad");
            entity.Property(e => e.Mora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora");
            entity.Property(e => e.NombreSucursal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre sucursal");
            entity.Property(e => e.ProductoCj)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto cj");
            entity.Property(e => e.Quita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("quita");
            entity.Property(e => e.Reestructura)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura");
            entity.Property(e => e.SaldoAlCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al corte");
            entity.Property(e => e.SaldoCapital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo capital");
            entity.Property(e => e.SaldoDeuda)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo deuda");
            entity.Property(e => e.SaldoMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo mora");
            entity.Property(e => e.SaldoaNegociar)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoaNegociarCp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarCP");
            entity.Property(e => e.SaldoaNegociarLp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarLP");
            entity.Property(e => e.SaldoaNegociarPt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarPT");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.TelParticular)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel particular");
            entity.Property(e => e.TelefonoAdicional)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono adicional");
            entity.Property(e => e.TelefonoCobranza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono cobranza");
            entity.Property(e => e.TelefonoComRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 1");
            entity.Property(e => e.TelefonoComRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 2");
            entity.Property(e => e.TelefonoComRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 3");
            entity.Property(e => e.TelefonoOficina)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono oficina");
            entity.Property(e => e.TelefonoPartRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 1");
            entity.Property(e => e.TelefonoPartRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 2");
            entity.Property(e => e.TelefonoPartRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 3");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto87>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_87", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_87")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_87_Válido").IsDescending();

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.Capital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("capital");
            entity.Property(e => e.Comisiones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones");
            entity.Property(e => e.ComisionesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones_morosidad");
            entity.Property(e => e.Condonacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion");
            entity.Property(e => e.CondonacionNeg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion_neg");
            entity.Property(e => e.Corte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("corte");
            entity.Property(e => e.Descuento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DescuentoAplicar12Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 12 meses");
            entity.Property(e => e.DescuentoAplicar24Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 24 meses");
            entity.Property(e => e.DescuentoAplicar30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 30 dias");
            entity.Property(e => e.DescuentoAplicar3Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 3 meses");
            entity.Property(e => e.DescuentoAplicar6Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 6 meses");
            entity.Property(e => e.DescuentoAplicarMayorA24YMenorA48Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar mayor a 24 y menor a 48 meses");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias mora");
            entity.Property(e => e.FecVctoCuota1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec#vcto cuota1");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Impuestos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos");
            entity.Property(e => e.ImpuestosMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos_morosidad");
            entity.Property(e => e.InformacionAl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("informacion al");
            entity.Property(e => e.Intereses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses");
            entity.Property(e => e.InteresesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses_morosidad");
            entity.Property(e => e.Mora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.ProductoCj)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto cj");
            entity.Property(e => e.Quita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("quita");
            entity.Property(e => e.Reestructura)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura");
            entity.Property(e => e.ReestructuraNeg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura_neg");
            entity.Property(e => e.SaldoAlCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al corte");
            entity.Property(e => e.SaldoCapital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo capital");
            entity.Property(e => e.SaldoDeuda)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo deuda");
            entity.Property(e => e.SaldoMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo mora");
            entity.Property(e => e.SaldoaNegociar)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.Sucursal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sucursal");
            entity.Property(e => e.TelParticular)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel particular");
            entity.Property(e => e.TelefonoAdicional)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono adicional");
            entity.Property(e => e.TelefonoCobranza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono cobranza");
            entity.Property(e => e.TelefonoComRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 1");
            entity.Property(e => e.TelefonoComRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 2");
            entity.Property(e => e.TelefonoComRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 3");
            entity.Property(e => e.TelefonoOficina)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono oficina");
            entity.Property(e => e.TelefonoPartRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 1");
            entity.Property(e => e.TelefonoPartRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 2");
            entity.Property(e => e.TelefonoPartRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 3");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto88>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_88", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_88")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_88_Válido").IsDescending();

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.Capital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("capital");
            entity.Property(e => e.Comisiones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones");
            entity.Property(e => e.ComisionesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones_morosidad");
            entity.Property(e => e.Condonacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion");
            entity.Property(e => e.CondonacionNeg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion_neg");
            entity.Property(e => e.Corte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("corte");
            entity.Property(e => e.Descuento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DescuentoAplicar12Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 12 meses");
            entity.Property(e => e.DescuentoAplicar24Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 24 meses");
            entity.Property(e => e.DescuentoAplicar30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 30 dias");
            entity.Property(e => e.DescuentoAplicar3Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 3 meses");
            entity.Property(e => e.DescuentoAplicar6Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 6 meses");
            entity.Property(e => e.DescuentoAplicarMayorA24YMenorA48Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar mayor a 24 y menor a 48 meses");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias mora");
            entity.Property(e => e.Especial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("% especial");
            entity.Property(e => e.FecVctoCuota1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec#vcto cuota1");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Impuestos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos");
            entity.Property(e => e.ImpuestosMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos_morosidad");
            entity.Property(e => e.InformacionAl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("informacion al");
            entity.Property(e => e.Intereses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses");
            entity.Property(e => e.InteresesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses_morosidad");
            entity.Property(e => e.Mora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora");
            entity.Property(e => e.NombreSucursal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre sucursal");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.ProductoCj)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto cj");
            entity.Property(e => e.Quita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("quita");
            entity.Property(e => e.Reestructura)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura");
            entity.Property(e => e.ReestructuraNeg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura_neg");
            entity.Property(e => e.SaldoAlCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al corte");
            entity.Property(e => e.SaldoCapital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo capital");
            entity.Property(e => e.SaldoDeuda)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo deuda");
            entity.Property(e => e.SaldoMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo mora");
            entity.Property(e => e.SaldoaNegociar)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.TelParticular)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel particular");
            entity.Property(e => e.TelefonoAdicional)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono adicional");
            entity.Property(e => e.TelefonoCobranza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono cobranza");
            entity.Property(e => e.TelefonoComRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 1");
            entity.Property(e => e.TelefonoComRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 2");
            entity.Property(e => e.TelefonoComRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 3");
            entity.Property(e => e.TelefonoOficina)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono oficina");
            entity.Property(e => e.TelefonoPartRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 1");
            entity.Property(e => e.TelefonoPartRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 2");
            entity.Property(e => e.TelefonoPartRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 3");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto89>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_89", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_89")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_89_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto9>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_9", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_9")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_9_Válido").IsDescending();

            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.FacreaP)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("facrea_p");
            entity.Property(e => e.FecAsig)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_asig");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.ImComisionDañosPesosAcum)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("im_comision_daños_pesos_acum");
            entity.Property(e => e.ImFactorMinimoDcpPesos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("im_factor_minimo_dcp_pesos");
            entity.Property(e => e.ImFactorMinimoStmVsm)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("im_factor_minimo_stm_vsm");
            entity.Property(e => e.NumMRecp)
                .HasColumnType("money")
                .HasColumnName("num_m_recp");
            entity.Property(e => e.PagoRequerido)
                .HasColumnType("money")
                .HasColumnName("pago_requerido");
            entity.Property(e => e.RegAct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reg_act");
            entity.Property(e => e.SdoLiqP)
                .HasColumnType("money")
                .HasColumnName("sdo_liq_p");
            entity.Property(e => e.Soluciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("soluciones");
            entity.Property(e => e.TxFppPaga1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tx_fpp_paga1");
            entity.Property(e => e.TxSegmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tx_segmento");
            entity.Property(e => e.VectorPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("vector_pago");
            entity.Property(e => e.VectorPago1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("VectorPago");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto90>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_90", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_90")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_90_Válido").IsDescending();

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.Capital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("capital");
            entity.Property(e => e.Comisiones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones");
            entity.Property(e => e.ComisionesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones_morosidad");
            entity.Property(e => e.Condonacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion");
            entity.Property(e => e.CondonacionNeg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion_neg");
            entity.Property(e => e.Corte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("corte");
            entity.Property(e => e.Descuento)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DescuentoAplicar12Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 12 meses");
            entity.Property(e => e.DescuentoAplicar24Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 24 meses");
            entity.Property(e => e.DescuentoAplicar30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 30 dias");
            entity.Property(e => e.DescuentoAplicar3Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 3 meses");
            entity.Property(e => e.DescuentoAplicar6Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 6 meses");
            entity.Property(e => e.DescuentoAplicarMayorA24YMenorA48Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar mayor a 24 y menor a 48 meses");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias mora");
            entity.Property(e => e.FecVctoCuota1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec#vcto cuota1");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Impuestos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos");
            entity.Property(e => e.ImpuestosMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos_morosidad");
            entity.Property(e => e.InformacionAl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("informacion al");
            entity.Property(e => e.Intereses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses");
            entity.Property(e => e.InteresesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses_morosidad");
            entity.Property(e => e.Mora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora");
            entity.Property(e => e.NombreSucursal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre sucursal");
            entity.Property(e => e.ProductoCj)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto cj");
            entity.Property(e => e.Quita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("quita");
            entity.Property(e => e.Reestructura)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura");
            entity.Property(e => e.ReestructuraNeg)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura_neg");
            entity.Property(e => e.SaldoAlCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al corte");
            entity.Property(e => e.SaldoCapital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo capital");
            entity.Property(e => e.SaldoDeuda)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo deuda");
            entity.Property(e => e.SaldoMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo mora");
            entity.Property(e => e.SaldoaNegociar)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.TelParticular)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel particular");
            entity.Property(e => e.TelefonoAdicional)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono adicional");
            entity.Property(e => e.TelefonoCobranza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono cobranza");
            entity.Property(e => e.TelefonoComRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 1");
            entity.Property(e => e.TelefonoComRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 2");
            entity.Property(e => e.TelefonoComRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 3");
            entity.Property(e => e.TelefonoOficina)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono oficina");
            entity.Property(e => e.TelefonoPartRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 1");
            entity.Property(e => e.TelefonoPartRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 2");
            entity.Property(e => e.TelefonoPartRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 3");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ActlProducto96>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACTL_Producto_96", "Y");

            entity.HasIndex(e => new { e.IdCuenta, e.VálidoHasta }, "IX_ACTL_Producto_96")
                .IsUnique()
                .IsDescending(false, true)
                .IsClustered();

            entity.HasIndex(e => new { e.VálidoDesde, e.VálidoHasta }, "IX_ACTL_Producto_96_Válido").IsDescending();

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<AcumProducto1>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_1", "Y");

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
            entity.Property(e => e.AccountBalance)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Account Balance");
            entity.Property(e => e.AcctBalanceInMonth01)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Acdecline)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ACDecline");
            entity.Property(e => e.Aceligibility)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("ACEligibility");
            entity.Property(e => e.Acenrolled)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ACEnrolled");
            entity.Property(e => e.Acmanual)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Acoffer)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ACOffer");
            entity.Property(e => e.Age)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("age");
            entity.Property(e => e.AjusteChargeEligibility)
                .HasMaxLength(46)
                .IsUnicode(false);
            entity.Property(e => e.Amount)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Amount ");
            entity.Property(e => e.AnniversaryDate)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Asignacion)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.BalanceG)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Balance G*");
            entity.Property(e => e.BalanceG1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("BalanceG");
            entity.Property(e => e.BalanceG2)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Balance G");
            entity.Property(e => e.BatchDate)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.BatchdateMigracion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.BbalanceG)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Bbalance g*");
            entity.Property(e => e.BirthDate)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.BloqueoHerramienta)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.BloqueoSettlements)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Bloqueosettlement)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.C120)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.C150)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.C180)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CalifScore)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CALIF SCORE");
            entity.Property(e => e.Calle)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.CalleB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Calle b");
            entity.Property(e => e.CancellationDate)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Cbo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CBO");
            entity.Property(e => e.CmName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CM  Name");
            entity.Property(e => e.CmPhoneNumber)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CM Phone number");
            entity.Property(e => e.CmResponseDocumentation)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CM Response Documentation");
            entity.Property(e => e.Cobrabilidad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ColoniaB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Colonia b");
            entity.Property(e => e.ColoniaLocalidad)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.CommentsRemarks)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Comments/Remarks");
            entity.Property(e => e.CommisionRate)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ComplaintRaisedYN)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Complaint raised? (Y/N)");
            entity.Property(e => e.Conjurnet)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Correo1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("correo 1");
            entity.Property(e => e.CountOfResponsesReceived)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Count of Responses received");
            entity.Property(e => e.CreditBalance)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Cuenta2)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("cuenta 2");
            entity.Property(e => e.Cuenta3)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("cuenta 3");
            entity.Property(e => e.Cuenta4)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("cuenta 4");
            entity.Property(e => e.Cur)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CUR");
            entity.Property(e => e.Current)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.CurrentAgencyId)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.CurrentBalance)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CurrentBalance1)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CurrentBalanceAcorn)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.CurrentBalanceG)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.CurrentBalanceUpdate)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CustomerId)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("CustomerID");
            entity.Property(e => e.CycleCut)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("cycleCut");
            entity.Property(e => e.CódigoPostal)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.CódigoPostalB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Código Postal b");
            entity.Property(e => e.DateLastPaymentOa)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("DateLastPaymentOA");
            entity.Property(e => e.DateOfMessageSentDdmmyyOrNotAvailable)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Date of message sent (DDMMYY) or Not  Available");
            entity.Property(e => e.DateOfResponseFromCm)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Date of response from CM");
            entity.Property(e => e.DateWoCancelled)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("date WO/Cancelled");
            entity.Property(e => e.DateWoCancelled1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("date  WO/Cancelled");
            entity.Property(e => e.DateWoCancelled2)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("(date WO/Cancelled)");
            entity.Property(e => e.DelegaciónMunicipio)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.DelegaciónOMunicipioB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Delegación o Municipio b");
            entity.Property(e => e.DíasDeAtraso1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("días de atraso 1");
            entity.Property(e => e.DíasDeAtraso2)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("días de atraso 2");
            entity.Property(e => e.DíasDeAtraso3)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("días de atraso 3");
            entity.Property(e => e.DíasDeAtraso4)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("días de atraso 4");
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
            entity.Property(e => e.Ejeutivo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("EJEUTIVO");
            entity.Property(e => e.EmployersAddress)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EmployersName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EnrolladoSettlement)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.EstadoB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Estado b");
            entity.Property(e => e.F29)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaAcciona)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FechaAjusteCh)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("FechaAjusteCH");
            entity.Property(e => e.FechaCorteLc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FechaCorteLC");
            entity.Property(e => e.FechaMinimoAcorn)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.FechaMinimomasatrasado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FechaRecepción)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.FechaRms)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FechaRMS");
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
            entity.Property(e => e.Folio)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Gestiones)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("gestiones");
            entity.Property(e => e.HerramientaBuroPrueba)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("HerramientaBuro prueba");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.InitialBalance)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.Insert).HasColumnName("_Insert");
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
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.LastPaymentOa)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("LastPaymentOA");
            entity.Property(e => e.Legal)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("legal");
            entity.Property(e => e.LendingPayToCurrentScore)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("lendingPayToCurrentScore");
            entity.Property(e => e.LendingPayToCurrrentScore)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("lendingPayToCurrrentScore");
            entity.Property(e => e.Liquidated)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.LoanProductCode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Loan_ProductCode");
            entity.Property(e => e.ManualAc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Manual AC");
            entity.Property(e => e.Marcaciones)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MarketRecoveryScore)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("marketRecoveryScore");
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
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.MontoAjuste)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Multideudor)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Municipio)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MínimoMásAtrasado)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Mínimo más atrasado");
            entity.Property(e => e.N90)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Notas)
                .HasMaxLength(616)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroCliente)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Oasis)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.OasisAccept)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.OasisDecline)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.OasisEligibility)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.OasisOffer)
                .HasMaxLength(250)
                .IsUnicode(false);
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
            entity.Property(e => e.PaymentAmountInCycle)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PiiIncludedInResponseYN)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PII included in Response ? (Y/N)");
            entity.Property(e => e.Placementlevelcode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("placementlevelcode");
            entity.Property(e => e.Ppaccept)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PPAccept");
            entity.Property(e => e.Ppaeligibility)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Ppaoffer)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PPAOffer");
            entity.Property(e => e.ProbC)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Prob C");
            entity.Property(e => e.ProbR)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Prob R");
            entity.Property(e => e.Producto1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("producto 1");
            entity.Property(e => e.Producto2)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("producto 2");
            entity.Property(e => e.Producto3)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("producto 3");
            entity.Property(e => e.Producto4)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("producto 4");
            entity.Property(e => e.Prorroga)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Reactivación)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ReceiptDate)
                .HasMaxLength(255)
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
            entity.Property(e => e.ReinstEligibility)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.ReinstOffer)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Reinstatement)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Remanente)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Rfc)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.Rfc1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName(" rfc");
            entity.Property(e => e.S60)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Saldo1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("saldo 1");
            entity.Property(e => e.Saldo2)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("saldo 2");
            entity.Property(e => e.Saldo3)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("saldo 3");
            entity.Property(e => e.Saldo4)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("saldo 4");
            entity.Property(e => e.SaldoNegociado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Saldoback)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Segment)
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
            entity.Property(e => e.SmsAnalystName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("SMS Analyst Name");
            entity.Property(e => e.SocialSecurityNumber)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.StopMessageRequestedYN)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Stop message requested ? (Y/N)");
            entity.Property(e => e.T30)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.TestBuro)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.Testapr)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("TESTAPR");
            entity.Property(e => e.TodaySkip)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Today Skip");
            entity.Property(e => e.ToolsBuro)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.TotalPayments)
                .HasMaxLength(4)
                .IsUnicode(false);
            entity.Property(e => e.TypeOfMessageBasedOnCatalogue)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Type of message  (based on catalogue)");
            entity.Property(e => e.UltimoInteres)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Ultimo interes");
            entity.Property(e => e.Unb)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("UNB");
            entity.Property(e => e.UserDefinedNumeric1)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UserDefinedNumeric2)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Valfecha)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Validación)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Waiver)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.WaiverCorporate)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Wo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("WO?");
            entity.Property(e => e.Wo1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("WO ?");
            entity.Property(e => e.WriteOffDate)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("writeOffDate");
            entity.Property(e => e._)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("|");
            entity.Property(e => e._120)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("120");
            entity.Property(e => e._12000)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("120#00");
            entity.Property(e => e._150)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("150");
            entity.Property(e => e._15000)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("150#00");
            entity.Property(e => e._180)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("180");
            entity.Property(e => e._18000)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("180#00");
            entity.Property(e => e._30)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("30");
            entity.Property(e => e._3000)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("30#00");
            entity.Property(e => e._60)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("60");
            entity.Property(e => e._6000)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("60#00");
            entity.Property(e => e._90)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("90");
            entity.Property(e => e._9000)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("90#00");
        });

        modelBuilder.Entity<AcumProducto104>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_104", "Y");

            entity.Property(e => e.Add1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("add1");
            entity.Property(e => e.Add2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("add2");
            entity.Property(e => e.Add3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ADD3");
            entity.Property(e => e.AgeCharge)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Age Charge");
            entity.Property(e => e.AgeLending)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Age Lending");
            entity.Property(e => e.Amount)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.BalanceG)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Balance G*");
            entity.Property(e => e.CalleB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Calle B");
            entity.Property(e => e.CalleYColonia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Calle y Colonia");
            entity.Property(e => e.CalleyColonia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CbScore)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cb score");
            entity.Property(e => e.Cbo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CBO");
            entity.Property(e => e.Cbscore)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cbscore");
            entity.Property(e => e.CodigoPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Codigo Postal");
            entity.Property(e => e.CodigoPostal1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CodigoPostal");
            entity.Property(e => e.Colonia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ColoniaB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Colonia B");
            entity.Property(e => e.Comentarios)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Contacto)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Correo1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Correo 1");
            entity.Property(e => e.CpZipcode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CP/zipcode");
            entity.Property(e => e.CtaCompleta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Cta completa");
            entity.Property(e => e.Cuenta2)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Cuenta 2");
            entity.Property(e => e.Cuenta3)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Cuenta 3");
            entity.Property(e => e.Cuenta4)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Cuenta 4");
            entity.Property(e => e.Current)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.CódigoPostalB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Código Postal B");
            entity.Property(e => e.DateLastAction)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("date last action");
            entity.Property(e => e.DateWoCancelled)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("date WO/Cancelled");
            entity.Property(e => e.Datelastaction)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("datelastaction");
            entity.Property(e => e.DelegacionOMunicipio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Delegacion o Municipio");
            entity.Property(e => e.DelegacionoMunicipio)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DelegaciónOMunicipioB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Delegación o Municipio B");
            entity.Property(e => e.DiasDeAtrasoCh)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Dias de Atraso Ch");
            entity.Property(e => e.DiasDeAtrasoL)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Dias de Atraso L");
            entity.Property(e => e.DiasdeAtrasoCh)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DiasdeAtrasoL)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DomicilioVisitado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Domicilio visitado");
            entity.Property(e => e.DueCharge)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Due Charge");
            entity.Property(e => e.DueLending)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("due lending");
            entity.Property(e => e.Duelending)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("duelending");
            entity.Property(e => e.DíasDeAtraso1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Días de Atraso 1");
            entity.Property(e => e.DíasDeAtraso2)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Días de Atraso 2");
            entity.Property(e => e.DíasDeAtraso3)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Días de Atraso 3");
            entity.Property(e => e.DíasDeAtraso4)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Días de Atraso 4");
            entity.Property(e => e.EdadDeMora)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Edad de Mora");
            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("EJECUTIVO");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EstadoB)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Estado B");
            entity.Property(e => e.ExposureCharge)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("exposure charge");
            entity.Property(e => e.ExposureLending)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("exposure lending");
            entity.Property(e => e.FchAsignación)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fch_Asignación");
            entity.Property(e => e.FechaDeAsignación)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha de asignación");
            entity.Property(e => e.FechaDeLaVisita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fecha de la visita");
            entity.Property(e => e.FechaMinimomasatrasado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FhcDesasignación)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fhc_Desasignación");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Inv)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.LastAction)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Last Action");
            entity.Property(e => e.LastDatePayment)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Last Date Payment");
            entity.Property(e => e.LastPpDate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("last_$pp_date");
            entity.Property(e => e.LastPpDate1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("last_pp_date");
            entity.Property(e => e.LiftDate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lift date");
            entity.Property(e => e.Liftdate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("liftdate");
            entity.Property(e => e.MontoPtp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Monto PTP");
            entity.Property(e => e.Multicliente)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Multideudor)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Multiproducto)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MínimoMásAtrasado)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Mínimo más atrasado");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.NombreDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Nombre deudor");
            entity.Property(e => e.NombreDeudor1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NombreDeudor");
            entity.Property(e => e.NombreTitular)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Nombre Titular");
            entity.Property(e => e.Notas)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Notes)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Placement)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Portafolio)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Product)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Producto1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Producto 1");
            entity.Property(e => e.Producto2)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("producto 2");
            entity.Property(e => e.Producto3)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("producto 3");
            entity.Property(e => e.Producto4)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("producto 4");
            entity.Property(e => e.Ptp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PTP");
            entity.Property(e => e.Ptp1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PTP1");
            entity.Property(e => e.Saldo1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Saldo 1");
            entity.Property(e => e.Saldo2)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Saldo 2");
            entity.Property(e => e.Saldo3)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Saldo 3");
            entity.Property(e => e.Saldo4)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Saldo 4");
            entity.Property(e => e.SaldoActual)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.SaldoActualPesos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo Actual Pesos");
            entity.Property(e => e.SaldoActualPesos1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SaldoActualPesos");
            entity.Property(e => e.SaldoCh)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo Ch");
            entity.Property(e => e.SaldoL)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo L");
            entity.Property(e => e.SaldoL1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SaldoL");
            entity.Property(e => e.SaldoTotal)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Saldo Total");
            entity.Property(e => e.Saldoinicial)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ScoreBdc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Score_BDC");
            entity.Property(e => e.TerminoDeGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Termino de gestion");
            entity.Property(e => e.UltimoInteres)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Ultimo interes");
            entity.Property(e => e.Validacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Visitador)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Waiver)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.WlActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("WL actual");
            entity.Property(e => e.Wo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("WO?");
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

        modelBuilder.Entity<AcumProducto122>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_122", "Y");

            entity.Property(e => e.Buc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUC");
            entity.Property(e => e.CalifScore)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CALIF SCORE");
            entity.Property(e => e.CalleYN)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CALLE_Y_N");
            entity.Property(e => e.Ciudad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CIUDAD");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_POSTAL");
            entity.Property(e => e.Colinia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COLINIA");
            entity.Property(e => e.DelgacionMunicipio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DELGACION_MUNICIPIO");
            entity.Property(e => e.DescuentoSecorse)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Descuento_Secorse");
            entity.Property(e => e.Edad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Especial)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("especial");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTADO");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ASIGNACION");
            entity.Property(e => e.FechaMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_MORA");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ULTIMO_PAGO");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Moneda)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONEDA");
            entity.Property(e => e.MontoEnMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_EN_MORA");
            entity.Property(e => e.Mora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MORA");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NOMBRE");
            entity.Property(e => e.PagosVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAGOS_VENCIDO");
            entity.Property(e => e.Portafolio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PORTAFOLIO");
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.QuitaIrregular)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Quita_Irregular");
            entity.Property(e => e.ReferenciaDePagoBbva)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("REFERENCIA_DE_PAGO_BBVA");
            entity.Property(e => e.ReferenciaDePagoSantander)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("REFERENCIA_DE_PAGO_SANTANDER");
            entity.Property(e => e.Rfc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.SaldoTotal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_TOTAL");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Segmento_Actual");
            entity.Property(e => e.TipoDeProducto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TIPO_DE_PRODUCTO");
            entity.Property(e => e.TipoPersona)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TIPO_PERSONA");
            entity.Property(e => e.UltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ULTIMO_PAGO");
        });

        modelBuilder.Entity<AcumProducto125>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_125", "Y");

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.AgenciaPrevia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_PREVIA");
            entity.Property(e => e.BaseDatos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Base_Datos");
            entity.Property(e => e.BaseDeDatos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BASE DE DATOS");
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
            entity.Property(e => e.Comentarios)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ComentariosObservaciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COMENTARIOS /OBSERVACIONES");
            entity.Property(e => e.Consecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CONSECUTIVO");
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CuentaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CUENTA_CHEQUES");
            entity.Property(e => e.DescProducto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("desc_producto");
            entity.Property(e => e.DiaCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIA_CORTE");
            entity.Property(e => e.DiaRpc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DIA RPC");
            entity.Property(e => e.DiasAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_AGENCIA");
            entity.Property(e => e.DiasFaltantes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_FALTANTES");
            entity.Property(e => e.Digital)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DIGITAL");
            entity.Property(e => e.Dirección)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Documentacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Documentos)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTADO");
            entity.Property(e => e.Estatus)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTATUS");
            entity.Property(e => e.FecCodigoBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_CODIGO_BLOQUEO");
            entity.Property(e => e.FecEstatus)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ESTATUS");
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
            entity.Property(e => e.FechOcurrencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fech_Ocurrencia");
            entity.Property(e => e.FechPoliza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fech_Poliza");
            entity.Property(e => e.FechReport)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Fech_Report");
            entity.Property(e => e.FechaAperturaCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CUENTA");
            entity.Property(e => e.FechaCambioSegmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CAMBIO_SEGMENTO");
            entity.Property(e => e.FechaContratacionPoliza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CONTRATACION POLIZA");
            entity.Property(e => e.FechaLimitePago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_LIMITE_PAGO");
            entity.Property(e => e.FechaOcurrencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_OCURRENCIA");
            entity.Property(e => e.FechaPp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_PP");
            entity.Property(e => e.FechaReporte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_REPORTE");
            entity.Property(e => e.HoraContacto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("HORA_CONTACTO");
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
            entity.Property(e => e.Insert).HasColumnName("_Insert");
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
            entity.Property(e => e.Manomatico)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Medio)
                .HasMaxLength(255)
                .IsUnicode(false);
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
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NombreCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Nombre_Cliente");
            entity.Property(e => e.NpvActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NPV_ACTUAL");
            entity.Property(e => e.Operación)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PagoMinimo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAGO_MINIMO");
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAGOS_VENCIDOS");
            entity.Property(e => e.Pgad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PGAD");
            entity.Property(e => e.Poliza)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PrimaÚnica)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PRIMA ÚNICA");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PRODUCTO");
            entity.Property(e => e.PromesaPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PROMESA_PAGO");
            entity.Property(e => e.Rfc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.SaldoTotal)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoTotal1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SALDO_TOTAL");
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
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_ACTUAL");
            entity.Property(e => e.SegmentoPosterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_POSTERIOR");
            entity.Property(e => e.Stacteca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STACTECA");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .IsUnicode(false);
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
            entity.Property(e => e.Tel4)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_4");
            entity.Property(e => e.Telefono1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO1");
            entity.Property(e => e.Telefono2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO2");
            entity.Property(e => e.Telefono3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO3");
            entity.Property(e => e.Telefono4)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO4");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TOTAL_DEUDOR");
        });

        modelBuilder.Entity<AcumProducto126>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_126", "Y");

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.AgenciaActual1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL1");
            entity.Property(e => e.AgenciaPrevia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_PREVIA");
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
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CALLE_NO_CLIENTE");
            entity.Property(e => e.CiudadCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CIUDAD_CLIENTE");
            entity.Property(e => e.Clasif)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLASIF");
            entity.Property(e => e.CodAccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_ACCION");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_POSTAL");
            entity.Property(e => e.CodResultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_RESULTADO");
            entity.Property(e => e.CodigoBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CODIGO_BLOQUEO");
            entity.Property(e => e.ColoniaCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COLONIA_CLIENTE");
            entity.Property(e => e.ComisionPTardio)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Comision_P_Tardio");
            entity.Property(e => e.Consecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CONSECUTIVO");
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CORREO");
            entity.Property(e => e.CorteGestionable)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Corte_Gestionable");
            entity.Property(e => e.CtaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CTA_CHEQUES");
            entity.Property(e => e.CtaTrascodificada)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CTA_TRASCODIFICADA");
            entity.Property(e => e.CuentaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CUENTA_CHEQUES");
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
                .HasColumnName("DIA RPC");
            entity.Property(e => e.DiasAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_AGENCIA");
            entity.Property(e => e.DiasAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION");
            entity.Property(e => e.DiasAsignacionCyber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION_CYBER");
            entity.Property(e => e.DiasEnAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_EN_AGENCIA");
            entity.Property(e => e.DiasFaltantes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_FALTANTES");
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
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTADO");
            entity.Property(e => e.EstatusCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTATUS_CLIENTE");
            entity.Property(e => e.Ext1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EXT_1");
            entity.Property(e => e.Ext2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EXT_2");
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
            entity.Property(e => e.FecUltGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULT_GESTION");
            entity.Property(e => e.FecUltimaCompra)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULTIMA_COMPRA");
            entity.Property(e => e.FecUltimaDisposicion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULTIMA_DISPOSICION");
            entity.Property(e => e.FechaAltaRefin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ALTA_REFIN");
            entity.Property(e => e.FechaAperturaCta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CTA");
            entity.Property(e => e.FechaAperturaCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CUENTA");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ASIGNACION");
            entity.Property(e => e.FechaCambioSegmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CAMBIO_SEGMENTO");
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
            entity.Property(e => e.FechaDesasignacionCyber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_DESASIGNACION_CYBER");
            entity.Property(e => e.FechaLimitePago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_LIMITE_PAGO");
            entity.Property(e => e.FechaProxVencimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_PROX_VENCIMIENTO");
            entity.Property(e => e.FechaProximoVencimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_PROXIMO_VENCIMIENTO");
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
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.IrreConsumoQuita)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Lada1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_1");
            entity.Property(e => e.Lada11)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA1");
            entity.Property(e => e.Lada2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_2");
            entity.Property(e => e.Lada21)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA2");
            entity.Property(e => e.Lada3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA3");
            entity.Property(e => e.Lada31)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_3");
            entity.Property(e => e.LimiteCredito)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LIMITE_CREDITO");
            entity.Property(e => e.Mensualidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MENSUALIDAD");
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_AGENCIA");
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
                .HasColumnName("Prioridad_banco");
            entity.Property(e => e.Priorirad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("probabilidad");
            entity.Property(e => e.ProgramaEspecial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PROGRAMA_ESPECIAL");
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
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_ACTUAL");
            entity.Property(e => e.SegmentoPosterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_POSTERIOR");
            entity.Property(e => e.Stacteca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STACTECA");
            entity.Property(e => e.StatusCli)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS_CLI");
            entity.Property(e => e.StatusCumplimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS_CUMPLIMIENTO");
            entity.Property(e => e.Tasa)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TASA");
            entity.Property(e => e.Tel1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_1");
            entity.Property(e => e.Tel11)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL1");
            entity.Property(e => e.Tel2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_2");
            entity.Property(e => e.Tel21)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL2");
            entity.Property(e => e.Tel3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL3");
            entity.Property(e => e.Tel31)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_3");
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

        modelBuilder.Entity<AcumProducto127>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_127", "Y");

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
            entity.Property(e => e.Buc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUC");
            entity.Property(e => e.CP)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("C_P");
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CALLE_NO_CLIENTE");
            entity.Property(e => e.CapitalVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CAPITAL_VENCIDO");
            entity.Property(e => e.CiudadCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CIUDAD_CLIENTE");
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
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_POSTAL");
            entity.Property(e => e.CodResultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_RESULTADO");
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
            entity.Property(e => e.CtaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CTA_CHEQUES");
            entity.Property(e => e.CtaTrascodificada)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CTA_TRASCODIFICADA");
            entity.Property(e => e.CuentaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CUENTA_CHEQUES");
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
                .HasColumnName("DIA RPC");
            entity.Property(e => e.DiasAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_AGENCIA");
            entity.Property(e => e.DiasAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION");
            entity.Property(e => e.DiasAsignacionCyber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION_CYBER");
            entity.Property(e => e.DiasEnAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_EN_AGENCIA");
            entity.Property(e => e.DiasFaltantes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_FALTANTES");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MORA");
            entity.Property(e => e.DiasMorosos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MOROSOS");
            entity.Property(e => e.Digital)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DIGITAL");
            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ejecutivo");
            entity.Property(e => e.Especial)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ESPECIAL");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTADO");
            entity.Property(e => e.EstatusCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTATUS_CLIENTE");
            entity.Property(e => e.Ext1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EXT_1");
            entity.Property(e => e.Ext2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EXT_2");
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
            entity.Property(e => e.FecUltGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULT_GESTION");
            entity.Property(e => e.FecUltimaCompra)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULTIMA_COMPRA");
            entity.Property(e => e.FecUltimaDisposicion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULTIMA_DISPOSICION");
            entity.Property(e => e.FechaAperturaCta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CTA");
            entity.Property(e => e.FechaAperturaCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CUENTA");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ASIGNACION");
            entity.Property(e => e.FechaCambioSegmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CAMBIO_SEGMENTO");
            entity.Property(e => e.FechaCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CASTIGO");
            entity.Property(e => e.FechaDesasignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_DESASIGNACION");
            entity.Property(e => e.FechaDesasignacionCyber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_DESASIGNACION_CYBER");
            entity.Property(e => e.FechaLimitePago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_LIMITE_PAGO");
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
            entity.Property(e => e.FormaDeTrabajo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Forma de trabajo");
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
            entity.Property(e => e.Insert).HasColumnName("_Insert");
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
            entity.Property(e => e.MUltMenven)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("M_ULT_MENVEN");
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_AGENCIA");
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
            entity.Property(e => e.Quitam)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("quitam");
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
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_ACTUAL");
            entity.Property(e => e.SegmentoPosterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_POSTERIOR");
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

        modelBuilder.Entity<AcumProducto128>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_128", "Y");

            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.BaseDeDatos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BASE DE DATOS");
            entity.Property(e => e.Buc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUC");
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("calle_no_cliente");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_postal");
            entity.Property(e => e.ColoniaCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("colonia_cliente");
            entity.Property(e => e.ComentariosObservaciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COMENTARIOS /OBSERVACIONES");
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CORREO");
            entity.Property(e => e.Direccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIRECCION");
            entity.Property(e => e.Documentacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Documentos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DOCUMENTOS");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.Estatus)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTATUS");
            entity.Property(e => e.FecPp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_PP");
            entity.Property(e => e.FechaContratacionPoliza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CONTRATACION POLIZA");
            entity.Property(e => e.FechaOcurrencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_OCURRENCIA");
            entity.Property(e => e.FechaReporte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_REPORTE");
            entity.Property(e => e.Final)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FINAL");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Manomatico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MANOMATICO");
            entity.Property(e => e.Medio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MEDIO");
            entity.Property(e => e.Municipio)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NOMBRE");
            entity.Property(e => e.NpvActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NPV_ACTUAL");
            entity.Property(e => e.Operación)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("OPERACIÓN");
            entity.Property(e => e.Poliza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("POLIZA");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PRODUCTO");
            entity.Property(e => e.PromesaPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PROMESA_PAGO");
            entity.Property(e => e.Rfc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.Telefono1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO1");
            entity.Property(e => e.Telefono2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO2");
            entity.Property(e => e.Telefono3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO3");
            entity.Property(e => e.Telefono4)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO4");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TOTAL_DEUDOR");
        });

        modelBuilder.Entity<AcumProducto130>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_130", "Y");

            entity.Property(e => e.Buc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUC");
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("calle_no_cliente");
            entity.Property(e => e.Cliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLIENTE");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_postal");
            entity.Property(e => e.ColoniaCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("colonia_cliente");
            entity.Property(e => e.Direccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIRECCION");
            entity.Property(e => e.Documentos)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DOCUMENTOS");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.Estatus)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.MensualidadesNoPagadas)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("# Mensualidades no pagadas");
            entity.Property(e => e.PrimaMensualFacturada)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Prima Mensual Facturada");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PRIORIDAD");
            entity.Property(e => e.PvAct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PV_ACT");
            entity.Property(e => e.Rfc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Saldo_Vencido");
            entity.Property(e => e.SumaAsegurada)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Suma Asegurada");
            entity.Property(e => e.Telefono1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO1");
            entity.Property(e => e.Telefono10)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO10");
            entity.Property(e => e.Telefono11)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO11");
            entity.Property(e => e.Telefono12)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO12");
            entity.Property(e => e.Telefono13)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO13");
            entity.Property(e => e.Telefono14)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO14");
            entity.Property(e => e.Telefono15)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO15");
            entity.Property(e => e.Telefono16)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO16");
            entity.Property(e => e.Telefono2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO2");
            entity.Property(e => e.Telefono3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO3");
            entity.Property(e => e.Telefono4)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO4");
            entity.Property(e => e.Telefono5)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO5");
            entity.Property(e => e.Telefono6)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO6");
            entity.Property(e => e.Telefono7)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO7");
            entity.Property(e => e.Telefono8)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO8");
            entity.Property(e => e.Telefono9)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO9");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Total_Deudor");
        });

        modelBuilder.Entity<AcumProducto131>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_131", "Y");

            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.BaseDeDatos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BASE DE DATOS");
            entity.Property(e => e.Buc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BUC");
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("calle_no_cliente");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_postal");
            entity.Property(e => e.ColoniaCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("colonia_cliente");
            entity.Property(e => e.ComentariosObservaciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COMENTARIOS /OBSERVACIONES");
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CORREO");
            entity.Property(e => e.Direccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIRECCION");
            entity.Property(e => e.Documentacion)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("documentacion");
            entity.Property(e => e.Documentos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DOCUMENTOS");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.Estatus)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTATUS");
            entity.Property(e => e.FecPp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_PP");
            entity.Property(e => e.FechaContratacionPoliza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CONTRATACION POLIZA");
            entity.Property(e => e.FechaOcurrencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_OCURRENCIA");
            entity.Property(e => e.FechaReporte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_REPORTE");
            entity.Property(e => e.Final)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FINAL");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Manomatico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MANOMATICO");
            entity.Property(e => e.Medio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MEDIO");
            entity.Property(e => e.Municipio)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NOMBRE");
            entity.Property(e => e.NpvActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NPV_ACTUAL");
            entity.Property(e => e.Operación)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("OPERACIÓN");
            entity.Property(e => e.Poliza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("POLIZA");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PRIORIDAD");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PRODUCTO");
            entity.Property(e => e.PromesaPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PROMESA_PAGO");
            entity.Property(e => e.Rfc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.Telefono1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO1");
            entity.Property(e => e.Telefono10)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO10");
            entity.Property(e => e.Telefono11)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO11");
            entity.Property(e => e.Telefono12)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO12");
            entity.Property(e => e.Telefono13)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO13");
            entity.Property(e => e.Telefono14)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO14");
            entity.Property(e => e.Telefono15)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO15");
            entity.Property(e => e.Telefono16)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO16");
            entity.Property(e => e.Telefono17)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO17");
            entity.Property(e => e.Telefono2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO2");
            entity.Property(e => e.Telefono3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO3");
            entity.Property(e => e.Telefono4)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO4");
            entity.Property(e => e.Telefono5)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO5");
            entity.Property(e => e.Telefono6)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO6");
            entity.Property(e => e.Telefono7)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO7");
            entity.Property(e => e.Telefono8)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO8");
            entity.Property(e => e.Telefono9)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TELEFONO9");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TOTAL_DEUDOR");
        });

        modelBuilder.Entity<AcumProducto133>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_133", "Y");

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.AgenciaActual1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL1");
            entity.Property(e => e.AgenciaPrevia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_PREVIA");
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
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CALLE_NO_CLIENTE");
            entity.Property(e => e.CiudadCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CIUDAD_CLIENTE");
            entity.Property(e => e.Clasif)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLASIF");
            entity.Property(e => e.CodAccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_ACCION");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_POSTAL");
            entity.Property(e => e.CodResultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_RESULTADO");
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
            entity.Property(e => e.DiasAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION");
            entity.Property(e => e.DiasFaltantes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_FALTANTES");
            entity.Property(e => e.DiasMorosos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MOROSOS");
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
            entity.Property(e => e.F51)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F52)
                .HasMaxLength(255)
                .IsUnicode(false);
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
            entity.Property(e => e.FecUltGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULT_GESTION");
            entity.Property(e => e.FecUltimaCompra)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULTIMA_COMPRA");
            entity.Property(e => e.FecUltimaDisposicion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULTIMA_DISPOSICION");
            entity.Property(e => e.FechaAltaRefin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ALTA_REFIN");
            entity.Property(e => e.FechaAperturaCta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CTA");
            entity.Property(e => e.FechaAperturaCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CUENTA");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ASIGNACION");
            entity.Property(e => e.FechaCambioSegmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CAMBIO_SEGMENTO");
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
            entity.Property(e => e.FechaLimitePago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_LIMITE_PAGO");
            entity.Property(e => e.FechaProxVencimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_PROX_VENCIMIENTO");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ULTIMO_PAGO");
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
            entity.Property(e => e.Insert).HasColumnName("_Insert");
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
            entity.Property(e => e.Lada11)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_1");
            entity.Property(e => e.Lada2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA2");
            entity.Property(e => e.Lada21)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_2");
            entity.Property(e => e.Lada3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA3");
            entity.Property(e => e.Lada31)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_3");
            entity.Property(e => e.LimiteCredito)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LIMITE_CREDITO");
            entity.Property(e => e.Mensualidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MENSUALIDAD");
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_AGENCIA");
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
            entity.Property(e => e.Pgad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("pgad");
            entity.Property(e => e.PlazoPactado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PLAZO_PACTADO");
            entity.Property(e => e.PlazoR12)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PLAZO R12");
            entity.Property(e => e.PlazoR24)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PLAZO R24");
            entity.Property(e => e.PlazoR36)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PLAZO R36");
            entity.Property(e => e.PlazoR48)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PLAZO R48");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("prioridad");
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
            entity.Property(e => e.Stacteca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STACTECA");
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
            entity.Property(e => e.Tel11)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_1");
            entity.Property(e => e.Tel2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL2");
            entity.Property(e => e.Tel21)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_2");
            entity.Property(e => e.Tel3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL3");
            entity.Property(e => e.Tel31)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_3");
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

        modelBuilder.Entity<AcumProducto35>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_35", "Y");

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
            entity.Property(e => e.Acdecline)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ACDecline");
            entity.Property(e => e.Acoffer)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ACOffer");
            entity.Property(e => e.AcumuladoPagos)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.AcumuladoPagosDolares)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Amount)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.BalanceG)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Balance G*");
            entity.Property(e => e.Base)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Bloqueoherramienta)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("bloqueoherramienta");
            entity.Property(e => e.Cbo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CBO");
            entity.Property(e => e.Clave)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLAVE");
            entity.Property(e => e.ClaveCliente)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ClaveContacto)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ClaveDeSucursal)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ClaveDeZona)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ClaveUltimoGestDom)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ClaveUltimoGestTel)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CodigoPostalPart)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CodigoPostalTrab)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Colonia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("colonia");
            entity.Property(e => e.Current)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.DateWoCancelled)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("date WO/Cancelled");
            entity.Property(e => e.DirCalleNumero)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DirColonia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DirDelMun)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DirTrabajoCalleNumero)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DirTrabajoColonia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DirTrabajoEstado)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EdadDeMora)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Edad de Mora");
            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("EJECUTIVO");
            entity.Property(e => e.EnrolladoSettlement)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.Estdo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estdo");
            entity.Property(e => e.Estilo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Extension)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaActMov)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaActOper)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaActualizacion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaApertura)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaAsigArchivo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaAsigCliente)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaCancel)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaCastigo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaCorte)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaDeIngresoAcjc)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FechaDeIngresoACJC");
            entity.Property(e => e.FechaDevolucion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaMinimomasatrasado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FechaReasig)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaRevision)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaSegGestDom)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaSegGestTel)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaUltimaGestDom)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaUltimaGestTel)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.GrupoAnterior)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.GrupoDeTrabajo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.HoraSegGestTel)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.HoraSeguimGestDom)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdLogAsignación).HasColumnName("idLogAsignación");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.InteresesFacturados)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.InteresesNoFacturados)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Inv)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("INV");
            entity.Property(e => e.LastDatePayment)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Last Date Payment");
            entity.Property(e => e.Liquidated)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.LlamadasCcontacto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LlamadasCContacto");
            entity.Property(e => e.LlamadasScontacto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LlamadasSContacto");
            entity.Property(e => e.Llave1)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Llave2)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Llave3)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.MarcadoParaHistorico)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Multideudor)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MínimoMásAtrasado)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Mínimo más atrasado");
            entity.Property(e => e.NombreDeudor)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NombreEmpresa)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Nota)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NumPagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NumRegistrosDatosNuevos)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NumeroAvales)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NumeroDeEstado)
                .HasMaxLength(255)
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
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Puesto)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Referencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Remesa)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoAcobrar)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SaldoACobrar");
            entity.Property(e => e.SaldoAcobrarDolares)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SaldoACobrarDolares");
            entity.Property(e => e.SaldoActualDolares)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoActualPesos)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoInicial)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoInicialDolares)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoVencido)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SaldoVencidoDolares)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SettlementAccepted)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.SettlementFinished)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.StatusCuenta)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.StatusEquivCliente)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.StatusUltimaGestDom)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.StatusUltimaGestTel)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.TelParticular)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.TelTrabajo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.TipoDeCredito)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UltimoInteres)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Ultimo interes");
            entity.Property(e => e.Val)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Validacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.VisitasCcontacto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("VisitasCContacto");
            entity.Property(e => e.VisitasScontacto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("VisitasSContacto");
            entity.Property(e => e.Waiver)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Waivercorporate)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("waivercorporate");
            entity.Property(e => e.Wo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("WO?");
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

        modelBuilder.Entity<AcumProducto7>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_7", "Y");

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.AgenciaAnterior)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("agencia_anterior");
            entity.Property(e => e.AgenciaConvenio)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.AgenciaPrevia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_PREVIA");
            entity.Property(e => e.Alta)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ALTA");
            entity.Property(e => e.BaseDeDatosA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("BASE DE DATOS_A");
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
                .HasColumnName("Calif Score");
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CALLE_NO_CLIENTE");
            entity.Property(e => e.CiudadCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CIUDAD_CLIENTE");
            entity.Property(e => e.Clasif)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLASIF");
            entity.Property(e => e.Cnet1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CNet1");
            entity.Property(e => e.Cnet2)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CNet2");
            entity.Property(e => e.Cnet3)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CNet3");
            entity.Property(e => e.CodAccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_ACCION");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_POSTAL");
            entity.Property(e => e.CodResultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_RESULTADO");
            entity.Property(e => e.CodigoBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CODIGO_BLOQUEO");
            entity.Property(e => e.ColoniaCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COLONIA_CLIENTE");
            entity.Property(e => e.ComentariosObservacionesA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("COMENTARIOS /OBSERVACIONES_A");
            entity.Property(e => e.Consecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CONSECUTIVO");
            entity.Property(e => e.ContacSelf)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ContenciónCnet)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Contención_Cnet");
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
            entity.Property(e => e.DescProducto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DESC_PRODUCTO");
            entity.Property(e => e.DiaCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIA_CORTE");
            entity.Property(e => e.DiasAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_AGENCIA");
            entity.Property(e => e.DiasAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION");
            entity.Property(e => e.DiasFaltantes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_FALTANTES");
            entity.Property(e => e.DiasMorosos)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DIAS_MOROSOS");
            entity.Property(e => e.Edad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Efiencia)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.EfienciaAlta)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Efiencia Alta");
            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("EJECUTIVO");
            entity.Property(e => e.Especial)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ESPECIAL");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTADO");
            entity.Property(e => e.EstatusA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ESTATUS_A");
            entity.Property(e => e.Estrategia300)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Estrategia 300");
            entity.Property(e => e.F49)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F50)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F51)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F52)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F53)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F54)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F55)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F56)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F57)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F58)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F59)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F60)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F61)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.F62)
                .HasMaxLength(255)
                .IsUnicode(false);
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
            entity.Property(e => e.FecUltGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULT_GESTION");
            entity.Property(e => e.FecUltimaCompra)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULTIMA_COMPRA");
            entity.Property(e => e.FecUltimaDisposicion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_ULTIMA_DISPOSICION");
            entity.Property(e => e.FechaActualizacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ACTUALIZACION");
            entity.Property(e => e.FechaAltaRefin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ALTA_REFIN");
            entity.Property(e => e.FechaAperturaCta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CTA");
            entity.Property(e => e.FechaAperturaCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_APERTURA_CUENTA");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("FECHA_ASIGNACION");
            entity.Property(e => e.FechaCambioSegmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CAMBIO_SEGMENTO");
            entity.Property(e => e.FechaCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CASTIGO");
            entity.Property(e => e.FechaCodBloqueo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("FECHA_COD_BLOQUEO");
            entity.Property(e => e.FechaContratacionPolizaA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("FECHA_CONTRATACION POLIZA_A");
            entity.Property(e => e.FechaDesasignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_DESASIGNACION");
            entity.Property(e => e.FechaLimitePago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_LIMITE_PAGO");
            entity.Property(e => e.FechaOcurrenciaA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("FECHA_OCURRENCIA_A");
            entity.Property(e => e.FechaProceso)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaProxVencimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_PROX_VENCIMIENTO");
            entity.Property(e => e.FechaReporteA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("FECHA_REPORTE_A");
            entity.Property(e => e.FechaUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_ULTIMO_PAGO");
            entity.Property(e => e.Fijar)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Financiamiento)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FormaDeTrabajo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Forma de trabajo");
            entity.Property(e => e.Gestiones)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("gestiones");
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
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Interpelar)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Inv)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Inventarionuevo)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Inventarioreserva)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IrreConsumoQuita)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IrreTest)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Irreconsumo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("irreconsumo");
            entity.Property(e => e.Lada1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_1");
            entity.Property(e => e.Lada11)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA1");
            entity.Property(e => e.Lada2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_2");
            entity.Property(e => e.Lada21)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA2");
            entity.Property(e => e.Lada3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_3");
            entity.Property(e => e.Lada31)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA3");
            entity.Property(e => e.LimiteCredito)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LIMITE_CREDITO");
            entity.Property(e => e.LlevadoACero)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Llevado a cero");
            entity.Property(e => e.ManomaticoA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("MANOMATICO_A");
            entity.Property(e => e.MaxGest)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MedioA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("MEDIO_A");
            entity.Property(e => e.Mensualidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MENSUALIDAD");
            entity.Property(e => e.Meta)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MetaAlta)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Meta Alta");
            entity.Property(e => e.MinGest)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("MONTO_AGENCIA");
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
            entity.Property(e => e.MontoPromesado)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Monto Promesado");
            entity.Property(e => e.MontoPromesado1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("MontoPromesado");
            entity.Property(e => e.MontoUltimaCompra)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMA_COMPRA");
            entity.Property(e => e.MontoUltimaDisposicion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMA_DISPOSICION");
            entity.Property(e => e.MontoUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMO_PAGO");
            entity.Property(e => e.NoCuenta)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("NO_CUENTA");
            entity.Property(e => e.NoCuentaRel)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("NO_CUENTA REL");
            entity.Property(e => e.NombreCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NOMBRE_CLIENTE");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("OBSERVACIONES");
            entity.Property(e => e.OperaciónA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("OPERACIÓN_A");
            entity.Property(e => e.OrigenRefin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ORIGEN_REFIN");
            entity.Property(e => e.PagoInicial)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Pago Inicial");
            entity.Property(e => e.PagoMinimo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAGO_MINIMO");
            entity.Property(e => e.Pagoinicial1072)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Pagoinicial_1072");
            entity.Property(e => e.Pagos)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.PagosMes)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAGOS_VENCIDOS");
            entity.Property(e => e.Pb)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PB");
            entity.Property(e => e.Pegat)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Pgad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Plan1672)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Plan_16_72");
            entity.Property(e => e.Plan1855)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PLAN_18_55");
            entity.Property(e => e.PlazoPactado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PLAZO_PACTADO");
            entity.Property(e => e.PolizaA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("POLIZA_A");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PRIORIDAD");
            entity.Property(e => e.PrioridadBanco)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Prioridad_Banco");
            entity.Property(e => e.Probabilida)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ProductoA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PRODUCTO_A");
            entity.Property(e => e.ProductoOrigen)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Producto_Origen");
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
            entity.Property(e => e.QtaMaxReviMorosa)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.QuitaIrregular)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Quita_Irregular");
            entity.Property(e => e.Quitam)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("QUITAM");
            entity.Property(e => e.RangoDeSaldos)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Rango de Saldos");
            entity.Property(e => e.RangoEdad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Rango Edad");
            entity.Property(e => e.RangoFechaPago)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Rango fecha pago");
            entity.Property(e => e.RangoMoroso)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("rango moroso");
            entity.Property(e => e.Reestructura)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ReestructuraC)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ReestructuraCreciente)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Referencia)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ReviNómina)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Revi_Nómina");
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
            entity.Property(e => e.Segmentacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_ACTUAL");
            entity.Property(e => e.SegmentoPosterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_POSTERIOR");
            entity.Property(e => e.Skip)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Spin)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("SPIN");
            entity.Property(e => e.Stacteca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STACTECA");
            entity.Property(e => e.Status)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("STATUS");
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
                .HasColumnName("Stock_Pgad");
            entity.Property(e => e.Tasa)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TASA");
            entity.Property(e => e.Tel1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_1");
            entity.Property(e => e.Tel11)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL1");
            entity.Property(e => e.Tel2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_2");
            entity.Property(e => e.Tel21)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL2");
            entity.Property(e => e.Tel3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_3");
            entity.Property(e => e.Tel31)
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
                .HasColumnName("TOTAL_DEUDOR_POSICION");
            entity.Property(e => e.Trascodificada)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("TRASCODIFICADA");
            entity.Property(e => e.UltimoSaldoMesAnterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ULTIMO_SALDO_MES_ANTERIOR");
            entity.Property(e => e.UnicoPago)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("unico pago");
            entity.Property(e => e.Wk3mplct)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("WK3MPLCT");
        });

        modelBuilder.Entity<AcumProducto8>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACUM_Producto_8", "Y");

            entity.Property(e => e.Afencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AFENCIA");
            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL");
            entity.Property(e => e.AgenciaActual1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("AGENCIA_ACTUAL1");
            entity.Property(e => e.AgenciaAnterior)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("agencia_anterior");
            entity.Property(e => e.AgenciaConvenio)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Alta)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ALTA");
            entity.Property(e => e.BaseDeDatosA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("BASE DE DATOS_A");
            entity.Property(e => e.Bonificacion)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("BONIFICACION");
            entity.Property(e => e.Bp)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("BP");
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
                .HasColumnName("Calif Score");
            entity.Property(e => e.CalleNoCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CALLE_NO_CLIENTE");
            entity.Property(e => e.CapitalVencido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CAPITAL_VENCIDO");
            entity.Property(e => e.CiudadCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CIUDAD_CLIENTE");
            entity.Property(e => e.Clasif)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLASIF");
            entity.Property(e => e.ClaveProducto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CLAVE_PRODUCTO");
            entity.Property(e => e.Cnet1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CNet1");
            entity.Property(e => e.Cnet2)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CNet2");
            entity.Property(e => e.Cnet3)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CNet3");
            entity.Property(e => e.CodAccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_ACCION");
            entity.Property(e => e.CodPostal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_POSTAL");
            entity.Property(e => e.CodResultado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COD_RESULTADO");
            entity.Property(e => e.ColoniaCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("COLONIA_CLIENTE");
            entity.Property(e => e.ComentariosObservacionesA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("COMENTARIOS /OBSERVACIONES_A");
            entity.Property(e => e.Consecutivo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CONSECUTIVO");
            entity.Property(e => e.ContacSelf)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CORREO");
            entity.Property(e => e.Correo2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CORREO2");
            entity.Property(e => e.Correo3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CORREO3");
            entity.Property(e => e.Correo4)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("correo4");
            entity.Property(e => e.Correo5)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("correo5");
            entity.Property(e => e.Correo6)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("correo6");
            entity.Property(e => e.Correo7)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("correo7");
            entity.Property(e => e.Correo8)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("correo8");
            entity.Property(e => e.Correo9)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("correo9");
            entity.Property(e => e.Corte)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.CtaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CTA_CHEQUES");
            entity.Property(e => e.CtaTrascodificada)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CTA_TRASCODIFICADA");
            entity.Property(e => e.CuentaCheques)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("CUENTA_CHEQUES");
            entity.Property(e => e.DescProducto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DESC_PRODUCTO");
            entity.Property(e => e.DiasAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_AGENCIA");
            entity.Property(e => e.DiasAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION");
            entity.Property(e => e.DiasAsignacionCyber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_ASIGNACION_CYBER");
            entity.Property(e => e.DiasEnAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_EN_AGENCIA");
            entity.Property(e => e.DiasFaltantes)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_FALTANTES");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MORA");
            entity.Property(e => e.DiasMorosos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DIAS_MOROSOS");
            entity.Property(e => e.Edad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Efiencia)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.EfienciaAlta)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Efiencia Alta");
            entity.Property(e => e.Ejecutivo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("EJECUTIVO");
            entity.Property(e => e.Especial)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ESPECIAL");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTADO");
            entity.Property(e => e.EstatusA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("ESTATUS_A");
            entity.Property(e => e.EstatusCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTATUS_CLIENTE");
            entity.Property(e => e.Estrategia300)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Estrategia 300");
            entity.Property(e => e.Ext1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EXT_1");
            entity.Property(e => e.Ext2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("EXT_2");
            entity.Property(e => e.FecRefAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FEC_REF_AGENCIA");
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
            entity.Property(e => e.FechaCambioSegmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CAMBIO_SEGMENTO");
            entity.Property(e => e.FechaCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_CASTIGO");
            entity.Property(e => e.FechaContratacionPolizaA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("FECHA_CONTRATACION POLIZA_A");
            entity.Property(e => e.FechaDesasignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_DESASIGNACION");
            entity.Property(e => e.FechaDesasignacionCyber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_DESASIGNACION_CYBER");
            entity.Property(e => e.FechaOcurrenciaA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("FECHA_OCURRENCIA_A");
            entity.Property(e => e.FechaProceso)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FechaProximoVencimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FECHA_PROXIMO_VENCIMIENTO");
            entity.Property(e => e.FechaReporteA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("FECHA_REPORTE_A");
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
            entity.Property(e => e.Financiamiento)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FormaDeTrabajo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Forma de trabajo");
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
            entity.Property(e => e.Insert).HasColumnName("_Insert");
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
                .IsUnicode(false);
            entity.Property(e => e.Inventarionuevo)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Inventarioreserva)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IrreConsumoQuita)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IrreTest)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Irreconsumo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("irreconsumo");
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
            entity.Property(e => e.Lada1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_1");
            entity.Property(e => e.Lada2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("LADA_2");
            entity.Property(e => e.LlevadoACero)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Llevado a cero");
            entity.Property(e => e.ManomaticoA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("MANOMATICO_A");
            entity.Property(e => e.MaxGest)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MedioA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("MEDIO_A");
            entity.Property(e => e.Meta)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MetaAlta)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Meta Alta");
            entity.Property(e => e.MinGest)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_AGENCIA");
            entity.Property(e => e.MontoPromesado)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Monto Promesado");
            entity.Property(e => e.MontoPromesado1)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("MontoPromesado");
            entity.Property(e => e.MontoUltimoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("MONTO_ULTIMO_PAGO");
            entity.Property(e => e.NoCuentaRel)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("NO_CUENTA REL");
            entity.Property(e => e.NombreCliente)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("NOMBRE_CLIENTE");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("OBSERVACIONES");
            entity.Property(e => e.OperaciónA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("OPERACIÓN_A");
            entity.Property(e => e.PagoInicial)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Pago Inicial");
            entity.Property(e => e.Pagoinicial1072)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Pagoinicial_1072");
            entity.Property(e => e.Pagos)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.PagosMes)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PAGOS_VENCIDOS");
            entity.Property(e => e.Pegat)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Pgad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Plan1672)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Plan_16_72");
            entity.Property(e => e.Plan1855)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PLAN_18_55");
            entity.Property(e => e.PolizaA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("POLIZA_A");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PRIORIDAD");
            entity.Property(e => e.PrioridadBanco)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Prioridad_Banco");
            entity.Property(e => e.Probabilidad)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PRODUCTO");
            entity.Property(e => e.ProductoA)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PRODUCTO_A");
            entity.Property(e => e.ProgramaEspecial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PROGRAMA_ESPECIAL");
            entity.Property(e => e.QtaMaxReviMorosa)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.QuitaIrregular)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Quita_Irregular");
            entity.Property(e => e.Quitam)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("QUITAM");
            entity.Property(e => e.RangoDeSaldos)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Rango de Saldos");
            entity.Property(e => e.RangoEdad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Rango Edad");
            entity.Property(e => e.RangoFechaPago)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Rango fecha pago");
            entity.Property(e => e.RangoMoroso)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("rango moroso");
            entity.Property(e => e.ReestructuraC)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ReestructuraCreciente)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Referencia)
                .HasMaxLength(250)
                .IsUnicode(false);
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
            entity.Property(e => e.Segmentacion)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("SEGMENTACION");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_ACTUAL");
            entity.Property(e => e.SegmentoPosterior)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO_POSTERIOR");
            entity.Property(e => e.Skip)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Spin)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("SPIN");
            entity.Property(e => e.Stacteca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STACTECA");
            entity.Property(e => e.Status)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("STATUS");
            entity.Property(e => e.StatusCli)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("STATUS_CLI");
            entity.Property(e => e.StockPgad)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Stock_Pgad");
            entity.Property(e => e.Tel1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_1");
            entity.Property(e => e.Tel2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TEL_2");
            entity.Property(e => e.TipoFacturacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TIPO_FACTURACION");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TOTAL_DEUDOR");
            entity.Property(e => e.TotalDeudorPosicion)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("TOTAL_DEUDOR_POSICION");
            entity.Property(e => e.Trascodificada)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TRASCODIFICADA");
            entity.Property(e => e.UnicoPago)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("unico pago");
        });

        modelBuilder.Entity<Adicionale>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.IdAdicional });

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
            entity.Property(e => e.IdAdicional).HasColumnName("idAdicional");
            entity.Property(e => e.CalleNum)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.ColoniaLocalidad)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.CorreoAdicional)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.CódigoPostal)
                .HasMaxLength(5)
                .IsUnicode(false)
                .IsFixedLength()
                .IsSparse();
            entity.Property(e => e.DelegaciónMunicipio)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.Estado)
                .HasMaxLength(20)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdEjecutivoInsert).HasColumnName("idEjecutivo_Insert");
            entity.Property(e => e.IdLogProceso)
                .IsSparse()
                .HasColumnName("idLogProceso");
            entity.Property(e => e.IdParentesco).HasColumnName("idParentesco");
            entity.Property(e => e.NombreAdicional)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroTelefónico).IsSparse();
            entity.Property(e => e.Rfcadicional)
                .HasMaxLength(20)
                .IsUnicode(false)
                .IsSparse()
                .HasColumnName("RFCAdicional");

            entity.HasOne(d => d.Teléfono).WithMany(p => p.Adicionales)
                .HasForeignKey(d => new { d.IdCartera, d.IdCuenta, d.NúmeroTelefónico })
                .HasConstraintName("FK_Adicionales_Teléfonos");
        });

        modelBuilder.Entity<Asignación>(entity =>
        {
            entity.HasKey(e => new { e.FechaRetiroBbva, e.Préstamo }).HasFillFactor(90);

            entity.ToTable("Asignación", "Bancomer");

            entity.HasIndex(e => new { e.FechaAsignación, e.IdCuenta }, "IX_Asignación_Asignación_idCuenta")
                .IsDescending(true, false)
                .HasFillFactor(90);

            entity.Property(e => e.FechaRetiroBbva).HasColumnName("FechaRetiroBBVA");
            entity.Property(e => e.Préstamo)
                .HasMaxLength(20)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.Saldo).HasColumnType("money");
        });

        modelBuilder.Entity<Búsqueda>(entity =>
        {
            entity.HasKey(e => new { e.FechaInsert, e.IdCartera, e.IdCuenta, e.SegundoInsert });

            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.DatoBuscado)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.DomicilioLugar)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IdDato).HasColumnName("idDato");
            entity.Property(e => e.IdEjecutivo)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.IdFuente).HasColumnName("idFuente");
            entity.Property(e => e.InfoEncontrada)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Link)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.NombreLugar)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombrePersona)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Puesto)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TiempoEnCuenta).HasPrecision(0);

            entity.HasOne(d => d.IdCarteraNavigation).WithMany(p => p.Búsqueda)
                .HasForeignKey(d => d.IdCartera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Búsquedas_Carteras");

            entity.HasOne(d => d.IdDatoNavigation).WithMany(p => p.BúsquedaIdDatoNavigations)
                .HasForeignKey(d => d.IdDato)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Búsquedas_Datos");

            entity.HasOne(d => d.IdFuenteNavigation).WithMany(p => p.BúsquedaIdFuenteNavigations)
                .HasForeignKey(d => d.IdFuente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Búsquedas_Fuentes");

            entity.HasOne(d => d.Cuenta).WithMany(p => p.Búsqueda)
                .HasForeignKey(d => new { d.IdCartera, d.IdCuenta })
                .HasConstraintName("FK_Búsquedas_Cuentas");
        });

        modelBuilder.Entity<CargosAtm>(entity =>
        {
            entity.HasKey(e => new { e.FechaInsert, e.IdCartera, e.IdCuenta, e.SegundoInsert });

            entity.ToTable("CargosATM");

            entity.HasIndex(e => e.FechaInsert, "NonClusteredIndex-20210720-171521");

            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Autorización)
                .HasMaxLength(18)
                .IsUnicode(false);
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdEjecutivoAutorizó).HasColumnName("idEjecutivo_Autorizó");
            entity.Property(e => e.Monto).HasColumnType("money");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Sistema).HasDefaultValue(true);
        });

        modelBuilder.Entity<Cartera>(entity =>
        {
            entity.HasKey(e => e.IdCartera).HasName("PK_Clientes");

            entity.Property(e => e.IdCartera)
                .ValueGeneratedNever()
                .HasColumnName("idCartera");
            entity.Property(e => e.Abreviación)
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Cartera1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Cartera");
        });

        modelBuilder.Entity<Cartera31>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("Cartera_31", "Y");

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.Capital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("capital");
            entity.Property(e => e.Comisiones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones");
            entity.Property(e => e.ComisionesMora)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.ComisionesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones_morosidad");
            entity.Property(e => e.Condonacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion");
            entity.Property(e => e.CondonacionNeg)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("condonacion_neg");
            entity.Property(e => e.CondonaciónVsdeuda)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("CondonaciónVSDeuda");
            entity.Property(e => e.Corte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("corte");
            entity.Property(e => e.DescuentoAplicar12Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 12 meses");
            entity.Property(e => e.DescuentoAplicar24Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 24 meses");
            entity.Property(e => e.DescuentoAplicar30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 30 dias");
            entity.Property(e => e.DescuentoAplicar3Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 3 meses");
            entity.Property(e => e.DescuentoAplicar6Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 6 meses");
            entity.Property(e => e.DescuentoAplicarMayorA24YMenorA48Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar mayor a 24 y menor a 48 meses");
            entity.Property(e => e.DescuentoCp)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("DescuentoCP");
            entity.Property(e => e.DescuentoLp)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("DescuentoLP");
            entity.Property(e => e.DescuentoPt)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("DescuentoPT");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias mora");
            entity.Property(e => e.Especial)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("% especial");
            entity.Property(e => e.FecVctoCuota1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec#vcto cuota1");
            entity.Property(e => e.HitNoHit)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("Hit / No Hit");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
            entity.Property(e => e.Impuestos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos");
            entity.Property(e => e.ImpuestosMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos_morosidad");
            entity.Property(e => e.InformacionAl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("informacion al");
            entity.Property(e => e.Intereses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses");
            entity.Property(e => e.InteresesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses_morosidad");
            entity.Property(e => e.Mora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora");
            entity.Property(e => e.Pan)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("pan");
            entity.Property(e => e.ProductoCj)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Producto CJ");
            entity.Property(e => e.Quita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("quita");
            entity.Property(e => e.Reestructura)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura");
            entity.Property(e => e.ReestructuraNeg)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("reestructura_neg");
            entity.Property(e => e.Riesgo)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.SaldoAlCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al corte");
            entity.Property(e => e.SaldoCapital)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("saldo capital");
            entity.Property(e => e.SaldoDeuda)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo deuda");
            entity.Property(e => e.SaldoMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo mora");
            entity.Property(e => e.SaldoaNegociarCp)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarCP");
            entity.Property(e => e.SaldoaNegociarLp)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarLP");
            entity.Property(e => e.SaldoaNegociarPt)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarPT");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.SegmentoRem)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("segmento_rem");
            entity.Property(e => e.SinMatch)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("Sin Match");
            entity.Property(e => e.TelParticular)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel particular");
            entity.Property(e => e.TelefonoAdicional)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono adicional");
            entity.Property(e => e.TelefonoCobranza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono cobranza");
            entity.Property(e => e.TelefonoComRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 1");
            entity.Property(e => e.TelefonoComRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 2");
            entity.Property(e => e.TelefonoComRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 3");
            entity.Property(e => e.TelefonoOficina)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono oficina");
            entity.Property(e => e.TelefonoPartRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 1");
            entity.Property(e => e.TelefonoPartRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 2");
            entity.Property(e => e.TelefonoPartRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 3");
        });

        modelBuilder.Entity<Cartera31Total>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("Cartera_31_total", "Y");

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.Capital)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("capital");
            entity.Property(e => e.Comisiones)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones");
            entity.Property(e => e.ComisionesMora)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.ComisionesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("comisiones_morosidad");
            entity.Property(e => e.Condonacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("condonacion");
            entity.Property(e => e.CondonacionNeg)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("condonacion_neg");
            entity.Property(e => e.CondonaciónVsdeuda)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("CondonaciónVSDeuda");
            entity.Property(e => e.Corte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("corte");
            entity.Property(e => e.DescuentoAplicar12Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 12 meses");
            entity.Property(e => e.DescuentoAplicar24Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 24 meses");
            entity.Property(e => e.DescuentoAplicar30Dias)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 30 dias");
            entity.Property(e => e.DescuentoAplicar3Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 3 meses");
            entity.Property(e => e.DescuentoAplicar6Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar 6 meses");
            entity.Property(e => e.DescuentoAplicarMayorA24YMenorA48Meses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descuento aplicar mayor a 24 y menor a 48 meses");
            entity.Property(e => e.DescuentoCp)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("DescuentoCP");
            entity.Property(e => e.DescuentoLp)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("DescuentoLP");
            entity.Property(e => e.DescuentoPt)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("DescuentoPT");
            entity.Property(e => e.DiasMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias mora");
            entity.Property(e => e.Especial)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("% especial");
            entity.Property(e => e.FecVctoCuota1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec#vcto cuota1");
            entity.Property(e => e.HitNoHit)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("Hit / No Hit");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdSituacion).HasColumnName("idSituacion");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
            entity.Property(e => e.Impuestos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos");
            entity.Property(e => e.ImpuestosMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("impuestos_morosidad");
            entity.Property(e => e.InformacionAl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("informacion al");
            entity.Property(e => e.Intereses)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses");
            entity.Property(e => e.InteresesMorosidad)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("intereses_morosidad");
            entity.Property(e => e.Mora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mora");
            entity.Property(e => e.Pan)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("pan");
            entity.Property(e => e.ProductoCj)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Producto CJ");
            entity.Property(e => e.Quita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("quita");
            entity.Property(e => e.Reestructura)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("reestructura");
            entity.Property(e => e.ReestructuraNeg)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("reestructura_neg");
            entity.Property(e => e.Riesgo)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.SaldoAlCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo al corte");
            entity.Property(e => e.SaldoCapital)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("saldo capital");
            entity.Property(e => e.SaldoDeuda)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo deuda");
            entity.Property(e => e.SaldoMora)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("saldo mora");
            entity.Property(e => e.SaldoaNegociarCp)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarCP");
            entity.Property(e => e.SaldoaNegociarLp)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarLP");
            entity.Property(e => e.SaldoaNegociarPt)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("SaldoaNegociarPT");
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.SegmentoRem)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("segmento_rem");
            entity.Property(e => e.SinMatch)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("Sin Match");
            entity.Property(e => e.TelParticular)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tel particular");
            entity.Property(e => e.TelefonoAdicional)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono adicional");
            entity.Property(e => e.TelefonoCobranza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono cobranza");
            entity.Property(e => e.TelefonoComRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 1");
            entity.Property(e => e.TelefonoComRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 2");
            entity.Property(e => e.TelefonoComRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono com relacion 3");
            entity.Property(e => e.TelefonoOficina)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono oficina");
            entity.Property(e => e.TelefonoPartRelacion1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 1");
            entity.Property(e => e.TelefonoPartRelacion2)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 2");
            entity.Property(e => e.TelefonoPartRelacion3)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("telefono part relacion 3");
        });

        modelBuilder.Entity<Catálogo>(entity =>
        {
            entity.HasKey(e => e.IdCatálogo);

            entity.Property(e => e.IdCatálogo).HasColumnName("idCatálogo");
            entity.Property(e => e.Catálogo1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Catálogo");
            entity.Property(e => e.DescripciónCatálogo)
                .HasMaxLength(300)
                .IsUnicode(false)
                .HasDefaultValue(" ");
            entity.Property(e => e.FechaCatálogo).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.NombreId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("NombreID");
        });

        modelBuilder.Entity<Comentario>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert, e.SegundoInsert });

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Comentario1)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("Comentario");
            entity.Property(e => e.IdEjecutivo)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo");
        });

        modelBuilder.Entity<CompiladoDireccione>(entity =>
        {
            entity.HasKey(e => new { e.MesAsignación, e.Producto });

            entity.ToTable("CompiladoDirecciones", "HSBC");

            entity.Property(e => e.Producto)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CompletarSepomex).HasColumnName("CompletarSEPOMEX");
            entity.Property(e => e.CréditosConDirSepomex).HasColumnName("CréditosConDirSEPOMEX");
            entity.Property(e => e.CréditosConDirSinCp).HasColumnName("CréditosConDirSinCP");
            entity.Property(e => e.SinCp).HasColumnName("SinCP");
            entity.Property(e => e.SinDelMunCp).HasColumnName("SinDelMunCP");
        });

        modelBuilder.Entity<CompiladoTeléfono>(entity =>
        {
            entity.HasKey(e => new { e.MesAsignación, e.Producto });

            entity.ToTable("CompiladoTeléfonos", "HSBC");

            entity.Property(e => e.Producto)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CorreosCuenta>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.CorreoElectrónico });

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
            entity.Property(e => e.CorreoElectrónico)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FechaHoraInformación)
                .IsSparse()
                .HasColumnType("smalldatetime")
                .HasColumnName("FechaHora_Información");
            entity.Property(e => e.FechaInsert)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdEjecutivo)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.IdEjecutivoInformación)
                .IsSparse()
                .HasColumnName("idEjecutivoInformación");
            entity.Property(e => e.IdInformación).HasColumnName("idInformación");
            entity.Property(e => e.IdOrigen).HasColumnName("idOrigen");
        });

        modelBuilder.Entity<CorreosEnviado>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert, e.SegundoInsert }).IsClustered(false);

            entity.HasIndex(e => new { e.IdCartera, e.FechaInsert, e.IdCuenta }, "IX_CorreosEnviados")
                .IsDescending(true, false, false)
                .IsClustered();

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Asunto)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasComment("Encabezado del correo electrónico.");
            entity.Property(e => e.CorreoElectrónico)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IdEjecutivoInsert).HasColumnName("idEjecutivo_Insert");
            entity.Property(e => e.IdEtapa).HasColumnName("idEtapa");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasComment("Cuerpo del mensaje");
            entity.Property(e => e.SegundoPaquete)
                .HasPrecision(0)
                .HasColumnName("Segundo_Paquete");

            entity.HasOne(d => d.CorreosCuenta).WithMany(p => p.CorreosEnviados)
                .HasForeignKey(d => new { d.IdCartera, d.IdCuenta, d.CorreoElectrónico })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CorreosEnviados_CorreosCuentas");
        });

        modelBuilder.Entity<Cuenta>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta })
                .IsClustered(false)
                .HasFillFactor(70);

            entity.HasIndex(e => new { e.IdCartera, e.IdProducto, e.IdCuenta }, "IX_Cuentas")
                .IsUnique()
                .IsClustered();

            entity.HasIndex(e => new { e.IdSituación, e.IdCartera, e.IdProducto }, "IX_Cuentas_Situación");

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
            entity.Property(e => e.Bloqueo).HasDefaultValue(false);
            entity.Property(e => e.CuentaActiva).HasDefaultValue(true);
            entity.Property(e => e.FechaCambioActivación).HasColumnName("Fecha_CambioActivación");
            entity.Property(e => e.FechaUpdate).HasColumnName("Fecha_Update");
            entity.Property(e => e.IdCausaNoPago).HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdEjecutivoÚltimaGestión).HasColumnName("idEjecutivoÚltimaGestión");
            entity.Property(e => e.IdEjecutivoÚltimaNegociación).HasColumnName("idEjecutivoÚltimaNegociación");
            entity.Property(e => e.IdEjecutivoÚltimaVisita).HasColumnName("idEjecutivoÚltimaVisita");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.IdSituación)
                .HasDefaultValue((short)1001)
                .HasColumnName("idSituación");
            entity.Property(e => e.IdSituaciónDesactivación).HasColumnName("idSituaciónDesactivación");
            entity.Property(e => e.IdSucursal)
                .HasDefaultValue((short)1)
                .HasColumnName("idSucursal");
            entity.Property(e => e.MontoÚltimoPago).HasColumnType("money");
            entity.Property(e => e.NombreDeudor)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroCliente)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Rfc)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.Saldo).HasColumnType("money");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.Cuenta)
                .HasForeignKey(d => d.IdProducto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Cuentas_Productos");

            entity.HasOne(d => d.IdSituaciónNavigation).WithMany(p => p.CuentaIdSituaciónNavigations)
                .HasForeignKey(d => d.IdSituación)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ValoresCatálogo_Cuentas_FK1");

            entity.HasOne(d => d.IdSucursalNavigation).WithMany(p => p.CuentaIdSucursalNavigations)
                .HasForeignKey(d => d.IdSucursal)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Cuentas_ValoresCatálogo");
        });

        modelBuilder.Entity<CuentasCiclo>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.VálidoDesde });

            entity.ToTable("CuentasCiclo");

            entity.HasIndex(e => new { e.VálidoDesde, e.IdCartera, e.IdCuenta }, "IX_CuentasCiclo").IsDescending(true, false, false);

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<CuentasHistórico>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.VálidoDesde });

            entity.ToTable("CuentasHistórico");

            entity.HasIndex(e => new { e.VálidoDesde, e.IdCartera, e.IdCuenta }, "IX_CuentasHistórico")
                .IsUnique()
                .IsDescending(true, false, false);

            entity.HasIndex(e => new { e.IdCuenta, e.Activa, e.VálidoDesde, e.VálidoHasta }, "IX_CuentasHistóricoActivas").HasFillFactor(90);

            entity.HasIndex(e => new { e.IdCartera, e.IdProducto, e.VálidoDesde }, "IX_CuentasHistórico_ActivaCartera").HasFilter("([Activa]=(1))");

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.Activa).HasDefaultValue(true);
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.Saldo).HasColumnType("money");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<DatosErróneo>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.IdDatoErróneo });

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdDatoErróneo).HasColumnName("idDatoErróneo");
            entity.Property(e => e.FechaHoraInsert)
                .HasColumnType("smalldatetime")
                .HasColumnName("FechaHora_Insert");
            entity.Property(e => e.IdEjecutivoInsert)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo_Insert");
        });

        modelBuilder.Entity<DemográficosErróneo>(entity =>
        {
            entity.HasKey(e => new { e.MesAsignación, e.IdCuenta, e.Teléfono1Domicilio0 });

            entity.ToTable("DemográficosErróneos", "HSBC");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Teléfono1Domicilio0).HasColumnName("Teléfono1_Domicilio0");
        });

        modelBuilder.Entity<Domicilio>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.IdDomicilio });

            entity.HasIndex(e => e.IdDomicilio, "IX_Domicilio_idDomicilio");

            entity.Property(e => e.IdCartera)
                .HasComment("")
                .HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdDomicilio).HasColumnName("idDomicilio");
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
                .IsSparse()
                .HasColumnType("smalldatetime")
                .HasColumnName("FechaHora_Información");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.IdCódigoPostal).HasColumnName("idCódigoPostal");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdEjecutivoInformación)
                .IsSparse()
                .HasColumnName("idEjecutivoInformación");
            entity.Property(e => e.IdInformación)
                .HasDefaultValue((short)218)
                .HasColumnName("idInformación");
            entity.Property(e => e.IdLogProceso).HasColumnName("idLogProceso");
            entity.Property(e => e.IdOrígen)
                .HasDefaultValue((short)1803)
                .HasColumnName("idOrígen");
            entity.Property(e => e.NúmeroExterior)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroInterior)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<DomiciliosHistórico>(entity =>
        {
            entity.HasKey(e => new { e.VálidoDesde, e.IdCartera, e.IdCuenta, e.IdDomicilio });

            entity.ToTable("DomiciliosHistórico");

            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdDomicilio).HasColumnName("idDomicilio");
            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.IdOrigen).HasColumnName("idOrigen");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<Ejecutivo>(entity =>
        {
            entity.HasKey(e => e.IdEjecutivo);

            entity.HasIndex(e => e.Usuario, "UK_Ejecutivos_Usuario").IsUnique();

            entity.Property(e => e.IdEjecutivo)
                .ValueGeneratedNever()
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.Contraseña).HasMaxLength(128);
            entity.Property(e => e.FechaInsert)
                .HasDefaultValueSql("(getdate())")
                .HasComment("Fecha que se insertó el Ejecutivo.")
                .HasColumnName("Fecha_Insert");
            entity.Property(e => e.FechaUpdate).HasColumnName("Fecha_Update");
            entity.Property(e => e.IdBaja).HasColumnName("idBaja");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdEncargado)
                .HasComment("Persona inmediata superior en jerarquía laboral.")
                .HasColumnName("idEncargado");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.IdPuesto).HasColumnName("idPuesto");
            entity.Property(e => e.IdSucursal).HasColumnName("idSucursal");
            entity.Property(e => e.IdÁrea).HasColumnName("idÁrea");
            entity.Property(e => e.Jerarquía).HasComment("Nivel de jerarquía del ejecutivo, 0 es la más baja. Se utiliza para permisos.");
            entity.Property(e => e.NombreEjecutivo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
        });

        modelBuilder.Entity<EncuentasPregunta>(entity =>
        {
            entity.HasKey(e => e.IdPregunta).HasFillFactor(90);

            entity.Property(e => e.IdPregunta).ValueGeneratedNever();
            entity.Property(e => e.NombreEncuesta)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Pregunta)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<EncuentasRespuesta>(entity =>
        {
            entity.HasKey(e => e.IdRespuesta).HasFillFactor(90);

            entity.Property(e => e.IdRespuesta).ValueGeneratedNever();
            entity.Property(e => e.NombreEncuesta)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Respuesta)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<EncuestaCliente>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert, e.SegundoInsert, e.IdEjecutivo }).HasFillFactor(90);

            entity.ToTable("EncuestaCliente");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Detalle1)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Detalle2)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Detalle3)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Detalle4)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Detalle5)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Detalle6)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Detalle7)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Equivalencias200>(entity =>
        {
            entity.HasKey(e => new { e.EsVencida, e.IdValor });

            entity.ToTable("Equivalencias_200", "HSBC");

            entity.Property(e => e.IdValor).HasColumnName("idValor");
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
        });

        modelBuilder.Entity<EquivalenciasViciDial>(entity =>
        {
            entity.HasKey(e => e.StatusViciDial);

            entity.ToTable("Equivalencias_ViciDial");

            entity.Property(e => e.StatusViciDial)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Status_ViciDial");
            entity.Property(e => e.IdValor).HasColumnName("idValor");
        });

        modelBuilder.Entity<ErroresMigración>(entity =>
        {
            entity.HasKey(e => e.IdErrorMigración);

            entity.ToTable("ErroresMigración");

            entity.Property(e => e.IdErrorMigración).HasColumnName("idErrorMigración");
            entity.Property(e => e.ErrorMigración).IsUnicode(false);
            entity.Property(e => e.FechaError)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Proceso)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Fallido>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("fallido");

            entity.Property(e => e.Causanopago)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("causanopago");
            entity.Property(e => e.Contactos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CódigoAccion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoDeAgencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.GrupoCuenta)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdTelefonía).HasColumnName("idTelefonía");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("situacion");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<Fallido12>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("fallido_12");

            entity.Property(e => e.Causanopago)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("causanopago");
            entity.Property(e => e.Contactos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CódigoAccion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoDeAgencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.GrupoCuenta)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdTelefonía).HasColumnName("idTelefonía");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("situacion");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<FallidoAc>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("fallidoAC");

            entity.Property(e => e.Causanopago)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("causanopago");
            entity.Property(e => e.Contactos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CódigoAccion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoDeAgencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.GrupoCuenta)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdTelefonía).HasColumnName("idTelefonía");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("SEGMENTO");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("situacion");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<Fecha>(entity =>
        {
            entity.HasKey(e => e.Fecha1);

            entity.HasIndex(e => new { e.Año, e.Mes, e.Fecha1 }, "IX_Fechas_AñoMes").IsDescending(true, true, false);

            entity.Property(e => e.Fecha1).HasColumnName("Fecha");
        });

        modelBuilder.Entity<GestionesAuditoriaHist>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("GestionesAuditoriaHist");

            entity.Property(e => e.Acercamiento)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Batchdate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("batchdate");
            entity.Property(e => e.Clase)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("clase");
            entity.Property(e => e.Confirmado).HasColumnName("confirmado");
            entity.Property(e => e.Contacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Cuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Currentagencyid)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("currentagencyid");
            entity.Property(e => e.Currentbalanceg).HasColumnType("money");
            entity.Property(e => e.Estado)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Expediente)
                .HasMaxLength(33)
                .IsUnicode(false);
            entity.Property(e => e.FechaCambioactivación).HasColumnName("fecha_cambioactivación");
            entity.Property(e => e.FechaRecepción)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Hora).HasPrecision(0);
            entity.Property(e => e.HoraInicioD).HasPrecision(0);
            entity.Property(e => e.HoraInicioT).HasPrecision(0);
            entity.Property(e => e.Husohorario)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("husohorario");
            entity.Property(e => e.Modo)
                .HasMaxLength(7)
                .IsUnicode(false);
            entity.Property(e => e.Nivel)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nombredeudor)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Numerotelefonico)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("numerotelefonico");
            entity.Property(e => e.Origen)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("origen");
            entity.Property(e => e.Producto)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.Recoveredcode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("recoveredcode");
            entity.Property(e => e.SituacionCta)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SituacionGestionGest)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Telefonia)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("tipo");
            entity.Property(e => e.Usuario)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("usuario");
        });

        modelBuilder.Entity<GestionesChat>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.FechaInsert, e.IdCuenta, e.SegundoInsert });

            entity.ToTable("GestionesChat");

            entity.HasIndex(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert, e.SegundoInsert }, "IX_GestionesChat_Cuenta").IsDescending(false, false, true, true);

            entity.HasIndex(e => new { e.FechaInsert, e.IdEjecutivo }, "IX_GestionesChat_FechaEjecutivo").IsDescending(true, false);

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
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
            entity.Property(e => e.Comentario)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.Duración).HasPrecision(0);
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.IdCausaNoPago)
                .IsSparse()
                .HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdEjecutivo)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.IdEtapa).HasColumnName("idEtapa");
            entity.Property(e => e.IdParentesco)
                .HasComment("id del parentesco con la persona que se realizó la gestión")
                .IsSparse()
                .HasColumnName("idParentesco");
            entity.Property(e => e.IdRedSocial)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse()
                .HasColumnName("idRedSocial");
            entity.Property(e => e.IdSituación)
                .HasComment("id de la etapa en la cual estaba la cuenta cuando se gestionó.\r\nTipo de gestión.")
                .HasColumnName("idSituación");
            entity.Property(e => e.IdSucursal).HasColumnName("idSucursal");
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasComment("Nombre de la persona con la que se tuvo la gestión.")
                .IsSparse();
            entity.Property(e => e.NúmeroTelefónico)
                .HasDefaultValue(0L)
                .HasComment("Número telefónico a 10 dígitos");
            entity.Property(e => e.Salida)
                .HasDefaultValue(true)
                .HasComment("Indica si la gestión fue de salida o de entrada.");
            entity.Property(e => e.TiempoEnCuenta).HasPrecision(0);

            entity.HasOne(d => d.IdAcercamientoNavigation).WithMany(p => p.GestionesChatIdAcercamientoNavigations)
                .HasForeignKey(d => d.IdAcercamiento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GestionesChat_Acercamiento");

            entity.HasOne(d => d.IdCausaNoPagoNavigation).WithMany(p => p.GestionesChatIdCausaNoPagoNavigations)
                .HasForeignKey(d => d.IdCausaNoPago)
                .HasConstraintName("FK_GestionesChat_CausaNoPago");

            entity.HasOne(d => d.IdContactoNavigation).WithMany(p => p.GestionesChatIdContactoNavigations)
                .HasForeignKey(d => d.IdContacto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GestionesChat_Contacto");

            entity.HasOne(d => d.IdEtapaNavigation).WithMany(p => p.GestionesChatIdEtapaNavigations)
                .HasForeignKey(d => d.IdEtapa)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GestionesChat_Etapa");

            entity.HasOne(d => d.IdParentescoNavigation).WithMany(p => p.GestionesChatIdParentescoNavigations)
                .HasForeignKey(d => d.IdParentesco)
                .HasConstraintName("FK_GestionesChat_Parentesco");

            entity.HasOne(d => d.IdSituaciónNavigation).WithMany(p => p.GestionesChatIdSituaciónNavigations)
                .HasForeignKey(d => d.IdSituación)
                .HasConstraintName("FK_GestionesChat_Situación");

            entity.HasOne(d => d.IdSucursalNavigation).WithMany(p => p.GestionesChatIdSucursalNavigations)
                .HasForeignKey(d => d.IdSucursal)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GestionesChat_Sucursal");
        });

        modelBuilder.Entity<GestionesDomiciliaria>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.FechaVisita, e.IdCuenta, e.SegundoVisita });

            entity.HasIndex(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert, e.SegundoInsert }, "IX_GestionesDomiciliarias_CarteraCuenta").IsDescending(false, false, true, true);

            entity.HasIndex(e => new { e.IdEjecutivoVisita, e.FechaInsert }, "IX_GestionesDomiciliarias_Ejecutivo").IsDescending(false, true);

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.FechaVisita).HasColumnName("Fecha_Visita");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.SegundoVisita)
                .HasPrecision(0)
                .HasColumnName("Segundo_Visita");
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
            entity.Property(e => e.IdCausaNoPago).HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdDomicilio).HasColumnName("idDomicilio");
            entity.Property(e => e.IdEconómico).HasColumnName("idEconómico");
            entity.Property(e => e.IdEjecutivoCaptura).HasColumnName("idEjecutivo_Captura");
            entity.Property(e => e.IdEjecutivoVisita)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo_Visita");
            entity.Property(e => e.IdHabitación).HasColumnName("idHabitación");
            entity.Property(e => e.IdHerramienta).HasColumnName("idHerramienta");
            entity.Property(e => e.IdParentesco)
                .HasComment("id del parentesco con la persona que se realizó la gestión")
                .HasColumnName("idParentesco");
            entity.Property(e => e.IdSituación)
                .HasComment("id de la etapa en la cual estaba la cuenta cuando se gestionó.\r\nTipo de gestión.")
                .HasColumnName("idSituación");
            entity.Property(e => e.IdSucursal).HasColumnName("idSucursal");
            entity.Property(e => e.IdVivienda).HasColumnName("idVivienda");
            entity.Property(e => e.MontoNegociación).HasColumnType("money");
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasComment("Nombre de la persona con la que se tuvo la gestión.");
            entity.Property(e => e.NombrePropietario)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");

            entity.HasOne(d => d.IdCausaNoPagoNavigation).WithMany(p => p.GestionesDomiciliariaIdCausaNoPagoNavigations)
                .HasForeignKey(d => d.IdCausaNoPago)
                .HasConstraintName("FK_GestionesDomiciliarias_CausasNoPago");

            entity.HasOne(d => d.IdContactoNavigation).WithMany(p => p.GestionesDomiciliariaIdContactoNavigations)
                .HasForeignKey(d => d.IdContacto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GestionesDomiciliarias_Contactos");

            entity.HasOne(d => d.IdEconómicoNavigation).WithMany(p => p.GestionesDomiciliariaIdEconómicoNavigations)
                .HasForeignKey(d => d.IdEconómico)
                .HasConstraintName("FK_GestionesDomiciliarias_Económico");

            entity.HasOne(d => d.IdHabitaciónNavigation).WithMany(p => p.GestionesDomiciliariaIdHabitaciónNavigations)
                .HasForeignKey(d => d.IdHabitación)
                .HasConstraintName("FK_GestionesDomiciliarias_Habitación");

            entity.HasOne(d => d.IdParentescoNavigation).WithMany(p => p.GestionesDomiciliariaIdParentescoNavigations)
                .HasForeignKey(d => d.IdParentesco)
                .HasConstraintName("FK_GestionesDomiciliarias_Parentescos");

            entity.HasOne(d => d.IdSituaciónNavigation).WithMany(p => p.GestionesDomiciliariaIdSituaciónNavigations)
                .HasForeignKey(d => d.IdSituación)
                .HasConstraintName("FK_GestionesDomiciliarias_Situaciones");

            entity.HasOne(d => d.IdSucursalNavigation).WithMany(p => p.GestionesDomiciliariaIdSucursalNavigations)
                .HasForeignKey(d => d.IdSucursal)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GestionesDomiciliarias_Sucursales");

            entity.HasOne(d => d.IdViviendaNavigation).WithMany(p => p.GestionesDomiciliariaIdViviendaNavigations)
                .HasForeignKey(d => d.IdVivienda)
                .HasConstraintName("FK_GestionesDomiciliarias_Vivienda");
        });

        modelBuilder.Entity<GestionesIssueAxp>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("GestionesIssueAXP");

            entity.Property(e => e.Currentagencyid)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("currentagencyid");
            entity.Property(e => e.Duración)
                .HasPrecision(0)
                .HasColumnName("duración");
            entity.Property(e => e.Estado)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.FechaInsert).HasColumnName("fecha_insert");
            entity.Property(e => e.FechaRegistro).HasColumnType("datetime");
            entity.Property(e => e.Finsemana)
                .HasMaxLength(7)
                .IsUnicode(false);
            entity.Property(e => e.Husohorario).HasColumnName("HUSOHORARIO");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.Idcartera).HasColumnName("idcartera");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
            entity.Property(e => e.Idmodo).HasColumnName("idmodo");
            entity.Property(e => e.Idsituación).HasColumnName("IDSITUACIÓN");
            entity.Property(e => e.Idtelefonía).HasColumnName("IDTELEFONÍA");
            entity.Property(e => e.Númerotelefónico).HasColumnName("númerotelefónico");
            entity.Property(e => e.Product)
                .HasMaxLength(9)
                .IsUnicode(false);
            entity.Property(e => e.Resultado)
                .HasMaxLength(21)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("segundo_insert");
            entity.Property(e => e.Tipo)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("tipo");
        });

        modelBuilder.Entity<GestionesRespaldo>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("GestionesRespaldo");

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

        modelBuilder.Entity<GestionesSistema>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("GestionesSistema");

            entity.Property(e => e.Currentagencyid)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("currentagencyid");
            entity.Property(e => e.FechaEjecucion).HasColumnType("datetime");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
            entity.Property(e => e.Recoveredcode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("recoveredcode");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Tipo)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("tipo");
        });

        modelBuilder.Entity<GestionesSistemaHi>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Currentagencyid)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("currentagencyid");
            entity.Property(e => e.FechaEjecucion).HasColumnType("datetime");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idcuenta");
            entity.Property(e => e.Recoveredcode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("recoveredcode");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Tipo)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("tipo");
        });

        modelBuilder.Entity<GestionesTelefónica>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.FechaInsert, e.IdCuenta, e.SegundoInsert }).HasFillFactor(80);

            entity.HasIndex(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert, e.SegundoInsert }, "IX_GestionesTelefónicas_CarteraCuenta").IsDescending(false, false, true, true);

            entity.HasIndex(e => new { e.FechaInsert, e.IdEjecutivo }, "IX_GestionesTelefónicas_FechaEjecutivo").IsDescending(true, false);

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
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
            entity.Property(e => e.Comentario).IsUnicode(false);
            entity.Property(e => e.Duración).HasPrecision(0);
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.IdCausaNoPago).HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdEjecutivo)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.IdModo).HasColumnName("idModo");
            entity.Property(e => e.IdParentesco)
                .HasComment("id del parentesco con la persona que se realizó la gestión")
                .HasColumnName("idParentesco");
            entity.Property(e => e.IdSituación)
                .HasComment("id de la etapa en la cual estaba la cuenta cuando se gestionó.\r\nTipo de gestión.")
                .HasColumnName("idSituación");
            entity.Property(e => e.IdSucursal).HasColumnName("idSucursal");
            entity.Property(e => e.IdValidador).HasColumnName("idValidador");
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasComment("Nombre de la persona con la que se tuvo la gestión.");
            entity.Property(e => e.NúmeroTelefónico)
                .HasDefaultValue(0L)
                .HasComment("Número telefónico a 10 dígitos");
            entity.Property(e => e.TiempoEnCuenta).HasPrecision(0);

            entity.HasOne(d => d.IdAcercamientoNavigation).WithMany(p => p.GestionesTelefónicaIdAcercamientoNavigations)
                .HasForeignKey(d => d.IdAcercamiento)
                .HasConstraintName("FK_GestionesTelefónicas_Acercamiento");

            entity.HasOne(d => d.IdCausaNoPagoNavigation).WithMany(p => p.GestionesTelefónicaIdCausaNoPagoNavigations)
                .HasForeignKey(d => d.IdCausaNoPago)
                .HasConstraintName("FK_GestionesTelefónicas_CausasNoPago");

            entity.HasOne(d => d.IdContactoNavigation).WithMany(p => p.GestionesTelefónicaIdContactoNavigations)
                .HasForeignKey(d => d.IdContacto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GestionesTelefónicas_Contactos");

            entity.HasOne(d => d.IdModoNavigation).WithMany(p => p.GestionesTelefónicaIdModoNavigations)
                .HasForeignKey(d => d.IdModo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GestionesTelefónicas_Modos");

            entity.HasOne(d => d.IdParentescoNavigation).WithMany(p => p.GestionesTelefónicaIdParentescoNavigations)
                .HasForeignKey(d => d.IdParentesco)
                .HasConstraintName("FK_GestionesTelefónicas_Parentesco");

            entity.HasOne(d => d.IdSituaciónNavigation).WithMany(p => p.GestionesTelefónicaIdSituaciónNavigations)
                .HasForeignKey(d => d.IdSituación)
                .HasConstraintName("FK_GestionesTelefónicas_Situaciones");

            entity.HasOne(d => d.IdSucursalNavigation).WithMany(p => p.GestionesTelefónicaIdSucursalNavigations)
                .HasForeignKey(d => d.IdSucursal)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GestionesTelefónicas_Sucursales");
        });

        modelBuilder.Entity<GrabacionesIntegración>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert, e.SegundoInsert }).HasFillFactor(90);

            entity.ToTable("GrabacionesIntegración");

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.DuraciónSegundos).HasColumnName("Duración_Segundos");
            entity.Property(e => e.InicioLlamada)
                .HasColumnType("datetime")
                .HasColumnName("Inicio_Llamada");
            entity.Property(e => e.NombreGrabación)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.ServidorPredictivo)
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        modelBuilder.Entity<GrabaciónNegociación>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert, e.SegundoInsert }).HasFillFactor(90);

            entity.ToTable("GrabaciónNegociación");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.IdGrabacion)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Herramienta>(entity =>
        {
            entity.HasKey(e => e.IdHerramienta).IsClustered(false);

            entity.HasIndex(e => e.IdProducto, "IX_Herramientas").IsClustered();

            entity.Property(e => e.IdHerramienta)
                .ValueGeneratedNever()
                .HasColumnName("idHerramienta");
            entity.Property(e => e.Activa).HasDefaultValue(true);
            entity.Property(e => e.CampoFechaCorte)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CartaConvenio).HasDefaultValue(true);
            entity.Property(e => e.CálculoMontoRequerido)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.CálculoPorcentajeDescuento)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Descripción)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdEjecutivoInsert).HasColumnName("idEjecutivo_Insert");
            entity.Property(e => e.IdProducto)
                .HasDefaultValue((short)1)
                .HasColumnName("idProducto");
            entity.Property(e => e.Margen).HasComment("Los días de márgen que tendrá la negociación después de la fecha pactada de pago para recibir el pago.");
            entity.Property(e => e.Nombre)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Hibrido>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("hibrido");

            entity.Property(e => e.Causanopago)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("causanopago");
            entity.Property(e => e.Contactos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CódigoAccion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoDeAgencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.GrupoCuenta)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("situacion");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<Hibrido12>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("hibrido_12");

            entity.Property(e => e.Causanopago)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("causanopago");
            entity.Property(e => e.Contactos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CódigoAccion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoDeAgencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.GrupoCuenta)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("situacion");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<HibridoAc>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("hibridoAC");

            entity.Property(e => e.Causanopago)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("causanopago");
            entity.Property(e => e.Contactos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CódigoAccion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoDeAgencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.GrupoCuenta)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("situacion");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<HibridoEsp>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("hibridoEsp");

            entity.Property(e => e.Causanopago)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("causanopago");
            entity.Property(e => e.Contactos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CódigoAccion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoDeAgencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.GrupoCuenta)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("situacion");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<HibridoFaltante>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("hibrido_faltante");

            entity.Property(e => e.Causanopago)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("causanopago");
            entity.Property(e => e.Contactos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CódigoAccion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoDeAgencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.GrupoCuenta)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("situacion");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<HistoricoCuenta>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdProducto, e.IdCuenta, e.FechaInsert, e.IdAccion });

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("idCuenta");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_insert");
        });

        modelBuilder.Entity<InboundKpi>(entity =>
        {
            entity.HasKey(e => new { e.FechaInsert, e.NúmeroTelefónico, e.SegundInsert }).HasName("PK_HSBC.InboundKPI");

            entity.ToTable("InboundKPI", "HSBC");

            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundInsert)
                .HasPrecision(0)
                .HasColumnName("Segund_Insert");
            entity.Property(e => e.ResultadoBlaster)
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        modelBuilder.Entity<IntentosViciDial>(entity =>
        {
            entity.HasKey(e => new { e.FechaInsert, e.NúmeroTelefónico, e.SegundoInsert, e.StatusViciDial, e.Campaña });

            entity.ToTable("Intentos_ViciDial");

            entity.HasIndex(e => new { e.StatusViciDial, e.FechaInsert, e.NúmeroTelefónico }, "IX_Intentos_ViciDial_StatusFecha").IsDescending(false, true, false);

            entity.HasIndex(e => new { e.NúmeroTelefónico, e.FechaInsert }, "IX_Intentos_ViciDial_TeléfonoFecha");

            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.StatusViciDial)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Status_ViciDial");
            entity.Property(e => e.Campaña)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasDefaultValue("");
            entity.Property(e => e.AltDial)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("alt_dial");
            entity.Property(e => e.DuraciónSegundos).HasColumnName("Duración_Segundos");
            entity.Property(e => e.TermReason)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("term_reason");
        });

        modelBuilder.Entity<LogIngreso>(entity =>
        {
            entity.HasKey(e => e.IdLogIngreso);

            entity.ToTable("LogIngreso");

            entity.HasIndex(e => new { e.FechaInsert, e.IdEjecutivo }, "IX_LogIngreso").IsDescending(true, false);

            entity.Property(e => e.IdLogIngreso)
                .ValueGeneratedNever()
                .HasColumnName("idLogIngreso");
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

        modelBuilder.Entity<MetasEjecutivo>(entity =>
        {
            entity.HasKey(e => new { e.IdEjecutivo, e.VálidoDesde });

            entity.ToTable("MetasEjecutivo");

            entity.HasIndex(e => new { e.VálidoHasta, e.IdEjecutivo }, "IX_MetasEjecutivo")
                .IsUnique()
                .IsDescending(true, false);

            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.HoraEntrada).HasPrecision(0);
            entity.Property(e => e.HoraSalida).HasPrecision(0);
            entity.Property(e => e.MontoCumplido).HasColumnType("money");
            entity.Property(e => e.SaldoSolucionado).HasColumnType("money");
            entity.Property(e => e.Segmento)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.VálidoHasta)
                .HasDefaultValue(new DateOnly(3000, 1, 1))
                .HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<Mod914>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("Mod_9_14", "BI");

            entity.Property(e => e.Asignado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ASIGNADO");
            entity.Property(e => e.Buro)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.BuroAlDiaVerificacion)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Buro al dia verificacion");
            entity.Property(e => e.BuróAsignación)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Buró Asignación");
            entity.Property(e => e.Campaña)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Ccpersona)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CCPersona");
            entity.Property(e => e.Cp)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CP");
            entity.Property(e => e.Cpa)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("CPA");
            entity.Property(e => e.Despachos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("DESPACHOS");
            entity.Property(e => e.Diasvenc).HasColumnName("DIASVENC");
            entity.Property(e => e.EntFed)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.EntFedA)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FecMasAntiguo).HasColumnType("datetime");
            entity.Property(e => e.Fechamasantigua)
                .HasColumnType("datetime")
                .HasColumnName("FECHAMASANTIGUA");
            entity.Property(e => e.Fila)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("FILA");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdSucDealer)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MontoRenta).HasColumnType("money");
            entity.Property(e => e.Numpagosven).HasColumnName("NUMPAGOSVEN");
            entity.Property(e => e.Numpagosven2)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("NUMPAGOSVEN2");
            entity.Property(e => e.Otros).HasColumnType("money");
            entity.Property(e => e.ParaProyecto1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PARA PROYECTO 1");
            entity.Property(e => e.Poblacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.PoblacionA)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Producto)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Programa)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Proyecto)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("PROYECTO");
            entity.Property(e => e.Riesgo)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.SaldoVencido).HasColumnType("money");
            entity.Property(e => e.Tipopersona)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("TIPOPERSONA");
            entity.Property(e => e.Totalotros)
                .HasColumnType("money")
                .HasColumnName("TOTALOTROS");
            entity.Property(e => e.Totalvencidos)
                .HasColumnType("money")
                .HasColumnName("TOTALVENCIDOS");
            entity.Property(e => e._120)
                .HasColumnType("money")
                .HasColumnName("120 +");
            entity.Property(e => e._3060)
                .HasColumnType("money")
                .HasColumnName("30 - 60");
            entity.Property(e => e._6090)
                .HasColumnType("money")
                .HasColumnName("60 - 90");
            entity.Property(e => e._90120)
                .HasColumnType("money")
                .HasColumnName("90 - 120");
        });

        modelBuilder.Entity<Negociacion>(entity =>
        {
            entity.HasKey(e => new { e.IdCuenta, e.FechaInsert, e.SegundoInsert }).HasFillFactor(90);

            entity.ToTable("Negociacion", "Soriana");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
        });

        modelBuilder.Entity<Negociacione>(entity =>
        {
            entity.HasKey(e => new { e.FechaInsert, e.IdCartera, e.IdCuenta, e.SegundoInsert });

            entity.HasIndex(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert, e.SegundoInsert }, "IX_Negociaciones").IsDescending(false, false, true, true);

            entity.HasIndex(e => e.IdEstado, "IX_Negociaciones_idEstado");

            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.CartaConvenio).HasComment("Indica si se creó carta convenio durante la negociación.");
            entity.Property(e => e.CorreoElectrónico)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IdEjecutivo)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.IdEjecutivoValidador)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivoValidador");
            entity.Property(e => e.IdEstado).HasColumnName("idEstado");
            entity.Property(e => e.IdHerramienta).HasColumnName("idHerramienta");
            entity.Property(e => e.MontoNegociado)
                .HasComment("Monto total ofrecido a pagar. ")
                .HasColumnType("money");
            entity.Property(e => e.MontoPagado).HasColumnType("money");
            entity.Property(e => e.Pagos).HasComment("El plazo del ofrecimiento, número de pagos.");
            entity.Property(e => e.Plazos).HasDefaultValue((byte)1);
            entity.Property(e => e.SaldoNegociación).HasColumnType("money");

            entity.HasOne(d => d.FechaInsertNavigation).WithMany(p => p.Negociaciones)
                .HasForeignKey(d => d.FechaInsert)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Negociaciones_Fechas");

            entity.HasOne(d => d.IdHerramientaNavigation).WithMany(p => p.Negociaciones)
                .HasForeignKey(d => d.IdHerramienta)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Negociaciones_Herramientas");
        });

        modelBuilder.Entity<NormalSiac>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("NormalSIAC");

            entity.Property(e => e.Causanopago)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("causanopago");
            entity.Property(e => e.Contactos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CódigoAccion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoDeAgencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.GrupoCuenta)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdTelefonía).HasColumnName("idTelefonía");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("situacion");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<NormalSiacAe>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("NormalSIAC_AE");

            entity.Property(e => e.Causanopago)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("causanopago");
            entity.Property(e => e.Contactos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CódigoAccion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoDeAgencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.GrupoCuenta)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdTelefonía).HasColumnName("idTelefonía");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("situacion");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<Ofrecimiento>(entity =>
        {
            entity.HasKey(e => new { e.FechaInsert, e.IdCartera, e.IdCuenta, e.IdHerramienta, e.SegundoInsert }).HasName("PK_Ofrecimientos_1");

            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdHerramienta).HasColumnName("idHerramienta");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.IdAcercamiento)
                .HasComment("Tipo accionamiento por el cual se hizo el ofrecimiento.")
                .HasColumnName("idAcercamiento");
            entity.Property(e => e.IdEjecutivo)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.MontoOfrecido).HasColumnType("money");
            entity.Property(e => e.MontoRequerido).HasColumnType("money");
            entity.Property(e => e.Plazos).HasDefaultValue((byte)1);
            entity.Property(e => e.Saldo).HasColumnType("money");
        });

        modelBuilder.Entity<Pago>(entity =>
        {
            entity.HasKey(e => e.IdPago).IsClustered(false);

            entity.HasIndex(e => new { e.IdCartera, e.FechaPago, e.IdCuenta }, "IX_Pagos_Cartera");

            entity.HasIndex(e => new { e.FechaInsert, e.IdCartera, e.IdCuenta }, "IX_Pagos_FechaInsert").IsDescending(true, false, false);

            entity.HasIndex(e => new { e.FechaPago, e.IdCartera, e.IdCuenta }, "IX_Pagos_FechaPago")
                .IsDescending(true, false, false)
                .IsClustered();

            entity.HasIndex(e => new { e.IdCartera, e.IdCuenta, e.FechaPago, e.MontoPago }, "UK_Pagos")
                .IsUnique()
                .IsDescending(false, false, true, false)
                .HasFilter("([idCartera]<>(24) AND [idCartera]<>(1))")
                .HasFillFactor(90);

            entity.HasIndex(e => new { e.IdCartera, e.IdCuenta, e.FechaPago, e.MontoPago, e.Referencia }, "UK_Pagos_AX")
                .IsUnique()
                .IsDescending(false, false, true, false, false)
                .HasFilter("([idCartera]=(1))")
                .HasFillFactor(90);

            entity.HasIndex(e => new { e.IdCartera, e.IdCuenta, e.FechaPago, e.MontoPago, e.Referencia }, "UK_Pagos_CFE")
                .IsUnique()
                .IsDescending(false, false, true, false, false)
                .HasFilter("([idCartera]=(24))")
                .HasFillFactor(90);

            entity.Property(e => e.IdPago)
                .ValueGeneratedNever()
                .HasColumnName("idPago");
            entity.Property(e => e.Confirmado).HasDefaultValue(true);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdLogProceso).HasColumnName("idLogProceso");
            entity.Property(e => e.MontoPago).HasColumnType("money");
            entity.Property(e => e.Referencia)
                .HasMaxLength(20)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.Segmentación)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PagosReportado>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert, e.SegundoInsert });

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.IdEjecutivo)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.IdEtapa).HasColumnName("idEtapa");
            entity.Property(e => e.MontoPago).HasColumnType("money");
            entity.Property(e => e.Referencia)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Sucursal)
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Paquete>(entity =>
        {
            entity.HasKey(e => new { e.FechaInsert, e.IdCartera, e.SegundoInsert })
                .HasName("PK_Campañas")
                .IsClustered(false);

            entity.ToTable(tb => tb.HasComment("Paquetes de accionamiento"));

            entity.HasIndex(e => new { e.IdCartera, e.IdAcercamiento, e.IdEjecutivoInsert, e.Nombre }, "UK_Paquetes_Nombre").IsUnique();

            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_insert");
            entity.Property(e => e.Descripción)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.IdEjecutivoInsert).HasColumnName("idEjecutivo_Insert");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdAcercamientoNavigation).WithMany(p => p.Paquetes)
                .HasForeignKey(d => d.IdAcercamiento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Paquetes_Acercamientos");

            entity.HasOne(d => d.IdCarteraNavigation).WithMany(p => p.Paquetes)
                .HasForeignKey(d => d.IdCartera)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Paquetes_Carteras");
        });

        modelBuilder.Entity<Pausa>(entity =>
        {
            entity.HasKey(e => new { e.IdEjecutivo, e.FechaInsert, e.SegundoInsert });

            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Duración).HasPrecision(0);
            entity.Property(e => e.IdPausa).HasColumnName("idPausa");

            entity.HasOne(d => d.IdPausaNavigation).WithMany(p => p.Pausas)
                .HasForeignKey(d => d.IdPausa)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Pausas_ValoresCatálogo");
        });

        modelBuilder.Entity<Plazo>(entity =>
        {
            entity.HasKey(e => new { e.FechaInsert, e.IdCartera, e.IdCuenta, e.SegundoInsert, e.FechaPago });

            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.FechaPago).HasComment("Fecha en la que se negoció el pago.");
            entity.Property(e => e.Cumplido)
                .HasDefaultValue(false)
                .HasComment("Si se cumplió el pago.");
            entity.Property(e => e.IdEjecutivo)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.MontoPago)
                .HasComment("Monto del pago que se negoció. ")
                .HasColumnType("money");
            entity.Property(e => e.SumaPagos).HasColumnType("money");
            entity.Property(e => e.Válido).HasDefaultValue(true);
        });

        modelBuilder.Entity<Productividad>(entity =>
        {
            entity.HasKey(e => new { e.FechaDelDía, e.IdEjecutivo, e.Cartera }).HasFillFactor(90);

            entity.ToTable("Productividad");

            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
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
            entity.HasKey(e => e.IdProducto).HasName("PK_Productos_1");

            entity.Property(e => e.IdProducto)
                .ValueGeneratedNever()
                .HasColumnName("idProducto");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IntentosNoCorresponde).HasDefaultValue((byte)3);
            entity.Property(e => e.IntentosSeguimiento).HasDefaultValue((byte)10);
            entity.Property(e => e.Producto1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS")
                .HasColumnName("Producto");
            entity.Property(e => e.TiempoLímiteCuenta)
                .HasPrecision(0)
                .HasDefaultValue(new TimeOnly(0, 10, 0));
        });

        modelBuilder.Entity<Queja>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert, e.SegundoInsert });

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Comentario)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.CorreoElectrónico)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CorreoElectrónicoContacto)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("CorreoElectrónico_Contacto");
            entity.Property(e => e.Folio)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.IdDomicilio).HasColumnName("idDomicilio");
            entity.Property(e => e.IdEjecutivoInsert).HasColumnName("idEjecutivo_Insert");
            entity.Property(e => e.IdEjecutivoQueja).HasColumnName("idEjecutivo_Queja");
            entity.Property(e => e.IdInstitución).HasColumnName("idInstitución");
            entity.Property(e => e.IdQueja).HasColumnName("idQueja");
            entity.Property(e => e.NúmeroTelefónicoContacto).HasColumnName("NúmeroTelefónico_Contacto");
            entity.Property(e => e.Solicitante)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<RelacionesCatálogo>(entity =>
        {
            entity.HasKey(e => new { e.IdValor2, e.IdValor1 });

            entity.Property(e => e.IdValor2).HasColumnName("idValor2");
            entity.Property(e => e.IdValor1).HasColumnName("idValor1");
            entity.Property(e => e.Relación)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdValor1Navigation).WithMany(p => p.RelacionesCatálogos)
                .HasForeignKey(d => d.IdValor1)
                .HasConstraintName("FK_RelacionesCatálogos_ValoresCatálogo");
        });

        modelBuilder.Entity<RndView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("rndView");

            entity.Property(e => e.RndResult).HasColumnName("rndResult");
        });

        modelBuilder.Entity<SaldosConvenio>(entity =>
        {
            entity.HasKey(e => new { e.FechaInsert, e.IdCuenta, e.SegundoInsert });

            entity.ToTable("SaldosConvenios", "HSBC");

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
            entity.Property(e => e.InteresOrdinarioKrn)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Interes Ordinario Krn");
            entity.Property(e => e.MontoPrincipalKrn)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Monto Principal Krn");
            entity.Property(e => e.MoratoriosKrn)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Moratorios Krn");
            entity.Property(e => e.OtrosExigiblesKrn)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Otros Exigibles Krn");
            entity.Property(e => e.PagoMinimoTdc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("pago minimo tdc");
            entity.Property(e => e.PagosVencidos).HasColumnName("Pagos Vencidos");
            entity.Property(e => e.SaldoAlCorteTdc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("saldo al corte tdc");
            entity.Property(e => e.SaldoAlDía)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("saldo al día");
            entity.Property(e => e.SaldoVencidoTdc)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("saldo vencido tdc");
        });

        modelBuilder.Entity<SegmProducto1>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_1", "Y");

            entity.Property(e => e.Anniversarydate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("anniversarydate");
            entity.Property(e => e.Asignacion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.BalanceG)
                .HasColumnType("money")
                .HasColumnName("Balance G*");
            entity.Property(e => e.Birthdate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("birthdate");
            entity.Property(e => e.Customerid)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("customerid");
            entity.Property(e => e.DateWoCancelled)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("date WO/Cancelled");
            entity.Property(e => e.Fechacorte)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Legal)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("legal");
            entity.Property(e => e.Product)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Wo)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("WO?");
        });

        modelBuilder.Entity<SegmProducto10>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_10", "Y");

            entity.Property(e => e.DescSegmento)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DESC_SEGMENTO");
            entity.Property(e => e.Dictamenrap)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DICTAMENRAP");
            entity.Property(e => e.Generico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("generico");
            entity.Property(e => e.GenericoPll)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("generico pll");
            entity.Property(e => e.Grupo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("grupo");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Nomestado)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Producto)
                .HasMaxLength(31)
                .IsUnicode(false);
        });

        modelBuilder.Entity<SegmProducto101>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_101", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto104>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_104", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Product)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<SegmProducto105>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_105", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto110>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_110", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto117>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_117", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto12>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_12", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto120>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_120", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto122>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_122", "Y");

            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto125>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_125", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto126>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_126", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto127>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_127", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto128>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_128", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto13>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_13", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto130>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_130", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto131>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_131", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto133>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_133", "Y");

            entity.Property(e => e.Agencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia");
            entity.Property(e => e.CodAccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cod_accion");
            entity.Property(e => e.CodigoBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("codigo_bloqueo");
            entity.Property(e => e.DiaCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dia_corte");
            entity.Property(e => e.DiasMorosos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dias_morosos");
            entity.Property(e => e.FecUltGestion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_ult_gestion");
            entity.Property(e => e.FechaAsignacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_asignacion");
            entity.Property(e => e.FechaCodBloqueo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_cod_bloqueo");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.MontoAgencia)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_agencia");
            entity.Property(e => e.MontoMoroso)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_moroso");
            entity.Property(e => e.PagoMinimo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pago_minimo");
            entity.Property(e => e.PagosVencidos)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pagos_vencidos");
            entity.Property(e => e.StatusCli)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("status_cli");
            entity.Property(e => e.TotalDeudor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("total_deudor");
        });

        modelBuilder.Entity<SegmProducto14>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_14", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto15>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_15", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto16>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_16", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto168>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_168", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto17>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_17", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Tipocredito)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tipocredito");
        });

        modelBuilder.Entity<SegmProducto18>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_18", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto19>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_19", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto2>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_2", "Y");

            entity.Property(e => e.Ciclo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ciclo");
            entity.Property(e => e.Division)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("division");
            entity.Property(e => e.FechAper)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fech_aper");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.LimCred)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lim_cred");
            entity.Property(e => e.Plaza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("plaza");
            entity.Property(e => e.Prestamo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prestamo");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.Region)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("region");
        });

        modelBuilder.Entity<SegmProducto20>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_20", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto21>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_21", "Y");

            entity.Property(e => e.Cartera)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Operación)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("operación");
        });

        modelBuilder.Entity<SegmProducto22>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_22", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto23>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_23", "Y");

            entity.Property(e => e.Cp)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cp");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto25>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_25", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto26>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_26", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto28>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_28", "Y");

            entity.Property(e => e.Division)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("division");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ESTADO");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Plaza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("plaza");
            entity.Property(e => e.Poblacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("POBLACION");
            entity.Property(e => e.PrestCoor)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prest_coor");
            entity.Property(e => e.TipoQuita)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tipo_quita");
        });

        modelBuilder.Entity<SegmProducto29>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_29", "Y");

            entity.Property(e => e.Billing)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("billing");
            entity.Property(e => e.Bin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bin ");
            entity.Property(e => e.Cliente)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DescSegmento)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DESC_SEGMENTO");
            entity.Property(e => e.FecApert)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_apert");
            entity.Property(e => e.Grupo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("grupo");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Nomestado)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Org)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("org");
        });

        modelBuilder.Entity<SegmProducto3>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_3", "Y");

            entity.Property(e => e.Ciclo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ciclo");
            entity.Property(e => e.Division)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("division");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.FechaAper)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fecha_aper");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.MontoAper)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("monto_aper");
            entity.Property(e => e.Plaza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("plaza");
            entity.Property(e => e.Poblacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("poblacion");
            entity.Property(e => e.Prestamo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prestamo");
            entity.Property(e => e.Rango)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("RANGO");
            entity.Property(e => e.Region)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("region");
        });

        modelBuilder.Entity<SegmProducto30>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_30", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto31>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_31", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto35>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_35", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
        });

        modelBuilder.Entity<SegmProducto37>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_37", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto38>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_38", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto39>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_39", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto4>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_4", "Y");

            entity.Property(e => e.Ciclo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ciclo");
            entity.Property(e => e.Division)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("division");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Plaza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("plaza");
            entity.Property(e => e.Prestamo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prestamo");
            entity.Property(e => e.Region)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("region");
            entity.Property(e => e.Zona)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("zona");
        });

        modelBuilder.Entity<SegmProducto40>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_40", "Y");

            entity.Property(e => e.Billing)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("billing");
            entity.Property(e => e.Bin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bin");
            entity.Property(e => e.Cliente)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FecApert)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_apert");
            entity.Property(e => e.Grupo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("grupo");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.MesCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mes castigo");
            entity.Property(e => e.Org)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("org");
        });

        modelBuilder.Entity<SegmProducto41>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_41", "Y");

            entity.Property(e => e.Generico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("generico");
            entity.Property(e => e.GenericoPll)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("generico pll");
            entity.Property(e => e.Grupo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("grupo");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.MesCastigo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("mes castigo");
            entity.Property(e => e.Nomestado)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Producto)
                .HasMaxLength(31)
                .IsUnicode(false);
        });

        modelBuilder.Entity<SegmProducto42>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_42", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto43>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_43", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.PeriodoPago)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("periodo_pago");
            entity.Property(e => e.SucSocio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("suc_socio");
        });

        modelBuilder.Entity<SegmProducto44>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_44", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.NombreSucursal)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre sucursal");
            entity.Property(e => e.RegionCobranza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("region_cobranza");
            entity.Property(e => e.SucSocio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("suc_socio");
        });

        modelBuilder.Entity<SegmProducto49>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_49", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto5>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_5", "Y");

            entity.Property(e => e.CartIni)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cart_ini");
            entity.Property(e => e.Division)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("division");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Plaza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("plaza");
            entity.Property(e => e.Prestamo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prestamo");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.Region)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("region");
        });

        modelBuilder.Entity<SegmProducto50>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_50", "Y");

            entity.Property(e => e.Billing)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BILLING");
            entity.Property(e => e.Bin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("BIN");
            entity.Property(e => e.Cliente)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DescSegmento)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("DESC_SEGMENTO");
            entity.Property(e => e.FecApert)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fec_apert");
            entity.Property(e => e.GenericoPll)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("GENERICO PLL");
            entity.Property(e => e.Grupo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("grupo");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.Nomestado)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Org)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<SegmProducto51>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_51", "Y");

            entity.Property(e => e.Division)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("division");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.MarcaAuto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("marca auto");
            entity.Property(e => e.Modelo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("modelo");
            entity.Property(e => e.Persona)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("persona");
            entity.Property(e => e.Plaza)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("plaza");
            entity.Property(e => e.Regional)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("regional");
            entity.Property(e => e.Serie)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("serie");
            entity.Property(e => e.SubMarca)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sub marca");
        });

        modelBuilder.Entity<SegmProducto52>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_52", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto53>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_53", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto54>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_54", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto55>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_55", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto6>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_6", "Y");

            entity.Property(e => e.DiaCorte)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dia_corte");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto61>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_61", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto63>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_63", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto67>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_67", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto7>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_7", "Y");

            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_actual");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento_actual");
        });

        modelBuilder.Entity<SegmProducto72>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_72", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto8>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_8", "Y");

            entity.Property(e => e.AgenciaActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("agencia_actual");
            entity.Property(e => e.Estado)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
            entity.Property(e => e.ProgramaEspecial)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PROGRAMA_ESPECIAL");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento_actual");
        });

        modelBuilder.Entity<SegmProducto81>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_81", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto82>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_82", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto83>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_83", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto84>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_84", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto85>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_85", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto86>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_86", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto87>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_87", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto88>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_88", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto89>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_89", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto9>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_9", "Y");

            entity.Property(e => e.Delegacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("delegacion");
            entity.Property(e => e.DescEtiq)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("desc_etiq");
            entity.Property(e => e.Estatus)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("estatus");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto90>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_90", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmProducto96>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SEGM_Producto_96", "Y");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Insert).HasColumnName("_Insert");
        });

        modelBuilder.Entity<SegmentaciónInternaReporte>(entity =>
        {
            entity.HasKey(e => e.IdSegmentación).HasName("PK_CatalogoReportesCartera");

            entity.Property(e => e.IdSegmentación)
                .ValueGeneratedOnAdd()
                .HasColumnName("idSegmentación");
            entity.Property(e => e.Grupo)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IdCartera).HasDefaultValue(1);
            entity.Property(e => e.Segmentación)
                .HasMaxLength(8000)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Seguimiento>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert, e.SegundoInsert }).IsClustered(false);

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.DatoContacto)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.IdAcercamiento)
                .HasComment("Acercamiento que se solicita.")
                .HasColumnName("idAcercamiento");
            entity.Property(e => e.IdEjecutivo)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.IdEjecutivoRealizado).HasColumnName("idEjecutivoRealizado");
            entity.Property(e => e.NúmeroTelefónico).HasComment("Número telefónico a 10 dígitos");
            entity.Property(e => e.Realizado)
                .HasDefaultValue(false)
                .HasComment("Si se cumplió el seguimiento o no. ");
            entity.Property(e => e.SegundoRealizado).HasPrecision(0);
            entity.Property(e => e.SegundoSeguimiento).HasPrecision(0);
        });

        modelBuilder.Entity<Segundo>(entity =>
        {
            entity.HasKey(e => e.Segundo1);

            entity.Property(e => e.Segundo1)
                .HasPrecision(0)
                .HasColumnName("Segundo");
        });

        modelBuilder.Entity<SolicitudesBúsquedum>(entity =>
        {
            entity.HasKey(e => new { e.IdCuenta, e.IdCartera, e.FechaInsert }).HasName("PK_SolicitudesBúsqueda_1");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdEjecutivo)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.IdSolicitudBúsqueda).HasColumnName("idSolicitudBúsqueda");
        });

        modelBuilder.Entity<SolicitudesEstadosDeCuentum>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert, e.SegundoInsert });

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.CorreoElectrónico)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
        });

        modelBuilder.Entity<TelefonosTn>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TelefonosTN");

            entity.Property(e => e.Causanopago)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("causanopago");
            entity.Property(e => e.Contactos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CódigoAccion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoDeAgencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.FechaPago)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.FechaPromesa)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.GrupoCuenta)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.Observaciones)
                .HasMaxLength(41)
                .IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("situacion");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<TelefonosTnn>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TelefonosTNN");

            entity.Property(e => e.Causanopago)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("causanopago");
            entity.Property(e => e.Contactos)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CódigoAccion)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoDeAgencia)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.FechaPago)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.FechaPromesa)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.GrupoCuenta)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.Observaciones)
                .HasMaxLength(41)
                .IsUnicode(false);
            entity.Property(e => e.Segmento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("segmento");
            entity.Property(e => e.SegmentoActual)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("situacion");
            entity.Property(e => e.Teléfono)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("TIPO");
        });

        modelBuilder.Entity<Teléfono>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.NúmeroTelefónico }).HasFillFactor(70);

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
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.HusoHorario).HasComputedColumnSql("(case [Estado] when 'BC' then (-2) when 'BCS' then (-1) when 'CHIH' then (-1) when 'NAY' then (-1) when 'SIN' then (-1) when 'SON' then (-1) when 'QROO' then (1) when 'QR' then (1) else (0) end)", false);
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdEjecutivoClasificación).HasColumnName("idEjecutivoClasificación");
            entity.Property(e => e.IdOrigen).HasColumnName("idOrigen");
            entity.Property(e => e.IdTelefonía).HasColumnName("idTelefonía");
            entity.Property(e => e.Municipio)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SegHorarioContacto).HasPrecision(0);
        });

        modelBuilder.Entity<TeléfonosHistórico>(entity =>
        {
            entity.HasKey(e => new { e.VálidoHasta, e.IdCartera, e.IdCuenta, e.NúmeroTelefónico });

            entity.ToTable("Teléfonos_Histórico");

            entity.HasIndex(e => new { e.IdCartera, e.IdCuenta, e.NúmeroTelefónico, e.VálidoDesde }, "IX_Teléfonos_Histórico_Desde").IsUnique();

            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdClase).HasColumnName("idClase");
            entity.Property(e => e.IdOrigen).HasColumnName("idOrigen");
            entity.Property(e => e.IdTelefonía).HasColumnName("idTelefonía");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
        });

        modelBuilder.Entity<Valhistduplicado>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("valhistduplicado");

            entity.Property(e => e.Asignacion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Batchdate)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("batchdate");
            entity.Property(e => e.C120)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c120");
            entity.Property(e => e.C150)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c150");
            entity.Property(e => e.C180)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("c180");
            entity.Property(e => e.CollectibilityCode)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Cur)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cur");
            entity.Property(e => e.CurrentAgencyId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CurrentBalanceAcorn)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CurrentBalanceG).HasColumnType("money");
            entity.Property(e => e.CycleCut)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("cycleCut");
            entity.Property(e => e.DateWoCancelled)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("date WO/Cancelled");
            entity.Property(e => e.EnrolladoSettlement)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Estabilizacion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FechaMinimomasatrasado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.FechaRecepción)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Initialbalance)
                .HasColumnType("money")
                .HasColumnName("initialbalance");
            entity.Property(e => e.LoanProductcode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("loan_productcode");
            entity.Property(e => e.MínimoMasAtrasado)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.MínimoMásAtrasado)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Mínimo más atrasado");
            entity.Property(e => e.N90)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("n90");
            entity.Property(e => e.Placement)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.PlacementLevelCode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("placementLevelCode");
            entity.Property(e => e.Recoveredcode)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("recoveredcode");
            entity.Property(e => e.S60)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("s60");
            entity.Property(e => e.Saldovencido)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.T30)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("t30");
            entity.Property(e => e.VálidoDesde).HasColumnName("_VálidoDesde");
            entity.Property(e => e.VálidoHasta).HasColumnName("_VálidoHasta");
        });

        modelBuilder.Entity<ValoresCatálogo>(entity =>
        {
            entity.HasKey(e => e.IdValor);

            entity.ToTable("ValoresCatálogo");

            entity.HasIndex(e => new { e.IdValor, e.Valor }, "IX_ValoresCatálogo");

            entity.HasIndex(e => new { e.IdCatálogo, e.IdValor }, "IX_ValoresCatálogo_idCatálogo").IsUnique();

            entity.HasIndex(e => new { e.IdCatálogo, e.Orden }, "IX_ValoresCatálogo_idCatálogoOrden");

            entity.Property(e => e.IdValor)
                .ValueGeneratedNever()
                .HasColumnName("idValor");
            entity.Property(e => e.Detalle)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FechaValor).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IdCatálogo).HasColumnName("idCatálogo");
            entity.Property(e => e.Orden).IsSparse();
            entity.Property(e => e.Valor)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ValorActivo).HasDefaultValue(true);

            entity.HasOne(d => d.IdCatálogoNavigation).WithMany(p => p.ValoresCatálogos)
                .HasForeignKey(d => d.IdCatálogo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ValoresCatálogo_Catálogos");
        });

        modelBuilder.Entity<VwAccionamiento>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_Accionamientos");

            entity.Property(e => e.Acercamiento)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Cargó)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Cuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Descripción)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<VwAccionamiento1>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_Accionamientos_");

            entity.Property(e => e.Acercamiento)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Cargó)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Cuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Descripción)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<VwCuentasHistórico>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_CuentasHistórico");

            entity.Property(e => e.Cartera)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CausaNoPago)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Causa no pago");
            entity.Property(e => e.Cuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Expediente)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.FechaCambioActivación).HasColumnName("Fecha Cambio Activación");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.MontoÚltimoPago).HasColumnType("money");
            entity.Property(e => e.Nivel)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreDeudor)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroCliente)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Rfc)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("RFC");
            entity.Property(e => e.Saldo).HasColumnType("money");
            entity.Property(e => e.Situación)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ÚltimaGestión)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ÚltimaNegociacion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ÚltimaVisita)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<VwGestionesDomiciliaria>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_GestionesDomiciliarias");

            entity.Property(e => e.Calle)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Cartera)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CausaNoPago)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ColoniaLocalidad)
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
            entity.Property(e => e.Contacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Cuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.CódigoPostal)
                .HasMaxLength(5)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.DelegaciónMunicipio)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Ecónomico)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Estado)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.FechaVisita).HasColumnName("Fecha Visita");
            entity.Property(e => e.Habitación)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.HoraVisita)
                .HasPrecision(0)
                .HasColumnName("Hora Visita");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroExterior)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroInterior)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Parentesco)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UsuarioCaptura)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("Usuario Captura");
            entity.Property(e => e.UsuarioVisita)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("Usuario Visita");
            entity.Property(e => e.Vivienda)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<VwGestionesEnNegociación>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_GestionesEnNegociación");

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
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.SegundoNegociación)
                .HasPrecision(0)
                .HasColumnName("Segundo_Negociación");
            entity.Property(e => e.TiempoEnCuenta).HasPrecision(0);
        });

        modelBuilder.Entity<VwGestionesTelefónica>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_GestionesTelefónicas");

            entity.Property(e => e.Acercamiento)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Cartera)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CausasNoPago)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Comentario).IsUnicode(false);
            entity.Property(e => e.Contacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Cuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Duración).HasPrecision(0);
            entity.Property(e => e.Expediente)
                .HasMaxLength(33)
                .IsUnicode(false);
            entity.Property(e => e.Hora).HasPrecision(0);
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.Modo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreDeudor)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.NombreEjecutivo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Parentesco)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
        });

        modelBuilder.Entity<VwGestionesTelefónicasX>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_GestionesTelefónicasX");

            entity.Property(e => e.Acercamiento)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Cartera)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CausasNoPago)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Comentario).IsUnicode(false);
            entity.Property(e => e.Contacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Cuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Duración).HasPrecision(0);
            entity.Property(e => e.Expediente)
                .HasMaxLength(33)
                .IsUnicode(false);
            entity.Property(e => e.Hora).HasPrecision(0);
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.Modo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreDeudor)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.NombreEjecutivo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Parentesco)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Situacion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
        });

        modelBuilder.Entity<VwMaxContacto>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_MaxContacto", "HSBC");

            entity.Property(e => e.Cuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
        });

        modelBuilder.Entity<VwNegociacionesOfrecimiento>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_NegociacionesOfrecimientos");

            entity.Property(e => e.CorreoElectrónico)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Cuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.EstadoNegociación)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaHora).HasColumnType("datetime");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.Herramienta)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.MontoOfrecido).HasColumnType("money");
            entity.Property(e => e.MontoPagado).HasColumnType("money");
            entity.Property(e => e.MontoRequerido).HasColumnType("money");
            entity.Property(e => e.Negoció)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SaldoNegociación).HasColumnType("money");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Validó)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<VwPagosAmex>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_PagosAmex");

            entity.Property(e => e.FechaPago).HasColumnType("datetime");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(255)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.MontoPago).HasColumnType("numeric(20, 4)");
            entity.Property(e => e.Referencia)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Segmentación)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Transactionid)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("transactionid");
        });

        modelBuilder.Entity<VwÚltimoCiclo>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_ÚltimoCiclo");

            entity.Property(e => e.IdCliente).HasColumnName("idCliente");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdFválidoDesde).HasColumnName("idFVálidoDesde");
            entity.Property(e => e.IdFválidoHasta).HasColumnName("idFVálidoHasta");
        });

        modelBuilder.Entity<_200Castigo>(entity =>
        {
            entity.HasKey(e => new { e.MesAsignación, e.IdCuenta }).HasName("PK_Resultados_200");

            entity.ToTable("200_Castigo", "HSBC");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.CódigoAcción)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.TipoAcción)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
        });

        modelBuilder.Entity<_200Vencidum>(entity =>
        {
            entity.HasKey(e => new { e.FechaProceso, e.IdCuenta, e.FechaInsert, e.SegundoInsert }).HasName("PK_Resultados_200Vencida");

            entity.ToTable("200_Vencida", "HSBC");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.CódigoAcción)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(8000)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
