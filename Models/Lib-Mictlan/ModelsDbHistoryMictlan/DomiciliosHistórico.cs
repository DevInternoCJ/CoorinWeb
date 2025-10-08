using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class DomiciliosHistórico
{
    public DateOnly VálidoDesde { get; set; }

    public DateOnly VálidoHasta { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public long IdDomicilio { get; set; }

    public short IdOrigen { get; set; }

    public bool Activo { get; set; }
}
