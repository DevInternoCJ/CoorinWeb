using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationThor;

public partial class HsbcCifrasControlOrg
{
    public DateOnly? FechaInsert { get; set; }

    public TimeOnly? SegundoInsert { get; set; }

    public string Producto { get; set; } = null!;

    public string? Org { get; set; }

    public string? Tipo { get; set; }

    public int? Casos { get; set; }

    public decimal? Saldo { get; set; }
}
