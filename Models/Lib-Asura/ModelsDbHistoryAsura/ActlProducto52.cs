using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryAsura;

public partial class ActlProducto52
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Tarifa { get; set; }

    public string? Adeudos { get; set; }

    public string? Cartera { get; set; }

    public string? PorcPago { get; set; }

    public string? ImpBase { get; set; }

    public string? Impt { get; set; }

    public string? SaldoPte { get; set; }
}
