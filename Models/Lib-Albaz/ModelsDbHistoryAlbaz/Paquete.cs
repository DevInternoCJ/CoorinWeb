using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.History;

/// <summary>
/// Paquetes de accionamiento
/// </summary>
public partial class Paquete
{
    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public short IdCartera { get; set; }

    public short IdAcercamiento { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripción { get; set; } = null!;

    public int NúmeroAsuntos { get; set; }

    public bool Enviado { get; set; }

    public int? Rechazados { get; set; }

    public virtual ICollection<Accionamiento> Accionamientos { get; set; } = new List<Accionamiento>();

    public virtual ValoresCatálogo IdAcercamientoNavigation { get; set; } = null!;

    public virtual Cartera IdCarteraNavigation { get; set; } = null!;
}
