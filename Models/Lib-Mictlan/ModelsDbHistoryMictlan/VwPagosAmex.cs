using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class VwPagosAmex
{
    public int IdCartera { get; set; }

    public string? IdCuenta { get; set; }

    public DateTime? FechaPago { get; set; }

    public decimal? MontoPago { get; set; }

    public string? Referencia { get; set; }

    public string? Segmentación { get; set; }

    public string? Transactionid { get; set; }
}
