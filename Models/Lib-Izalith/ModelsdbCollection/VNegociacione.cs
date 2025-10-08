using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class VNegociacione
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public short IdHerramienta { get; set; }

    public int IdEjecutivo { get; set; }

    public short IdEstado { get; set; }

    public decimal MontoNegociado { get; set; }

    public byte Plazos { get; set; }

    public DateOnly FechaAcordada { get; set; }

    public DateOnly FechaFinNegociación { get; set; }

    public int IdEjecutivoValidador { get; set; }

    public bool CartaConvenio { get; set; }

    public string? CorreoElectrónico { get; set; }

    public byte Pagos { get; set; }

    public decimal MontoPagado { get; set; }

    public decimal SaldoNegociación { get; set; }

    public int? Folio { get; set; }
}
