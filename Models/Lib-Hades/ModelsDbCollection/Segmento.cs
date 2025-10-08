using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class Segmento
{
    public int IdSegmento { get; set; }

    public int IdCartera { get; set; }

    public string Segmento1 { get; set; } = null!;
}
