using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsAllocation;

public partial class Ejecucione
{
    public int IdEjecución { get; set; }

    public byte IdJob { get; set; }

    public int? IdLogProceso { get; set; }

    public short IdProducto { get; set; }

    public string? Mensaje { get; set; }

    public DateTime? FechaEjecInicio { get; set; }

    public DateTime? FechaEjecFin { get; set; }

    public virtual Job IdJobNavigation { get; set; } = null!;

    public virtual LogAsignación? IdLogProcesoNavigation { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
