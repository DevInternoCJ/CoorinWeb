using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class EncuentasPregunta
{
    public int IdPregunta { get; set; }

    public int IdCartera { get; set; }

    public string Pregunta { get; set; } = null!;

    public string? NombreEncuesta { get; set; }
}
