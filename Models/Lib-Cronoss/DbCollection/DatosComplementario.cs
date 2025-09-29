using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class DatosComplementario
{
    public short? IdCartera { get; set; }

    public string? IdCuenta { get; set; }

    public int? IdEjecutivo { get; set; }

    public DateOnly? FechaInsert { get; set; }

    public TimeOnly? SegundoInsert { get; set; }

    public string? SaldoTotal { get; set; }

    public string? MontoDescuento { get; set; }

    public string? PorcentajeDescuento { get; set; }

    public DateOnly? FechaLimitePago { get; set; }
}
