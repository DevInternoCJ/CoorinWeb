using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class RelacionesCatálogo
{
    public short IdValor1 { get; set; }

    public short IdValor2 { get; set; }

    public string? Relación { get; set; }

    public virtual ValoresCatálogo IdValor1Navigation { get; set; } = null!;

    public virtual ValoresCatálogo IdValor2Navigation { get; set; } = null!;
}
