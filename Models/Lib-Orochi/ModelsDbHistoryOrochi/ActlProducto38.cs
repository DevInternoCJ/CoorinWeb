using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.History;

public partial class ActlProducto38
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Cartera { get; set; }

    public string? SubProducto { get; set; }

    public string? DíasDeMora { get; set; }

    public string? SaldoDeudor { get; set; }

    public string? Vencido { get; set; }
}
