using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class ActlProducto72
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? NumLineas { get; set; }

    public string? Ciclo { get; set; }

    public string? Bucket { get; set; }

    public string? Tenure { get; set; }

    public string? Score { get; set; }

    public string? EtiquetaSegmento { get; set; }

    public string? FechaCancelacion { get; set; }

    public string? SaldoCurrent { get; set; }

    public string? Total { get; set; }

    public string? Vencido { get; set; }

    public string? Segmento { get; set; }

    public string? DiasSusp { get; set; }

    public string? SegmentoDespachos { get; set; }

    public string? BucketMes { get; set; }

    public string? Pcj { get; set; }

    public string? Descuento { get; set; }

    public string? Remesa { get; set; }

    public string? Atraso { get; set; }

    public string? Bonificacion { get; set; }
}
