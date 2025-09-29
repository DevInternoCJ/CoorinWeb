using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class EncuestaCliente
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public int Pregunta1 { get; set; }

    public int Pregunta2 { get; set; }

    public int Pregunta3 { get; set; }

    public int Pregunta4 { get; set; }

    public int Pregunta5 { get; set; }

    public int Pregunta6 { get; set; }

    public int Pregunta7 { get; set; }

    public int Pregunta8 { get; set; }

    public string? Detalle1 { get; set; }

    public string? Detalle2 { get; set; }

    public string? Detalle3 { get; set; }

    public string? Detalle4 { get; set; }

    public string? Detalle5 { get; set; }

    public string? Detalle6 { get; set; }

    public string? Detalle7 { get; set; }
}
