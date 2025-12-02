using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class VwCuentasVici
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? Producto { get; set; }

    public string? Productos { get; set; }

    public string? Billing { get; set; }
}
