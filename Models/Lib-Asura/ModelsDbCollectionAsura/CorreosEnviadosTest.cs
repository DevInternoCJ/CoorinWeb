using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class CorreosEnviadosTest
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string FechaInsert { get; set; } = null!;

    public DateTime? SegundoInsert { get; set; }

    public string SegundoPaquete { get; set; } = null!;

    public int IdEjecutivoInsert { get; set; }

    public string CorreoElectrónico { get; set; } = null!;

    public int IdEtapa { get; set; }

    public string Asunto { get; set; } = null!;

    public string? Mensaje { get; set; }

    public short Idresultado { get; set; }
}
