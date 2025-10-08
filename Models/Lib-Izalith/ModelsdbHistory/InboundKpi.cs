using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class InboundKpi
{
    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundInsert { get; set; }

    public long NúmeroTelefónico { get; set; }

    public bool? ResultadoInbound { get; set; }

    public string? ResultadoBlaster { get; set; }
}
