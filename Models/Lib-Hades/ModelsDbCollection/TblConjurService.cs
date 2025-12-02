using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class TblConjurService
{
    public string IdCuenta { get; set; } = null!;

    public string Actividad { get; set; } = null!;

    public DateTime FechaHoraActividad { get; set; }

    public string Cartera { get; set; } = null!;
}
