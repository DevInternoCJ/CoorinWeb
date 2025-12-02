using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsAllocation;

public partial class CorreosNu
{
    public int? NúmeroDeEmpleado { get; set; }

    public string? Usuario { get; set; }

    public string? NombreDeEjecutivo { get; set; }

    public string? CorreoEjecutivo { get; set; }

    public DateOnly? FechaInsert { get; set; }

    public DateOnly? FechaUpdate { get; set; }
}
