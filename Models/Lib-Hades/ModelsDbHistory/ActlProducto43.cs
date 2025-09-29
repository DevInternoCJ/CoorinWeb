using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class ActlProducto43
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Importe { get; set; }

    public string? Saldo { get; set; }

    public string? AtrasoReal { get; set; }

    public string? InteresNormal { get; set; }

    public string? InteresMoratorio { get; set; }

    public string? IvaInteresNormal { get; set; }

    public string? IvaInteresMoratorio { get; set; }

    public string? TotalAApagarParaRegularizar { get; set; }

    public string? TotalParaLiquidar { get; set; }

    public string? TotalParaLiquidarConHaberes { get; set; }

    public string? DiasMora { get; set; }

    public string? Encargado { get; set; }
}
