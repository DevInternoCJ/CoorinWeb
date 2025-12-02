using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class ActlProducto169
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? PagosVencidos { get; set; }

    public string? SaldoVencido { get; set; }

    public string? Morainicio { get; set; }

    public string? Moraactual { get; set; }

    public string? Fechaultimopago { get; set; }

    public string? Sdovencidoactual { get; set; }

    public string? Sdoliquidaractual { get; set; }

    public string? Campaña { get; set; }

    public string? DescuentoCondonacion { get; set; }

    public string? Quita10 { get; set; }

    public string? Quita20 { get; set; }

    public string? Quita30 { get; set; }

    public string? Quita40 { get; set; }

    public string? Quita50 { get; set; }

    public string? Quita60 { get; set; }

    public string? Quita70 { get; set; }

    public string? SaldoTotalLiquidacion { get; set; }

    public string? SaldopagarCondonacion { get; set; }
}
