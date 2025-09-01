using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Loki.ModelsDbAllocationAsura;

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

    public virtual DbSet<CamposAdicionale> CamposAdicionales { get; set; }

    public virtual DbSet<CamposAsig> CamposAsigs { get; set; }

    public virtual DbSet<CamposCondicionado> CamposCondicionados { get; set; }

    public virtual DbSet<CamposTxt> CamposTxts { get; set; }

    public virtual DbSet<CargasAlCliente> CargasAlClientes { get; set; }

    public virtual DbSet<Cartera> Carteras { get; set; }

    public virtual DbSet<CarterasPiso> CarterasPisos { get; set; }

    public virtual DbSet<CatalogoNuevoF> CatalogoNuevoFs { get; set; }

    public virtual DbSet<CheckM> CheckMs { get; set; }

    public virtual DbSet<CheckMBlock> CheckMBlocks { get; set; }

    public virtual DbSet<CodificacionesActualiza> CodificacionesActualizas { get; set; }

    public virtual DbSet<CuentasAcción> CuentasAccións { get; set; }

    public virtual DbSet<CuentasQueja> CuentasQuejas { get; set; }

    public virtual DbSet<CuentasQuejaHistorial> CuentasQuejaHistorials { get; set; }

    public virtual DbSet<CódigosPostale> CódigosPostales { get; set; }

    public virtual DbSet<DescuentosCoemitidaRecovery> DescuentosCoemitidaRecoveries { get; set; }

    public virtual DbSet<DescuentosFalabellaRecovery> DescuentosFalabellaRecoveries { get; set; }

    public virtual DbSet<DescuentosPagosFijosRecovery> DescuentosPagosFijosRecoveries { get; set; }

    public virtual DbSet<DescuentosPrivadaRecovery> DescuentosPrivadaRecoveries { get; set; }

    public virtual DbSet<Doms31187365> Doms31187365s { get; set; }

    public virtual DbSet<Doms7187354> Doms7187354s { get; set; }

    public virtual DbSet<Doms7187355> Doms7187355s { get; set; }

    public virtual DbSet<Doms7187358> Doms7187358s { get; set; }

    public virtual DbSet<Doms7187363> Doms7187363s { get; set; }

    public virtual DbSet<Ejecucione> Ejecuciones { get; set; }

    public virtual DbSet<FechasAsignaciónOficial> FechasAsignaciónOficials { get; set; }

    public virtual DbSet<GestionesDomiciliaria> GestionesDomiciliarias { get; set; }

    public virtual DbSet<IftTeléfono> IftTeléfonos { get; set; }

    public virtual DbSet<Job> Jobs { get; set; }

    public virtual DbSet<Layout> Layouts { get; set; }

    public virtual DbSet<LogArchivo> LogArchivos { get; set; }

    public virtual DbSet<LogAsignación> LogAsignacións { get; set; }

    public virtual DbSet<LogIngreso> LogIngresos { get; set; }

    public virtual DbSet<LogProceso> LogProcesos { get; set; }

    public virtual DbSet<Mail31187367Pivot> Mail31187367Pivots { get; set; }

    public virtual DbSet<Mail7187353Pivot> Mail7187353Pivots { get; set; }

    public virtual DbSet<Mail7187357Pivot> Mail7187357Pivots { get; set; }

    public virtual DbSet<Mail7187362Pivot> Mail7187362Pivots { get; set; }

    public virtual DbSet<MailProducto3103061> MailProducto3103061s { get; set; }

    public virtual DbSet<MailProducto4103056> MailProducto4103056s { get; set; }

    public virtual DbSet<MailProducto4103058> MailProducto4103058s { get; set; }

    public virtual DbSet<PagosNegativo> PagosNegativos { get; set; }

    public virtual DbSet<Proceso> Procesos { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<PruebaCodificon> PruebaCodificons { get; set; }

    public virtual DbSet<Tels31187366Pivot> Tels31187366Pivots { get; set; }

    public virtual DbSet<Tels7187356Pivot> Tels7187356Pivots { get; set; }

    public virtual DbSet<Tels7187359Pivot> Tels7187359Pivots { get; set; }

    public virtual DbSet<Tels7187364Pivot> Tels7187364Pivots { get; set; }

    public virtual DbSet<TelsProducto2103065> TelsProducto2103065s { get; set; }

    public virtual DbSet<TelsProducto2103067> TelsProducto2103067s { get; set; }

    public virtual DbSet<TelsProducto28103069> TelsProducto28103069s { get; set; }

    public virtual DbSet<TelsProducto3103060> TelsProducto3103060s { get; set; }

    public virtual DbSet<TelsProducto3103062> TelsProducto3103062s { get; set; }

    public virtual DbSet<TelsProducto4103055> TelsProducto4103055s { get; set; }

    public virtual DbSet<TelsProducto4103057> TelsProducto4103057s { get; set; }

    public virtual DbSet<TeléfonosAllocation> TeléfonosAllocations { get; set; }

    public virtual DbSet<TeléfonosComplemento> TeléfonosComplementos { get; set; }

    public virtual DbSet<TipodeCambio> TipodeCambios { get; set; }

    public virtual DbSet<TiposCampo> TiposCampos { get; set; }

    public virtual DbSet<UsuariosCyber> UsuariosCybers { get; set; }

    public virtual DbSet<Val200> Val200s { get; set; }

    public virtual DbSet<Val200v> Val200vs { get; set; }

    public virtual DbSet<Val200vv> Val200vvs { get; set; }

    public virtual DbSet<VisitasPrueba> VisitasPruebas { get; set; }

    public virtual DbSet<VwCarterasProducto> VwCarterasProductos { get; set; }

    public virtual DbSet<VwEjecucionesDetalle> VwEjecucionesDetalles { get; set; }

    public virtual DbSet<VwLogAsignación> VwLogAsignacións { get; set; }

    public virtual DbSet<VwProductosFechaInicial> VwProductosFechaInicials { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=192.168.7.30;database=dbAllocation;uid=login_Ejecutor;pwd=3j3123/*-;encrypt=true;trustservercertificate=true");

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

        modelBuilder.Entity<CarterasPiso>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("CarterasPiso");

            entity.Property(e => e.Cartera)
                .HasMaxLength(100)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AS");
            entity.Property(e => e.Piso)
                .HasMaxLength(10)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CS_AI");
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

        modelBuilder.Entity<CheckM>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("Check_M");

            entity.Property(e => e.Application)
                .HasMaxLength(128)
                .UseCollation("Modern_Spanish_CS_AI");
            entity.Property(e => e.BlockedBy)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("Blocked By");
            entity.Property(e => e.Command)
                .HasMaxLength(32)
                .UseCollation("Modern_Spanish_CS_AI");
            entity.Property(e => e.Database).HasMaxLength(128);
            entity.Property(e => e.HeadBlocker)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("Head Blocker");
            entity.Property(e => e.HostName)
                .HasMaxLength(128)
                .UseCollation("Modern_Spanish_CS_AI")
                .HasColumnName("Host Name");
            entity.Property(e => e.Login)
                .HasMaxLength(128)
                .UseCollation("Modern_Spanish_CS_AI");
            entity.Property(e => e.SessionId).HasColumnName("Session ID");
            entity.Property(e => e.TaskState)
                .HasMaxLength(60)
                .UseCollation("Modern_Spanish_CS_AI")
                .HasColumnName("Task State");
            entity.Property(e => e.WaitTimeMs).HasColumnName("Wait Time (ms)");
            entity.Property(e => e.WaitType)
                .HasMaxLength(60)
                .UseCollation("Modern_Spanish_CS_AI")
                .HasColumnName("Wait Type");
        });

        modelBuilder.Entity<CheckMBlock>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("Check_M_Block");

            entity.Property(e => e.Application)
                .HasMaxLength(128)
                .UseCollation("Modern_Spanish_CS_AI");
            entity.Property(e => e.BlockedBy)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("Blocked By");
            entity.Property(e => e.Command)
                .HasMaxLength(32)
                .UseCollation("Modern_Spanish_CS_AI");
            entity.Property(e => e.Database).HasMaxLength(128);
            entity.Property(e => e.HeadBlocker)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("Head Blocker");
            entity.Property(e => e.HostName)
                .HasMaxLength(128)
                .UseCollation("Modern_Spanish_CS_AI")
                .HasColumnName("Host Name");
            entity.Property(e => e.Login)
                .HasMaxLength(128)
                .UseCollation("Modern_Spanish_CS_AI");
            entity.Property(e => e.SessionId).HasColumnName("Session ID");
            entity.Property(e => e.TaskState)
                .HasMaxLength(60)
                .UseCollation("Modern_Spanish_CS_AI")
                .HasColumnName("Task State");
            entity.Property(e => e.WaitTimeMs).HasColumnName("Wait Time (ms)");
            entity.Property(e => e.WaitType)
                .HasMaxLength(60)
                .UseCollation("Modern_Spanish_CS_AI")
                .HasColumnName("Wait Type");
        });

        modelBuilder.Entity<CodificacionesActualiza>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("CodificacionesActualiza");

            entity.Property(e => e.Codificacion)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.NombreTablaProducto)
                .HasMaxLength(18)
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

        modelBuilder.Entity<DescuentosCoemitidaRecovery>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DescuentosCoemitidaRecovery");

            entity.Property(e => e.DescuentoAplicar12Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 12 Meses");
            entity.Property(e => e.DescuentoAplicar24Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento aplicar 24 Meses");
            entity.Property(e => e.DescuentoAplicar30DiasDescuentoAplicar30DiasDescuentoAplicar30Dias)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 30 Dias\r\nDescuento Aplicar 30 Dias\r\nDescuento Aplicar 30 Dias");
            entity.Property(e => e.DescuentoAplicar3Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 3 Meses");
            entity.Property(e => e.DescuentoAplicar6Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 6 Meses");
            entity.Property(e => e.DescuentoAplicarMayorA24YMenorA48Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento aplicar mayor a 24 y menor a 48 meses");
            entity.Property(e => e.Segmento)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<DescuentosFalabellaRecovery>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DescuentosFalabellaRecovery");

            entity.Property(e => e.DescuentoAplicar12Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 12 Meses");
            entity.Property(e => e.DescuentoAplicar24Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 24 Meses");
            entity.Property(e => e.DescuentoAplicar30Dias)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 30 Dias");
            entity.Property(e => e.DescuentoAplicar3Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 3 Meses");
            entity.Property(e => e.DescuentoAplicar6Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 6 Meses");
            entity.Property(e => e.DescuentoAplicarMayorA24YMenorA48Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento aplicar mayor a 24 y menor a 48 meses");
            entity.Property(e => e.Segmento)
                .HasMaxLength(50)
                .IsFixedLength();
        });

        modelBuilder.Entity<DescuentosPagosFijosRecovery>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DescuentosPagosFijosRecovery");

            entity.Property(e => e.DescuentoAplicar12Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 12 Meses");
            entity.Property(e => e.DescuentoAplicar24Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 24 Meses");
            entity.Property(e => e.DescuentoAplicar30Dias)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 30 Dias");
            entity.Property(e => e.DescuentoAplicar3Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 3 Meses");
            entity.Property(e => e.DescuentoAplicar6Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 6 Meses");
            entity.Property(e => e.DescuentoAplicarMayorA24YMenorA48Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento aplicar mayor a 24 y menor a 48 meses");
            entity.Property(e => e.Segmento)
                .HasMaxLength(50)
                .IsFixedLength();
        });

        modelBuilder.Entity<DescuentosPrivadaRecovery>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DescuentosPrivadaRecovery");

            entity.Property(e => e.DescuentoAplicar12Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 12 Meses");
            entity.Property(e => e.DescuentoAplicar24Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 24 Meses");
            entity.Property(e => e.DescuentoAplicar30Dias)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 30 Dias");
            entity.Property(e => e.DescuentoAplicar3Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 3 Meses");
            entity.Property(e => e.DescuentoAplicar6Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento Aplicar 6 Meses");
            entity.Property(e => e.DescuentoAplicarMayorA24YMenorA48Meses)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("Descuento aplicar mayor a 24 y menor a 48 meses");
            entity.Property(e => e.Segmento)
                .HasMaxLength(50)
                .IsFixedLength();
        });

        modelBuilder.Entity<Doms31187365>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DOMS_31_187365", "Temp");

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

        modelBuilder.Entity<Doms7187354>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DOMS_7_187354", "Temp");

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

        modelBuilder.Entity<Doms7187355>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DOMS_7_187355", "Temp");

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

        modelBuilder.Entity<Doms7187358>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DOMS_7_187358", "Temp");

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

        modelBuilder.Entity<Doms7187363>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DOMS_7_187363", "Temp");

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

        modelBuilder.Entity<Mail31187367Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_31_187367_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Mail7187353Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_7_187353_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Mail7187357Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_7_187357_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Mail7187362Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_7_187362_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<MailProducto3103061>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_Producto_3_103061", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<MailProducto4103056>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_Producto_4_103056", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<MailProducto4103058>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("MAIL_Producto_4_103058", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
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

        modelBuilder.Entity<PruebaCodificon>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PruebaCodificon");

            entity.Property(e => e.Codificación)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.Idcuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Nomenclatura)
                .HasMaxLength(70)
                .IsUnicode(false);
            entity.Property(e => e.TreatmentAccept).HasColumnName("treatmentAccept");
            entity.Property(e => e.TreatmentCompletion).HasColumnName("treatmentCompletion");
            entity.Property(e => e.TreatmentOffer).HasColumnName("treatmentOffer");
            entity.Property(e => e.TreatmentProgram)
                .HasMaxLength(7)
                .IsUnicode(false)
                .HasColumnName("treatmentProgram");
        });

        modelBuilder.Entity<Tels31187366Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_31_187366_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Tels7187356Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_7_187356_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Tels7187359Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_7_187359_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<Tels7187364Pivot>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_7_187364_Pivot", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<TelsProducto2103065>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_Producto_2_103065", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<TelsProducto2103067>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_Producto_2_103067", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<TelsProducto28103069>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_Producto_28_103069", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<TelsProducto3103060>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_Producto_3_103060", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<TelsProducto3103062>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_Producto_3_103062", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<TelsProducto4103055>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_Producto_4_103055", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<TelsProducto4103057>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TELS_Producto_4_103057", "Temp");

            entity.Property(e => e.CampoAsig)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
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

        modelBuilder.Entity<TipodeCambio>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TipodeCambio");

            entity.Property(e => e.TipodeCambio1)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("TipodeCambio");
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
                .HasMaxLength(4)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
        });

        modelBuilder.Entity<Val200>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("VAL200");

            entity.Property(e => e.CódigoAcción)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.Grupo).HasColumnName("grupo");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroTelefónico)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Prestamo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Tipo)
                .HasMaxLength(19)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Val200v>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("VAL200V");

            entity.Property(e => e.CódigoAcción)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.Grupo).HasColumnName("grupo");
            entity.Property(e => e.IdCausaNoPago).HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroTelefónico)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Prestamo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Tipo)
                .HasMaxLength(19)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Val200vv>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("VAL200vv");

            entity.Property(e => e.CódigoAcción)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.Grupo).HasColumnName("grupo");
            entity.Property(e => e.IdCausaNoPago).HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroTelefónico)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Prestamo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Tipo)
                .HasMaxLength(19)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<VisitasPrueba>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("VisitasPrueba");

            entity.Property(e => e.CódigoAcción)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.CódigoResultado)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.Grupo).HasColumnName("grupo");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.Lada)
                .HasMaxLength(3)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroTelefónico)
                .HasMaxLength(8)
                .IsUnicode(false);
            entity.Property(e => e.Observaciones).IsUnicode(false);
            entity.Property(e => e.Prestamo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.Tipo)
                .HasMaxLength(14)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(10)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CS_AI");
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
