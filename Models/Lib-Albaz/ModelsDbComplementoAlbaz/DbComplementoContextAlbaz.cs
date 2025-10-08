using System;
using System.Collections.Generic;
using Loki.AlbazLibrary.Complemento;
using Microsoft.EntityFrameworkCore;

namespace Loki.AlbazLibrary;

public partial class DbComplementoContextAlbaz : DbContext
{
    public DbComplementoContextAlbaz()
    {
    }

    public DbComplementoContextAlbaz(DbContextOptions<DbComplementoContextAlbaz> options)
        : base(options)
    {
    }

    public virtual DbSet<Acci16763> Acci16763s { get; set; }

    public virtual DbSet<Acci20174> Acci20174s { get; set; }

    public virtual DbSet<Acci23912> Acci23912s { get; set; }

    public virtual DbSet<Acci25362> Acci25362s { get; set; }

    public virtual DbSet<Acci28916> Acci28916s { get; set; }

    public virtual DbSet<Accionamiento> Accionamientos { get; set; }

    public virtual DbSet<AsistenciaComplemento> AsistenciaComplementos { get; set; }

    public virtual DbSet<Com23389> Com23389s { get; set; }

    public virtual DbSet<Cue20571> Cue20571s { get; set; }

    public virtual DbSet<DatosDaim21340> DatosDaim21340s { get; set; }

    public virtual DbSet<DatosDaimler> DatosDaimlers { get; set; }

    public virtual DbSet<DatosDaimlerAcum> DatosDaimlerAcums { get; set; }

    public virtual DbSet<Ejecutivo> Ejecutivos { get; set; }

    public virtual DbSet<EjecutivosComplemento> EjecutivosComplementos { get; set; }

    public virtual DbSet<ErroresSensibilización> ErroresSensibilizacións { get; set; }

    public virtual DbSet<GestionesDomiciliaria> GestionesDomiciliarias { get; set; }

    public virtual DbSet<GestionesDomiciliariasEliminada> GestionesDomiciliariasEliminadas { get; set; }

    public virtual DbSet<GestionesDomiciliariasPaquete> GestionesDomiciliariasPaquetes { get; set; }

    public virtual DbSet<GestionesTelefónica> GestionesTelefónicas { get; set; }

    public virtual DbSet<GestionesTelefónicasSorianaTemp2> GestionesTelefónicasSorianaTemp2s { get; set; }

    public virtual DbSet<HsbcAleatoriosBlasterOk> HsbcAleatoriosBlasterOks { get; set; }

    public virtual DbSet<HsbcAleatoriosOk> HsbcAleatoriosOks { get; set; }

    public virtual DbSet<HsbcMi> HsbcMis { get; set; }

    public virtual DbSet<IntentosFront> IntentosFronts { get; set; }

    public virtual DbSet<IntentosRecovery> IntentosRecoveries { get; set; }

    public virtual DbSet<LogComplemento> LogComplementos { get; set; }

    public virtual DbSet<Negociacione> Negociaciones { get; set; }

    public virtual DbSet<Ofrecimiento> Ofrecimientos { get; set; }

    public virtual DbSet<Paquete> Paquetes { get; set; }

    public virtual DbSet<PauTemp> PauTemps { get; set; }

    public virtual DbSet<PauTemp2> PauTemp2s { get; set; }

    public virtual DbSet<PauTemp3> PauTemp3s { get; set; }

    public virtual DbSet<Prueba> Pruebas { get; set; }

    public virtual DbSet<Validum> Valida { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=192.168.7.97\\WEBINSTANCE5;Database=dbComplemento;User Id=login_Collection_App;Password=Specialized2016/;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Modern_Spanish_CI_AI");

        modelBuilder.Entity<Acci16763>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACCI_16763", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Acci20174>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACCI_20174", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Acci23912>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACCI_23912", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Acci25362>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACCI_25362", "Temp");

            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Acci28916>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ACCI_28916", "Temp");

            entity.Property(e => e.Expediente)
                .HasMaxLength(20)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2");
            entity.Property(e => e.Hora).HasColumnType("datetime");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Resultados)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Accionamiento>(entity =>
        {
            entity.HasKey(e => new { e.FechaInsert, e.IdCartera, e.SegundoInsert, e.IdCuenta });

            entity.HasIndex(e => new { e.IdCartera, e.FechaInsert, e.IdAcercamiento, e.IdCuenta }, "IX_Accionamientos_CarteraFechaAcercamiento").IsDescending(false, true, false, false);

            entity.HasIndex(e => new { e.IdCartera, e.IdCuenta }, "IX_Accionamientos_Cuenta");

            entity.HasIndex(e => new { e.FechaInsert, e.IdAcercamiento, e.IdCartera, e.IdCuenta }, "IX_Accionamientos_FechaAcercamiento").IsDescending(true, false, false, false);

            entity.HasIndex(e => new { e.IdCartera, e.IdCuenta, e.FechaInsert }, "IX_Accionamientos_idCarteraCuenta").IsDescending(false, false, true);

            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.SegundoPaquete)
                .HasPrecision(0)
                .HasColumnName("Segundo_Paquete");
        });

        modelBuilder.Entity<AsistenciaComplemento>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("AsistenciaComplemento");

            entity.Property(e => e.Asistencia)
                .HasMaxLength(255)
                .HasColumnName("ASISTENCIA");
            entity.Property(e => e.Clave)
                .HasMaxLength(255)
                .HasColumnName("CLAVE");
            entity.Property(e => e.Fecha)
                .HasMaxLength(50)
                .HasColumnName("FECHA");
            entity.Property(e => e.HsTrabajadas)
                .HasMaxLength(50)
                .HasColumnName("HS#TRABAJADAS");
            entity.Property(e => e.NoEmpleado)
                .HasMaxLength(50)
                .HasColumnName("NO# EMPLEADO");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .HasColumnName("PRODUCTO");
        });

        modelBuilder.Entity<Com23389>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Com_23389", "Temp");

            entity.Property(e => e.Comentarios)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
        });

        modelBuilder.Entity<Cue20571>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Cue_20571", "Temp");

            entity.Property(e => e.Comentario)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(19)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
        });

        modelBuilder.Entity<DatosDaim21340>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DatosDaim_21340");

            entity.Property(e => e.Accion)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("ACCION");
            entity.Property(e => e.Actividad)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("ACTIVIDAD");
            entity.Property(e => e.Agencia)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.Area)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("AREA");
            entity.Property(e => e.Clasificacion)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("CLASIFICACION");
            entity.Property(e => e.ContactoEfectivo)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("CONTACTO EFECTIVO");
            entity.Property(e => e.Contrato)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("CONTRATO");
            entity.Property(e => e.Extensión)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("EXTENSIÓN");
            entity.Property(e => e.FechaGestion)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("FECHA GESTION");
            entity.Property(e => e.FechaSeguimiento)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("FECHA SEGUIMIENTO");
            entity.Property(e => e.Gestor)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("GESTOR");
            entity.Property(e => e.HoraInicio)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("HORA INICIO");
            entity.Property(e => e.HoraTermino)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("HORA TERMINO");
            entity.Property(e => e.MinutosDeGestion)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("MINUTOS DE GESTION");
            entity.Property(e => e.MontoSeguimiento)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("MONTO SEGUIMIENTO");
            entity.Property(e => e.Morosidad)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("MOROSIDAD");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("OBSERVACIONES");
            entity.Property(e => e.Resultado)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("RESULTADO");
        });

        modelBuilder.Entity<DatosDaimler>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DatosDaimler");

            entity.Property(e => e.Resultado)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<DatosDaimlerAcum>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DatosDaimlerAcum");

            entity.Property(e => e.Accion)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("ACCION");
            entity.Property(e => e.Actividad)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("ACTIVIDAD");
            entity.Property(e => e.Agencia)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("AGENCIA");
            entity.Property(e => e.Area)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("AREA");
            entity.Property(e => e.Clasificacion)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("CLASIFICACION");
            entity.Property(e => e.ContactoEfectivo)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("CONTACTO EFECTIVO");
            entity.Property(e => e.Contrato)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("CONTRATO");
            entity.Property(e => e.Extensión)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("EXTENSIÓN");
            entity.Property(e => e.FechaGestion)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("FECHA GESTION");
            entity.Property(e => e.FechaSeguimiento)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("FECHA SEGUIMIENTO");
            entity.Property(e => e.Gestor)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("GESTOR");
            entity.Property(e => e.HoraInicio)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("HORA INICIO");
            entity.Property(e => e.HoraTermino)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("HORA TERMINO");
            entity.Property(e => e.MinutosDeGestion)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("MINUTOS DE GESTION");
            entity.Property(e => e.MontoSeguimiento)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("MONTO SEGUIMIENTO");
            entity.Property(e => e.Morosidad)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("MOROSIDAD");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("OBSERVACIONES");
            entity.Property(e => e.Resultado)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("RESULTADO");
        });

        modelBuilder.Entity<Ejecutivo>(entity =>
        {
            entity.HasKey(e => e.IdEjecutivo);

            entity.HasIndex(e => e.Usuario, "UK_Ejecutivos_Usuario").IsUnique();

            entity.Property(e => e.IdEjecutivo)
                .ValueGeneratedNever()
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.Contraseña).HasMaxLength(128);
            entity.Property(e => e.Contraseña2).HasMaxLength(128);
            entity.Property(e => e.Contraseña3).HasMaxLength(128);
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
                .IsUnicode(false);
        });

        modelBuilder.Entity<EjecutivosComplemento>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("EjecutivosComplemento");

            entity.Property(e => e.Clave)
                .HasMaxLength(255)
                .HasColumnName("CLAVE");
            entity.Property(e => e.HsTrabajadas)
                .HasColumnType("datetime")
                .HasColumnName("HS#TRABAJADAS");
            entity.Property(e => e.NoEmpleado).HasColumnName("NO# EMPLEADO");
            entity.Property(e => e.Producto)
                .HasMaxLength(255)
                .HasColumnName("PRODUCTO");
        });

        modelBuilder.Entity<ErroresSensibilización>(entity =>
        {
            entity.HasKey(e => e.IdErrorMigración).HasName("PK_ErroresMigración");

            entity.ToTable("ErroresSensibilización");

            entity.Property(e => e.IdErrorMigración).HasColumnName("idErrorMigración");
            entity.Property(e => e.ErrorMigración).IsUnicode(false);
            entity.Property(e => e.FechaError)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Proceso)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<GestionesDomiciliaria>(entity =>
        {
            entity.HasKey(e => new { e.FechaVisita, e.IdCartera, e.IdCuenta, e.SegundoVisita }).IsClustered(false);

            entity.HasIndex(e => new { e.IdCartera, e.IdCuenta }, "IX_GestionesDomiciliarias_Cuenta");

            entity.HasIndex(e => new { e.FechaVisita, e.IdCartera, e.IdContacto, e.IdSituación }, "IX_GestionesDomiciliarias_Fecha")
                .IsDescending(true, false, false, false)
                .IsClustered();

            entity.Property(e => e.FechaVisita).HasColumnName("Fecha_Visita");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.SegundoVisita)
                .HasPrecision(0)
                .HasColumnName("Segundo_Visita");
            entity.Property(e => e.AutoAño).IsSparse();
            entity.Property(e => e.AutoMapeo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.AutoMarca)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.AutoModelo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.AutoPlacas)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.CalleHorizontalNorte)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.CalleHorizontalSur)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.CalleVerticalEste)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.CalleVerticalOeste)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.ColorFachada)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.ColorHerrería)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.ColorPuerta)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.Comentario).IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.FechaPagoNegociación).IsSparse();
            entity.Property(e => e.IdCausaNoPago)
                .IsSparse()
                .HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdDomicilio).HasColumnName("idDomicilio");
            entity.Property(e => e.IdEconómico)
                .IsSparse()
                .HasColumnName("idEconómico");
            entity.Property(e => e.IdEjecutivoCaptura).HasColumnName("idEjecutivo_Captura");
            entity.Property(e => e.IdEjecutivoVisita)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo_Visita");
            entity.Property(e => e.IdHabitación).HasColumnName("idHabitación");
            entity.Property(e => e.IdHerramienta).HasColumnName("idHerramienta");
            entity.Property(e => e.IdParentesco)
                .HasComment("id del parentesco con la persona que se realizó la gestión")
                .IsSparse()
                .HasColumnName("idParentesco");
            entity.Property(e => e.IdSituación)
                .HasComment("id de la etapa en la cual estaba la cuenta cuando se gestionó.\r\nTipo de gestión.")
                .HasColumnName("idSituación");
            entity.Property(e => e.IdSucursal).HasColumnName("idSucursal");
            entity.Property(e => e.IdVivienda).HasColumnName("idVivienda");
            entity.Property(e => e.MontoNegociación)
                .IsSparse()
                .HasColumnType("money");
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasComment("Nombre de la persona con la que se tuvo la gestión.")
                .IsSparse();
            entity.Property(e => e.NombrePropietario)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.Paquete).IsSparse();
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
        });

        modelBuilder.Entity<GestionesDomiciliariasEliminada>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.FechaVisita, e.SegundoVisita, e.Tabla, e.FechaHoraEliminacion }).IsClustered(false);

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("idCuenta");
            entity.Property(e => e.FechaVisita).HasColumnName("Fecha_Visita");
            entity.Property(e => e.SegundoVisita)
                .HasPrecision(0)
                .HasColumnName("Segundo_Visita");
            entity.Property(e => e.Tabla)
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.FechaHoraEliminacion)
                .HasPrecision(0)
                .HasColumnName("FechaHora_Eliminacion");
            entity.Property(e => e.AutoAño).IsSparse();
            entity.Property(e => e.AutoMapeo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.AutoMarca)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.AutoModelo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.AutoPlacas)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.CalleHorizontalNorte)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.CalleHorizontalSur)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.CalleVerticalEste)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.CalleVerticalOeste)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.ColorFachada)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.ColorHerrería)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.ColorPuerta)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.Comentario).IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.FechaPagoNegociación).IsSparse();
            entity.Property(e => e.IdCausaNoPago)
                .IsSparse()
                .HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdDomicilio).HasColumnName("idDomicilio");
            entity.Property(e => e.IdEconómico)
                .IsSparse()
                .HasColumnName("idEconómico");
            entity.Property(e => e.IdEjecutivoCaptura).HasColumnName("idEjecutivo_Captura");
            entity.Property(e => e.IdEjecutivoVisita)
                .HasComment("El ejecutivo que ejecutará el seguimiento.")
                .HasColumnName("idEjecutivo_Visita");
            entity.Property(e => e.IdHabitación).HasColumnName("idHabitación");
            entity.Property(e => e.IdHerramienta).HasColumnName("idHerramienta");
            entity.Property(e => e.IdParentesco)
                .HasComment("id del parentesco con la persona que se realizó la gestión")
                .IsSparse()
                .HasColumnName("idParentesco");
            entity.Property(e => e.IdSituación)
                .HasComment("id de la etapa en la cual estaba la cuenta cuando se gestionó.\r\nTipo de gestión.")
                .HasColumnName("idSituación");
            entity.Property(e => e.IdSucursal).HasColumnName("idSucursal");
            entity.Property(e => e.IdVivienda).HasColumnName("idVivienda");
            entity.Property(e => e.MontoNegociación)
                .IsSparse()
                .HasColumnType("money");
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasComment("Nombre de la persona con la que se tuvo la gestión.")
                .IsSparse();
            entity.Property(e => e.NombrePropietario)
                .HasMaxLength(100)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.Paquete).IsSparse();
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
        });

        modelBuilder.Entity<GestionesDomiciliariasPaquete>(entity =>
        {
            entity.HasKey(e => e.FechaHora).IsClustered(false);

            entity.ToTable("GestionesDomiciliariasPaquete");

            entity.Property(e => e.FechaHora).HasPrecision(0);
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
        });

        modelBuilder.Entity<GestionesTelefónica>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.FechaInsert, e.IdCuenta, e.SegundoInsert })
                .IsClustered(false)
                .HasFillFactor(80);

            entity.HasIndex(e => new { e.FechaInsert, e.IdCartera, e.IdContacto }, "IX_GestionesTelefónicas")
                .IsDescending(true, false, false)
                .IsClustered();

            entity.HasIndex(e => new { e.IdCartera, e.FechaInsert }, "IX_GestionesTelefónicas_ConteosTels").IsDescending(false, true);

            entity.HasIndex(e => new { e.IdCartera, e.IdCuenta }, "IX_GestionesTelefónicas_Cuenta");

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
            entity.Property(e => e.Duración)
                .HasPrecision(0)
                .IsSparse();
            entity.Property(e => e.Extensión).IsSparse();
            entity.Property(e => e.IdAcercamiento)
                .IsSparse()
                .HasColumnName("idAcercamiento");
            entity.Property(e => e.IdCausaNoPago)
                .IsSparse()
                .HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdEjecutivo)
                .IsSparse()
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.IdModo)
                .IsSparse()
                .HasColumnName("idModo");
            entity.Property(e => e.IdParentesco)
                .IsSparse()
                .HasColumnName("idParentesco");
            entity.Property(e => e.IdSituación)
                .IsSparse()
                .HasColumnName("idSituación");
            entity.Property(e => e.IdSucursal)
                .IsSparse()
                .HasColumnName("idSucursal");
            entity.Property(e => e.IdValidador).HasColumnName("idValidador");
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.TiempoEnCuenta)
                .HasPrecision(0)
                .IsSparse();
        });

        modelBuilder.Entity<GestionesTelefónicasSorianaTemp2>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("GestionesTelefónicas_Soriana_Temp_2");

            entity.Property(e => e.Comentario).IsUnicode(false);
            entity.Property(e => e.Duración)
                .HasPrecision(0)
                .IsSparse();
            entity.Property(e => e.Extensión).IsSparse();
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdAcercamiento)
                .IsSparse()
                .HasColumnName("idAcercamiento");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCausaNoPago)
                .IsSparse()
                .HasColumnName("idCausaNoPago");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEjecutivo)
                .IsSparse()
                .HasColumnName("idEjecutivo");
            entity.Property(e => e.IdModo)
                .IsSparse()
                .HasColumnName("idModo");
            entity.Property(e => e.IdParentesco)
                .IsSparse()
                .HasColumnName("idParentesco");
            entity.Property(e => e.IdSituación)
                .IsSparse()
                .HasColumnName("idSituación");
            entity.Property(e => e.IdSucursal)
                .IsSparse()
                .HasColumnName("idSucursal");
            entity.Property(e => e.IdValidador)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("idValidador");
            entity.Property(e => e.NombreContacto)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsSparse();
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.TiempoEnCuenta)
                .HasPrecision(0)
                .IsSparse();
        });

        modelBuilder.Entity<HsbcAleatoriosBlasterOk>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("HSBC_AleatoriosBlasterOK");

            entity.Property(e => e.Fecha).HasColumnName("FECHA");
            entity.Property(e => e.IdProducto)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("idProducto");
            entity.Property(e => e.PorcentBlaster).HasColumnName("Porcent Blaster");
            entity.Property(e => e.Producto)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<HsbcAleatoriosOk>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("HSBC_AleatoriosOK");

            entity.Property(e => e.AvgIdleSecondsOutbound)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Avg Idle seconds Outbound");
            entity.Property(e => e.AvgWrapSecodsInbound)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Avg Wrap Secods Inbound");
            entity.Property(e => e.AvgWrapSecodsOutbound)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Avg Wrap Secods Outbound");
            entity.Property(e => e.Fecha).HasColumnName("FECHA");
            entity.Property(e => e.IdProducto)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("idProducto");
            entity.Property(e => e.Producto)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<HsbcMi>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("HSBC_MI");

            entity.Property(e => e.Abandono)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ActividadesFueraDeLíneaHrs)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Actividades Fuera de Línea hrs");
            entity.Property(e => e.AusenciasTotalesHrs)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Ausencias Totales hrs");
            entity.Property(e => e.AvgAhtSecondsInbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Avg AHT seconds Inbound");
            entity.Property(e => e.AvgAhtSecondsOutbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Avg AHT seconds Outbound");
            entity.Property(e => e.AvgIdleSecondsInbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Avg Idle seconds Inbound");
            entity.Property(e => e.AvgIdleSecondsOutbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Avg Idle seconds Outbound");
            entity.Property(e => e.AvgTalkSecondsInbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Avg Talk seconds Inbound");
            entity.Property(e => e.AvgTalkSecondsOutbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Avg Talk seconds Outbound");
            entity.Property(e => e.AvgWrapSecodsInbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Avg Wrap Secods Inbound");
            entity.Property(e => e.AvgWrapSecodsOutbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Avg Wrap Secods Outbound");
            entity.Property(e => e.Blaster).HasMaxLength(255);
            entity.Property(e => e.BlasterContestado)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Blaster Contestado");
            entity.Property(e => e.Bocina)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.BuildVolume)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Build Volume");
            entity.Property(e => e.Connects)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CréditosConBlaster)
                .HasMaxLength(255)
                .HasColumnName("Créditos con Blaster");
            entity.Property(e => e.CréditosConCarta)
                .HasMaxLength(255)
                .HasColumnName("Créditos con Carta");
            entity.Property(e => e.CréditosConCorreo)
                .HasMaxLength(255)
                .HasColumnName("Créditos con Correo");
            entity.Property(e => e.CréditosConSms)
                .HasMaxLength(255)
                .HasColumnName("Créditos con SMS");
            entity.Property(e => e.CréditosTeléfono)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Créditos Teléfono");
            entity.Property(e => e.DialsAttempted)
                .HasMaxLength(255)
                .HasColumnName("Dials Attempted");
            entity.Property(e => e.DialsCompleteBlaster)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Dials complete Blaster");
            entity.Property(e => e.DialsCompleteRing)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Dials Complete Ring");
            entity.Property(e => e.EjecutivosTelefónicosMixtos)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Ejecutivos Telefónicos Mixtos");
            entity.Property(e => e.ExcludeVolume)
                .HasMaxLength(255)
                .HasColumnName("Exclude Volume");
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.GenericoPll)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("generico pll");
            entity.Property(e => e.LlamadasAbandonadasDespuesDelUmbral)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Llamadas abandonadas despues del umbral");
            entity.Property(e => e.LlamadasNoContestadas)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Llamadas no contestadas");
            entity.Property(e => e.NchLlamadasContestadas)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("NCH Llamadas Contestadas");
            entity.Property(e => e.NcoLlamadasDeEntrada)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("NCO Llamadas de entrada");
            entity.Property(e => e.NivelDeServicio)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Nivel de Servicio");
            entity.Property(e => e.NoDeQuejas)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("No# de Quejas");
            entity.Property(e => e.NoEjecutivosTelefónicosInbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("No# Ejecutivos Telefónicos Inbound");
            entity.Property(e => e.NoEjecutivosTelefónicosOutbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("No# Ejecutivos Telefónicos Outbound");
            entity.Property(e => e.OpHoursInbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Op hours Inbound");
            entity.Property(e => e.OpHoursOutbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Op hours Outbound");
            entity.Property(e => e.PaidHours)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Paid Hours");
            entity.Property(e => e.Pk)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("PK");
            entity.Property(e => e.Pkinbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("PKInbound");
            entity.Property(e => e.Producto).HasMaxLength(255);
            entity.Property(e => e.Ptp)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("PTP");
            entity.Property(e => e.Ptpinbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("PTPInbound");
            entity.Property(e => e.Rcp)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("RCP");
            entity.Property(e => e.Rpcinbound)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("RPCInbound");
            entity.Property(e => e.Segmento).HasMaxLength(255);
            entity.Property(e => e.Shrinkage)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("% Shrinkage");
            entity.Property(e => e.SignIn)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Sign In");
            entity.Property(e => e.StrategyVolume)
                .HasMaxLength(255)
                .HasColumnName("Strategy Volume");
            entity.Property(e => e.Total).HasMaxLength(255);
            entity.Property(e => e.UniqueRecordCalled)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Unique Record Called");
        });

        modelBuilder.Entity<IntentosFront>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Intentos_Front");

            entity.Property(e => e.Idcuenta)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("idcuenta");
            entity.Property(e => e.Producto)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.Segmento)
                .HasMaxLength(1)
                .IsUnicode(false);
            entity.Property(e => e.SegmentoP)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Segmento_p");
        });

        modelBuilder.Entity<IntentosRecovery>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Intentos_Recovery");

            entity.Property(e => e.Idcuenta)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("idcuenta");
            entity.Property(e => e.Producto)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("producto");
            entity.Property(e => e.Segmento)
                .HasMaxLength(25)
                .IsUnicode(false);
        });

        modelBuilder.Entity<LogComplemento>(entity =>
        {
            entity.HasKey(e => e.IdLogComplemento)
                .HasName("PK_LogIngreso")
                .IsClustered(false);

            entity.ToTable("LogComplemento");

            entity.HasIndex(e => new { e.IdCartera, e.FechaInsert }, "IX_LogComplemento")
                .IsDescending(false, true)
                .IsClustered();

            entity.Property(e => e.IdLogComplemento).HasColumnName("idLogComplemento");
            entity.Property(e => e.Computadora)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Dominio)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.Ip)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("IP");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.UsuarioWindows)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Negociacione>(entity =>
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
            entity.Property(e => e.IdEjecutivoValidador).HasColumnName("idEjecutivoValidador");
            entity.Property(e => e.IdEstado).HasColumnName("idEstado");
            entity.Property(e => e.IdHerramienta).HasColumnName("idHerramienta");
            entity.Property(e => e.MontoNegociado).HasColumnType("money");
            entity.Property(e => e.MontoPagado).HasColumnType("money");
            entity.Property(e => e.Plazos).HasDefaultValue((byte)1);
            entity.Property(e => e.SaldoNegociación).HasColumnType("money");
        });

        modelBuilder.Entity<Ofrecimiento>(entity =>
        {
            entity.HasKey(e => new { e.IdCartera, e.IdCuenta, e.IdHerramienta, e.FechaInsert, e.SegundoInsert });

            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdHerramienta).HasColumnName("idHerramienta");
            entity.Property(e => e.FechaInsert).HasColumnName("Fecha_Insert");
            entity.Property(e => e.SegundoInsert)
                .HasPrecision(0)
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.MontoOfrecido).HasColumnType("money");
            entity.Property(e => e.MontoRequerido).HasColumnType("money");
            entity.Property(e => e.Saldo).HasColumnType("money");
        });

        modelBuilder.Entity<Paquete>(entity =>
        {
            entity.HasKey(e => new { e.FechaInsert, e.IdCartera, e.SegundoInsert }).HasName("PK_Campañas");

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
        });

        modelBuilder.Entity<PauTemp>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PauTemp");

            entity.Property(e => e.FechaInsert)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasColumnType("datetime")
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.SegundoPaquete)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Segundo_Paquete");
            entity.Property(e => e.Telefono)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PauTemp2>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PauTemp2");

            entity.Property(e => e.FechaInsert)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasColumnType("datetime")
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.SegundoPaquete)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Segundo_Paquete");
            entity.Property(e => e.Telefono)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PauTemp3>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PauTemp3");

            entity.Property(e => e.Descripcion)
                .HasMaxLength(17)
                .IsUnicode(false);
            entity.Property(e => e.FechaInsert)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Fecha_Insert");
            entity.Property(e => e.IdAcercamiento).HasColumnName("idAcercamiento");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(18)
                .IsUnicode(false);
            entity.Property(e => e.SegundoInsert)
                .HasColumnType("datetime")
                .HasColumnName("Segundo_Insert");
            entity.Property(e => e.SegundoPaquete)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("Segundo_Paquete");
            entity.Property(e => e.Telefono)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Prueba>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Prueba");

            entity.Property(e => e.Prueba1)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("prueba");
        });

        modelBuilder.Entity<Validum>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("VALIDA");

            entity.Property(e => e.Accion)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.Actividad)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.Comentario)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.Duracion).HasColumnType("datetime");
            entity.Property(e => e.Extension)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.FechaGestion)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Fecha Gestion");
            entity.Property(e => e.Gestor)
                .HasMaxLength(8000)
                .IsUnicode(false);
            entity.Property(e => e.Hora).HasPrecision(0);
            entity.Property(e => e.HoraTermino)
                .HasColumnType("datetime")
                .HasColumnName("Hora Termino");
            entity.Property(e => e.IdCartera).HasColumnName("idCartera");
            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.IdCuenta)
                .HasMaxLength(16)
                .IsUnicode(false)
                .IsFixedLength()
                .UseCollation("Modern_Spanish_BIN2")
                .HasColumnName("idCuenta");
            entity.Property(e => e.IdEjecutivo).HasColumnName("idEjecutivo");
            entity.Property(e => e.IdSituación).HasColumnName("idSituación");
            entity.Property(e => e.IdSucursal).HasColumnName("idSucursal");
            entity.Property(e => e.Observaciones)
                .HasMaxLength(8000)
                .IsUnicode(false)
                .HasColumnName("OBSERVACIONES");
            entity.Property(e => e.Resultado)
                .HasMaxLength(240)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Tiempoencuenta).HasColumnType("datetime");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
