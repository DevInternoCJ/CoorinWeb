using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class ValidadoresArrepentimiento
{
    public short IdProducto { get; set; }

    public int IdEjecutivo { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
