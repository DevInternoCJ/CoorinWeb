using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class Negociacione
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public short IdHerramienta { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivo { get; set; }

    public short IdEstado { get; set; }

    /// <summary>
    /// Monto total ofrecido a pagar. 
    /// </summary>
    public decimal MontoNegociado { get; set; }

    public byte Plazos { get; set; }

    /// <summary>
    /// Fehca en la que se espera el pago.
    /// </summary>
    public DateOnly FechaAcordada { get; set; }

    /// <summary>
    /// Fecha límite de la negociación, fecha que se espera el pago más el márgen de la herramienta.
    /// </summary>
    public DateOnly FechaFinNegociación { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivoValidador { get; set; }

    /// <summary>
    /// Indica si se creó carta convenio durante la negociación.
    /// </summary>
    public bool CartaConvenio { get; set; }

    public string? CorreoElectrónico { get; set; }

    /// <summary>
    /// El plazo del ofrecimiento, número de pagos.
    /// </summary>
    public byte Pagos { get; set; }

    public decimal MontoPagado { get; set; }

    public decimal SaldoNegociación { get; set; }

    public int? Folio { get; set; }

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual GestionesChat GestionesChat { get; set; } = null!;

    public virtual GestionesTelefónica GestionesTelefónica { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoValidadorNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdEstadoNavigation { get; set; } = null!;

    public virtual Herramienta IdHerramientaNavigation { get; set; } = null!;
}
