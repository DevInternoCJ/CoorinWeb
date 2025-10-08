using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class Validadore
{
    public short IdProducto { get; set; }

    public int IdEjecutivo { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
