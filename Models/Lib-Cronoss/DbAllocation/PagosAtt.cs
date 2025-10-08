using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class PagosAtt
{
    public string? Cuenta { get; set; }

    public decimal? SumaPago { get; set; }

    public DateOnly? Fecha { get; set; }

    public string? Bucket { get; set; }

    public string Cartera { get; set; } = null!;
}
