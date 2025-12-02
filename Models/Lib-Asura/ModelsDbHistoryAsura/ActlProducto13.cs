using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class ActlProducto13
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Ordnerdat { get; set; }

    public decimal? Saldo { get; set; }

    public string? MesMasAntiguo { get; set; }

    public string? Hoy1 { get; set; }

    public string? DiasAtraso { get; set; }
}
