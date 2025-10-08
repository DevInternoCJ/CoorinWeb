using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class VwÚltimoCiclo
{
    public string IdCuenta { get; set; } = null!;

    public short IdCliente { get; set; }

    public short? IdFválidoDesde { get; set; }

    public short? IdFválidoHasta { get; set; }
}
