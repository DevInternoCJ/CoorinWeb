using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Loki.AsuraLibrary.ModelsBBVA_VGP;

public partial class BbvaVgpContext : DbContext
{
    public BbvaVgpContext()
    {
    }

    public BbvaVgpContext(DbContextOptions<BbvaVgpContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Auto> Autos { get; set; }

    public virtual DbSet<Catálogo> Catálogos { get; set; }

    public virtual DbSet<DocumentaciónAuto> DocumentaciónAutos { get; set; }

    public virtual DbSet<DomiciliosRecolección> DomiciliosRecoleccións { get; set; }

    public virtual DbSet<InventarioAuto> InventarioAutos { get; set; }

    public virtual DbSet<Solicitude> Solicitudes { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<ValoresCatálogo> ValoresCatálogos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=192.168.7.123; database=BBVA_VGP; uid=login_ejecutor; pwd=3j3123/*-; encrypt=true;trustservercertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Auto>(entity =>
        {
            entity.HasKey(e => e.IdAuto).HasName("PK_idAuto");

            entity.Property(e => e.IdAuto).HasColumnName("idAuto");
            entity.Property(e => e.Color)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdDomicilio).HasColumnName("idDomicilio");
            entity.Property(e => e.Marca)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Modelo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NoMotor)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NoSerie)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Placas)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Versión)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdDomicilioNavigation).WithMany(p => p.Autos)
                .HasForeignKey(d => d.IdDomicilio)
                .HasConstraintName("FK_idDomicilio_Autos_DomiciliosRecolección");
        });

        modelBuilder.Entity<Catálogo>(entity =>
        {
            entity.HasKey(e => e.IdCatálogo).HasName("PK_idCatálogo");

            entity.Property(e => e.IdCatálogo)
                .ValueGeneratedNever()
                .HasColumnName("idCatálogo");
            entity.Property(e => e.Catálogo1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Catálogo");
            entity.Property(e => e.Descripción)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.NombreId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("NombreID");
        });

        modelBuilder.Entity<DocumentaciónAuto>(entity =>
        {
            entity.HasKey(e => new { e.IdAuto, e.IdDocumento }).HasName("PK_idDocumento");

            entity.ToTable("DocumentaciónAuto");

            entity.Property(e => e.IdAuto).HasColumnName("idAuto");
            entity.Property(e => e.IdDocumento).HasColumnName("idDocumento");
            entity.Property(e => e.Observación)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Original).HasColumnName("_Original");

            entity.HasOne(d => d.IdAutoNavigation).WithMany(p => p.DocumentaciónAutos)
                .HasForeignKey(d => d.IdAuto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_idAuto_DocumentaciónAuto_Autos");

            entity.HasOne(d => d.IdDocumentoNavigation).WithMany(p => p.DocumentaciónAutos)
                .HasForeignKey(d => d.IdDocumento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_idDocumentación_ValoresCatálogo");
        });

        modelBuilder.Entity<DomiciliosRecolección>(entity =>
        {
            entity.HasKey(e => e.IdDomicilio).HasName("PK_idDomicilio");

            entity.ToTable("DomiciliosRecolección");

            entity.Property(e => e.IdDomicilio).HasColumnName("idDomicilio");
            entity.Property(e => e.Calle)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.ColoniaLocalidad)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.CódigoPostal)
                .HasMaxLength(5)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.DelegaciónMunicipio)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Existía).HasColumnName("_Existía");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.NúmeroExterior)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.NúmeroInterior)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<InventarioAuto>(entity =>
        {
            entity.HasKey(e => new { e.IdAuto, e.IdParte }).HasName("PK_idInventario");

            entity.ToTable("InventarioAuto");

            entity.Property(e => e.IdAuto).HasColumnName("idAuto");
            entity.Property(e => e.IdParte).HasColumnName("idParte");
            entity.Property(e => e.Bueno).HasColumnName("_Bueno");
            entity.Property(e => e.Malo).HasColumnName("_Malo");
            entity.Property(e => e.Regular).HasColumnName("_Regular");

            entity.HasOne(d => d.IdParteNavigation).WithMany(p => p.InventarioAutos)
                .HasForeignKey(d => d.IdParte)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_idParte_Inventario_ValoresCatálogo");
        });

        modelBuilder.Entity<Solicitude>(entity =>
        {
            entity.HasKey(e => new { e.IdAuto, e.IdCartera, e.IdCuenta }).HasName("PK_idSolicitud");

            entity.Property(e => e.IdAuto).HasColumnName("idAuto");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsFixedLength()
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEstado).HasColumnName("idEstado");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.IdAutoNavigation).WithMany(p => p.Solicitudes)
                .HasForeignKey(d => d.IdAuto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_idAuto_Solicitudes_Autos");

            entity.HasOne(d => d.IdEstadoNavigation).WithMany(p => p.Solicitudes)
                .HasForeignKey(d => d.IdEstado)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_idEstado_Solicitudes_ValoresCatálogo");

            entity.HasOne(d => d.UsuarioNavigation).WithMany(p => p.Solicitudes)
                .HasForeignKey(d => d.Usuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Usuario_Solicitudes_Usuarios");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Usuario1).HasName("PK_Usuario");

            entity.Property(e => e.Usuario1)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Usuario");
            entity.Property(e => e.Activo).HasColumnName("_Activo");
            entity.Property(e => e.Contraseña).HasMaxLength(128);
            entity.Property(e => e.Contraseña2).HasMaxLength(128);
        });

        modelBuilder.Entity<ValoresCatálogo>(entity =>
        {
            entity.HasKey(e => e.IdValor).HasName("PK_idValor");

            entity.ToTable("ValoresCatálogo");

            entity.Property(e => e.IdValor)
                .ValueGeneratedNever()
                .HasColumnName("idValor");
            entity.Property(e => e.Activo).HasColumnName("_Activo");
            entity.Property(e => e.Detalle)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCatálogo).HasColumnName("idCatálogo");
            entity.Property(e => e.Valor)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdCatálogoNavigation).WithMany(p => p.ValoresCatálogos)
                .HasForeignKey(d => d.IdCatálogo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ValoresCatálogo_Catálogos");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
