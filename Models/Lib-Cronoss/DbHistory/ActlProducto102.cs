using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class ActlProducto102
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? DiasMora { get; set; }

    public string? SaldoInsoluto { get; set; }

    public string? Portafolio { get; set; }

    public string? MesParticipacion { get; set; }
}
