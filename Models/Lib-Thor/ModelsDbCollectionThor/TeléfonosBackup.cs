using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class TeléfonosBackup
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    /// <summary>
    /// Número telefónico a 10 dígitos
    /// </summary>
    public long NúmeroTelefónico { get; set; }

    public short IdTelefonía { get; set; }

    public bool Confirmado { get; set; }

    public short IdOrigen { get; set; }

    public DateOnly FechaInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public short IdClase { get; set; }

    public DateOnly? FechaClasificación { get; set; }

    public int? IdEjecutivoClasificación { get; set; }

    public TimeOnly? SegHorarioContacto { get; set; }

    public string? Estado { get; set; }

    public string? Municipio { get; set; }

    public short? Extensión { get; set; }

    public bool? ProporcionóTitular { get; set; }

    public int HusoHorario { get; set; }

    public virtual ICollection<Adicionale> Adicionales { get; set; } = new List<Adicionale>();

    public virtual CuentasBackup CuentasBackup { get; set; } = null!;

    public virtual ICollection<GestionesChatBackup> GestionesChatBackups { get; set; } = new List<GestionesChatBackup>();

    public virtual ICollection<GestionesTelefónicasBackup> GestionesTelefónicasBackups { get; set; } = new List<GestionesTelefónicasBackup>();

    public virtual Cartera1 IdCarteraNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdClaseNavigation { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdOrigenNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdTelefoníaNavigation { get; set; } = null!;

    public virtual ICollection<QuejasBackup> QuejasBackups { get; set; } = new List<QuejasBackup>();

    public virtual ICollection<SeguimientosBackup> SeguimientosBackups { get; set; } = new List<SeguimientosBackup>();
}
