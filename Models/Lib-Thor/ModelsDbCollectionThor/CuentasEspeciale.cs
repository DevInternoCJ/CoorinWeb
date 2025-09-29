using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class CuentasEspeciale
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public int? IdSituacion { get; set; }
}
