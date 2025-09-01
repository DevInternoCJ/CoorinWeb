using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class ExtraProducto20
{
    public string IdCuenta { get; set; } = null!;

    public string? Rap { get; set; }

    public string? BuróDeCréditoActualizado { get; set; }

    public string? EsClienteRecurrente { get; set; }

    public string? PosibilidadDeRefinanciamiento { get; set; }

    public string? RiesgoInicialDelContrato { get; set; }
}
