using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class HistoricoCuenta
{
    public short IdCartera { get; set; }

    public short IdProducto { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public byte IdAccion { get; set; }

    public string? Activa { get; set; }
}
