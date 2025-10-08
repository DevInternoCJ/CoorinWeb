using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class ServidoresViciDial
{
    public string Servidor { get; set; } = null!;

    public short IdCartera { get; set; }

    public short IdProducto { get; set; }

    public string Alias { get; set; } = null!;

    public string UserAdmin { get; set; } = null!;

    public string PassAdmin { get; set; } = null!;

    public bool Activo { get; set; }
}
