using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class ValoresCalculadoraBbva
{
    public short? IdValor { get; set; }

    public byte? IdCatalogo { get; set; }

    public string? Nombre { get; set; }

    public bool? Activa { get; set; }

    public string? Detalle { get; set; }

    public string? Tipo { get; set; }
}
