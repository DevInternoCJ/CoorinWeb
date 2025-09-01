using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class ServidoresTelefonium
{
    public string? IpServidor { get; set; }

    public string? Servicio { get; set; }

    public string? Compañia { get; set; }

    public bool? Activo { get; set; }

    public DateOnly? FechaAlta { get; set; }

    public DateOnly? FechaBaja { get; set; }

    public string? Carteras { get; set; }

    public string? Ide { get; set; }
}
