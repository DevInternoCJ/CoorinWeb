using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsAllocation;

public partial class Cfcredit
{
    public string IdCuenta { get; set; } = null!;

    public long? NúmeroTelefónico { get; set; }

    public string? Comentario { get; set; }

    public DateOnly FechaInsert { get; set; }

    public string? Contacto { get; set; }

    public string? Situacion { get; set; }

    public short Idcontacto { get; set; }

    public string? Nombre { get; set; }

    public DateOnly? Fechaacordada { get; set; }

    public decimal? Montonegociado { get; set; }

    public DateOnly? FechaNegociacion { get; set; }
}
