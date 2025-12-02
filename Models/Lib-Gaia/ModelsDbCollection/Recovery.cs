using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class Recovery
{
    public double? Id { get; set; }

    public string? Usuario { get; set; }

    public string? NombreCompleto { get; set; }

    public string? Cartera { get; set; }

    public string? Turno { get; set; }

    public string? Segmento { get; set; }

    public string? Bucket { get; set; }

    public string? Status { get; set; }

    public string? F9 { get; set; }

    public string? F10 { get; set; }
}
