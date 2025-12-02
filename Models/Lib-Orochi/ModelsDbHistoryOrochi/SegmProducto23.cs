using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.History;

public partial class SegmProducto23
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Cp { get; set; }

    public string? DigitoVerificador { get; set; }

    public string? Sucursal { get; set; }

    public string? Vin { get; set; }

    public string? Unidad { get; set; }

    public string? Segmento { get; set; }
}
