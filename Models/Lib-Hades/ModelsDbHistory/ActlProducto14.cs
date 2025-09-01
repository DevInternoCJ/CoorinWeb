using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class ActlProducto14
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Saldovencido { get; set; }

    public string? Montorenta { get; set; }

    public string? Campaña { get; set; }

    public string? BuroAlDiaVerificacion { get; set; }

    public string? BuróAsignación { get; set; }

    public string? Diasvenc { get; set; }

    public string? Fechamasantigua { get; set; }

    public string? Numpagosven { get; set; }

    public string? Totalotros { get; set; }

    public string? Totalvencidos { get; set; }

    public string? Diasvencido { get; set; }

    public string? Carteraal { get; set; }

    public string? Otros { get; set; }

    public string? Nortasvencidas { get; set; }

    public string? Rtamasantigua { get; set; }

    public string? Numpagosven2 { get; set; }
}
