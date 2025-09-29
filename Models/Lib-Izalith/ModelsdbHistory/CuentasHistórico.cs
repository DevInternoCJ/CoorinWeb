using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class CuentasHistórico
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public short IdProducto { get; set; }

    public int IdSituación { get; set; }

    public decimal Saldo { get; set; }

    public short? PagosVencidos { get; set; }

    public DateOnly VálidoDesde { get; set; }

    public DateOnly VálidoHasta { get; set; }

    public bool Activa { get; set; }
}
