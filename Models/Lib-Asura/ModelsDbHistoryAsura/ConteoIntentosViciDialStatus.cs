using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class ConteoIntentosViciDialStatus
{
    public long? Conteo { get; set; }

    public DateOnly FechaInsert { get; set; }

    public long Númerotelefónico { get; set; }

    public string? Tipo { get; set; }

    public string Campaña { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string Servidor { get; set; } = null!;
}
