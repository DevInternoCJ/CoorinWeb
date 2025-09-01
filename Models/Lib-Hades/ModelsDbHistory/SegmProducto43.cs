using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class SegmProducto43
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? SucSocio { get; set; }

    public string? PeriodoPago { get; set; }
}
