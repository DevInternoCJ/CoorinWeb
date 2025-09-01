using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class CuentasEspeciale
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public virtual Cartera IdCarteraNavigation { get; set; } = null!;
}
