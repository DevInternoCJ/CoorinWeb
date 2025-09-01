using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationThor;

public partial class CamposTxtRep
{
    public int IdCampo { get; set; }

    public short IdCartera { get; set; }

    public short? IdProducto { get; set; }

    public string? Proceso { get; set; }

    public string Campo { get; set; } = null!;

    public string TipoDato { get; set; } = null!;

    public short Inicio { get; set; }

    public short Fin { get; set; }

    public string? Descripción { get; set; }
}
