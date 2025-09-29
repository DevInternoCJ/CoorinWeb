using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class GrabacionesIntegración
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public string NombreGrabación { get; set; } = null!;

    public DateTime InicioLlamada { get; set; }

    public short? DuraciónSegundos { get; set; }

    public string? ServidorPredictivo { get; set; }

    public virtual GestionesTelefónica GestionesTelefónica { get; set; } = null!;
}
