using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryAsura;

public partial class Negociacione
{
    public DateOnly FechaInsert { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

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
    /// Indica si se creó carta convenio durante la negociación.
    /// </summary>
    public bool CartaConvenio { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivoValidador { get; set; }

    public string? CorreoElectrónico { get; set; }

    public DateOnly? FechaAcordada { get; set; }

    public DateOnly FechaFinNegociación { get; set; }

    /// <summary>
    /// El plazo del ofrecimiento, número de pagos.
    /// </summary>
    public byte Pagos { get; set; }

    public decimal MontoPagado { get; set; }

    public decimal SaldoNegociación { get; set; }

    public int? Folio { get; set; }

    public virtual Fecha FechaInsertNavigation { get; set; } = null!;

    public virtual Herramienta IdHerramientaNavigation { get; set; } = null!;
}
