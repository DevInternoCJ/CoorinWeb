using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class SegmProducto6Backup
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Segmento { get; set; }

    public string? NombreCliente { get; set; }
}
