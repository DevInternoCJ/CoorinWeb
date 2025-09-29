using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationMictlan;

public partial class Collect
{
    public long? Conteo { get; set; }

    public DateOnly FechaInsert { get; set; }

    public string Idcuenta { get; set; } = null!;

    public TimeOnly SegundoInsert { get; set; }

    public string Mensaje { get; set; } = null!;

    public short IdAcercamiento { get; set; }
}
