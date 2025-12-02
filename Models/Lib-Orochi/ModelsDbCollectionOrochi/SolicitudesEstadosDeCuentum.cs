using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Collection;

public partial class SolicitudesEstadosDeCuentum
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public DateOnly FechaInicial { get; set; }

    public DateOnly FechaFinal { get; set; }

    public bool Enviado { get; set; }

    public byte Consulta { get; set; }

    public string? CorreoElectrónico { get; set; }

    public virtual CorreosCuenta? CorreosCuenta { get; set; }

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;
}
