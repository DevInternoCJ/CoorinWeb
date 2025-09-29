using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.History;

public partial class ActlProducto44
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? DiasMora { get; set; }

    public string? Importe { get; set; }

    public string? Saldo { get; set; }

    public string? SaldoInsoluto { get; set; }

    public string? InteresNormal { get; set; }

    public string? Pago { get; set; }

    public string? Iva { get; set; }

    public string? PagoTotal { get; set; }

    public string? RangoSemanal { get; set; }

    public string? RangoCartera { get; set; }
}
