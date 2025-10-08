using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class ErroresMigración
{
    public int IdErrorMigración { get; set; }

    public DateTime FechaError { get; set; }

    public string Proceso { get; set; } = null!;

    public string? ErrorMigración { get; set; }

    public int? Severidad { get; set; }
}
