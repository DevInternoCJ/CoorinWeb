using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsAllocation;

public partial class Pago70
{
    public string? IdCuenta { get; set; }

    public DateOnly? Fecha { get; set; }

    public int Monto { get; set; }

    public int? Referencia { get; set; }

    public int? Segmentación { get; set; }
}
