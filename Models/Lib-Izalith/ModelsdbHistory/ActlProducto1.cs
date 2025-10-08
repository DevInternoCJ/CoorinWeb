using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class ActlProducto1
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? LoanProductcode { get; set; }

    public string? Recoveredcode { get; set; }

    public string? Placement { get; set; }

    public decimal? Initialbalance { get; set; }

    public decimal? CurrentBalanceG { get; set; }

    public string? MínimoMasAtrasado { get; set; }

    public string? Estabilizacion { get; set; }

    public string? Batchdate { get; set; }

    public string? Cur { get; set; }

    public string? T30 { get; set; }

    public string? S60 { get; set; }

    public string? N90 { get; set; }

    public string? C120 { get; set; }

    public string? C150 { get; set; }

    public string? C180 { get; set; }

    public string? MínimoMásAtrasado { get; set; }

    public string? EnrolladoSettlement { get; set; }

    public string? FechaMinimomasatrasado { get; set; }

    public string? Saldovencido { get; set; }

    public string? CollectibilityCode { get; set; }

    public string? CurrentAgencyId { get; set; }

    public string? Asignacion { get; set; }

    public string? CycleCut { get; set; }

    public string? CurrentBalanceAcorn { get; set; }

    public string? DateWoCancelled { get; set; }
}
