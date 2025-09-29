using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class LetrasRepetición
{
    public string Letra { get; set; } = null!;

    public byte Repetición { get; set; }
}
