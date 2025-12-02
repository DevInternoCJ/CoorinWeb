using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class Pago
{
    public int IdPago { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaPago { get; set; }

    public double MontoPago { get; set; }

    public string? Referencia { get; set; }

    public DateOnly FechaInsert { get; set; }

    public int? IdLogProceso { get; set; }

    public bool? Confirmado { get; set; }

    public string? Segmentación { get; set; }

    public virtual Fecha FechaPagoNavigation { get; set; } = null!;
}
