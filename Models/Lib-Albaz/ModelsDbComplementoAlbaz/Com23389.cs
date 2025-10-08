using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Complemento;

public partial class Com23389
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public string? Comentarios { get; set; }
}
