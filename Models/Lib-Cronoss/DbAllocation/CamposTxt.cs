using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class CamposTxt
{
    public int IdCampo { get; set; }

    public short IdCartera { get; set; }

    public short? IdProducto { get; set; }

    public string? Proceso { get; set; }

    public string Campo { get; set; } = null!;

    public string TipoDato { get; set; } = null!;

    public short Inicio { get; set; }

    public short Fin { get; set; }

    public string? Descripción { get; set; }

    public virtual Cartera IdCarteraNavigation { get; set; } = null!;

    public virtual Producto? IdProductoNavigation { get; set; }
}
