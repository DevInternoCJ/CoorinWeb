using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class Capacitacion
{
    public int IdEjecutivo { get; set; }

    public string? NombreEjecutivo { get; set; }

    public string? Usuario { get; set; }

    public short? IdArea { get; set; }

    public DateOnly? FechaInsert { get; set; }
}
