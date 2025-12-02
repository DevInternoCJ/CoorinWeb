using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class CondonacionNeg
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public short IdHerramienta { get; set; }

    public int IdEjecutivo { get; set; }

    public decimal MontoCondonar { get; set; }

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;

    public virtual Herramienta IdHerramientaNavigation { get; set; } = null!;
}
