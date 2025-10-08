using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Complemento;

public partial class ErroresSensibilización
{
    public int IdErrorMigración { get; set; }

    public DateTime FechaError { get; set; }

    public string Proceso { get; set; } = null!;

    public string? ErrorMigración { get; set; }

    public int? Severidad { get; set; }
}
