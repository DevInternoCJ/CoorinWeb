using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class Teléfono
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

    public bool? ProporcionóTitular { get; set; }

    public int HusoHorario { get; set; }

    public virtual ICollection<Adicionale> Adicionales { get; set; } = new List<Adicionale>();
}
