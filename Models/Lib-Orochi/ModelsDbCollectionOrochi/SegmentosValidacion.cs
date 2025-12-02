using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Collection;

public partial class SegmentosValidacion
{
    public string Idcuenta { get; set; } = null!;

    public string? Segmento { get; set; }

    public DateOnly Fecha { get; set; }

    public int? CuentaActiva { get; set; }

    public int? Conteo { get; set; }
}
