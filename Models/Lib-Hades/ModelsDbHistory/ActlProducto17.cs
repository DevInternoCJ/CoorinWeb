using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class ActlProducto17
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Ordner { get; set; }

    public string? Rueckh { get; set; }

    public string? Atraso { get; set; }

    public decimal? RiesgoPortafolio { get; set; }

    public string? Ordnerdat { get; set; }

    public string? Ordnerpre { get; set; }

    public string? Fecha { get; set; }

    public string? Prioridad { get; set; }

    public string? Region { get; set; }
}
