using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class ActlProducto25
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? DiasDePago { get; set; }

    public string? DiasMora { get; set; }

    public string? MontoVencidoAsignado { get; set; }

    public string? TotalDeMontoEnRiesgo { get; set; }
}
