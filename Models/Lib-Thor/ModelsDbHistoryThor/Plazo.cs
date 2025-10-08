using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class Plazo
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    /// <summary>
    /// Monto del pago que se negoció. 
    /// </summary>
    public decimal MontoPago { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivo { get; set; }

    /// <summary>
    /// Si se cumplió el pago.
    /// </summary>
    public bool? Cumplido { get; set; }

    /// <summary>
    /// Fecha en la que se negoció el pago.
    /// </summary>
    public DateOnly FechaPago { get; set; }

    public DateOnly FechaInicioPlazo { get; set; }

    public DateOnly FechaFinPlazo { get; set; }

    public decimal? SumaPagos { get; set; }

    public byte? Pagos { get; set; }

    public bool Válido { get; set; }

    public byte? Ordinal { get; set; }
}
