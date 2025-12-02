using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Allocation;

public partial class LogIngreso
{
    public int IdLogIngreso { get; set; }

    public int IdEjecutivo { get; set; }

    public string Dominio { get; set; } = null!;

    public string Computadora { get; set; } = null!;

    public string UsuarioWindows { get; set; } = null!;

    public string Ip { get; set; } = null!;

    public int Extensión { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public TimeOnly? SegundoSalida { get; set; }
}
