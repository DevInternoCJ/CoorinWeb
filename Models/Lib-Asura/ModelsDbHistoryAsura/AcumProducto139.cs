using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class AcumProducto139
{
    public DateOnly? Insert { get; set; }

    public int IdLogAsignación { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? Nombre { get; set; }

    public string? Rfc { get; set; }

    public string? Saldo { get; set; }
}
