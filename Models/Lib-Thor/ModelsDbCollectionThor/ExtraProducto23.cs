using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class ExtraProducto23
{
    public string IdCuenta { get; set; } = null!;

    public string? Saldo { get; set; }

    public string? MensualidadesCubiertas { get; set; }

    public string? MensualidadesFaltantes { get; set; }

    public string? PlazoCredito { get; set; }
}
