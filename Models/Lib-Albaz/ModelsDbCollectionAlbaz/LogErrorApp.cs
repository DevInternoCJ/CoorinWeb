using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class LogErrorApp
{
    public int IdLogErrorApp { get; set; }

    public string Dominio { get; set; } = null!;

    public string Computadora { get; set; } = null!;

    public string Usuario { get; set; } = null!;

    public int IdEjecutivo { get; set; }

    public string Ip { get; set; } = null!;

    public DateTime FechaHora { get; set; }

    public string Módulo { get; set; } = null!;

    public string Error { get; set; } = null!;

    public string? Query { get; set; }
}
