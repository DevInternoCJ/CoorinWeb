using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class ActlProducto70
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Ciclo { get; set; }

    public string? Tenure { get; set; }

    public string? SaldoTot { get; set; }

    public string? Atraso { get; set; }

    public string? SegmentoDespachos { get; set; }

    public string? NumLineas { get; set; }

    public string? SaldoCurrent { get; set; }

    public string? DiasSusp { get; set; }

    public string? Bonificacion { get; set; }

    public string? Score { get; set; }

    public string? Bucket { get; set; }
}
