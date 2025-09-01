using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class OfrecimientosBackup
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public short IdHerramienta { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivo { get; set; }

    /// <summary>
    /// Tipo accionamiento por el cual se hizo el ofrecimiento.
    /// </summary>
    public short IdAcercamiento { get; set; }

    public decimal MontoRequerido { get; set; }

    public decimal MontoOfrecido { get; set; }

    public float Descuento { get; set; }

    public byte Plazos { get; set; }

    public decimal Saldo { get; set; }

    public DateOnly? FechaCorte { get; set; }

    public virtual GestionesChatBackup GestionesChatBackup { get; set; } = null!;

    public virtual GestionesTelefónicasBackup GestionesTelefónicasBackup { get; set; } = null!;

    public virtual ValoresCatálogo IdAcercamientoNavigation { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;

    public virtual Herramienta IdHerramientaNavigation { get; set; } = null!;
}
