using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

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

    public bool Consulta { get; set; }

    public string? CorreoElectrónico { get; set; }

    public virtual CorreosCuentasBackup? CorreosCuentasBackup { get; set; }

    public virtual CuentasBackup CuentasBackup { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;
}
