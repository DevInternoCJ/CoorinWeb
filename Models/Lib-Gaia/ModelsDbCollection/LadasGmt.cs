using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class LadasGmt
{
    public string? Lada { get; set; }

    public string? Gmt { get; set; }

    public string? Hora { get; set; }

    public string? HusoHorario { get; set; }

    public bool? Activo { get; set; }
}
