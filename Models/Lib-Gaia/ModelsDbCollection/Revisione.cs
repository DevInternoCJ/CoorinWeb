using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class Revisione
{
    public DateOnly Fecha { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public int IdEjecutivo { get; set; }

    public bool Realizado { get; set; }

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;
}
