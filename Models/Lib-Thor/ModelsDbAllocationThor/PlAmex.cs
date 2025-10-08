using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsAllocation;

public partial class PlAmex
{
    public string Cuenta { get; set; } = null!;

    public DateOnly FechaPago { get; set; }

    public decimal MontoPago { get; set; }

    public DateOnly? FechaPlazo { get; set; }

    public decimal? MontoPlazo { get; set; }

    public int Cumplido { get; set; }

    public string? _30 { get; set; }

    public string? _60 { get; set; }

    public string? _90 { get; set; }

    public string? _120 { get; set; }

    public string? _150 { get; set; }

    public string? _180 { get; set; }

    public DateOnly? CreaciónNegociación { get; set; }

    public DateOnly? FechaInicioPlazo { get; set; }

    public DateOnly? FechaPagoPlazo { get; set; }

    public DateOnly? FechaFinPlazo { get; set; }

    public byte? Pagos { get; set; }

    public decimal? MontoNegociado { get; set; }

    public decimal? SaldoNegociación { get; set; }

    public string? HerramientaOfrecida { get; set; }

    public string? Usuario { get; set; }

    public string? EstadoNegociación { get; set; }

    public string? Corte { get; set; }

    public string? Placement { get; set; }

    public string? RecoveredCode { get; set; }

    public decimal? Initialbalance { get; set; }

    public string Estabilización { get; set; } = null!;

    public string? MínimoMásAtrasado { get; set; }

    public string? Asignacion { get; set; }
}
