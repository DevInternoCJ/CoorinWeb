using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsAllocation;

public partial class HistoricoCuenta
{
    public short IdCartera { get; set; }

    public short IdProducto { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly Fecha { get; set; }

    public byte IdAccion { get; set; }
}
