using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationAsura;

public partial class LogProceso
{
    public int IdLogProceso { get; set; }

    public short IdCartera { get; set; }

    public short? IdProducto { get; set; }

    public int IdEjecutivo { get; set; }

    public short IdProceso { get; set; }

    public string Archivo { get; set; } = null!;

    public int Columnas { get; set; }

    public int Registros { get; set; }

    public DateTime FechaLogInicio { get; set; }

    public DateTime? FechaLogFin { get; set; }

    public TimeOnly? Duración { get; set; }

    public string Dominio { get; set; } = null!;

    public string Computadora { get; set; } = null!;

    public string Usuario { get; set; } = null!;

    public int? Insertados { get; set; }

    public string? Error { get; set; }

    public virtual Producto? IdProductoNavigation { get; set; }
}
