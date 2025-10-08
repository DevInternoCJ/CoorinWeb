using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class Citum
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public int IdModo { get; set; }

    public string IdContacto { get; set; } = null!;

    public string? MotivoCita { get; set; }

    public string? Kilometraje { get; set; }

    public TimeOnly? HoraCliente { get; set; }

    public DateOnly? FechaCliente { get; set; }

    public TimeOnly? HoraAgencia { get; set; }

    public DateOnly? FechaAgencia { get; set; }

    public string? FolioAgencia { get; set; }

    public DateTime? FechaServEnt { get; set; }

    public DateTime? FechaServSal { get; set; }

    public string? Encuesta { get; set; }

    public string? ConfirmarCita { get; set; }

    public string? Comentario { get; set; }
}
