using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryAsura;

public partial class ActlProducto20
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Rtasvencidas { get; set; }

    public string? Nopagoreal { get; set; }

    public string? CapIntIva { get; set; }
}
