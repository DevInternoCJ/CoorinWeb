using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class PalabrasProhibída
{
    public string Palabra { get; set; } = null!;

    public bool Grosería { get; set; }
}
