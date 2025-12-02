using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class Encuenta
{
    public string Idcuenta { get; set; } = null!;

    public short Idcartera { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int Idejecutivo { get; set; }

    public int Idpregunta { get; set; }

    public int Idrespuesta { get; set; }

    public string? Detalle { get; set; }
}
