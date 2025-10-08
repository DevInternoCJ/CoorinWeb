using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class VwFlujo
{
    public byte IdPregunta { get; set; }

    public string Pregunta { get; set; } = null!;

    public short IdRespuesta { get; set; }

    public short IdValor { get; set; }

    public string? Respuesta { get; set; }

    public byte? IdSiguientePregunta { get; set; }

    public bool Seguimiento { get; set; }

    public bool Negociación { get; set; }

    public short? Identificador { get; set; }

    public string? Valor { get; set; }

    public bool? ValorActivo { get; set; }

    public string? Atajo { get; set; }
}
