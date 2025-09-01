using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class ActlProducto1
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Batchdate { get; set; }

    public string? LoanProductcode { get; set; }

    public string? Recoveredcode { get; set; }

    public decimal? Initialbalance { get; set; }

    public string? Cur { get; set; }

    public string? T30 { get; set; }

    public string? S60 { get; set; }

    public string? N90 { get; set; }

    public string? C120 { get; set; }

    public string? C150 { get; set; }

    public string? MínimoMásAtrasado { get; set; }

    public string? EnrolladoSettlement { get; set; }

    public string? CurrentbalanceG { get; set; }

    public string? FechaMinimomasatrasado { get; set; }
}
