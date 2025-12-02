using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Allocation;

public partial class Val200vv
{
    public short IdProducto { get; set; }

    public string IdCuenta { get; set; } = null!;

    public int? Grupo { get; set; }

    public string? Prestamo { get; set; }

    public DateOnly? FechaInsert { get; set; }

    public TimeOnly? SegundoInsert { get; set; }

    public string? CódigoAcción { get; set; }

    public string? CódigoResultado { get; set; }

    public string? Lada { get; set; }

    public string? NúmeroTelefónico { get; set; }

    public string? Observaciones { get; set; }

    public long? ConteoFilas { get; set; }

    public string Usuario { get; set; } = null!;

    public string Tipo { get; set; } = null!;

    public int? Ejecutivo { get; set; }

    public short? IdContacto { get; set; }

    public short? IdSituación { get; set; }

    public short? IdParentesco { get; set; }

    public short? IdCausaNoPago { get; set; }
}
