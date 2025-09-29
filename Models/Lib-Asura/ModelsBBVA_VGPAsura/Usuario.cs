using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsBBVA_VGP;

public partial class Usuario
{
    public string Usuario1 { get; set; } = null!;

    public byte Jerarquía { get; set; }

    public byte[]? Contraseña { get; set; }

    public byte[]? Contraseña2 { get; set; }

    public bool Activo { get; set; }

    public virtual ICollection<Solicitude> Solicitudes { get; set; } = new List<Solicitude>();
}
