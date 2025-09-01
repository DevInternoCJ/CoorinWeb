using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationAsura;

public partial class VwEjecucionesDetalle
{
    public int IdEjecución { get; set; }

    public int? IdLogProceso { get; set; }

    public string Cartera { get; set; } = null!;

    public string Producto { get; set; } = null!;

    public string Job { get; set; } = null!;

    public string? Fecha { get; set; }

    public string? Comienzo { get; set; }

    public string? Duración { get; set; }

    public string? Mensaje { get; set; }
}
