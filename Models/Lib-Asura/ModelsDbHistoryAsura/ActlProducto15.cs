using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryAsura;

public partial class ActlProducto15
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? DescClasificaciónCliente { get; set; }

    public string? BolPag { get; set; }

    public string? TotalPag { get; set; }

    public string? UltFecPag { get; set; }

    public string? ImpUltBolPag { get; set; }

    public string? BolVenc { get; set; }

    public string? TotalVenc { get; set; }

    public string? VencMes { get; set; }
}
