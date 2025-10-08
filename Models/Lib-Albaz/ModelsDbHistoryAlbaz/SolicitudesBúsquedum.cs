using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.History;

public partial class SolicitudesBúsquedum
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivo { get; set; }

    public bool Realizada { get; set; }

    public int IdSolicitudBúsqueda { get; set; }
}
