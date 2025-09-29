using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class GrabacionesIntegración
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public string NombreGrabación { get; set; } = null!;

    public DateTime InicioLlamada { get; set; }

    public short? DuraciónSegundos { get; set; }

    public string ServidorPredictivo { get; set; } = null!;
}
