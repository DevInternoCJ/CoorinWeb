using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class FlujoRespuestasPrueba
{
    public short IdRespuesta { get; set; }

    public byte IdPregunta { get; set; }

    public short IdValor { get; set; }

    public string? Respuesta { get; set; }

    public byte? IdSiguientePregunta { get; set; }

    public bool Seguimiento { get; set; }

    public bool Negociación { get; set; }

    public short? Identificador { get; set; }
}
