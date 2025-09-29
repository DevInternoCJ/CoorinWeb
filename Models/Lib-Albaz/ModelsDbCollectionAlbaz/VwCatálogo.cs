using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class VwCatálogo
{
    public byte IdCatálogo { get; set; }

    public string Catálogo { get; set; } = null!;

    public string? NombreId { get; set; }

    public short IdValor { get; set; }

    public string Valor { get; set; } = null!;

    public string Detalle { get; set; } = null!;

    public short? Orden { get; set; }
}
