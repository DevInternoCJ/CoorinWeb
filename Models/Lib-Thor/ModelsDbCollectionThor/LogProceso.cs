using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class LogProceso
{
    public int IdLogProceso { get; set; }

    public DateTime? FechaHora { get; set; }

    public int? IdCartera { get; set; }

    public int? IdEjecutivoInsert { get; set; }

    public string? Archivo { get; set; }

    public int? Registros { get; set; }

    public string? Dominio { get; set; }

    public string? Computadora { get; set; }

    public string? Usuario { get; set; }

    public int? Insertados { get; set; }

    public string Error { get; set; } = null!;

    public byte[]? Proceso { get; set; }
}
