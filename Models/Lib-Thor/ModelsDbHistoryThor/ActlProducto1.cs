using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

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

    public string? FechaRecepción { get; set; }

    public string? PlacementLevelCode { get; set; }

    public string? CalifScore { get; set; }

    public string? Receiptdate { get; set; }

    public string? Lastpaymentdate { get; set; }

    public string? Montlyincome { get; set; }

    public string? Fechacortelc { get; set; }

    public string? Prorroga { get; set; }

    public string? Unb { get; set; }

    public string? LastDatePayment { get; set; }

    public string? CancellationDate { get; set; }

    public string? MarketRecoveryScore { get; set; }

    public string? LendingPayToCurrrentScore { get; set; }

    public string? WriteOffDate { get; set; }

    public string? Fechacastigo { get; set; }

    public string? Quid { get; set; }

    public string? MetricScore { get; set; }

    public string? StayDaysOa { get; set; }

    public string? FechaSkip { get; set; }
}
