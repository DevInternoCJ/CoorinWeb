using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class ActlProducto189
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? ProductType { get; set; }

    public string? NumberOfCredits { get; set; }

    public string? DaysPastDue { get; set; }

    public string? BalanceTotal { get; set; }

    public string? AntiguedadCredito { get; set; }

    public string? Bucket { get; set; }
}
