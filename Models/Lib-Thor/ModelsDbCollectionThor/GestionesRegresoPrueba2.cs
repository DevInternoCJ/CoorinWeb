using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class GestionesRegresoPrueba2
{
    public long IdReg { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? Expediente { get; set; }

    public string Actividad { get; set; } = null!;

    public DateTime FechaHoraActividad { get; set; }
}
