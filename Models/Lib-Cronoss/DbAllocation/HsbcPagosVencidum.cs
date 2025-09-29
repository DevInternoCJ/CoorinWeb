using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class HsbcPagosVencidum
{
    public string Credito { get; set; } = null!;

    public byte? PvIni { get; set; }

    public byte? PvFin { get; set; }

    public decimal? SaldoContableInicial { get; set; }

    public string? Portafolio { get; set; }

    public decimal EfectivoRecuperadoVal { get; set; }

    public decimal? EfectivoRecuperadoAcum { get; set; }

    public decimal? EfectivoRecuperadoDia { get; set; }

    public string? Agencia { get; set; }

    public string? Org { get; set; }

    public string FechaAsignacion { get; set; } = null!;

    public string? Classification { get; set; }

    public string? Cy { get; set; }

    public decimal? SetOff { get; set; }

    public string? FechaProceso { get; set; }

    public DateOnly FechaPago { get; set; }
}
