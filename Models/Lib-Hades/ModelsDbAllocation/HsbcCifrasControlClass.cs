using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbAllocation;

public partial class HsbcCifrasControlClass
{
    public DateOnly? FechaInsert { get; set; }

    public TimeOnly? SegundoInsert { get; set; }

    public string? Class { get; set; }

    public string Portafolio { get; set; } = null!;

    public int? Casos { get; set; }

    public decimal? Saldo { get; set; }
}
