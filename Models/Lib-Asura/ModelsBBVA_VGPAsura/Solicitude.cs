using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsBBVA_VGP;

public partial class Solicitude
{
    public long IdAuto { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string Usuario { get; set; } = null!;

    public short IdEstado { get; set; }

    public string? Observaciones { get; set; }

    public virtual Auto IdAutoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdEstadoNavigation { get; set; } = null!;

    public virtual Usuario UsuarioNavigation { get; set; } = null!;
}
