using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class Adicionale
{
    public short IdCartera { get; set; }

    /// <summary>
    /// El número de cuenta con el cual se relacionará con la tabla de asignación.
    /// </summary>
    public string IdCuenta { get; set; } = null!;

    public int IdAdicional { get; set; }

    public string NombreAdicional { get; set; } = null!;

    public short IdParentesco { get; set; }

    public long? NúmeroTelefónico { get; set; }

    public string? Rfcadicional { get; set; }

    public string? CorreoAdicional { get; set; }

    public string? CalleNum { get; set; }

    public string? ColoniaLocalidad { get; set; }

    public string? DelegaciónMunicipio { get; set; }

    public string? Estado { get; set; }

    public string? CódigoPostal { get; set; }

    public DateOnly? FechaInsert { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public int? IdLogProceso { get; set; }

    public virtual Teléfono? Teléfono { get; set; }
}
