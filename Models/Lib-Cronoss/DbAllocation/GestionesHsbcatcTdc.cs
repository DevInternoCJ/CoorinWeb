using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class GestionesHsbcatcTdc
{
    public string IdCuenta { get; set; } = null!;

    public string? Expediente { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Contacto { get; set; }

    public string? Situación { get; set; }

    public string? Modo { get; set; }

    public DateOnly Fecha { get; set; }

    public TimeOnly Hora { get; set; }

    public TimeOnly Duración { get; set; }

    public TimeOnly TiempoEnCuenta { get; set; }

    public string Usuario { get; set; } = null!;

    public long? NúmeroTelefónico { get; set; }

    public short Extensión { get; set; }

    public string? Identificador { get; set; }

    public string? SituaciónCuenta { get; set; }

    public DateOnly? ÚltimaGestión { get; set; }

    public string? Nivel { get; set; }
}
