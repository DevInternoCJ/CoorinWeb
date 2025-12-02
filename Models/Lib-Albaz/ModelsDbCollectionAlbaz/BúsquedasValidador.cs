using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class BúsquedasValidador
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public int IdEjecutivoValidador { get; set; }

    public short? IdOrigen { get; set; }
}
