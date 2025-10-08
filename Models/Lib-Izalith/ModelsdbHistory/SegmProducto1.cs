using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class SegmProducto1
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Wo { get; set; }

    public string? Fechacorte { get; set; }

    public string? Legal { get; set; }

    public string? Customerid { get; set; }

    public string? Product { get; set; }

    public decimal? BalanceG { get; set; }

    public string? Asignacion { get; set; }

    public string? DateWoCancelled { get; set; }
}
