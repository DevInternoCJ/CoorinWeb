using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class ActlProducto180
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? SaldoCliente { get; set; }

    public string? Fechaentrada { get; set; }

    public string? Producto { get; set; }

    public string? TipoDeProducto { get; set; }

    public string? Externa { get; set; }

    public string? Fase { get; set; }

    public string? VencidoCliente { get; set; }
}
