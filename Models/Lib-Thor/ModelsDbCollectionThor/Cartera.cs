using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class Cartera
{
    public string IdCuenta { get; set; } = null!;

    public string? Tipodecredito { get; set; }

    public short Clavecontacto { get; set; }

    public bool Marcadoparahistorico { get; set; }
}
