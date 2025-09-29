using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class ActlProducto92
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? SaldoServicio { get; set; }

    public string? SaldoPena { get; set; }

    public string? SaldoTotal { get; set; }

    public string? BucketSim { get; set; }

    public string? FechaDeduccion { get; set; }

    public string? DiasDedfis { get; set; }
}
