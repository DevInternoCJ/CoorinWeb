using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class Comentario
{
    public string IdCuenta { get; set; } = null!;

    public short IdCartera { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivo { get; set; }

    public string Comentario1 { get; set; } = null!;
}
