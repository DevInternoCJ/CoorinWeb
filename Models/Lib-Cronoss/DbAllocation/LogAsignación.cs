using System;
using System.Collections.Generic;

namespace Loki.DbAllocation.ModelsCronoss;

public partial class LogAsignación
{
    public int IdLogAsignación { get; set; }

    public short IdProducto { get; set; }

    public int? IdEjecutivo { get; set; }

    public string Proceso { get; set; } = null!;

    public byte NúmeroArchivos { get; set; }

    public int Columnas { get; set; }

    public int InventarioInicial { get; set; }

    public int InventarioFinal { get; set; }

    public double? SaldoInicial { get; set; }

    public double? SaldoFinal { get; set; }

    public int Nuevas { get; set; }

    public int Activadas { get; set; }

    public int Desactivadas { get; set; }

    public int CambiosProducto { get; set; }

    public int Actualizadas { get; set; }

    public int Quejas { get; set; }

    public DateTime FechaLogInicio { get; set; }

    public DateTime FechaLogFin { get; set; }

    public TimeOnly Duración { get; set; }

    public string Dominio { get; set; } = null!;

    public string Computadora { get; set; } = null!;

    public string Usuario { get; set; } = null!;

    public string? Error { get; set; }

    public string? Directorio { get; set; }

    public virtual ICollection<Ejecucione> Ejecuciones { get; set; } = new List<Ejecucione>();

    public virtual Producto IdProductoNavigation { get; set; } = null!;

    public virtual ICollection<LogArchivo> LogArchivos { get; set; } = new List<LogArchivo>();
}
