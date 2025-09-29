using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbCollection;

public partial class VGestioneschat
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public bool Salida { get; set; }

    public short IdAcercamiento { get; set; }

    public long? NúmeroTelefónico { get; set; }

    public string? IdRedSocial { get; set; }

    public short IdContacto { get; set; }

    public short IdEtapa { get; set; }

    public short? IdSituación { get; set; }

    public short? IdParentesco { get; set; }

    public string? NombreContacto { get; set; }

    public short? IdCausaNoPago { get; set; }

    public short IdSucursal { get; set; }

    public TimeOnly Duración { get; set; }

    public TimeOnly TiempoEnCuenta { get; set; }

    public string? Comentario { get; set; }
}
