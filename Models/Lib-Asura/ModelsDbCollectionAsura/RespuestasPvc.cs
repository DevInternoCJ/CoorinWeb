using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class RespuestasPvc
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public int IdEjecutivo { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? IdTipoPvc { get; set; }

    public int? IdDetallesPvc { get; set; }
}
