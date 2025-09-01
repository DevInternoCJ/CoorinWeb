using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class TeléfonosHistórico
{
    public DateOnly VálidoDesde { get; set; }

    public DateOnly VálidoHasta { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public long NúmeroTelefónico { get; set; }

    public bool Activo { get; set; }

    public short IdTelefonía { get; set; }

    public short IdOrigen { get; set; }

    public short IdClase { get; set; }
}
