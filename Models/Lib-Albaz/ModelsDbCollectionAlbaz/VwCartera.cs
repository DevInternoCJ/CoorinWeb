using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class VwCartera
{
    public string IdCuenta { get; set; } = null!;

    public short IdCartera { get; set; }

    public short IdValor { get; set; }

    public bool CuentaActiva { get; set; }

    public DateOnly FechaCambioActivación { get; set; }
}
