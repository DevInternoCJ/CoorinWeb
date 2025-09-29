using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class VwActualizarCapacitacion
{
    public bool? Cambiar { get; set; }

    public int NoEmpleado { get; set; }

    public string Usuario { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string? Área { get; set; }

    public string? Cartera { get; set; }

    public byte Jerarquía { get; set; }

    public string? Puesto { get; set; }

    public string? Encargado { get; set; }
}
