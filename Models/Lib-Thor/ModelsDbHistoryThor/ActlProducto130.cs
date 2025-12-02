using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class ActlProducto130
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? TotalDeudor { get; set; }

    public string? SaldoVencido { get; set; }

    public string? MensualidadesNoPagadas { get; set; }

    public string? PrimaMensualFacturada { get; set; }

    public string? SumaAsegurada { get; set; }

    public string? Estatus { get; set; }

    public string? PvAct { get; set; }

    public string? Telefono1 { get; set; }

    public string? Telefono2 { get; set; }

    public string? Telefono3 { get; set; }

    public string? Telefono4 { get; set; }

    public string? CorteColor { get; set; }

    public string? Documentos { get; set; }
}
