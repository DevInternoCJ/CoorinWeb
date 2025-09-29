using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class DemográficosErróneo
{
    public byte MesAsignación { get; set; }

    public string IdCuenta { get; set; } = null!;

    public bool Teléfono1Domicilio0 { get; set; }
}
