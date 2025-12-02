using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationMictlan;

public partial class TeléfonosAllocation2
{
    public long NúmeroTelefónico { get; set; }

    public string IdCuenta { get; set; } = null!;

    public short IdCartera { get; set; }

    public short? IdTelefonía { get; set; }

    public DateOnly? FechaInsert { get; set; }

    public short? IdOrígen { get; set; }

    public short? Extensión { get; set; }

    public int? IdEjecutivo { get; set; }

    public string? Estado { get; set; }

    public string? Municipio { get; set; }

    public bool? Confirmado { get; set; }

    public short? IdClase { get; set; }

    public virtual Cartera IdCarteraNavigation { get; set; } = null!;
}
