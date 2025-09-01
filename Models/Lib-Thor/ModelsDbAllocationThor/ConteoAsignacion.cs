using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationThor;

public partial class ConteoAsignacion
{
    public string? Tipo { get; set; }

    public int? Contador { get; set; }

    public DateOnly? FechaAsignacion { get; set; }

    public int? IdAgencia { get; set; }

    public string? RazonSocial { get; set; }

    public string? Segmento { get; set; }

    public string? CantidadCuentas { get; set; }

    public decimal? Total { get; set; }
}
