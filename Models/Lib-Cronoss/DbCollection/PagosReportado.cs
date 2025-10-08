using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class PagosReportado
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivo { get; set; }

    public DateOnly FechaPago { get; set; }

    public decimal MontoPago { get; set; }

    public string? Referencia { get; set; }

    public string? Sucursal { get; set; }

    public short IdEtapa { get; set; }

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdEtapaNavigation { get; set; } = null!;
}
