using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Complemento;

public partial class LogComplemento
{
    public int IdLogComplemento { get; set; }

    public short IdCartera { get; set; }

    public bool Activado { get; set; }

    public int IdEjecutivo { get; set; }

    public string Dominio { get; set; } = null!;

    public string Computadora { get; set; } = null!;

    public string UsuarioWindows { get; set; } = null!;

    public string Ip { get; set; } = null!;

    public int Extensión { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }
}
