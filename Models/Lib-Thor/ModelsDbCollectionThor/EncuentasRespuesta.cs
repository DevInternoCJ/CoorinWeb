using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class EncuentasRespuesta
{
    public int IdRespuesta { get; set; }

    public int IdPregunta { get; set; }

    public int IdCartera { get; set; }

    public string Respuesta { get; set; } = null!;

    public string? NombreEncuesta { get; set; }
}
