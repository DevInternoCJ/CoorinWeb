using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class RegistroGttersBackup
{
    public int IdRegistro { get; set; }

    public string? Numerodecuenta { get; set; }

    public string? Numerocontrol { get; set; }

    public string? NumeroTelefonico { get; set; }

    public DateTime? FechaGtte { get; set; }

    public DateTime? FechaGtte2 { get; set; }

    public DateTime? FechaGtrs { get; set; }

    public string? Segmento { get; set; }

    public string? Origen { get; set; }
}
