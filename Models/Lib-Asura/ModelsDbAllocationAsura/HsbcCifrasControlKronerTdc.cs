using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsAllocation;

public partial class HsbcCifrasControlKronerTdc
{
    public DateOnly? FechaInsert { get; set; }

    public TimeOnly? SegundoInsert { get; set; }

    public string Portafolio { get; set; } = null!;

    public int? Casos { get; set; }

    public decimal? SaldoDía { get; set; }
}
