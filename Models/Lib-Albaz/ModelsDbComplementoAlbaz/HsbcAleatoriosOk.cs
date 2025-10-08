using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Complemento;

public partial class HsbcAleatoriosOk
{
    public DateOnly? Fecha { get; set; }

    public string? IdProducto { get; set; }

    public string? Producto { get; set; }

    public string? AvgIdleSecondsOutbound { get; set; }

    public string? AvgWrapSecodsOutbound { get; set; }

    public string? AvgWrapSecodsInbound { get; set; }
}
