using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryAsura;

public partial class _200Vencidum
{
    public DateOnly FechaProceso { get; set; }

    public string IdCuenta { get; set; } = null!;

    public short IdProducto { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public string? CódigoAcción { get; set; }

    public string CódigoResultado { get; set; } = null!;

    public byte Ponderación { get; set; }

    public string? Observaciones { get; set; }

    public short? IdContacto { get; set; }

    public short? IdSituación { get; set; }
}
