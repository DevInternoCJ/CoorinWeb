using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class SegmProducto19
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Enganche { get; set; }

    public string? FecInicio { get; set; }

    public string? Fec1ªRenta { get; set; }

    public string? Vin { get; set; }

    public string? Producto { get; set; }

    public string? Pago { get; set; }

    public string? Periodicidad { get; set; }
}
