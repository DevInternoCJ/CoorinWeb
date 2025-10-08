using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class VValoresCatalogo
{
    public short IdValor { get; set; }

    public byte IdCatálogo { get; set; }

    public string Valor { get; set; } = null!;

    public DateOnly FechaValor { get; set; }

    public bool ValorActivo { get; set; }

    public string? Detalle { get; set; }

    public short? Orden { get; set; }
}
