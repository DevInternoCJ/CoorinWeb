using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class ActlProducto80
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Producto { get; set; }

    public string? InformacionAl { get; set; }

    public string? SaldoDeuda { get; set; }

    public string? SaldoMora { get; set; }

    public string? SaldoCapital { get; set; }

    public string? DiasMora { get; set; }

    public string? FecVctoCuota1 { get; set; }

    public string? TelParticular { get; set; }

    public string? TelefonoOficina { get; set; }

    public string? TelefonoAdicional { get; set; }

    public string? TelefonoCobranza { get; set; }

    public string? TelefonoPartRelacion1 { get; set; }

    public string? TelefonoComRelacion1 { get; set; }

    public string? TelefonoPartRelacion2 { get; set; }

    public string? TelefonoComRelacion2 { get; set; }

    public string? TelefonoPartRelacion3 { get; set; }

    public string? TelefonoComRelacion3 { get; set; }

    public string? Corte { get; set; }

    public string? SaldoAlCorte { get; set; }

    public string? Mora { get; set; }

    public string? DescuentoAplicar30Dias { get; set; }

    public string? DescuentoAplicar3Meses { get; set; }

    public string? DescuentoAplicar6Meses { get; set; }

    public string? DescuentoAplicar12Meses { get; set; }

    public string? DescuentoAplicar24Meses { get; set; }

    public string? DescuentoAplicarMayorA24YMenorA48Meses { get; set; }
}
