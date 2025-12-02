using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class VwÚltimoCiclo
{
    public string IdCuenta { get; set; } = null!;

    public short IdCliente { get; set; }

    public short? IdFválidoDesde { get; set; }

    public short? IdFválidoHasta { get; set; }
}
