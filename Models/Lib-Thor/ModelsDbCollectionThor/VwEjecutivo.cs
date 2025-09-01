using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class VwEjecutivo
{
    public int IdEncargado { get; set; }

    public int IdEjecutivo { get; set; }

    public string Usuario { get; set; } = null!;

    public string NombreEjecutivo { get; set; } = null!;

    public byte[]? Contraseña { get; set; }
}
