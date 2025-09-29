using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class ActlProducto21
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? PagoVencidoAntigüedad { get; set; }

    public string? SaldoVencido { get; set; }

    public string? SaldoTotal { get; set; }

    public string? Pva { get; set; }

    public string? Sva { get; set; }
}
