using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class InmediaAutoCitum
{
    public short IdCita { get; set; }

    public string IdCuenta { get; set; } = null!;

    public int IdCartera { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public int? IdPregunta1 { get; set; }

    public int? IdPregunta2 { get; set; }

    public int? IdPregunta3 { get; set; }

    public int? IdPregunta4 { get; set; }

    public int? IdPregunta5 { get; set; }

    public string? Porque { get; set; }

    public DateOnly? FechaCita { get; set; }

    public string? Estado { get; set; }

    public string? Municipio { get; set; }

    public string? Cp { get; set; }

    public string? Calle { get; set; }

    public string? Colonia { get; set; }

    public string? NumeroExterior { get; set; }

    public string? NumeroInterior { get; set; }

    public TimeOnly? HoraCita { get; set; }
}
