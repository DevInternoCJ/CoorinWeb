using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class NegociacionesPendientesBmx
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? Idherramienta { get; set; }

    public int? IdEjecutivo { get; set; }

    public DateOnly? FechaUpdate { get; set; }

    public int? IdEjecutivoActualiza { get; set; }
}
