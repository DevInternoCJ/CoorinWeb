using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryAsura;

public partial class SegmProducto8
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? AgenciaActual { get; set; }

    public string? SegmentoActual { get; set; }

    public string? ProgramaEspecial { get; set; }

    public string? Estado { get; set; }
}
