using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class LiberacionesDi
{
    public DateOnly? FechaLiberacion { get; set; }

    public string? Detalle { get; set; }

    public string? LoginLibera { get; set; }

    public string? Aplicacion { get; set; }

    public string? Version { get; set; }

    public string? UsuarioAprueba { get; set; }

    public bool? Web { get; set; }

    public bool? Local { get; set; }

    public bool? Test { get; set; }
}
