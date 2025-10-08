using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class FlujoRespuesta
{
    public short IdRespuesta { get; set; }

    public byte IdPregunta { get; set; }

    public short IdValor { get; set; }

    public string? Respuesta { get; set; }

    public byte? IdSiguientePregunta { get; set; }

    public bool Seguimiento { get; set; }

    public bool Negociación { get; set; }

    public short? Identificador { get; set; }

    public virtual FlujoPregunta IdPreguntaNavigation { get; set; } = null!;

    public virtual FlujoPregunta? IdSiguientePreguntaNavigation { get; set; }

    public virtual ValoresCatálogo IdValorNavigation { get; set; } = null!;
}
