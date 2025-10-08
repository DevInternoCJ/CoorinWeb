using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Allocation;

public partial class Pago1Plmt183258
{
    public int IdPago { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public DateOnly FechaPago { get; set; }

    public decimal Montopago { get; set; }

    public string? Referencia { get; set; }

    public long? IdLogproceso { get; set; }

    public bool? Confirmado { get; set; }

    public string? SegTemp { get; set; }

    public string? SegPagos { get; set; }
}
