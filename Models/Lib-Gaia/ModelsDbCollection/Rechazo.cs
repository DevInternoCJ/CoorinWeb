using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class Rechazo
{
    public int? IdCartera { get; set; }

    public int IdMotivos { get; set; }

    public string? Tipo { get; set; }
}
