using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class Comentario
{
    public string IdCuenta { get; set; } = null!;

    public short IdCartera { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivo { get; set; }

    public string Comentario1 { get; set; } = null!;

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual GestionesChat? GestionesChat { get; set; }

    public virtual GestionesDomiciliaria? GestionesDomiciliaria { get; set; }

    public virtual GestionesTelefónica? GestionesTelefónica { get; set; }
}
