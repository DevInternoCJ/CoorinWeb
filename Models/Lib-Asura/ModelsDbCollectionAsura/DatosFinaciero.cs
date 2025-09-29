using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class DatosFinaciero
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? IdEjecutivo { get; set; }

    public decimal? Ingreso1 { get; set; }

    public decimal? Ingreso2 { get; set; }

    public decimal? TotalIngresos { get; set; }

    public decimal? CreditoHipotecario { get; set; }

    public decimal? CreditoAuto { get; set; }

    public decimal? CreditoPersonal { get; set; }

    public decimal? PagoMinimoTdc { get; set; }

    public decimal? PagoMinimoTarjeta2 { get; set; }

    public decimal? PagoMinimoTarjeta3 { get; set; }

    public decimal? OtrosCreditos { get; set; }

    public decimal? MontoCalifica { get; set; }

    public decimal? TotalEgresos { get; set; }

    public int? DiaPago { get; set; }

    public decimal? CapacidadPagoCalculada { get; set; }

    public decimal? CapacidadPagoDeclarada { get; set; }

    public decimal? CapacidadPagoConsiderar { get; set; }

    public DateOnly? Fecha { get; set; }
}
