using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class PalabrasProhibída
{
    public string Palabra { get; set; } = null!;

    public bool Grosería { get; set; }
}
