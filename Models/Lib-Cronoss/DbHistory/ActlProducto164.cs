using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class ActlProducto164
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? PorcentajeDescuento { get; set; }

    public string? MontoAutorizado { get; set; }

    public string? ValorCuota { get; set; }

    public string? NúmeroCuotas { get; set; }

    public string? Peridiocidad { get; set; }

    public string? MontoPagado { get; set; }

    public string? CuotasPagadas { get; set; }

    public string? DiasTranscurridosImpago { get; set; }

    public string? DiasAtraso { get; set; }

    public string? ValorPagare { get; set; }

    public string? SaldoCapitalPendiente { get; set; }

    public string? SaldoParaLiquidarCapitalInteresEIva { get; set; }
}
