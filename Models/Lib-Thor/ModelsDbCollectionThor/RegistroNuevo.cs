using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class RegistroNuevo
{
    public string? Idcuenta { get; set; }

    public string? Valor { get; set; }

    public DateTime? FechaProceso { get; set; }

    public string? Segmento { get; set; }

    public string? Tipo { get; set; }

    public string? IdEjeutivo { get; set; }

    public string? Origen { get; set; }
}
