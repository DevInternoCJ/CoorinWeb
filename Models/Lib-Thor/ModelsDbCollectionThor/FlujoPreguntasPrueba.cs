using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class FlujoPreguntasPrueba
{
    public byte IdPregunta { get; set; }

    public string Pregunta { get; set; } = null!;
}
