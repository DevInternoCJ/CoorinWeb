using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class LetrasRepetición
{
    public string Letra { get; set; } = null!;

    public byte Repetición { get; set; }
}
