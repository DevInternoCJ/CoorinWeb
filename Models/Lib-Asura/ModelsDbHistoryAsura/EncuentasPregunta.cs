using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryAsura;

public partial class EncuentasPregunta
{
    public int IdPregunta { get; set; }

    public int IdCartera { get; set; }

    public string Pregunta { get; set; } = null!;

    public string? NombreEncuesta { get; set; }
}
