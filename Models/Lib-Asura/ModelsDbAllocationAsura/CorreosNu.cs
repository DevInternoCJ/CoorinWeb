using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsAllocation;

public partial class CorreosNu
{
    public string? NúmeroDeEmpleado { get; set; }

    public string? Usuario { get; set; }

    public string? NombreDeEjecutivo { get; set; }

    public string? CorreoEjecutivo { get; set; }

    public DateOnly? FechaInsert { get; set; }

    public DateOnly? FechaUpdate { get; set; }
}
