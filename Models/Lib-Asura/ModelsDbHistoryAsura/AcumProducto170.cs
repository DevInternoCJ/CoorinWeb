using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class AcumProducto170
{
    public DateOnly? Insert { get; set; }

    public int IdLogAsignación { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? Nombre { get; set; }

    public string? CréditoOtorgado { get; set; }

    public string? MesesDeContrato { get; set; }

    public string? FechaDePrestamo { get; set; }

    public string? FechaDeCorte { get; set; }

    public string? FechaDePago { get; set; }

    public string? PrepagoTotal { get; set; }

    public string? DiasDeAtraso { get; set; }

    public string? MontoElProxPago { get; set; }

    public string? Vin { get; set; }

    public string? Marca { get; set; }

    public string? Modelo { get; set; }

    public string? Año { get; set; }

    public string? StatusGps { get; set; }

    public string? ClabeStp { get; set; }

    public string? ConvenioCie { get; set; }

    public string? Rfc { get; set; }
}
