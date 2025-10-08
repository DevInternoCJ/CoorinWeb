using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class Ofrecimiento
{
    public DateOnly FechaInsert { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public short IdHerramienta { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivo { get; set; }

    /// <summary>
    /// Tipo accionamiento por el cual se hizo el ofrecimiento.
    /// </summary>
    public short IdAcercamiento { get; set; }

    public decimal MontoRequerido { get; set; }

    public decimal MontoOfrecido { get; set; }

    public float Descuento { get; set; }

    public byte Plazos { get; set; }

    public decimal Saldo { get; set; }

    public DateOnly? FechaCorte { get; set; }
}
