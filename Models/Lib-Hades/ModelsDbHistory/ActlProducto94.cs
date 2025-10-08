using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class ActlProducto94
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }
}
