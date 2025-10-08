using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Allocation;

public partial class InsertaSkipFaltante
{
    public string IdCartera { get; set; } = null!;

    public string? IdCuenta { get; set; }

    public string? FechaInsert { get; set; }

    public string? SegundoInsert { get; set; }

    public string? IdEjecutivo { get; set; }

    public string IdDato { get; set; } = null!;

    public string? DatoBuscado { get; set; }

    public string? IdFuente { get; set; }

    public string Encontrado { get; set; } = null!;

    public string NúmeroTeléfonosEncontrados { get; set; } = null!;

    public int? NombrePersona { get; set; }

    public int? Puesto { get; set; }

    public int? NombreLugar { get; set; }

    public int? DomicilioLugar { get; set; }

    public string TiempoEnCuenta { get; set; } = null!;

    public int? InfoEncontrada { get; set; }

    public string Confirmado { get; set; } = null!;

    public string Skip { get; set; } = null!;

    public int? Link { get; set; }
}
