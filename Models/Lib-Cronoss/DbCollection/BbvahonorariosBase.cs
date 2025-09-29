using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class BbvahonorariosBase
{
    public int IdAño { get; set; }

    public int Año { get; set; }

    public decimal? HonorarioAnual { get; set; }

    public string? AñoInpc { get; set; }

    public double? Inpc { get; set; }
}
