using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class VwLogError
{
    public DateTime FechaHora { get; set; }

    public string? NombreEjecutivo { get; set; }

    public string? Usuario { get; set; }

    public string Módulo { get; set; } = null!;

    public string Error { get; set; } = null!;

    public string? Query { get; set; }

    public string Ip { get; set; } = null!;

    public string Windows { get; set; } = null!;

    public string Dominio { get; set; } = null!;

    public string Computadora { get; set; } = null!;
}
