using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class TmpR
{
    public string IdCuenta { get; set; } = null!;

    public bool Confirmado { get; set; }

    public DateOnly FechaInsert { get; set; }

    public string? Estado { get; set; }

    public string? Municipio { get; set; }

    public short? Extensión { get; set; }

    public long? _1 { get; set; }

    public long? _2 { get; set; }

    public long? _3 { get; set; }

    public long? _4 { get; set; }
}
