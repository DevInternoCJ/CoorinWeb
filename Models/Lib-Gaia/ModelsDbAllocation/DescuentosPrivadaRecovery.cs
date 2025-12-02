using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbAllocation;

public partial class DescuentosPrivadaRecovery
{
    public string? Segmento { get; set; }

    public string? DescuentoAplicar30Dias { get; set; }

    public string? DescuentoAplicar3Meses { get; set; }

    public string? DescuentoAplicar6Meses { get; set; }

    public string? DescuentoAplicar12Meses { get; set; }

    public string? DescuentoAplicar24Meses { get; set; }

    public string? DescuentoAplicarMayorA24YMenorA48Meses { get; set; }
}
