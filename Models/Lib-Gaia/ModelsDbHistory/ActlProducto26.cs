using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class ActlProducto26
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }
}
