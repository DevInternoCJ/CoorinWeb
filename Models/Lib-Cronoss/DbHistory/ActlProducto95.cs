using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class ActlProducto95
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Region { get; set; }

    public string? Plaza { get; set; }

    public string? SaldoCurrent { get; set; }

    public string? Saldo1A30 { get; set; }

    public string? Saldo31A60 { get; set; }

    public string? Saldo61A90 { get; set; }

    public string? Saldo91A120 { get; set; }

    public string? SaldoMasDe120 { get; set; }

    public string? SaldoServicio { get; set; }

    public string? SaldoVencidoCalculo { get; set; }

    public string? SaldoEquipoDiferido { get; set; }

    public string? SaldoFinalPena { get; set; }

    public string? TotalACobrar { get; set; }

    public string? Ciclo { get; set; }

    public string? Pago1 { get; set; }

    public string? Pago2 { get; set; }

    public string? BucketSim { get; set; }

    public string? FechaCancelacion { get; set; }

    public string? DiasCancelado { get; set; }

    public string? FechaAsignacion { get; set; }

    public string? RegionNueva { get; set; }
}
