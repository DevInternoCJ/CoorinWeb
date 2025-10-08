using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class BúsquedasV
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public short IdDato { get; set; }

    public string DatoBuscado { get; set; } = null!;

    public short IdFuente { get; set; }

    public bool Encontrado { get; set; }

    public byte NúmeroTeléfonosEncontrados { get; set; }

    public string? NombrePersona { get; set; }

    public string? Puesto { get; set; }

    public string? NombreLugar { get; set; }

    public string? DomicilioLugar { get; set; }

    public TimeOnly TiempoEnCuenta { get; set; }

    public string? InfoEncontrada { get; set; }

    public bool Confirmado { get; set; }

    public bool Skip { get; set; }

    public string? Link { get; set; }

    public virtual Cartera1 IdCarteraNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdDatoNavigation { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdFuenteNavigation { get; set; } = null!;
}
