using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class Validadore
{
    public short IdProducto { get; set; }

    public int IdEjecutivo { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
