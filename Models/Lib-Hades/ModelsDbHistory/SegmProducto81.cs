using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class SegmProducto81
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Contrato { get; set; }

    public string? Numcliente { get; set; }

    public string? Corte { get; set; }

    public string? División { get; set; }
}
