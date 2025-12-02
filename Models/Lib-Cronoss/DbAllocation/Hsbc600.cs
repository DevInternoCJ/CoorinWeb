using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class Hsbc600
{
    public string FechaReporte { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? Org { get; set; }

    public string? BillingCrédito { get; set; }

    public DateOnly FechaAcordada { get; set; }

    public decimal MontoNegociado { get; set; }

    public bool Activa { get; set; }

    public DateOnly FechaDes { get; set; }

    public string? Registrsos { get; set; }
}
