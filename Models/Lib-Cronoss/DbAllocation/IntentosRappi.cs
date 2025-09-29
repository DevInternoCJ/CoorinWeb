using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class IntentosRappi
{
    public string? IdCuenta { get; set; }

    public string? Telefono { get; set; }

    public int? Lada { get; set; }

    public long? Consecutivo { get; set; }

    public string Comentario { get; set; } = null!;

    public string Idclase { get; set; } = null!;

    public string Idcontacto { get; set; } = null!;

    public string Idsituacion { get; set; } = null!;
}
