using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class VwRelacione
{
    public short IdValor1 { get; set; }

    public short IdValor2 { get; set; }

    public string? Relación { get; set; }

    public string Valor1 { get; set; } = null!;

    public string Valor2 { get; set; } = null!;

    public string Catálogo1 { get; set; } = null!;

    public string Catálogo2 { get; set; } = null!;
}
