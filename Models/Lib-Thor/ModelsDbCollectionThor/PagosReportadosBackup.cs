using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class PagosReportadosBackup
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public DateOnly FechaPago { get; set; }

    public decimal MontoPago { get; set; }

    public string? Referencia { get; set; }

    public string? Sucursal { get; set; }

    public short IdEtapa { get; set; }

    public int? SecuenciaPago { get; set; }

    public int? TotalPagos { get; set; }

    public int? Confirmacion { get; set; }

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdEtapaNavigation { get; set; } = null!;
}
