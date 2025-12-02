using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Memory;

public partial class Sesione
{
    public int IdEjecutivo { get; set; }

    public int IdEncargado { get; set; }

    public string Usuario { get; set; } = null!;

    public string Ip { get; set; } = null!;

    public short Extensión { get; set; }

    public DateOnly FechaIngreso { get; set; }

    public TimeOnly SegundoIngreso { get; set; }

    public TimeOnly? SegundoSalida { get; set; }

    public TimeOnly? HoraPrimerGestión { get; set; }

    public string? Modo { get; set; }

    public DateTime? HoraModo { get; set; }

    public TimeOnly? TiempoCuentas { get; set; }

    public TimeOnly? TiempoTitulares { get; set; }

    public TimeOnly? TiempoConocidos { get; set; }

    public TimeOnly? TiempoDesconocidos { get; set; }

    public TimeOnly? TiempoSinContacto { get; set; }

    public TimeOnly? TiempoNegociaciones { get; set; }

    public TimeOnly? TiempoPermiso { get; set; }

    public TimeOnly? TiempoCurso { get; set; }

    public TimeOnly? TiempoCalidad { get; set; }

    public TimeOnly? TiempoComida { get; set; }

    public TimeOnly? TiempoBaño { get; set; }

    public TimeOnly? TiempoFallaTécnica { get; set; }
}
