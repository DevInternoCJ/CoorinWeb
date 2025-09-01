using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class VCuentasDictaminada
{
    public int IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? IdEjecutivo { get; set; }

    public DateOnly? FechaPago { get; set; }

    public decimal? Monto { get; set; }

    public byte? Plazo { get; set; }

    public string? MedioDePago { get; set; }

    public string? NombreInterlocutor { get; set; }

    public string? Parentesco { get; set; }

    public DateOnly? FechaDefuncion { get; set; }

    public string? Ciudad { get; set; }

    public string? Estado { get; set; }

    public string? NumActa { get; set; }

    public string? Folio { get; set; }

    public string? TipoAclaracion { get; set; }

    public DateOnly? FechaAclaracion { get; set; }

    public string? Agencia { get; set; }

    public int? IdTipoDictamen { get; set; }
}
