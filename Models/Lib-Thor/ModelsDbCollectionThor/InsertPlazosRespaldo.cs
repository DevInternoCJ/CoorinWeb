using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class InsertPlazosRespaldo
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public DateOnly FechaPago { get; set; }

    public decimal MontoPago { get; set; }

    public DateOnly FechaInicioPlazo { get; set; }

    public DateOnly FechaFinPlazo { get; set; }

    public byte Ordinal { get; set; }
}
