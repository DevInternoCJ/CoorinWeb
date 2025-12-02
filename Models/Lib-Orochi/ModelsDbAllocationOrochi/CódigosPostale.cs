using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Allocation;

public partial class CódigosPostale
{
    public int IdCódigoPostal { get; set; }

    public string CódigoPostal { get; set; } = null!;

    public string Colonia { get; set; } = null!;

    public string Municipio { get; set; } = null!;

    public string Estado { get; set; } = null!;

    public string Zona { get; set; } = null!;

    public string Asentamiento { get; set; } = null!;

    public string? Periferia { get; set; }

    public string? Estancia { get; set; }

    public string? Sucursal { get; set; }

    public bool ZonaRiesgo { get; set; }
}
