using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbAllocation;

public partial class VwNegociacione
{
    public string IdCuenta { get; set; } = null!;

    public long? NúmeroTelefónico { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public short IdHerramienta { get; set; }

    public int IdEjecutivo { get; set; }

    public decimal MontoNegociado { get; set; }

    public byte Plazos { get; set; }

    public short? IdSituación { get; set; }

    public short? IdCausaNoPago { get; set; }

    public TimeOnly? Duración { get; set; }

    public decimal? MontoPago { get; set; }

    public DateOnly? FechaPago { get; set; }

    public DateOnly? FechaInicioPlazo { get; set; }

    public DateOnly? FechaFinPlazo { get; set; }

    public byte? Ordinal { get; set; }
}
