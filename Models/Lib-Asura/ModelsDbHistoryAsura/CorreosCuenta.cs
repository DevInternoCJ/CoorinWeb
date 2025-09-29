using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class CorreosCuenta
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string CorreoElectrónico { get; set; } = null!;

    public int IdEjecutivo { get; set; }

    public DateOnly FechaInsert { get; set; }

    public short IdOrigen { get; set; }

    public short IdInformación { get; set; }

    public bool Confirmado { get; set; }

    public int? IdEjecutivoInformación { get; set; }

    public DateTime? FechaHoraInformación { get; set; }
}
