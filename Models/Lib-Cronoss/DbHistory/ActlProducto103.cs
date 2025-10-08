using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class ActlProducto103
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Operación { get; set; }

    public string? Despacho { get; set; }

    public string? Asignacion { get; set; }

    public string? Cartera { get; set; }

    public string? TelPrinc { get; set; }

    public string? Riesgo { get; set; }

    public string? AlcanceDeRecuperación { get; set; }

    public string? CalifScore { get; set; }
}
