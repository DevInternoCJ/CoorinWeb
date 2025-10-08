using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class Ift
{
    public double? Idpersonal { get; set; }

    public long? ClaveCensal { get; set; }

    public string? Poblacion { get; set; }

    public string? Municipio { get; set; }

    public string? Estado { get; set; }

    public string? Presuscripcion { get; set; }

    public short? Region { get; set; }

    public short? Asl { get; set; }

    public short? Nir { get; set; }

    public short? Serie { get; set; }

    public int? NumeracionInicial { get; set; }

    public int? NumeracionFinal { get; set; }

    public int? Ocupacion { get; set; }

    public string? TipoDeRed { get; set; }

    public string? Modalidad { get; set; }

    public string? RazonSocial { get; set; }

    public DateTime? FechaAsignacion { get; set; }

    public DateTime? FechaConsolidacion { get; set; }

    public DateTime? FechaMigracion { get; set; }

    public short? NirAnterior { get; set; }
}
