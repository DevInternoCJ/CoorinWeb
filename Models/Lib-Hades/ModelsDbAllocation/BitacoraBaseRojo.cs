using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbAllocation;

public partial class BitacoraBaseRojo
{
    public string Idcuenta { get; set; } = null!;

    public string NumeroClienteBmx { get; set; } = null!;

    public string TelefonoAsignacion { get; set; } = null!;

    public string TelefonoColumna { get; set; } = null!;

    public string Cliente { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public string FechaBaseRojo { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public DateTime FechaProceso { get; set; }
}
