using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class BloqueoMetasEjecutivo
{
    public string Usuario { get; set; } = null!;

    public bool Bloqueo { get; set; }
}
