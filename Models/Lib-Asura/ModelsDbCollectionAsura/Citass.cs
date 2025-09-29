using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class Citass
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string FechaInsert { get; set; } = null!;

    public string SegundoInsert { get; set; } = null!;

    public int IdEjecutivo { get; set; }

    public string? FechaCita { get; set; }

    public string? HoraCita { get; set; }

    public string? FechaEntrega { get; set; }

    public string? HoraEntrega { get; set; }

    public string? TipoServicio { get; set; }

    public int? NoDistribuidor { get; set; }

    public string? NomDistribuidor { get; set; }

    public string? TicketSf { get; set; }

    public string? ImpServicio { get; set; }

    public DateOnly? FechaActualizacion { get; set; }

    public int? IdEjecutivoActualiza { get; set; }
}
