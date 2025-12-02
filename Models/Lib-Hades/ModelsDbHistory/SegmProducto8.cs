using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class SegmProducto8
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly Insert { get; set; }

    public string? Estado { get; set; }

    public string? ProgramaEspecial { get; set; }
}
