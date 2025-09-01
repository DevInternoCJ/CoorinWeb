using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class _200Castigo
{
    public byte MesAsignación { get; set; }

    public string IdCuenta { get; set; } = null!;

    public short IdProducto { get; set; }

    public DateOnly? FechaInsert { get; set; }

    public TimeOnly? SegundoInsert { get; set; }

    public string CódigoResultado { get; set; } = null!;

    public string? TipoAcción { get; set; }

    public string? CódigoAcción { get; set; }

    public string? Observaciones { get; set; }

    public short? IdContacto { get; set; }

    public short? IdSituación { get; set; }
}
