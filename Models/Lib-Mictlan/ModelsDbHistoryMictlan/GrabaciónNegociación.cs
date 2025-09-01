using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class GrabaciónNegociación
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? Idherramienta { get; set; }

    public int? IdEjecutivo { get; set; }

    public string? IdGrabacion { get; set; }
}
