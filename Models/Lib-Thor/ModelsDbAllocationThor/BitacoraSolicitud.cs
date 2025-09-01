using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationThor;

public partial class BitacoraSolicitud
{
    public int Id { get; set; }

    public string? Numerodecuenta { get; set; }

    public string? Fecha { get; set; }

    public string? Segmento { get; set; }
}
