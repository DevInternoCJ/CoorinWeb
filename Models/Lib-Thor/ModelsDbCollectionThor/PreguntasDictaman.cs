using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class PreguntasDictaman
{
    public int IdPregunta { get; set; }

    public int IdTipoDictamen { get; set; }

    public string? Dictamen { get; set; }

    public string? Pregunta { get; set; }
}
