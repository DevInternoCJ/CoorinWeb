using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class PalabrasProhibída
{
    public string Palabra { get; set; } = null!;

    public bool Grosería { get; set; }
}
