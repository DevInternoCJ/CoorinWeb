using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationThor;

public partial class TeléfonosAllocation
{
    /// <summary>
    /// Número telefónico a 10 dígitos
    /// </summary>
    public long NúmeroTelefónico { get; set; }

    public string IdCuenta { get; set; } = null!;

    public short IdCartera { get; set; }

    public short? IdTelefonía { get; set; }

    public DateOnly? FechaInsert { get; set; }

    public short? IdOrígen { get; set; }

    public short? Extensión { get; set; }

    public int? IdEjecutivo { get; set; }

    public virtual Cartera1 IdCarteraNavigation { get; set; } = null!;
}
