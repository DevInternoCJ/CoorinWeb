using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class PalabrasProhibída
{
    public string Palabra { get; set; } = null!;

    public bool Grosería { get; set; }
}
