using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class CamposAdicionale
{
    public short IdProducto { get; set; }

    public int IdParentesco { get; set; }

    public string CampoNombre { get; set; } = null!;

    public string? CampoTeléfono { get; set; }

    public string? CampoCorreo { get; set; }

    public string? CampoRfc { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
