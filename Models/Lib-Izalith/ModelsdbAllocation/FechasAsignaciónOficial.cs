using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbAllocation;

public partial class FechasAsignaciónOficial
{
    public short IdProducto { get; set; }

    public int IdLogProceso { get; set; }

    public DateOnly FechaVálidoDesde { get; set; }

    public DateOnly? FechaVálidoHasta { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
