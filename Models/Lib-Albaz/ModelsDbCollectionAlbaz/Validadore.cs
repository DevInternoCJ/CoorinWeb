using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class Validadore
{
    public short IdProducto { get; set; }

    public int IdEjecutivo { get; set; }

    public DateOnly? HoraIni { get; set; }

    public DateOnly? HoraFin { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
