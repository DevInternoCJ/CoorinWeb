using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class CuentasEspeciale
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public virtual Cartera IdCarteraNavigation { get; set; } = null!;
}
