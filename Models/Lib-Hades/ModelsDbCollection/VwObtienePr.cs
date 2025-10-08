using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class VwObtienePr
{
    public long? Orden { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public long? NúmeroTelefónico { get; set; }

    public short IdContacto { get; set; }

    public short? IdSituación { get; set; }

    public short IdSucursal { get; set; }

    public short Extensión { get; set; }

    public short IdModo { get; set; }

    public short? IdAcercamiento { get; set; }

    public TimeOnly Duración { get; set; }

    public TimeOnly TiempoEnCuenta { get; set; }

    public short? IdParentesco { get; set; }

    public string? NombreContacto { get; set; }

    public short? IdCausaNoPago { get; set; }

    public string? Comentario { get; set; }

    public int? IdValidador { get; set; }

    public decimal? MontoPago { get; set; }

    public bool? Cumplido { get; set; }

    public DateOnly? FechaPago { get; set; }

    public DateOnly? FechaInicioPlazo { get; set; }

    public DateOnly? FechaFinPlazo { get; set; }

    public decimal? SumaPagos { get; set; }

    public byte? Pagos { get; set; }

    public bool? Válido { get; set; }

    public byte? Ordinal { get; set; }
}
