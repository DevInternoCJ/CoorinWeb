using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class HsbcCifrasControlClass
{
    public DateOnly? FechaInsert { get; set; }

    public TimeOnly? SegundoInsert { get; set; }

    public string? Class { get; set; }

    public string? Portafolio { get; set; }

    public int? Casos { get; set; }

    public decimal? Saldo { get; set; }
}
