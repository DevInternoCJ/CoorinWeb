using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class Cita
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string FechaInsert { get; set; } = null!;

    public string SegundoInsert { get; set; } = null!;

    public int IdEjecutivo { get; set; }

    public DateOnly? FechaCita { get; set; }

    public TimeOnly? HoraCita { get; set; }

    public DateOnly? FechaEntrega { get; set; }

    public TimeOnly? HoraEntrega { get; set; }

    public string? TipoServicio { get; set; }

    public int? NoDistribuidor { get; set; }

    public string? NomDistribuidor { get; set; }

    public string? TicketSf { get; set; }

    public string? ImpServicio { get; set; }

    public DateOnly? FechaActualizacion { get; set; }

    public int? IdEjecutivoActualiza { get; set; }
}
