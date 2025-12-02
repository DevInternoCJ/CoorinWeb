using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.History;

public partial class ActlProducto23
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Saldo { get; set; }

    public string? Vin { get; set; }

    public string? Unidad { get; set; }

    public string? SaldoActual { get; set; }

    public string? Proyecto { get; set; }

    public string? FechaDeInicio { get; set; }

    public string? FechaDeRetiro { get; set; }

    public string? AbogadoCordinador { get; set; }

    public string? MesDeCastigo { get; set; }
}
