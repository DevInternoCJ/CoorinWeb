using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbAllocation;

public partial class TblIntensidad
{
    public int Id { get; set; }

    public string? Tipo { get; set; }

    public int? Intensidad { get; set; }
}
