using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class ActlProducto6
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Compras { get; set; }

    public decimal? SaldoActual { get; set; }

    public decimal? MinimoPagar { get; set; }

    public decimal? SaldoVencido { get; set; }

    public string? Comisiones { get; set; }

    public string? SituacionCuentaBanco { get; set; }

    public string? FechaUltimoPago { get; set; }

    public string? Idacuerdo { get; set; }

    public string? Interesesordinarios { get; set; }

    public string? Ivainteresesordinario { get; set; }

    public string? Interesesmoratoriossobretasa { get; set; }

    public string? Ivainteresmonatorio { get; set; }

    public string? Interesesmoratoriotardio { get; set; }

    public string? Interesdegastosdecobranza { get; set; }

    public string? Gastosdeliquidacion { get; set; }

    public string? Ivadeliquidacion { get; set; }

    public string? Impuestosiva { get; set; }

    public string? Seguro { get; set; }
}
