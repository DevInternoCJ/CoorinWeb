using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryAsura;

public partial class ActlProducto135
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? DiasMora { get; set; }

    public string? SaldoDeuda { get; set; }

    public string? Rubro { get; set; }

    public string? Mora { get; set; }

    public string? Segmento { get; set; }

    public string? Producto { get; set; }
}
