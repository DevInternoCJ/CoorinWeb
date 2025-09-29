using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbAllocation;

public partial class _200BancomerPyme
{
    public short IdProducto { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? Grupo { get; set; }

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

    public short? IdCausanopago { get; set; }

    public string Contacto { get; set; } = null!;

    public string? Situacion { get; set; }

    public string? CausasNoPago { get; set; }

    public string? Parentesco { get; set; }
}
