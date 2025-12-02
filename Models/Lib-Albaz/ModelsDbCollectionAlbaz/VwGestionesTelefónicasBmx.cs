using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class VwGestionesTelefónicasBmx
{
    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public string? Cartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string Usuario { get; set; } = null!;

    public int IdEjecutivo { get; set; }

    public string NombreEjecutivo { get; set; } = null!;

    public string Contacto { get; set; } = null!;

    public string? Situacion { get; set; }

    public string? CausasNoPago { get; set; }

    public string? Parentesco { get; set; }

    public string? NombreContacto { get; set; }

    public TimeOnly Duración { get; set; }

    public string Modo { get; set; } = null!;

    public string? Acercamiento { get; set; }

    public string? Comentario { get; set; }

    public long? NúmeroTelefónico { get; set; }

    public short? IdSituación { get; set; }

    public short IdContacto { get; set; }
}
