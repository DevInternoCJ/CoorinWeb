using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class VwIntegraciónGestione
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateTime Inicio { get; set; }

    public DateTime Fin { get; set; }

    public int IdEjecutivo { get; set; }

    public string Usuario { get; set; } = null!;

    public long NúmeroTelefónico { get; set; }

    public short Extensión { get; set; }

    public string Modo { get; set; } = null!;
}
