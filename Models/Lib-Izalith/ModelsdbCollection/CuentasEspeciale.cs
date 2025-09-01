using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class CuentasEspeciale
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public virtual Cartera IdCarteraNavigation { get; set; } = null!;
}
