using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class FlujoPregunta
{
    public byte IdPregunta { get; set; }

    public string Pregunta { get; set; } = null!;

    public virtual ICollection<FlujoRespuesta> FlujoRespuestaIdPreguntaNavigations { get; set; } = new List<FlujoRespuesta>();

    public virtual ICollection<FlujoRespuesta> FlujoRespuestaIdSiguientePreguntaNavigations { get; set; } = new List<FlujoRespuesta>();
}
