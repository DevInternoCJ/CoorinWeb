using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class VwCuentasMigración
{
    public bool CuentaActiva { get; set; }

    public short IdSituación { get; set; }

    public short IdCartera { get; set; }

    public short IdProducto { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly? FechaUpdate { get; set; }
}
