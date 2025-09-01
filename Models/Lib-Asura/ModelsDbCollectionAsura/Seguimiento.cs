using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class Seguimiento
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivo { get; set; }

    public DateOnly FechaSeguimiento { get; set; }

    public TimeOnly SegundoSeguimiento { get; set; }

    /// <summary>
    /// Acercamiento que se solicita.
    /// </summary>
    public short IdAcercamiento { get; set; }

    /// <summary>
    /// Número telefónico a 10 dígitos
    /// </summary>
    public long? NúmeroTelefónico { get; set; }

    public bool Recordatorio { get; set; }

    /// <summary>
    /// Si se cumplió el seguimiento o no. 
    /// </summary>
    public bool? Realizado { get; set; }

    public int? IdEjecutivoRealizado { get; set; }

    public TimeOnly? SegundoRealizado { get; set; }

    public string? DatoContacto { get; set; }

    public short? IdMotivoSeg { get; set; }

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual ValoresCatálogo IdAcercamientoNavigation { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;

    public virtual Teléfono? Teléfono { get; set; }
}
