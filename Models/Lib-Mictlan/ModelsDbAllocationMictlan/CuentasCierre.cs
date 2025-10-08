using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationMictlan;

public partial class CuentasCierre
{
    public string IdCuenta { get; set; } = null!;

    public bool Activa { get; set; }

    public DateOnly? VálidoDesdeCh { get; set; }

    public DateOnly VálidoHastaCh { get; set; }

    public DateOnly VálidoDesdeCiclo { get; set; }

    public DateOnly VálidoHastaCiclo { get; set; }

    public short Idcartera { get; set; }

    public int Idsituación { get; set; }
}
