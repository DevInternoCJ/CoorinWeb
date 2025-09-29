using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class ActlProducto41
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? StaUsgaap { get; set; }

    public string? NumPagosKrn { get; set; }

    public string? FecProxVto { get; set; }

    public string? FecUltPago { get; set; }

    public string? ImpUltPago { get; set; }

    public string? TotalAdeudoKrn { get; set; }

    public string? TvigValor { get; set; }

    public string? TvdoValor { get; set; }

    public string? SaldoAlDía { get; set; }

    public string? FecProxCorte { get; set; }

    public string? Modalidad { get; set; }

    public string? SaldoContableMonedaOrigen { get; set; }

    public string? SaldoVencidoKrn { get; set; }

    public string? SaldoVigenteKrn { get; set; }

    public string? MontoPrincipalKrn { get; set; }

    public string? InteresOrdinarioKrn { get; set; }

    public string? MoratoriosKrn { get; set; }

    public string? OtrosExigiblesKrn { get; set; }

    public string? Saldoinicial { get; set; }
}
