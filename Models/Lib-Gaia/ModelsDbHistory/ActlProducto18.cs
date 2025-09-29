using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class ActlProducto18
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Carpeta { get; set; }

    public string? Sald { get; set; }

    public string? Mralt { get; set; }

    public string? Morosidad { get; set; }

    public string? Riesgo { get; set; }

    public string? Saldo { get; set; }

    public string? FechaCarpeta { get; set; }

    public string? FechaMora { get; set; }

    public string? CarpetaPrev { get; set; }

    public string? Fecha { get; set; }

    public string? Prioridad { get; set; }
}
