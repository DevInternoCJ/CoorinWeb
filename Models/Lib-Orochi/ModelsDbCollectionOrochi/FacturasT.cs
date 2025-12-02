using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Collection;

public partial class FacturasT
{
    public string? Cuenta { get; set; }

    public string? Nombre { get; set; }

    public string? Asignación { get; set; }

    public string? Cargo { get; set; }

    public string? Abono { get; set; }

    public string? Saldo { get; set; }

    public string? FechaFactura { get; set; }

    public string? Referencia { get; set; }

    public string? ReferenciaFactura { get; set; }

    public string? Texto { get; set; }

    public string? ClaseDeDocumento { get; set; }

    public string? NúmeroDeContrato { get; set; }

    public DateOnly? FechaInsert { get; set; }
}
