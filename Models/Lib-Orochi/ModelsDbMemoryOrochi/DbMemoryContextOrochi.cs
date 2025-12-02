using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Loki.OrochiLibrary.Memory;

public partial class DbMemoryContextOrochi : DbContext
{
    public DbMemoryContextOrochi()
    {
    }

    public DbMemoryContextOrochi(DbContextOptions<DbMemoryContextOrochi> options)
        : base(options)
    {
    }

    public virtual DbSet<Campaña> Campañas { get; set; }

    public virtual DbSet<FilasDeTrabajo> FilasDeTrabajos { get; set; }

    public virtual DbSet<FilasTemp1> FilasTemp1s { get; set; }

    public virtual DbSet<GruposDeTrabajo> GruposDeTrabajos { get; set; }

    public virtual DbSet<Productividad> Productividads { get; set; }

    public virtual DbSet<Sesione> Sesiones { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=192.168.7.122; database=dbMemory; uid=login_ejecutor; pwd=3j3123/*-; encrypt=true;trustservercertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Campaña>(entity =>
        {
            entity.HasKey(e => e.IdCampaña).IsClustered(false);

            entity.ToTable("Campañas", "AMS");

            entity.HasIndex(e => new { e.IdEjecutivoInsert, e.Campaña1 }, "AK_Nombre").IsUnique();

            entity.HasIndex(e => e.IdProducto, "IX_Campañas").IsClustered();

            entity.Property(e => e.IdCampaña).HasColumnName("idCampaña");
            entity.Property(e => e.Campaña1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Campaña");
            entity.Property(e => e.IdEjecutivoInsert).HasColumnName("idEjecutivo_Insert");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
        });

        modelBuilder.Entity<FilasDeTrabajo>(entity =>
        {
            entity.HasKey(e => e.IdFilaDeTrabajo).HasName("PK__FilasDeT__87EEFA0A566C7CC8");

            entity
                .ToTable("FilasDeTrabajo", "AMS")
                .IsMemoryOptimized();

            entity.HasIndex(e => new { e.IdCampaña, e.IdEjecutivo }, "IX_FilasTrabajo");

            entity.Property(e => e.IdFilaDeTrabajo).HasColumnName("idFilaDeTrabajo");
            entity.Property(e => e.IdCampaña).HasColumnName("idCampaña");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
        });

        modelBuilder.Entity<FilasTemp1>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("FilasTemp_1", "AMS")
                .IsMemoryOptimized();

            entity.HasIndex(e => e.IdCuenta, "IX_FilasCuenta_1");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Usuario)
                .HasMaxLength(10)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2");
        });

        modelBuilder.Entity<GruposDeTrabajo>(entity =>
        {
            entity.HasKey(e => new { e.IdCampaña, e.IdEjecutivo })
                .HasName("PK__GruposDe__A423DC15490A8414")
                .IsClustered(false);

            entity
                .ToTable("GruposDeTrabajo", "AMS")
                .IsMemoryOptimized();

            entity.HasIndex(e => new { e.IdEjecutivo, e.Encendida }, "IX_GrupoTrabajo");

            entity.Property(e => e.IdCampaña).HasColumnName("idCampaña");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.Encendida).HasDefaultValue(true);
        });

        modelBuilder.Entity<Productividad>(entity =>
        {
            entity.HasKey(e => new { e.IdEjecutivo, e.Hora }).HasName("PK__Producti__6731E3669F490C05");

            entity
                .ToTable("Productividad", "PS")
                .IsMemoryOptimized();

            entity.HasIndex(e => e.IdEjecutivo, "IX_Productividad");

            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.FechaInsert)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("Fecha_Insert");
        });

        modelBuilder.Entity<Sesione>(entity =>
        {
            entity.HasKey(e => e.IdEjecutivo).HasName("PK__Sesiones__01E1027523B4A4DA");

            entity
                .ToTable("Sesiones", "PS")
                .IsMemoryOptimized();

            entity.Property(e => e.IdEjecutivo)
                .ValueGeneratedNever()
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.FechaIngreso)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("Fecha_Ingreso");
            entity.Property(e => e.HoraModo).HasColumnType("datetime");
            entity.Property(e => e.HoraPrimerGestión).HasPrecision(0);
            entity.Property(e => e.IdEncargado).HasColumnName("idEncargado");
            entity.Property(e => e.Ip)
                .HasMaxLength(20)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AI")
                .HasColumnName("IP");
            entity.Property(e => e.Modo)
                .HasMaxLength(20)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AI");
            entity.Property(e => e.SegundoIngreso)
                .HasPrecision(0)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("Segundo_Ingreso");
            entity.Property(e => e.SegundoSalida)
                .HasPrecision(0)
                .HasColumnName("Segundo_Salida");
            entity.Property(e => e.TiempoBaño).HasPrecision(0);
            entity.Property(e => e.TiempoCalidad).HasPrecision(0);
            entity.Property(e => e.TiempoComida).HasPrecision(0);
            entity.Property(e => e.TiempoConocidos).HasPrecision(0);
            entity.Property(e => e.TiempoCuentas).HasPrecision(0);
            entity.Property(e => e.TiempoCurso).HasPrecision(0);
            entity.Property(e => e.TiempoDesconocidos).HasPrecision(0);
            entity.Property(e => e.TiempoFallaTécnica).HasPrecision(0);
            entity.Property(e => e.TiempoNegociaciones).HasPrecision(0);
            entity.Property(e => e.TiempoPermiso).HasPrecision(0);
            entity.Property(e => e.TiempoSinContacto).HasPrecision(0);
            entity.Property(e => e.TiempoTitulares).HasPrecision(0);
            entity.Property(e => e.Usuario)
                .HasMaxLength(5)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_CI_AI");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
