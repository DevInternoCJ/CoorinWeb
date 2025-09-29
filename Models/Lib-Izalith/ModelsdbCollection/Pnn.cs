using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class Pnn
{
    public string IdCuenta { get; set; } = null!;

    public string? ClaveCensal { get; set; }

    public string? Poblacion { get; set; }

    public string? Municipio { get; set; }

    public string? Estado { get; set; }

    public string? Presuscripcion { get; set; }

    public string? Region { get; set; }

    public string? Asl { get; set; }

    public string? Nir { get; set; }

    public string? Serie { get; set; }

    public string? NumeracionInicial { get; set; }

    public string? NumeracionFinal { get; set; }

    public string? Ocupacion { get; set; }

    public string? TipoRed { get; set; }

    public string? Modalidad { get; set; }

    public string? RazonSocial { get; set; }

    public string? FechaAsignacion { get; set; }

    public string? FechaConsolidacion { get; set; }

    public string? FechaMigracion { get; set; }

    public string? NirAnterior { get; set; }
}
