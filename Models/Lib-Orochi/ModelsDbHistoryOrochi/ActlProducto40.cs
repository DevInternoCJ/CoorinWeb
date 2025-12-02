using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.History;

public partial class ActlProducto40
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? SaldoAlCorteTdc { get; set; }

    public string? Saldoinicial { get; set; }

    public string? FecProxCorte { get; set; }

    public string? SaldoAlDía { get; set; }

    public string? SaldoVencidoTdc { get; set; }

    public string? PagoMinimoTdc { get; set; }

    public string? BlkCode { get; set; }

    public string? Cy { get; set; }

    public string? FecUltPg { get; set; }

    public string? PagMin { get; set; }

    public string? Pv { get; set; }

    public string? Type { get; set; }

    public string? FecAsigna { get; set; }

    public string? ImpPagAnt { get; set; }

    public string? GenericoPll { get; set; }

    public string? TotalVigente { get; set; }

    public string? TotalVencido { get; set; }

    public string? SaldoVencido { get; set; }

    public string? TotalAdeudo { get; set; }

    public string? Facultades { get; set; }

    public string? SaldoAcobrar { get; set; }
}
