using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class ActlProducto134
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Producto { get; set; }

    public string? Mora { get; set; }

    public string? Segmento { get; set; }

    public string? SaldoCapital { get; set; }

    public string? ProductoCj { get; set; }

    public string? Identificador { get; set; }

    public string? Descuento { get; set; }

    public string? SaldoaNegociar { get; set; }

    public string? ComisionesMora { get; set; }

    public string? DiasMora { get; set; }

    public string? SaldoDeuda { get; set; }

    public string? Rubro { get; set; }
}
